import express from 'express';
import { Pool } from 'pg';
import debug from 'debug'

const debugg = debug('app:guestRoutes');
const guestRouter = express.Router();

guestRouter.route('/')
    .post((req, res) => {
        let pool;
        const { email, name, gender } = req.body;
        const text = 'INSERT INTO guestList(email, name, gender) VALUES($1, $2, $3) RETURNING *'
        const values = [email, name, gender];

        try {
            // create new pool
            pool = new Pool();
        } catch (error) {
            res.status(500).json(error);
        }

        (async function queryDB(){
            try {
                const response = await pool.query(text, values);
                const data = {
                    status: 200,
                    message: 'Guest record created successfully',
                    ops: response.rows[0]
                }
                await pool.end();
                res.json(data);
            } catch (error) {
                res.status(500).json(error);
            }
        }());
    })

guestRouter.route('/guestList')
    .get((req, res) => {
        const text = 'SELECT email, name, gender FROM guestList INNER JOIN rsvp ON (guestList.email=rsvp.guest)'
        let pool;

        try {
            // create new pool
            pool = new Pool();
        } catch (error) {
            res.status(500).json(error);
        }
        

        (async function queryDB(){
            try {
                const response = await pool.query(text);
                if (response.rowCount) {
                    const data = {
                        status: 200,
                        message: 'Here are the guests we are expecting',
                        guests: response.rows[0]
                    }
                    await pool.end();
                    res.json(data);
                } else {
                    const data = {
                        status: 200,
                        message: 'We expect no guests today'
                    }
                    await pool.end()
                    res.json({data})
                }
            } catch (error) {
                res.status(500).json(error);
            }
        }());
    })
export default guestRouter;