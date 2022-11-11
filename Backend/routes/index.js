var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // TODO: Return some blog posts...
  // TODO: Return data about some on going campaigns.
  // TODO: Return data to populate the homepage
  // NOTE: Show some general camapign as well as specific campaigns,
  // NOTE: Can display general statistics like areas where operational, total donations made etc.
  res.send("Welcome to the FYP Backend")
});

router.get('/about', function (req, res, next) {
  // TODO: If there is any data to display, then return it over this endpoint.
  // NOTE: Some possible options are.. All the admins and superAdmin.. Thier profiles.
  // NOTE: The catagory of campaigns supported by the organizations..
  // NOTE: Have a mission statement, a goal and some other information.
  // NOTE: Can display general statistics like areas where operational, total donations made etc. 
});

module.exports = router;
