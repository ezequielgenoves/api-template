import Service from '@Service';
import { Request, Response } from 'express';

type ControllerParams = {
  req: Request;
  res: Response;
};

export type Condition = {
  property?: string;
  value?: any;
};

export default class Controller {
  private _req: Request;
  private _res: Response;
  private _service: Service;

  constructor(service: Service) {
    if (!service) {
      throw new Error('Service not provided');
    }
    this._service = service;
  }

  get req() {
    return this._req;
  }

  set req(req: Request) {
    this._req = req;
  }

  get res() {
    return this._res;
  }

  set res(res: Response) {
    this._res = res;
  }

  get service() {
    return this._service;
  }

  set service(service: Service) {
    this._service = service;
  }

  setParams(params: ControllerParams) {
    this.req = params.req;
    this.res = params.res;
  }

  async find() {
    if (Object.keys(this.req.query).length) return this.findFiltered();
    return this.findAll();
  }

  async findFiltered() {
    const result = await this.service.findByProperty(this.req.query);
    return this.res.send(result);
  }

  async findAll() {
    const result = await this.service.findAll();
    return this.res.send(result);
  }

  async findById() {
    const { id } = this.req.params;
    const user = await this.service.findById(id);
    if (!user) return this.notFound();
    return this.res.send(user);
  }

  async create() {
    const data = this.req.body;
    const result = await this.service.create(data);
    return this.res
      .status(201)
      .send({ message: 'Created successfully', result });
  }

  async update() {
    const { id } = this.req.params;
    const data = this.req.body;
    const result = await this.service.update(id, data);
    return this.res
      .status(204)
      .send({ message: 'Updated successfully', result });
  }

  async patch() {
    const { id } = this.req.params;
    const data = this.req.body;
    const result = await this.service.patch(id, data);
    return this.res
      .status(204)
      .send({ message: 'Updated successfully', result });
  }

  async delete() {
    const { id } = this.req.params;
    const result = await this.service.delete(id);
    return this.res
      .status(204)
      .send({ message: 'Deleted successfully', result });
  }

  notFound() {
    return this.res.sendStatus(404);
  }

  sendError(error) {
    return this.res.status(500).send({ message: error.message });
  }
}
