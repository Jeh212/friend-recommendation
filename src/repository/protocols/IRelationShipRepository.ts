import { IRelationShip } from '../../entities/IRelationShip';

interface IRelationShipRepository {
  createRelationShip({
    myCpf,
    someOneElseCpf,
  }: Omit<IRelationShip, 'id'>): Promise<IRelationShip>;
  listMyRelations(cpf: string): Promise<string[] | []>;
  delete(): Promise<IRelationShip[]>;
}

export { IRelationShipRepository };
