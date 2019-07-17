import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('edwin') 
    };
    next();
})
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
    if(eraseDatabaseOnSync) {
        createUsersWithMessages();
    }
    app.listen(process.env.PORT, () => 
        console.log(`Escuchando en puerto ${process.env.PORT}...`)
    );
});

const createUsersWithMessages = async () => {
    await models.User.create(
        {
            username: 'edwin',
            messages: [
                {
                    text: 'filma este video'
                }
            ]
        },
        {
            include: [models.Message]
        }
    );
    await models.User.create(
        {
            username: 'david',
            messages: [
                {
                    text: 'Pregunta en que situacion se encuentra..'
                },
                {
                    text: 'Puede decir lo que quiera...'
                }
            ]
        },
        {
            include: [models.Message]
        }
    );
}