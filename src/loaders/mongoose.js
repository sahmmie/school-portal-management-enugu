import mongoose from 'mongoose';
import config from '../config/index';
import LoggerInstance from './logger';

export default async () => {
    try {
        const { connection } = await mongoose.connect(config.databaseURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        LoggerInstance.info(`✌️MongoDB connected to ${config.databaseURL}✌ ️`);
        return connection.db;
    } catch (error) {
        LoggerInstance.error('🔥 Error starting MongoDB', error);
        throw error;
    }
};
