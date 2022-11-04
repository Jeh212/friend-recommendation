/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, Router } from 'express';
import { PersonController } from '../controllers/PersonController';
import { RecommendationController } from '../controllers/RecommendationController';
import { RelationShipController } from '../controllers/RelationShipController';

const router = Router();

const personController = new PersonController();
const relationShipController = new RelationShipController();
const recommendationController = new RecommendationController();

router.post('/person', (request: Request, response: Response) => {
  personController.handleCreatePerson(request, response);
});

router.get('/person/:cpf', (request: Request, response: Response) =>
  personController.handleGetPerson(request, response),
);

router.delete('/clean', (request: Request, response: Response) =>
  recommendationController.handleCleanData(request, response),
);
router.get('/recommendations/:cpf', (request: Request, response: Response) =>
  recommendationController.handleGetRecommendations(request, response),
);
router.post('/relationship', (request: Request, response: Response) =>
  relationShipController.handleCreateRelation(request, response),
);

export { router };
