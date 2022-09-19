/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { IPersonRepository } from '../repository/protocols/IPersonRepository';
import { IRelationShipRepository } from '../repository/protocols/IRelationShipRepository';
import { ApiError, HttpCode } from '../utils/ApiError';
import { isValidCPF } from '../utils/isValidCPF';

@injectable()
class RecommendationService {
  constructor(
    @inject('RelationShipRepository')
    private readonly relationShipRepo: IRelationShipRepository,
    @inject('PersonRepository')
    private readonly personRepo: IPersonRepository,
  ) {}

  async getRecommendation(cpf: string): Promise<string[]> {
    const existingCpf = await this.personRepo.retrivePerson(cpf);

    if (!existingCpf) {
      throw new ApiError('Person Not Found!', HttpCode.NOT_FOUND);
    }

    if (!isValidCPF(cpf)) {
      throw new ApiError(
        'CPF invalid! More than 11 characters or invalid values!',
        HttpCode.BAD_REQUEST,
      );
    }

    const result = await this.listingNotMyFriends(cpf);

    return result;
  }

  private async listingNotMyFriends(cpf: string): Promise<string[]> {
    const myRecommendationArray: Array<string> = [];

    const allMyRelations = await this.relationShipRepo.listMyRelations(cpf);

    const filteredCpfs = allMyRelations.filter((cpf) => cpf !== undefined);

    for (let i = 0; i < filteredCpfs.length; i++) {
      const myRelationCPF = filteredCpfs[i];

      const myRelationCPFList = await this.relationShipRepo.listMyRelations(
        myRelationCPF,
      );

      myRecommendationArray.push(...myRelationCPFList);
    }

    const result = myRecommendationArray
      .filter((newCpf) => {
        if (!filteredCpfs.includes(newCpf)) {
          return newCpf;
        }
      })
      .sort((a: string, b: string) => (a > b ? -1 : 1));

    return result;
  }

  async cleanData(): Promise<number> {
    const [removeRelation, removePerson] = await Promise.all([
      await this.relationShipRepo.delete(),
      await this.personRepo.delete(),
    ]);
    if ((removeRelation.length && removePerson.length) === 0) {
      return 0;
    }
  }
}

export { RecommendationService };
