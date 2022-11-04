import { v4 as uuid } from 'uuid';
import { IRelationShip } from '../entities/IRelationShip';
import { IRelationShipRepository } from './protocols/IRelationShipRepository';

class RelationShipRepository implements IRelationShipRepository {
  private readonly relationShipRepo: Array<IRelationShip> = [];

  async createRelationShip({
    myCpf,
    someOneElseCpf,
  }: Omit<IRelationShip, 'id'>): Promise<IRelationShip> {
    const relationData = {
      id: uuid(),
      myCpf,
      someOneElseCpf,
    };

    this.relationShipRepo.push(relationData);

    const relation = this.relationShipRepo;

    const lastItemInArray = relation[relation.length - 1];

    return lastItemInArray;
  }

  async listMyRelations(cpf: string): Promise<string[] | []> {
    const findRelations = this.relationShipRepo.map((relation): string => {
      if (relation.myCpf === cpf) {
        return relation.someOneElseCpf;
      }
    });

    const result = findRelations.filter((cpf) => cpf !== undefined);

    return result;
  }

  async delete(): Promise<IRelationShip[]> {
    this.relationShipRepo.length = 0;

    return this.relationShipRepo;
  }
}
export { RelationShipRepository };
