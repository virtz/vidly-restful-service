const Joi = require('joi');

module.exports = function(){
    Joi.ObjectId = require('joi-objectid')(Joi); 
}