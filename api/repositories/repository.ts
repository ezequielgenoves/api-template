import Entity from '@Entity';

export type Condition = {
  property: string;
  value: any;
};

export default class Repository {
  private _db: any; //TODO: Implement Database Connection Pool
  constructor(protected _entity: Entity) {
  }
  get db() {
    return this._db;
  }

  findAll(conditions: Condition[] = []): Entity[] {
    const query = conditions.reduce((acc, { property, value }) => {
      return { ...acc, [property]: value };
    });
    return this._db.find(query);
  }

  findById(id: number): Entity {
    return this._db.findOne({ id });
  }

  findOne(): Entity {
    return this._db.findAll();
  }

  create(data: any): Entity {
    return this._db.insert(data);
  }

  update(id: number, data: any): Entity {
    return this._db.update(id, { ...data });
  }

  delete(id: number): Entity {
    return this._db.remove(id);
  }

  patch(id: number, data: any): Entity {
    return this._db.patch(id, { ...data });
  }
}
