const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Products = require('../models/products')
const Categories = require('../models/categories')
var passport = require('passport');
const homeRouter = express.Router();

homeRouter.use(bodyParser.urlencoded({extended: true}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()
  else
    res.redirect('/');

}


homeRouter.route('/')
.get(isLoggedIn,(req,res)=>{
  if(req.session.loggedin == true){
    Products.find({})
    .then((products)=>{
      Categories.find({})
      .then((categories)=>{
        res.render('home',{products:products,categories:categories});
      })
    })
  }
})


module.exports = homeRouter;