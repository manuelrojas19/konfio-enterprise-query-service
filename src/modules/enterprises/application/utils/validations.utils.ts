import { EnterpriseType } from 'src/modules/enterprises/domain/models/dto/enterprise.dto';

export class ValidationUtils {
  // Static method to validate if a given string is a valid EnterpriseType
  static isValidEnterpriseType(value: string): boolean {
    return Object.values(EnterpriseType).includes(value as EnterpriseType);
  }

  // Static method to validate tax id
  static isValidTaxId(rfc: string): boolean {
    // Regular expression to validate an RFC for individuals (including homoclave)
    const individualRFCRegex = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;

    // Regular expression to validate an RFC for legal entities (including homoclave)
    const legalEntityRFCRegex = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;

    // Regular expression to validate an RFC for legal entities without a homoclave (optional)
    const simpleLegalEntityRFCRegex = /^[A-ZÑ&]{3}\d{6}$/;

    // Check if the RFC matches any of the valid formats
    return (
      individualRFCRegex.test(rfc) ||
      legalEntityRFCRegex.test(rfc) ||
      simpleLegalEntityRFCRegex.test(rfc)
    );
  }
}
