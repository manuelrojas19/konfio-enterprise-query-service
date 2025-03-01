import { EnterpriseType } from "./enterprise.dto";

export class UpdateEnterpriseDto {
    constructor(
      public id: string,
      public name: string,
      public type: EnterpriseType,
      public taxId: string,
    ) {}
  }
  