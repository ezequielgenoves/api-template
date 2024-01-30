import Repository from '@Repository';

export default class Service {
  constructor(private _repository: Repository) {}

  get repository() {
    return this._repository;
  }

  findAll() {
    return this.repository.findAll();
  }

  findByProperty(property: string, value: any) {
    return this.repository.findAll([{ property, value }]);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  create(data: any) {
    const element = this.repository.create(data);
    return element;
  }

  update(id: number, data: any) {
    return this.repository.update(id, data);
  }

  patch(id: number, data: any) {
    this.repository.patch(id, data);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
