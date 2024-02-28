export default class Entity {
  protected _collection: string;
  protected _fields: { [key: string]: any };

  get collection() {
    return this._collection;
  }

  get fields() {
    return this._fields;
  }
}
