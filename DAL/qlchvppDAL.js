

var mysql   = require('mysql2');


var sqlConnection = function sqlConnection(sql, values, next) {

    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    var connection = mysql.createConnection(
        {
            host: "sql12.freemysqlhosting.net",
            user:"sql12384348",
            password:"AXCX5WgY4b",
            database :  "sql12384348",

        }
    );
    connection.connect(function(err) {
        if (err !== null) {
            console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
        }
    });

    connection.query(sql, values, function(err) {

        connection.end(); // close the connection

        if (err) {
            throw err;
        }

        // Execute the callback
        next.apply(this, arguments);
    });
}

module.exports = sqlConnection;
