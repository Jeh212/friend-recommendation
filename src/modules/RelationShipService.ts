import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRelationShip } from '../entities/IRelationShip';
import { IPersonRepository } from '../repository/protocols/IPersonRepository';
import { IRelationShipRepository } from '../repository/protocols/IRelationShipRepository';
import { ApiError, HttpCode } from '../utils/ApiError';
import { isValidCPF } from '../utils/isValidCPF';

@injectable()
class RelationShipService {
  constructor(
    @inject('RelationShipRepository')
    private readonly relationShipRepo: IRelationShipRepository,
    @inject('PersonRepository')
    private readonly personRepo: IPersonRepository,
  ) {}

  async createRelation({
    myCpf,
    someOneElseCpf,
  }: Omit<IRelationShip, 'id'>): Promise<IRelationShip> {
    if ((isValidCPF(myCpf) && isValidCPF(someOneElseCpf)) === false) {
      throw new ApiError(
        'CPF invalid! More than 11 characters or invalid values!',
        HttpCode.BAD_REQUEST,
      );
    }

    const [existedMyCPF, existedSomeOneElseCpf] = await Promise.all([
      this.personRepo.retrivePerson(myCpf),
      this.personRepo.retrivePerson(someOneElseCpf),
    ]);

    if (existedMyCPF && existedSomeOneElseCpf) {
      const persistRelation = await this.relationShipRepo.createRelationShip({
        myCpf,
        someOneElseCpf,
      });

      return persistRelation;
    } else {
      throw new ApiError('CPFs Not Found!', HttpCode.NOT_FOUND);
    }
  }

  async listMyRelations(cpf: string): Promise<string[] | []> {
    if (!isValidCPF(cpf)) {
      throw new ApiError(
        'CPF invalid! More than 11 characters or invalid values!',
        HttpCode.BAD_REQUEST,
      );
    }

    const listRelations = await this.relationShipRepo.listMyRelations(cpf);

    return listRelations;
  }
}
export { RelationShipService };
