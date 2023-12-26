const pool = require("../../config/database");

module.exports = {
  dbGetDetail: (callback) => {
    pool.query("Select * from Customers", [], (error, result) => {
      if (error) {
        console.log("dbError dbGetDetail ->>>>>>", error);
        return callback(error);
      }
      return callback(null, result);
    });
  },

  dbCreateDetail: (data, callback) => {
    pool.query(
      "Insert into Customers(first_name, last_name, email, password, phone) values(?, ?, ?, ?, ?)",
      [data.first_name, data.last_name, data.email, data.password, data.phone],
      (error, result) => {
        if (error) {
          console.log("dbError dbCreateDetail->>>>>>", error);
          return callback(error);
        }
        return callback(null, result);
      },
    );
  },

  dbUpdateDetail: (data, callback) => {
    pool.query(
      "Update Customers set first_name=?, last_name=?, email=?, phone=?, address=?, city=?, country=?, postal_code=? where id=?",
      [
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        data.address,
        data.city,
        data.country,
        data.postal_code,
        data.id,
      ],
      (error, result) => {
        if (error) {
          console.log("dbError dbUpdateDetail->>>>>>", error);
          return callback(error);
        }
        return callback(null, result);
      },
    );
  },

  dbUpdateStatus: (data, callback) => {
    pool.query(
      "Update Customers set status=? where id=?",
      [data.status, data.id],
      (error, result) => {
        if (error) {
          console.log("dbError dbUpdateStatus->>>>>>", error);
          return callback(error);
        }
        return callback(null, result);
      },
    );
  },

  dbDeleteDetail: (id, callback) => {
    pool.query("Delete from Customers where id=?", [id], (error, result) => {
      if (error) {
        console.log("dbError dbDeleteDetail->>>>>>", error);
        return callback(error);
      }
      return callback(null, result);
    });
  },

  dbGetSingleDetail: (id, callback) => {
    pool.query("Select * from Customers where id=?", [id], (error, result) => {
      if (error) {
        console.log("dbError dbGetSingleDetail->>>>>>", error);
        return callback(error);
      }
      return callback(null, result[0]);
    });
  },

  dbLogin: (data, callback) => {
    pool.query(
      "Select * from Customers where email=?",
      [data.email],
      (error, result) => {
        if (error) {
          console.log("dbError dbLogin->>>>>>", error);
          return callback(error);
        }
        return callback(null, result[0]);
      },
    );
  },
};
