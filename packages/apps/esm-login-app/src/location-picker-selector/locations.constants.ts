/**
 * Location UUIDs - Constants for better readability
 */
const LOCATION_UUIDS = {
  CHRR: '18aed7d1-95f8-4b91-aaae-00476cc94794',
  ENTRY_OFFICE: 'bbf2b0d5-d37e-481d-98f2-1373b3642b45',
  RECEPTION_TRIAGE_EMERGENCY: 'b3fcde5e-d9fa-4ee1-94a5-5a07f0e6189a',
  TRANSFER: '8f36516e-18e3-4ed2-bd90-805be0729a49',
  PHARMACY: 'db6cc81b-977a-447f-ad36-656d3b19eae4',
  MATERNITY: '02933282-f1f4-41eb-89b3-ff925f352c4d',
  PEDIATRICS: '0fa60b2e-62c7-40b0-bb83-79e47fe02a4e',
  NEONATOLOGY: '8b0faff9-4099-4011-8816-1b132063bc79',
  MEN_MEDICINE: '5df13554-8f01-43c8-b2c2-c010b639dae4',
  WOMEN_MEDICINE: '17caef4f-3ed2-42ad-a2a7-a514e23cf89a',
  PAID_MEDICINE: '31ee12b0-3212-4ee5-969f-ca7c70853a95',
  PEDIATRIC_AND_ADULT_SURGERY: '4df29277-cf4d-47e4-a89b-efa91279c3f0',
  PAID_SURGERY: '63362664-c2b0-487a-a6f9-5f7b3a555d04',
  OPERATING_ROOM: 'b7c0bdcd-b9aa-498d-a764-1f8fbd39b063',
  LABORATORY: 'd00ac233-12c8-4c0e-bc2e-c54f8a541ada',
  IMAGING: 'd8c07f2a-046f-4c3b-97e1-fe32c1446214',
  DENTISTRY: 'd8428aad-98d8-4553-8706-ee80e37c796a',
  RESPIRATORY_DISEASES_SERVICE: '370c1a81-9b05-47d0-8eb4-262351d543a2',
  RABIES_TREATMENT_CENTER: '66d869bd-7c2c-49f1-b0c4-3ee4a6df7612',
  ACUPUNCTURE: 'bd46e413-3b45-4bab-8763-dccc709e608b',
  BLOOD_TRANSFUSION_CENTER: '1ca8c9b3-efcb-49a2-824b-c12da0108aad',
  ACCOUNTING: '2bd55313-efcb-49a2-824b-c12da0108aad',
} as const;

/**
 * Mapping between role names and location UUIDs
 * Format: "Access: {LocationName}" -> location UUID constant
 */
export const ROLE_TO_LOCATION_UUID_MAP: Record<string, string> = {
  'Access: CHRR': LOCATION_UUIDS.CHRR,
  'Access: Entry Office': LOCATION_UUIDS.ENTRY_OFFICE,
  'Access: Reception - Triage - Emergency': LOCATION_UUIDS.RECEPTION_TRIAGE_EMERGENCY,
  'Access: Transfer': LOCATION_UUIDS.TRANSFER,
  'Access: Pharmacy': LOCATION_UUIDS.PHARMACY,
  'Access: Maternity': LOCATION_UUIDS.MATERNITY,
  'Access: Pediatrics': LOCATION_UUIDS.PEDIATRICS,
  'Access: Neonatology': LOCATION_UUIDS.NEONATOLOGY,
  'Access: Men Medicine': LOCATION_UUIDS.MEN_MEDICINE,
  'Access: Women Medicine': LOCATION_UUIDS.WOMEN_MEDICINE,
  'Access: Paid Medicine': LOCATION_UUIDS.PAID_MEDICINE,
  'Access: Pediatric and Adult Surgery': LOCATION_UUIDS.PEDIATRIC_AND_ADULT_SURGERY,
  'Access: Paid Surgery': LOCATION_UUIDS.PAID_SURGERY,
  'Access: Operating Room': LOCATION_UUIDS.OPERATING_ROOM,
  'Access: Laboratory': LOCATION_UUIDS.LABORATORY,
  'Access: Imaging': LOCATION_UUIDS.IMAGING,
  'Access: Dentistry': LOCATION_UUIDS.DENTISTRY,
  'Access: Respiratory Diseases Service': LOCATION_UUIDS.RESPIRATORY_DISEASES_SERVICE,
  'Access: Rabies Treatment Center': LOCATION_UUIDS.RABIES_TREATMENT_CENTER,
  'Access: Acupuncture': LOCATION_UUIDS.ACUPUNCTURE,
  'Access: Blood Transfusion Center': LOCATION_UUIDS.BLOOD_TRANSFUSION_CENTER,
  'Access: Accounting': LOCATION_UUIDS.ACCOUNTING,
};
