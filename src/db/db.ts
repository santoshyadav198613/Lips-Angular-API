import * as mongoose from 'mongoose';

export class MongoConnect {
    static async connect() {
        const db: any = process.env.MONGO_DB;
        console.log(db);
        mongoose.connect(db , { useNewUrlParser: true });
    }
}