export class Enterprise {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public taxId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
