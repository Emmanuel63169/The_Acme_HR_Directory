// API routes
const router = require('express').Router();
const client = require('./db')

// Route for Departments -
router.get('/api/departments', async (req, res, next) => {
    try{
        const SQL = /*sql*/ `SELECT * FROM departments`;
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch(ex) {
        next(ex)
    }
})
// Route for Employees -
router.get('/api/employees', async (req, res, next) => {
    try {
        const SQL = /*sql*/ `SELECT * FROM employees`;
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch(ex) {
        next(ex)
    }
}) 
// Route for Employee Create -
router.put('/api/employees/:id', async (req, res, next) => {
    try {
        const SQL = /*sql*/ `
        UPDATE employees
        SET txt=$1, ranking=$2, updated_at=now()
        WHERE id=$3
        RETURNING *
        `;
        const response = await client.query(SQL, [req.body.txt, req.body.ranking, req.params.id]);
        res.send(response.rows[0]);
    } catch(ex) {
        next(ex)
    }
})
// Route for Employee Delete -
router.delete('/api/employees/:id', async (req, res, next) => {
    try {
        const SQL = /*sql*/ `
        DELETE from employees
        WHERE; id = $1
        `;
        const response = await client.query(SQL, [req.params.id]);
        res.sendStatus(204)
    } catch(ex) {
        next(ex)
    }
})
// Route for Employee Update -
router.put('/api/employees/:id', async (req, res, next) => {
    try {
        const SQL = /*sql*/ `
        UPDATE flavors
        SET txt=$1, ranking=$2, updated_at=now()
        WHERE id=$3 RETURNING *
        `;
        const response = await client.query(SQL, [req.body.txt, req.body.ranking, req.params.id]);
        res.send(response.rows[0]);
    } catch(ex) {
        next(ex)
    }
})
// Route for Error Handling -

// Export -
module.exports = router;