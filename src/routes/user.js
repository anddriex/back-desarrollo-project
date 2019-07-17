import {Router} from 'express';

const router = Router();
router.get('/', async (req, res) => {
    const users = await req.context.models.User.findAll();
    return res.send(users);
});
router.get('/:userId', async (req, res) => {
    const user = await req.context.models.User.findByPk(
        req.params.userId
    );
    return res.send(user);
});

// app.post('/', (req, res) => {
//     return res.send('POST');
// })
// app.put('/:userId', (req, res) => {
//     return res.send(users[req.params.userId]);
// })
// app.delete('/:userId', (req, res) => {
//     return res.send(`DELETE HTTP metodo de recurso user ${req.params.userID}`);
// })

export default router;