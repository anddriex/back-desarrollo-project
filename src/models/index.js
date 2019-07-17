import Sequelize from 'sequelize';
const database = process.env.DEV2_DB | process.env.DATABASE;
const database_user = process.env.DEV2_DB_USER | process.env.DATABASE_USER;
const database_password = process.env.DEV2_DB_PASSWORD | process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres'
    }
);


const models = {
    User: sequelize.import('./user'),
    Message: sequelize.import('./message')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models)
    }
});

export {sequelize};
export default models;