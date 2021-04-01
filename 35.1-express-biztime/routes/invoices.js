const express = require('express');
const router = new express.Router();


const ExpressError = require('../expressError');
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT id , comp_code FROM invoices');

        return res.json({ invoices: results.rows });
    } catch (err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const results = await db.query(`
        SELECT 
            id, amt, paid, add_date, paid_date, comp_code, name , description 
        FROM 
            invoices INNER JOIN companies ON invoices.comp_code = companies.code 
        WHERE 
            id = $1`, [req.params.id]);

        if (results.rows.length === 0) {
            throw new ExpressError(`invoice with id ${req.params.id} can not be found`, 404);
        }

        const { id, amt, paid, add_date, paid_date } = results.rows[0];
        const { code, name, description } = results.rows[0];

        return res.json({
            invoice: {
                id, amt, paid, add_date, paid_date,
                company: { code, name, description }
            }
        });
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {

        if (req.body.comp_code === undefined ||
            req.body.amt === undefined ||
            req.body.comp_code.length === 0) {
            throw new ExpressError('comp_code and amt are required', 400);
        }

        if (req.body.amt <= 0) {
            throw new ExpressError('amt must be greater than 0', 400);
        }

        const company = await db.query('SELECT code FROM companies WHERE code = $1', [req.body.comp_code]);

        if (company.rows.length === 0) {
            throw new ExpressError(`company with code ${req.params.code} can not be found`, 400);

        }

        const results = await db.query(
            `
            INSERT INTO invoices 
                (comp_code , amt) 
            VALUES 
                ($1 , $2)
            RETURNING id, comp_code, amt, paid, add_date, paid_date` ,
            [req.body.comp_code, req.body.amt]);

        return res.status(201).json({ invoice: results.rows[0] });
    } catch (err) {
        next(err);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const results = await db.query(
            `
            UPDATE invoices 
            SET
                amt = $2
            WHERE
                id = $1
            RETURNING id, comp_code, amt, paid, add_date, paid_date` ,
            [req.params.id, req.body.amt]);

        if (results.rows.length === 0) {
            throw new ExpressError(`invoice with id ${req.params.id} can not be found`, 404);
        }

        return res.json({ company: results.rows[0] });
    } catch (err) {
        next(err);
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        const results = await db.query(
            `DELETE FROM invoices WHERE id = $1
             RETURNING id`,
            [req.params.id]);

        if (results.rows.length === 0) {
            throw new ExpressError(`invoice with id ${req.params.id} can not be found`, 404);
        }

        return res.json({ status: "deleted" });
    } catch (err) {
        next(err);
    }
});



module.exports = router;