import Repository from '@Repository';
import Entity from '@entities/entity';

export default class Service {
  constructor(private _repository: Repository) {}

  get repository() {
    return this._repository;
  }

  findAll(): Entity[] {
    return this.repository.findAll();
  }

  findByProperty(property: string, value: any): Entity[] {
    return this.repository.findAll([{ property, value }]);
  }

  findById(id: number): Entity {
    return this.repository.findById(id);
  }

  create(data: any): Entity {
    const element = this.repository.create(data);
    return element;
  }

  update(id: number, data: any): Entity {
    return this.repository.update(id, data);
  }

  patch(id: number, data: any): Entity {
    return this.repository.patch(id, data);
  }

  delete(id: number): Entity {
    return this.repository.delete(id);
  }
}
