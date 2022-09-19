/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RecommendationService } from '../../modules/RecommendationService';
import { HttpCode } from '../../utils/ApiError';

class RecommendationController {
  async handleGetRecommendations(
    request: Request,
    response: Response,
  ): Promise<Response<string[]>> {
    try {
      const { cpf } = request.params;

      const recommendationService = container.resolve(RecommendationService);

      const getRecommendation = await recommendationService.getRecommendation(
        cpf,
      );

      return response.status(HttpCode.OK).json(getRecommendation);
    } catch (e: any) {
      return response.status(e.statusCode).json({ message: e.message })

    }
  }

  async handleCleanData(
    request: Request,
    response: Response,
  ): Promise<Response<void>> {
    try {
      request;
      const recommendationService = container.resolve(RecommendationService);

      await recommendationService.cleanData();

      return response.status(HttpCode.OK);
    } catch (e: any) {
      return response.status(e.statusCode).json({ message: e.message })

    }
  }
}

export { RecommendationController };
