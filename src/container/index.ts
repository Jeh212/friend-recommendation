import { container } from 'tsyringe';
import { PersonRepository } from '../repository/PersonRepository';
import { IPersonRepository } from '../repository/protocols/IPersonRepository';
import { IRelationShipRepository } from '../repository/protocols/IRelationShipRepository';
import { RelationShipRepository } from '../repository/RelationShipRepository';

container.registerSingleton<IPersonRepository>(
  'PersonRepository',
  PersonRepository,
);

container.registerSingleton<IRelationShipRepository>(
  'RelationShipRepository',
  RelationShipRepository,
);
