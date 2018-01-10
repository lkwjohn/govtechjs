'use strict';

/**
 * Author: John Lee, Jan 2018
 */

const common 	= require('../common'); 
const chai 		= common.chai;  
const expect 	= common.expect;
const app 		= common.app


it('COMMON STUDENT - 1: post with a non-existent teacher email', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
	    	"teachers": [
				"teacherjoe@test.com",
				"teacherken@test2.com"
				]
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
 
it('COMMON STUDENT - 2: post with a invalid  email', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
	    	"teachers": [
				"teacherjoe@test.com",
				"teacherken"
				]
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

it('COMMON STUDENT - 3: post with missing field', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('invalid teachers field');
		});
});

it('COMMON STUDENT - 4: post with teachers field not array type', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
			"teachers": "teacherjoe@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('invalid teachers field');
		});
});

it('COMMON STUDENT - 5: post with only one email', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
			"teachers": [
					"teacher2@test.com"
					]
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('require two or more teacher emails')
		});
});

it('COMMON STUDENT - 6: post with correct param with only one teacher email: teacher1@test.com', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
			"teachers": [
					"teacher1@test.com"
					]
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string'); 
		    expect(res.body.message).to.equal('require two or more teacher emails');
		});
});

it('COMMON STUDENT - 7: post with correct param: teacher1@test.com and teacher2@test.com', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
			"teachers": [
					"teacher1@test.com",
					"teacher2@test.com"
					]
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		    expect(res.body.students).to.be.a('array');
		});
});

it('COMMON STUDENT - 8: post with correct param but teacher3 does not have common student with teacher1 and teacher2', function() {
	return chai.request(app)
		.post('/api/commonstudents')
		.send({
			"teachers": [
					"teacher1@test.com",
					"teacher2@test.com",
					"teacher3@test.com"
					]
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




