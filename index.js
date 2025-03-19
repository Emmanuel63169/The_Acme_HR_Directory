require('dotenv').config();
const express = require('express')
const client = require('./db')
const morgan = require('morgan')
const apiRouter = require('./api')


const app = express();

// Middleware -
app.use(morgan('dev'));
app.use(express.json());

// Routes -
app.use('/api', apiRouter)

// Error Handler
app.use((error, req, res, next) => {
    res.status(500).send('We have encountered an unkown error');
});

// Init -
async function init() {
    await client.connect
    console.log('database connected')

    // Seeding
    const SQL = /*sql*/ `
    DROP TABLE IF EXISTS departments;
    DROP TABLE IF EXISTS employees;

    CREATE TABLE departments(
        is SERIAL PRIMARY KEY,
        name VARCHAR(50)
    );

    CREATE TABLE employees(
        id SERIAL
        nmae VARCHAR(50)
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        department_id INTEGER REFERENCES categories(id) NOT NULL,
    );

    `;
    await client.query(SQL)

    // Server
    app.listen(process.env.PORT, () => {
        console.log('server running on port 3000')
    })
}
init();