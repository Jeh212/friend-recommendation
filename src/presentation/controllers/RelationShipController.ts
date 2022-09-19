/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IRelationShip } from '../../entities/IRelationShip';
import { RelationShipService } from '../../modules/RelationShipService';
import { HttpCode } from '../../utils/ApiError';

class RelationShipController {
  async handleCreateRelation(
    request: Request,
    response: Response,
  ): Promise<Response<IRelationShip>> {
    try {
      const relation = request.body;

      const relationService = container.resolve(RelationShipService);

      const createRelation = await relationService.createRelation(relation);

      return response.status(HttpCode.OK).json(createRelation);
    } catch (e: any) {
      return response.status(e.statusCode).json({ message: e.message })

    }
  }
  async handleListRelation(
    request: Request,
    response: Response,
  ): Promise<Response<string[]>> {
    try {
      const { cpf } = request.params;
      const relationService = container.resolve(RelationShipService);
      const listRelation = await relationService.listMyRelations(cpf);

      return response.status(HttpCode.OK).json(listRelation);
    } catch (e: any) {
      return response.status(e.statusCode).json({ message: e.message })

    }
  }
}
export { RelationShipController };
