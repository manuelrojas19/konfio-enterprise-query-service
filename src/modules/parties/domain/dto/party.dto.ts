export class PartyDto {
  constructor(
    public name: string,
    public partyId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
