var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hieppro19s",
  database: "test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");

  con.query("SELECT * FROM ncc", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});



/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render("supplierList",{ title: 'Danh sách nhà cung cấp' });
// });

router.get('/', function(req, res, next) {
    res.render("supplierList",{ title: 'Danh sách nhà cung cấp' });
});
module.exports = router;




