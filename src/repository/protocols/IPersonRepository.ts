import { IPerson } from '../../entities/IPerson.js';

interface IPersonRepository {
  newPerson({ cpf, name }: Omit<IPerson, 'id'>): Promise<IPerson>;
  retrivePerson(cpf: string): Promise<IPerson>;
  delete(): Promise<IPerson[]>;
}

export { IPersonRepository };
