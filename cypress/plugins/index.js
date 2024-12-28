// const mysql = require('mysql2');

// module.exports = (on, config) => {
//     on('task', {
//         executeQuery({ query, params }) {
//             return new Promise((resolve, reject) => {
//                 const connection = mysql.createConnection({
//                     host: 'localhost',
//                     user: 'root',
//                     password: '12345', 
//                     database: 'signupDB',
//                 });

//                 connection.connect((err) => {
//                     if (err) {
//                         console.log('Connection Error:', err);
//                         reject(err);
//                         return;
//                     }

//                     connection.query(query, params, (error, results) => {
//                         if (error) {
//                             console.log('Query Error:', error);
//                             reject(error);
//                         } else {
//                             console.log('Results', error);
//                             resolve(results);
//                         }

//                         connection.end();
//                     });
//                 });
//             });
//         },
//     });
// };
