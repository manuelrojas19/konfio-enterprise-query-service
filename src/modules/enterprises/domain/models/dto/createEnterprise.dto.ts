import { EnterpriseType } from "./enterprise.dto";

export class CreateEnterpriseDto {
    constructor(
      public name: string,
      public type: EnterpriseType,
      public taxId: string,
    ) {}
  }
  