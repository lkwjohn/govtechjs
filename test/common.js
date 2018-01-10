/**
 * Author: John Lee, Jan 2018
 */

const chai 		= require('chai');  
const expect 	= require('chai').expect;
const assert 	= require('chai').assert;
const should 	= require('chai').should;
const app 		= require('../app.js'); 
chai.use(require('chai-http'));

exports.chai 	= chai
exports.expect 	= expect
exports.assert 	= assert
exports.should 	= should
exports.app 	= app
