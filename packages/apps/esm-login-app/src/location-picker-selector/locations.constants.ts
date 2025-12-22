/**
 * Map of all locations with their UUIDs and English names
 * Used for location filtering and comparison
 */
export const ALL_LOCATIONS = {
  CHRR: {
    uuid: '18aed7d1-95f8-4b91-aaae-00476cc94794',
    name: 'CHRR',
    nameEn: 'CHRR',
  },
  ENTRY_OFFICE: {
    uuid: 'bbf2b0d5-d37e-481d-98f2-1373b3642b45',
    name: 'Bureau des entrées',
    nameEn: 'Entry Office',
  },
  RECEPTION_TRIAGE_EMERGENCY: {
    uuid: 'b3fcde5e-d9fa-4ee1-94a5-5a07f0e6189a',
    name: 'Accueil - Triage - Urgence',
    nameEn: 'Reception - Triage - Emergency',
  },
  CESSION: {
    uuid: '8f36516e-18e3-4ed2-bd90-805be0729a49',
    name: 'Cession',
    nameEn: 'Transfer',
  },
  PHARMACY: {
    uuid: 'db6cc81b-977a-447f-ad36-656d3b19eae4',
    name: 'Pharmacie',
    nameEn: 'Pharmacy',
  },
  MATERNITY: {
    uuid: '02933282-f1f4-41eb-89b3-ff925f352c4d',
    name: 'Maternité',
    nameEn: 'Maternity',
  },
  PEDIATRICS: {
    uuid: '0fa60b2e-62c7-40b0-bb83-79e47fe02a4e',
    name: 'Pédiatrie',
    nameEn: 'Pediatrics',
  },
  NEONATOLOGY: {
    uuid: '8b0faff9-4099-4011-8816-1b132063bc79',
    name: 'Neonatalogie',
    nameEn: 'Neonatology',
  },
  MEN_MEDICINE: {
    uuid: '5df13554-8f01-43c8-b2c2-c010b639dae4',
    name: 'Medecine Homme',
    nameEn: 'Men Medicine',
  },
  WOMEN_MEDICINE: {
    uuid: '17caef4f-3ed2-42ad-a2a7-a514e23cf89a',
    name: 'Medecine Femme',
    nameEn: 'Women Medicine',
  },
  PAID_MEDICINE: {
    uuid: '31ee12b0-3212-4ee5-969f-ca7c70853a95',
    name: 'Medecine payante',
    nameEn: 'Paid Medicine',
  },
  PEDIATRIC_AND_ADULT_SURGERY: {
    uuid: '4df29277-cf4d-47e4-a89b-efa91279c3f0',
    name: 'Chirurgie infantile et adulte',
    nameEn: 'Pediatric and Adult Surgery',
  },
  PAID_SURGERY: {
    uuid: '63362664-c2b0-487a-a6f9-5f7b3a555d04',
    name: 'Chirurgie payante',
    nameEn: 'Paid Surgery',
  },
  OPERATING_ROOM: {
    uuid: 'b7c0bdcd-b9aa-498d-a764-1f8fbd39b063',
    name: 'Bloc operatoire',
    nameEn: 'Operating Room',
  },
  LABORATORY: {
    uuid: 'd00ac233-12c8-4c0e-bc2e-c54f8a541ada',
    name: 'Laboratoire',
    nameEn: 'Laboratory',
  },
  IMAGING: {
    uuid: 'd8c07f2a-046f-4c3b-97e1-fe32c1446214',
    name: 'Imagerie',
    nameEn: 'Imaging',
  },
  DENTISTRY: {
    uuid: 'd8428aad-98d8-4553-8706-ee80e37c796a',
    name: 'Dentisterie',
    nameEn: 'Dentistry',
  },
  RESPIRATORY_DISEASES_SERVICE: {
    uuid: '370c1a81-9b05-47d0-8eb4-262351d543a2',
    name: 'Service des maladies resporatoires',
    nameEn: 'Respiratory Diseases Service',
  },
  RABIES_TREATMENT_CENTER: {
    uuid: '66d869bd-7c2c-49f1-b0c4-3ee4a6df7612',
    name: 'Centre de traitement anti rabique',
    nameEn: 'Rabies Treatment Center',
  },
  ACUPUNCTURE: {
    uuid: 'bd46e413-3b45-4bab-8763-dccc709e608b',
    name: 'Acupuncture',
    nameEn: 'Acupuncture',
  },
  BLOOD_TRANSFUSION_CENTER: {
    uuid: '1ca8c9b3-efcb-49a2-824b-c12da0108aad',
    name: 'Centre de transfusion sanguine',
    nameEn: 'Blood Transfusion Center',
  },
  ACCOUNTING: {
    uuid: '2bd55313-efcb-49a2-824b-c12da0108aad',
    name: 'Comptabilité',
    nameEn: 'Accounting',
  },
} as const;

/**
 * Array of all location UUIDs for easy comparison
 */
export const ALL_LOCATION_UUIDS: string[] = Object.values(ALL_LOCATIONS).map((loc) => loc.uuid);

/**
 * Helper function to check if a location UUID exists in the predefined locations
 */
export function isKnownLocation(locationUuid: string): boolean {
  return ALL_LOCATION_UUIDS.includes(locationUuid);
}

/**
 * Helper function to get location English name by UUID
 */
export function getLocationNameEn(locationUuid: string): string | undefined {
  const location = Object.values(ALL_LOCATIONS).find((loc) => loc.uuid === locationUuid);
  return location?.nameEn;
}
