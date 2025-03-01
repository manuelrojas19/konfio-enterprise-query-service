import { Logger } from '@nestjs/common';
import { EnterpriseType } from 'src/modules/enterprises/domain/models/dto/enterprise.dto';

export class ValidationUtils {
  private readonly logger = new Logger(ValidationUtils.name);

  // Static method to check if a string is a palindrome
  static isValidEnterpriseType(value: string): boolean {
    return Object.values(EnterpriseType).includes(value as EnterpriseType);
  }

  static isValidTaxId(rfc: string): boolean {
    // Regex para validar RFC de persona física (con homoclave)
    const regexFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;

    // Regex para validar RFC de persona moral (con homoclave)
    const regexMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;

    // Regex para validar RFC de persona moral sin homoclave (opcional, solo como ejemplo)
    const regexMoralSimple = /^[A-ZÑ&]{3}\d{6}$/;

    // Verificar si el RFC es válido en cualquiera de los tres casos
    if (regexFisica.test(rfc)) {
      return true;
    } else if (regexMoral.test(rfc)) {
      return true;
    } else if (regexMoralSimple.test(rfc)) {
      return true;
    } else {
      return false;
    }
  }
}
