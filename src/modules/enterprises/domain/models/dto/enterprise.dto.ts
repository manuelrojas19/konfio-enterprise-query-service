export enum EnterpriseType {
  Enterprise = 'Enterprise',
  Individual = 'Individual',
}

export class EnterpriseDto {
  constructor(
    public id: string,
    public name: string,
    public type: EnterpriseType,
    public taxId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
