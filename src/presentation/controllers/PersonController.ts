/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IPerson } from '../../entities/IPerson';
import { PersonService } from '../../modules/PersonService';
import { HttpCode } from '../../utils/ApiError';



class PersonController {
  async handleCreatePerson(
    request: Request,
    response: Response,
  ): Promise<Response<IPerson>> {
    try {
      const person = request.body;

      const personService = container.resolve(PersonService);

      const createPerson = await personService.newPerson(person);

      return response.status(HttpCode.OK).json(createPerson);
    } catch (e: any) {
      return response.status(e.statusCode).json({ message: e.message })
    }
  }

  async handleGetPerson(
    request: Request,
    response: Response,
  ): Promise<Response<IPerson>> {
    try {
      const { cpf } = request.params;
      const personService = container.resolve(PersonService);

      const getPerson = await personService.retrivePerson(cpf);

      return response.status(HttpCode.OK).json(getPerson);
    } catch (e: any) {
      return response.status(e.statusCode).json({ message: e.message })

    }
  }
}

export { PersonController };
