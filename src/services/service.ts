import Repository from '@Repository';
import { Condition } from '@controllers/controller';

export default class Service {
  constructor(private _repository: Repository) {}

  get repository() {
    return this._repository;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findByProperty(query: Condition) {
    return this.repository.findAll(query);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async create(data: any) {
    const element = this.repository.create(data);
    return element;
  }

  async update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async deleteAll() {
    return this.repository.deleteAll();
  }
}
