import { MongoClient } from "mongodb";

const {
    DB_HOST = '',
    DB_NAME = '',
    DB_USER = '',
    DB_PASS = '',
} = process.env;

export function createDBConnection() {
    const dbURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}`
    const client = new MongoClient(dbURI);
    return client.db(DB_NAME);
}