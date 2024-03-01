import { Schema } from 'mongoose';

export default class Entity {
  constructor(protected _collection: string, protected _fields: Schema) {}

  get collection() {
    return this._collection;
  }

  get fields() {
    return this._fields;
  }
}
