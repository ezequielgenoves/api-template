import Entity from '@Entity';
import { Condition } from '@controllers/controller';
import mongoose, { Collection } from 'mongoose';

export default class Repository {
  private _db: Collection<Entity>;
  constructor(protected dbCollection: string) {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      const { connection } = mongoose;
      this._db = connection.collection(this.dbCollection);
    } catch (error) {
      console.error('Error initializing database in Repository:', error);
      throw error;
    }
  }

  get db() {
    if (!this._db) {
      throw new Error(
        'Database not initialized. Ensure initializeDatabase() is called first.',
      );
    }
    return this._db;
  }

  async findAll(query: Condition = {}) {
    return this._db.find(query).toArray();
  }

  async findById(id: string) {
    return this._db.findOne({ id });
  }

  async findOne() {
    return this._db.find();
  }

  async create(data: any) {
    //TODO: Return created object AND set id as a prop (get _id value)
    return this._db.insertOne(data);
  }

  async update(id: string, data: any) {
    //TODO: Return updated object
    return this._db.updateOne({ id }, { ...data });
  }

  async delete(id: string) {
    return this._db.deleteOne({ id });
  }

  async patch(id: string, data: any) {
    //TODO: Return patched object
    const record = await this._db.findOne({ id });
    return this._db.updateOne({ id }, { ...record, ...data });
  }
}
