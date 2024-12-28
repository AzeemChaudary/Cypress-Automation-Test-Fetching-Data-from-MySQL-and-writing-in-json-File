const { defineConfig } = require("cypress");
const mysql = require('mysql2');

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
    
      on('task', {
        executeQuery({ query, params }) {
          return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: '12345', 
              database: 'signupDB',
            });

            connection.connect((err) => {
              if (err) {
                reject(err);
                return;
              }

              connection.query(query, params, (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }

                connection.end();
              });
            });
          });
        },
      });
    },
  },
});
