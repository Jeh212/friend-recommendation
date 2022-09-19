import { PersonRepository } from '../../repository/PersonRepository';
import { RelationShipRepository } from '../../repository/RelationShipRepository';
import { ApiError, HttpCode } from '../../utils/ApiError';
import { RelationShipService } from '../RelationShipService';

type IMakeSut = {
  sutRelationShipService: RelationShipService;
  relationShipRepo: RelationShipRepository;
  personRepository: PersonRepository;
};

describe('RelationShip', () => {
  const makeSut = (): IMakeSut => {
    const relationShipRepo = new RelationShipRepository();
    const personRepository = new PersonRepository();

    const sutRelationShipService = new RelationShipService(
      relationShipRepo,
      personRepository,
    );

    return {
      relationShipRepo,
      sutRelationShipService,
      personRepository,
    };
  };

  it('Should be able to create a relation', async () => {
    const { sutRelationShipService, personRepository } = makeSut();

    const firstPersonCPF = {
      cpf: '28298245121',
      name: 'John Doe',
    };
    const secondPersonCPF = {
      cpf: '42769469134',
      name: 'John Doe',
    };

    await personRepository.newPerson(firstPersonCPF);
    await personRepository.newPerson(secondPersonCPF);

    const relation = {
      myCpf: '28298245121',
      someOneElseCpf: '42769469134',
    };

    const service = await sutRelationShipService.createRelation(relation);

    expect(service).toHaveProperty('id');
  });

  it('Should be able to throw if Person CPF is invalid!', async () => {
    const { sutRelationShipService, personRepository } = makeSut();

    const firstPersonCPF = {
      cpf: '28298245121',
      name: 'John Doe',
    };
    const secondPersonCPF = {
      cpf: '42769469134',
      name: 'John Doe',
    };

    await personRepository.newPerson(firstPersonCPF);
    await personRepository.newPerson(secondPersonCPF);

    const relation = {
      myCpf: '28298245s121',
      someOneElseCpf: '427694s69134',
    };

    const promise = sutRelationShipService.createRelation(relation);

    await expect(promise).rejects.toThrowError(
      new ApiError(
        'CPF invalid! More than 11 characters or invalid values!',
        HttpCode.NOT_FOUND,
      ),
    );
  });

  it('Should be able to throw if Person CPFs Not Found!', async () => {
    const { sutRelationShipService } = makeSut();

    const relation = {
      myCpf: '28298245121',
      someOneElseCpf: '42769469134',
    };

    const promise = sutRelationShipService.createRelation(relation);

    await expect(promise).rejects.toThrowError(
      new ApiError('CPFs Not Found!', HttpCode.NOT_FOUND),
    );
  });

  it('Should be able to list my relations', async () => {
    const { sutRelationShipService, personRepository } = makeSut();

    const myself = {
      cpf: '89230878154',
      name: 'MY_SELF',
    };
    await personRepository.newPerson(myself);

    const firstPersonCPF = {
      cpf: '28298245121',
      name: 'John Doe',
    };
    const secondPersonCPF = {
      cpf: '42769469134',
      name: 'John Doe',
    };
    const thirdPersonCPF = {
      cpf: '87093649190',
      name: 'John three',
    };

    await personRepository.newPerson(firstPersonCPF);
    await personRepository.newPerson(secondPersonCPF);
    await personRepository.newPerson(thirdPersonCPF);

    const relation01 = {
      myCpf: '89230878154',
      someOneElseCpf: firstPersonCPF.cpf,
    };
    const relation02 = {
      myCpf: '89230878154',
      someOneElseCpf: secondPersonCPF.cpf,
    };
    const relation03 = {
      myCpf: '89230878154',
      someOneElseCpf: thirdPersonCPF.cpf,
    };

    await sutRelationShipService.createRelation(relation01);
    await sutRelationShipService.createRelation(relation02);
    await sutRelationShipService.createRelation(relation03);

    const listRelations = await sutRelationShipService.listMyRelations(
      myself.cpf,
    );

    expect(listRelations.length).toBeGreaterThan(0);
  });
});
