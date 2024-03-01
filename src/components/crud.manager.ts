import Controller from '@Controller';
import { Router, Request, Response } from 'express';

const routesMethods = [
  {
    url: '/',
    controllerMethod: 'find',
    httpMethod: 'get',
  },
  {
    url: '/',
    controllerMethod: 'create',
    httpMethod: 'post',
  },
  {
    url: '/:id',
    controllerMethod: 'update',
    httpMethod: 'put',
  },
  {
    url: '/all',
    controllerMethod: 'deleteAll',
    httpMethod: 'delete',
  },
  {
    url: '/:id',
    controllerMethod: 'delete',
    httpMethod: 'delete',
  },
  {
    url: '/:id',
    controllerMethod: 'findById',
    httpMethod: 'get',
  },
];

export default class CrudManager {
  private controller: Controller;
  private router = Router() as any;

  constructor(controller) {
    this.controller = new controller();
    this.setupRoutes();
  }

  static crud(controller) {
    return new this(controller).router;
  }

  setupRoutes() {
    for (const route of routesMethods) {
      this.addRoute(route.url, route.controllerMethod, route.httpMethod);
    }
  }

  private addRoute(path: string, controllerMethod: string, method = 'get') {
    const routeHandler = async (req: Request, res: Response) => {
      try {
        if (!this.controller[controllerMethod]) throw new Error(`Method '${controllerMethod}' not found in ${this.controller}`);
        this.controller.setParams({ req, res });
        await this.controller[controllerMethod]();
      } catch (e) {
        console.error(e);
        return res.status(500).send({ message: e.message });
      }
    };

    this.router[method](path, routeHandler);

    return this;
  }
}
