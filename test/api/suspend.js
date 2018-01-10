'use strict';

/**
 * Author: John Lee, Jan 2018
 */

const common 	= require('../common')
const chai 		= common.chai
const expect 	= common.expect
const app 		= common.app


it('SUSPEND - 1: post with a non-existent student email', function() {
	return chai.request(app)
		.post('/api/suspend')
		.send({
	    	"student": "teacherjoe@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid student email')
		});
});
 
it('SUSPEND - 2: post with a invalid  email', function() {
	return chai.request(app)
		.post('/api/suspend')
		.send({
	    	"student": "student1"
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid student email')
		});
});

it('SUSPEND - 3: post with missing field', function() {
	return chai.request(app)
		.post('/api/suspend')
		.send({
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid student field')
		});
});

it('SUSPEND - 4: post with student field non string type', function() {
	return chai.request(app)
		.post('/api/suspend')
		.send({
			"student": ["student1@test.com"]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid student field')
		});
});

it('SUSPEND - 5: post with correct param: student4@test.com who had already been suspended', function() {
	return chai.request(app)
		.post('/api/suspend')
		.send({
			"student": "student4@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('student4@test.com had already been suspended')
		    
		});
});

it('SUSPEND - 6: post with correct param: student1@test.com', function() {
	return chai.request(app)
		.post('/api/suspend')
		.send({
			"student": "student1@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true)
		});
});

