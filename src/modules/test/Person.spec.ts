import { PersonRepository } from '../../repository/PersonRepository';
import { ApiError, HttpCode } from '../../utils/ApiError';
import { PersonService } from '../PersonService';

type IMakeSut = {
  sutPersonService: PersonService;
  personRepository: PersonRepository;
};

describe('Person', () => {
  const makeSut = (): IMakeSut => {
    const personRepository = new PersonRepository();
    const sutPersonService = new PersonService(personRepository);

    return {
      personRepository,
      sutPersonService,
    };
  };

  it('Should be able to create a new person', async () => {
    const { sutPersonService } = makeSut();

    const personInformation = {
      cpf: '16998303041',
      name: 'Jean Carlos',
    };

    const service = await sutPersonService.newPerson(personInformation);

    expect(service).toHaveProperty('id');
  });

  it('Should be able to throw if Person already exists!', async () => {
    const { sutPersonService } = makeSut();

    const personInformation = {
      cpf: '16998303041',
      name: 'Jean Carlos',
    };

    await sutPersonService.newPerson(personInformation);
    const promise = sutPersonService.newPerson(personInformation);

    await expect(promise).rejects.toThrowError(
      new ApiError('Person already exists!', HttpCode.BAD_REQUEST),
    );
  });

  it('Should be able to throw if Person CPF is invalid!', async () => {
    const { sutPersonService } = makeSut();

    const personInformation = {
      cpf: '11111@111111',
      name: 'Jean Carlos',
    };

    const promise = sutPersonService.newPerson(personInformation);

    await expect(promise).rejects.toThrowError(
      new ApiError(
        'CPF invalid! More than 11 characters or invalid values!',
        HttpCode.BAD_REQUEST,
      ),
    );
  });

  it('Should be able to retrive an existing Person', async () => {
    const { sutPersonService } = makeSut();

    const personInformation = {
      cpf: '16998303041',
      name: 'Jean Carlos',
    };

    await sutPersonService.newPerson(personInformation);

    const person = await sutPersonService.retrivePerson(personInformation.cpf);

    expect(person.cpf).toStrictEqual(personInformation.cpf);
  });

  it('Should be able to retrive an existing Person not exist', async () => {
    const { sutPersonService } = makeSut();

    const invalidCPF = '1699830304sss1';

    const person = sutPersonService.retrivePerson(invalidCPF);

    await expect(person).rejects.toThrowError(
      new ApiError('Person do not exists!', HttpCode.NOT_FOUND),
    );
  });
});
