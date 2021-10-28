const db = require('./index')
const TABLE_NAME = 'country'

async function createCountry(){
    try {
        const sql = `CREATE TABLE IF NOT EXISTS public.${TABLE_NAME}
        (
            country_id integer NOT NULL DEFAULT nextval('country_country_id_seq'::regclass),
            country character varying(50) COLLATE pg_catalog."default" NOT NULL,
            last_update timestamp without time zone NOT NULL DEFAULT now(),
            CONSTRAINT country_pkey PRIMARY KEY (country_id)
        )`
        await db.query(sql)
    } catch (error) {
        console.error(error)
    }
}

module.exports = createCountry