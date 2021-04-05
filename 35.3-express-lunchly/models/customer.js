/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, lastName, phone, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
  }


  /**
   * Return the full name of the customer
   * @returns firstName lastName
   */
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map(c => new Customer(c));
  }


  /** search customers. */

  static async search(term) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
      FROM customers
      WHERE
      document_vectors @@ TO_TSQUERY($1)
      ORDER BY last_name, first_name` , [`%${term.toLowerCase()}%`]
    );
    return results.rows.map(c => new Customer(c));
  }


  /** top 10 customers ordered by most reservations. */

  static async best() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
      FROM customers
      JOIN
        (
          SELECT 
            customer_id , COUNT(*) AS count 
          FROM reservations 
          GROUP BY customer_id 
          ORDER BY COUNT(*) DESC 
          LIMIT 10
        ) AS res_count
      ON 
        id = customer_id
      ORDER BY count DESC`
    );
    return results.rows.map(c => new Customer(c));
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }

    await db.query(
      `UPDATE customers 
      SET 
        document_vectors = (TO_TSVECTOR(first_name) || TO_TSVECTOR(last_name) || TO_TSVECTOR(COALESCE(phone , '')) || TO_TSVECTOR(notes))
      WHERE id=$1`, [this.id]);
  }
}

module.exports = Customer;
