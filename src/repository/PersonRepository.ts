import { v4 as uuid } from 'uuid';
import { IPerson } from '../entities/IPerson.js';
import { IPersonRepository } from './protocols/IPersonRepository.js';

class PersonRepository implements IPersonRepository {
  private readonly personMemoRepo: Array<IPerson> = [];

  async delete(): Promise<IPerson[]> {
    this.personMemoRepo.length = 0;

    return this.personMemoRepo;
  }

  async newPerson({ cpf, name }: Omit<IPerson, 'id'>): Promise<IPerson> {
    const personData: IPerson = {
      id: uuid(),
      cpf,
      name,
    };

    this.personMemoRepo.push(personData);

    const personArray = this.personMemoRepo;

    const lastItemInArray = personArray[personArray.length - 1];

    return lastItemInArray;
  }

  async retrivePerson(cpf: string): Promise<IPerson> {
    return this.personMemoRepo.find((person) => person.cpf === cpf);
  }
}
export { PersonRepository };
