var mysql=require('mysql2');
var con=mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"qlchvpp",
    database : 'qlchvpp',
    insecureAuth : true
});
let database;



database=con.connect(function (err)
{
    if (err) throw err;
    console.log("Connected");
});

module.exports.db=database;
