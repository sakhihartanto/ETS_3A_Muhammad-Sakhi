const express = require ('express')
const router  = express.Router()
const db = require('../db/index')


// INSERT NEW COUNTRY 
router.post('/', async(req,res,next)=>{
    try {
        const country = req.body
        const sqlText = 'INSERT INTO country (country) VALUES ($1)'
        const sqlParams = [country.country]
        const result = (await db.query(sqlText, sqlParams)).rows 
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// UPDATE COUNTRY BY COUNTRY ID
router.put('/:country_id', async(req,res,next)=>{
    try {
        const country = req.body
        const sqlText = 'UPDATE country SET country = $1 WHERE country_id = $2'
        const sqlParams = [country.country, req.params.country_id]
        const result = (await db.query(sqlText,sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE COUNTRY BY COUNTRY ID
router.delete('/:country_id', async(req,res,next)=>{
    try {
        const sqlText = 'DELETE FROM country WHERE country_id = $1'
        const sqlParams = [req.params.country_id]
        const result = (await db.query(sqlText,sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// GET ALL COUNTRY
router.get('/', async(req,res,next) =>{
    try {
        let sql = 'SELECT * FROM country'
        let result = (await db.query(sql)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// GET COUNTRY ID 
router.get('/:country_id', async(req,res,next) => {
    try {
        const sqlText = 'SELECT * FROM country WHERE country_id = $1'
        const sqlParams = [req.params.country_id]
        const result = (await db.query(sqlText,sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router