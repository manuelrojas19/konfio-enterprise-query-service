import { Party } from "../../domain/entity/party.entity";

export interface PartyRepositoryPort {
    saveParty(enterprise: Party): Promise<Party>;
    updateParty(enterprise: Party): Promise<Party>;
    findAllPartiesByEnterpriseId(enterpriseId: string): Promise<Party[]>;
  }
  