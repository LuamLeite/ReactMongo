const PORT = 8000;

const { request } = require('express');
const express = require('express');
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://guest:tinder@cluster0.kbpamzq.mongodb.net/Cluster0?retryWrites=true&w=majority';
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors()); //ficar livre da mensagem de cors
app.use(express.json());
//If we bisit /signup, send some stuff to the database
app.get('/', (req, res) => {
    res.json('Hello to my app');

})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;
    const generateduserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10); //hasing the password

    try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');

        //validar se já não existe um usuário com o mesmo email cadastrado

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).send("User already exists. Please login");
        }

        const sanitizedEmail = email.toLowerCase();

        const data = {
            user_id: generateduserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data);

        //nosso token para validar que estamos logados
        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        });

        res.status(201).json({ token, userId: generateduserId, email: sanitizedEmail });
    } catch (err) {
        console.log(err);
    }
})


//template to queries
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const returnedUsers = await users.find().toArray();
        res.send(returnedUsers);
    } finally {
        await client.close();
    }

})

app.listen(PORT, () => console.log('Server running on PORT:' + PORT));