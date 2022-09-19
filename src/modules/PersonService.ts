import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { IPerson } from '../entities/IPerson';
import { IPersonRepository } from '../repository/protocols/IPersonRepository';
import { ApiError, HttpCode } from '../utils/ApiError';
import { isValidCPF } from '../utils/isValidCPF';

@injectable()
class PersonService {
  constructor(
    @inject('PersonRepository')
    private readonly personRepo: IPersonRepository,
  ) { }

  async newPerson({ cpf, name }: Omit<IPerson, 'id'>): Promise<IPerson> {
    const existingCpf = await this.personRepo.retrivePerson(cpf);

    if (existingCpf) {
      throw new ApiError('Person already exists!', HttpCode.BAD_REQUEST);
    }

    if (!isValidCPF(cpf)) {

      throw new ApiError(
        'CPF invalid! More than 11 characters or invalid values!',
        HttpCode.BAD_REQUEST,
      );
    }

    const newPerson = await this.personRepo.newPerson({ cpf, name });

    return newPerson;
  }

  async retrivePerson(cpf: string): Promise<IPerson> {
    const person = await this.personRepo.retrivePerson(cpf);

    if (!person) {
      throw new ApiError('Person do not exists!', HttpCode.NOT_FOUND);
    }

    return person;
  }
}
export { PersonService };
