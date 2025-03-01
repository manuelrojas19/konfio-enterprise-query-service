import { Party } from "src/modules/parties/domain/entity/party.entity";

export enum EnterpriseType {
  Enterprise = 'Enterprise',
  Individual = 'Individual',
}

export class EnterpriseDto {
  constructor(
    public id: string,
    public name: string,
    public type: EnterpriseType,
    public parties: Party[],
    public taxId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
