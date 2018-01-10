'use strict';

/**
 * Author: John Lee, Jan 2018
 */

const common 	= require('../common'); 
const chai 		= common.chai;  
const expect 	= common.expect;
const app 		= common.app


it('RETRIEVE - 1: post with a non-exist teacher email', function() {
	return chai.request(app)
		.post('/api/retrieve')
		.send({
	    	email: 'invalid@test.com'
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('invalid teacher email');
		});
});
 
it('RETRIEVE - 2: post with a invalid  email', function() {
	return chai.request(app)
		.post('/api/retrieve')
		.send({
	    	email: 'teacher2'
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('invalid teacher email');
		});
});

it('RETRIEVE - 3: post with missing field', function() {
	return chai.request(app)
		.post('/api/retrieve')
		.send({
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('missing email field');
		});
});

it('RETRIEVE - 4: post with email not string', function() {
	return chai.request(app)
		.post('/api/retrieve')
		.send({
			email: ["teacher2@test.com"]
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('missing email field');
		});
});


it('RETRIEVE - 5: post with correct param: teacher2@test.com', function() {
	return chai.request(app)
		.post('/api/retrieve')
		.send({
			email: "teacher2@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		    expect(res.body.students).to.be.a('array');
		    expect(res.body.students).to.have.lengthOf(3);
		});
});

it('RETRIEVE - 6: post with correct param: teacher3@test.com who have no student', function() {
	return chai.request(app)
		.post('/api/retrieve')
		.send({
			email: "teacher3@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		    expect(res.body.students).to.be.a('array');
		    expect(res.body.students).to.have.lengthOf(0);
		});
});
