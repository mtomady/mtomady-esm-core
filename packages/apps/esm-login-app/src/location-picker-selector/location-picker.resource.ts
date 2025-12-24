import { useMemo } from 'react';
import useSwrImmutable from 'swr/immutable';
import useSwrInfinite from 'swr/infinite';
import {
  type FHIRLocationResource,
  type FetchResponse,
  fhirBaseUrl,
  openmrsFetch,
  useDebounce,
  type Role,
  useSession,
} from '@openmrs/esm-framework';
import { restBaseUrl } from '@openmrs/esm-api';
import { ROLE_TO_LOCATION_UUID_MAP } from './locations.constants';

export interface LocationResponse {
  type: string;
  total: number;
  resourceType: string;
  meta: {
    lastUpdated: string;
  };
  link: Array<{
    relation: string;
    url: string;
  }>;
  id: string;
  entry: Array<FHIRLocationResource>;
}
export interface LoginLocationData {
  locations: Array<FHIRLocationResource>;
  isLoading: boolean;
  totalResults?: number;
  hasMore: boolean;
  loadingNewData: boolean;
  error: Error | null;
  setPage: (size: number | ((_size: number) => number)) => Promise<FetchResponse<LocationResponse>[] | undefined>;
}

export function useLocationByUuid(locationUuid?: string) {
  const url = locationUuid ? `/ws/fhir2/R4/Location?_id=${locationUuid}` : null;

  const { data, error, isLoading } = useSwrImmutable<FetchResponse<LocationResponse>>(url, openmrsFetch, {
    shouldRetryOnError(err) {
      if (err?.response?.status) {
        return err.response.status >= 500;
      }
      return false;
    },
  });

  return useMemo(
    () => ({
      location: data?.data?.entry ? data.data.entry[0] : null,
      error: url ? error : null,
      isLoading: url ? isLoading : false,
    }),
    [data, isLoading, error, url],
  );
}

export function useLocations(locationTag?: string, count: number = 0, searchQuery: string = ''): LoginLocationData {
  const debouncedSearchQuery = useDebounce(searchQuery);
  function constructUrl(page: number, prevPageData: FetchResponse<LocationResponse>) {
    if (prevPageData) {
      const nextLink = prevPageData.data?.link?.find((link) => link.relation === 'next');

      if (!nextLink) {
        return null;
      }

      const nextUrl = new URL(nextLink.url);
      // default for production
      if (nextUrl.origin === window.location.origin) {
        return nextLink.url;
      }

      // in development, the request should be funnelled through the local proxy
      return new URL(
        `${nextUrl.pathname}${nextUrl.search ? `?${nextUrl.search}` : ''}`,
        window.location.origin,
      ).toString();
    }

    let url = `${fhirBaseUrl}/Location?`;
    let urlSearchParameters = new URLSearchParams();
    urlSearchParameters.append('_summary', 'data');

    if (count) {
      urlSearchParameters.append('_count', '' + count);
    }

    if (page) {
      urlSearchParameters.append('_getpagesoffset', '' + page * count);
    }

    if (locationTag) {
      urlSearchParameters.append('_tag', locationTag);
    }

    if (typeof debouncedSearchQuery === 'string' && debouncedSearchQuery !== '') {
      urlSearchParameters.append('name:contains', debouncedSearchQuery);
    }

    return url + urlSearchParameters.toString();
  }

  const { data, isLoading, isValidating, setSize, error } = useSwrInfinite<FetchResponse<LocationResponse>, Error>(
    constructUrl,
    openmrsFetch,
  );

  const memoizedLocations = useMemo(() => {
    return {
      locations: data?.length ? data?.flatMap((entries) => entries?.data?.entry ?? []) : [],
      isLoading,
      totalResults: data?.[0]?.data?.total,
      hasMore: data?.length ? data?.[data.length - 1]?.data?.link?.some((link) => link.relation === 'next') : false,
      loadingNewData: isValidating,
      error: error || null,
      setPage: setSize,
    };
  }, [isLoading, data, isValidating, setSize, error]);

  return memoizedLocations;
}

export function useUserInheritedRoles(userUuid?: string) {
  const customRepresentation =
    'custom:(uuid,display,username,roles:(uuid,name,display,inheritedRoles:(uuid,name,display)))';
  const url = userUuid ? `${restBaseUrl}/user/${userUuid}?v=${customRepresentation}` : null;

  const { data, error, isLoading } = useSwrImmutable<FetchResponse<any>>(url, openmrsFetch, {
    shouldRetryOnError(err) {
      if (err?.response?.status) {
        return err.response.status >= 500;
      }
      return false;
    },
  });

  const allRoles = useMemo(() => {
    if (!data?.data?.roles) {
      return [];
    }

    const roles: Role[] = [];
    const processedRoleUuids = new Set<string>();

    const collectRoles = (roleList: any[]) => {
      if (!roleList || !Array.isArray(roleList)) {
        return;
      }

      roleList.forEach((role) => {
        if (role.uuid && !processedRoleUuids.has(role.uuid)) {
          processedRoleUuids.add(role.uuid);

          roles.push({
            uuid: role.uuid,
            name: role.name,
            display: role.display,
          });

          if (role.inheritedRoles && Array.isArray(role.inheritedRoles)) {
            collectRoles(role.inheritedRoles);
          }
        }
      });
    };

    collectRoles(data.data.roles);

    return roles;
  }, [data]);

  return {
    allRoles,
    isLoading,
    error,
  };
}

/**
 * Get allowed location UUIDs based on user roles
 * @param roleNames Array of role names (e.g., ['Access: Imaging', 'Access: Laboratory'])
 * @returns Array of allowed location UUIDs
 */
export function getAllowedLocationUuidsByRoles(roleNames: string[]): string[] {
  return roleNames
    .map((roleName) => ROLE_TO_LOCATION_UUID_MAP[roleName])
    .filter((uuid): uuid is string => uuid !== undefined);
}

/**
 * Hook that wraps useLocations and filters locations based on user roles
 * @param locationTag Optional location tag to filter by
 * @param count Number of locations per request
 * @param searchQuery Search query string
 * @returns LoginLocationData with locations filtered by user roles
 */
export function useRoleFilteredLocations(
  locationTag?: string,
  count: number = 0,
  searchQuery: string = '',
): LoginLocationData {
  const locationsData = useLocations(locationTag, count, searchQuery);
  const { user } = useSession();
  const { allRoles: userInheritedRoles } = useUserInheritedRoles(user?.uuid);

  const roleFilteredResult = useMemo(() => {
    const userRoles = userInheritedRoles.length > 0 ? userInheritedRoles : user?.roles ?? [];
    const userRoleNames = userRoles.map((role) => role.name);
    const allowedLocationUuids = getAllowedLocationUuidsByRoles(userRoleNames);

    // If no role restrictions, return all locations
    if (allowedLocationUuids.length === 0) {
      return locationsData.locations;
    }

    // Filter locations based on allowed UUIDs
    return locationsData.locations.filter(({ resource }) => allowedLocationUuids.includes(resource.id));
  }, [locationsData.locations, userInheritedRoles, user?.roles]);

  // Return a new object that looks exactly like the original
  return {
    ...locationsData, // Copy all original properties
    locations: roleFilteredResult, // Overwrite the 'locations' property with our filtered list
  };
}
