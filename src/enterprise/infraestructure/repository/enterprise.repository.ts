import { Injectable } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../application/ports/enterprise.repository.port';
import { Enterprise } from 'src/enterprise/domain/models/entity/enterprise.entity';

@Injectable()
export class EnterpriseRepository implements EnterpriseRepositoryPort {
  private enterpriseMap: Map<string, Enterprise> = new Map();

  // Simulate async behavior in the findAll method
  async findAll(): Promise<Enterprise[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const enterprises = Array.from(this.enterpriseMap.values());
          resolve(enterprises);
        } catch (error) {
          reject(new Error('Error fetching all enterprises: ' + error));
        }
      }, 10); // Simulate a 1-second delay
    });
  }

  // Simulate async behavior in the save method
  async save(party: Enterprise): Promise<Enterprise> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.enterpriseMap.set(party.id, party); // Assuming 'id' is a unique identifier
          resolve(party);
        } catch (error) {
          reject(new Error('Error saving enterprise: ' + error));
        }
      }, 10); // Simulate a 0.5-second delay
    });
  }

  // Simulate async behavior in the findByEnterpriseId method
  async findByEnterpriseId(enterpriseId: string): Promise<Enterprise> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const enterprise = this.enterpriseMap.get(enterpriseId);
          if (!enterprise) {
            reject(new Error(`Enterprise with ID ${enterpriseId} not found`));
          } else {
            resolve(enterprise);
          }
        } catch (error) {
          reject(new Error('Error fetching enterprise by ID: ' + error));
        }
      }, 10); // Simulate a 0.7-second delay
    });
  }
}
