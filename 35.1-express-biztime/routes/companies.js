const express = require('express');
const router = new express.Router();


const ExpressError = require('../expressError');
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT code , name FROM companies');

        return res.json({ companies: results.rows });
    } catch (err) {
        next(err);
    }
});


router.get('/:code', async (req, res, next) => {
    try {
        const results = await db.query(
            'SELECT code , name , description FROM companies WHERE code = $1',
            [req.params.code]);


        if (results.rows.length === 0) {
            throw new ExpressError(`company with code ${req.params.code} can not be found`, 404);
        }

        const invoices = await db.query(`
        SELECT 
            id, comp_code, amt, paid, add_date, paid_date
        FROM 
            invoices
        WHERE 
            comp_code = $1` , [req.params.code])

        const { code, name, description } = results.rows[0];

        return res.json({
            company:
            {
                code, name, description,
                invoices: invoices.rows
            }
        });
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (req.body.code === undefined ||
            req.body.name === undefined ||
            req.body.code.length === 0 ||
            req.body.name.length === 0) {

                throw new ExpressError('code and name are required' , 400);
        }

        const results = await db.query(
            `
            INSERT INTO companies 
                (code , name , description) 
            VALUES 
                ($1 , $2 , $3)
            RETURNING code, name , description` ,
            [req.body.code, req.body.name, req.body.description]);

        return res.status(201).json({ company: results.rows[0] });
    } catch (err) {
        next(err);
    }
});


router.put('/:code', async (req, res, next) => {
    try {
        const results = await db.query(
            `
            UPDATE companies 
            SET
                name = $2 ,
                description = $3
            WHERE
                code = $1
            RETURNING code, name , description` ,
            [req.params.code, req.body.name, req.body.description]);

        if (results.rows.length === 0) {
            throw new ExpressError(`company with code ${req.params.code} can not be found`, 404);
        }

        return res.json({ company: results.rows[0] });
    } catch (err) {
        next(err);
    }
});


router.delete('/:code', async (req, res, next) => {
    try {
        const results = await db.query(
            `DELETE FROM companies WHERE code = $1
             RETURNING code`,
            [req.params.code]);

        if (results.rows.length === 0) {
            throw new ExpressError(`company with code ${req.params.code} can not be found`, 404);
        }

        return res.json({ status: "deleted" });
    } catch (err) {
        next(err);
    }
});



module.exports = router;