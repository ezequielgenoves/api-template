import mongoose from 'mongoose';

const INITIAL_COLLECTIONS = ['users']; //TODO: delete initial collections or think about another solution to make it dynamic

export default class InitDBTask {
  static async init() {
    try {
      const { connection } = await mongoose.connect(process.env.DB_URI);

      connection.on('error', (err) => {
        console.error('Error en la conexión a la base de datos:', err);
      });

      connection.on('open', async () => {
        console.log(`Connection with db ${connection.name} established.`);
        const collections = await connection.listCollections();
        for (const collection of INITIAL_COLLECTIONS) {
          if (!collections.map((col) => col.name).includes(collection)) {
            await connection.createCollection(collection);
            console.log(`Collection ${collection} created.`);
          }
        }
      });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }
}
