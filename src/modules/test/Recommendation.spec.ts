/* eslint-disable for-direction */
import { PersonRepository } from '../../repository/PersonRepository';
import * as mockData from '../mock/mockData';
import { RelationShipRepository } from '../../repository/RelationShipRepository';
import { RecommendationService } from '../RecommendationService';

type IMakeSut = {
  sutRecommendationService: RecommendationService;
  relationShipRepo: RelationShipRepository;
  personRepository: PersonRepository;
};

describe('Recommendation', () => {
  const makeSut = (): IMakeSut => {
    //repos
    const relationShipRepo = new RelationShipRepository();
    const personRepository = new PersonRepository();

    const sutRecommendationService = new RecommendationService(
      relationShipRepo,
      personRepository,
    );

    return {
      relationShipRepo,
      sutRecommendationService,
      personRepository,
    };
  };

  it('Should be able to recommend', async () => {
    const { sutRecommendationService, personRepository, relationShipRepo } =
      makeSut();
    const {
      myself,
      firstPersonCPF,
      secondPersonCPF,
      thirdPersonCPF,
      forthPersonCPF,
      fifthPersonCPF,
      sixthPersonCPF,
      seventhPersonCPF,
      eithPersonCPF,
    } = mockData;
    const personListData = [];

    personListData.push(
      myself,
      firstPersonCPF,
      secondPersonCPF,
      thirdPersonCPF,
      forthPersonCPF,
      fifthPersonCPF,
      sixthPersonCPF,
      seventhPersonCPF,
    );
    for (let i = 0; i < personListData.length; i++) {
      const person = personListData[i];
      await personRepository.newPerson(person);
    }

    //relations
    const myRelation01 = {
      //A
      myCpf: myself.cpf,
      //B
      someOneElseCpf: firstPersonCPF.cpf,
    };

    const myRelation02 = {
      //A
      myCpf: myself.cpf,
      //C
      someOneElseCpf: secondPersonCPF.cpf,
    };

    const myRelation03 = {
      //B
      myCpf: firstPersonCPF.cpf,
      //D
      someOneElseCpf: eithPersonCPF.cpf,
    };

    const myRelation04 = {
      //C
      myCpf: secondPersonCPF.cpf,
      //E
      someOneElseCpf: sixthPersonCPF.cpf,
    };

    const myRelation05 = {
      //D
      myCpf: eithPersonCPF.cpf,
      //C
      someOneElseCpf: secondPersonCPF.cpf,
    };

    await Promise.all([
      relationShipRepo.createRelationShip(myRelation01),
      relationShipRepo.createRelationShip(myRelation02),
      relationShipRepo.createRelationShip(myRelation03),
      relationShipRepo.createRelationShip(myRelation04),
      relationShipRepo.createRelationShip(myRelation05),
    ]);

    const retriveReco = await sutRecommendationService.getRecommendation(
      myself.cpf,
    );

    expect(retriveReco.length).toBeGreaterThan(0);
  });

  it('Should be able to clean data', async () => {
    const { sutRecommendationService, personRepository, relationShipRepo } =
      makeSut();
    const {
      myself,
      firstPersonCPF,
      secondPersonCPF,
      thirdPersonCPF,
      forthPersonCPF,
      fifthPersonCPF,
      sixthPersonCPF,
      seventhPersonCPF,
      eithPersonCPF,
    } = mockData;
    const personListData = [];

    personListData.push(
      myself,
      firstPersonCPF,
      secondPersonCPF,
      thirdPersonCPF,
      forthPersonCPF,
      fifthPersonCPF,
      sixthPersonCPF,
      seventhPersonCPF,
    );
    for (let i = 0; i < personListData.length; i++) {
      const person = personListData[i];
      await personRepository.newPerson(person);
    }

    //relations
    const myRelation01 = {
      //A
      myCpf: myself.cpf,
      //B
      someOneElseCpf: firstPersonCPF.cpf,
    };

    const myRelation02 = {
      //A
      myCpf: myself.cpf,
      //C
      someOneElseCpf: secondPersonCPF.cpf,
    };

    const myRelation03 = {
      //B
      myCpf: firstPersonCPF.cpf,
      //D
      someOneElseCpf: eithPersonCPF.cpf,
    };

    const myRelation04 = {
      //C
      myCpf: secondPersonCPF.cpf,
      //E
      someOneElseCpf: sixthPersonCPF.cpf,
    };

    const myRelation05 = {
      //D
      myCpf: eithPersonCPF.cpf,
      //C
      someOneElseCpf: secondPersonCPF.cpf,
    };

    await Promise.all([
      relationShipRepo.createRelationShip(myRelation01),
      relationShipRepo.createRelationShip(myRelation02),
      relationShipRepo.createRelationShip(myRelation03),
      relationShipRepo.createRelationShip(myRelation04),
      relationShipRepo.createRelationShip(myRelation05),
    ]);

    const retriveReco = await sutRecommendationService.cleanData();
    expect(retriveReco).toBe(0);
  });
});
