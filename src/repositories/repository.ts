import { Condition } from '@controllers/controller';
import Entity from '@entities/entity';
import mongoose, { Model, ObjectId } from 'mongoose';

export default class Repository {
  private _entity: Model<Entity>;

  constructor(protected model: Entity) {
    this._entity = mongoose.model<Entity>(model.collection, model.fields);
  }

  get entity() {
    return this._entity;
  }

  async findAll(query: Condition = {}) {
    return this.entity.find(query);
  }

  async findById(id: ObjectId | string) {
    return this.entity.findById(id);
  }

  async create(data: Entity) {
    this.entity.validate(data);
    return this.entity.create(data);
  }

  async update(id: string, data: any) {
    await this.entity.findByIdAndUpdate(id, data);
    return this.findById(id);
  }

  async delete(id: string) {
    return this.entity.findByIdAndDelete(id);
  }

  async deleteAll() {
    return this.entity.deleteMany({});
  }
}
