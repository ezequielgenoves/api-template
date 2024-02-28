import Service from '@Service';
import { Request, Response } from 'express';

type ControllerParams = {
  req: Request;
  res: Response;
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

  findAll() {
    const result = this.service.findAll();
    this.res.send(result);
  }

  findById() {
    const { id } = this.req.params;
    const user = this.service.findById(Number(id));
    if (!user) return this.notFound();
    return this.res.send(user);
  }

  create() {
    const data = this.req.body;
    const result = this.service.create(data);
    return this.res
      .status(201)
      .send({ message: 'Created successfully', result });
  }

  update() {
    const id = Number(this.req.params.id);
    const data = this.req.body;
    const result = this.service.update(id, data);
    this.res.status(204).send({ message: 'Updated successfully', result });
  }

  patch() {
    const id = Number(this.req.params.id);
    const data = this.req.body;
    const result = this.service.patch(id, data);
    this.res.status(204).send({ message: 'Updated successfully', result });
  }

  delete() {
    const id = Number(this.req.params.id);
    const result = this.service.delete(id);
    this.res.status(204).send({ message: 'Deleted successfully', result });
  }

  notFound() {
    return this.res.sendStatus(404);
  }

  sendError(error) {
    return this.res.status(500).send({ message: error.message });
  }
}
