'use strict'

/**
 * Author: John Lee, Jan 2018
 */

const common 	= require('../common')
const chai 		= common.chai
const expect 	= common.expect
const app 		= common.app


it('REGISTER - 1: Invalid path', function() {
	return chai.request(app.listen())
	  	.get('/INVALID_PATH')
	  	.then(function(res) {
	    	throw new Error('Path exists!')
		})
		.catch(function(err) {
	    expect(err).to.have.status(404)
	});
});
 
it('REGISTER - 2: post with a non-exist teacher email', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": 'invalid@test.com',
		    "student": [
				      "student1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid teacher email')
		});
});
 
it('REGISTER - 3: post with a invalid teacher email', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": 'invalid',
		    "student": [
				      "student1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid teacher email')
		});
});

it('REGISTER - 4: post with a invalid student email', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": 'teacher1@test.com',
		    "student": [
				      "student1",
				      "student2@test.com",
				      "student3@test.com"
				    ]
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

it('REGISTER - 5: post with student mail as the teacher email', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": 'student1@test.com',
		    "student": [
				      "student1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid teacher email')
		});
});

it('REGISTER - 6: post with teacher mail as one of the student email', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": 'teacher1@test.com',
		    "student": [
				      "teacher1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
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

it('REGISTER - 7: post with teacher mail empty', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "",
		    "student": [
				      "student1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('invalid teacher email')
		});
});

it('REGISTER - 8: post with teacher field missing', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "student": [
				      "student1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('missing teacher field')
		});
});

it('REGISTER - 9: post with student field missing', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
	    	"teacher": "teacher1@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('missing student field')
		});
});

it('REGISTER - 10: post with student field empty', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "teacher1@test.com",
		    "student": [ "" ]
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

it('REGISTER - 11: post with correct params: teacher2@test.com with only 1 new student ', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "teacher2@test.com",
		    "student": [
				      "student1@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true)
		});
});

it('REGISTER - 12: post with correct params: teacher2@test.com with two new students and student1@test.com have already been registered ', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "teacher2@test.com",
		    "student": [
				      "student1@test.com",
				      "student2@test.com",
				      "student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true)
		});
});

it('REGISTER - 13: post with correct params: teacher1@test.com but student1@test.com and student2@test.com have already registered', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "teacher2@test.com",
		    "student": [
				      "student1@test.com",
				      "student2@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('All student(s) have already been assigned')
		});
});

it('REGISTER - 14: post with correct params: teacher2@test.com with three student that have been registered, and register student4@test.com who had been suspended', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "teacher2@test.com",
		    "student": [
		    			"student4@test.com",
				      	"student1@test.com",
				      	"student2@test.com",
				      	"student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('student4@test.com had been suspended')
		});
});

it('REGISTER - 15: post with correct params: teacher2@test.com re-register the three student that have been assigned to teacher2', function() {
	return chai.request(app)
		.post('/api/register')
		.send({
		    "teacher": "teacher2@test.com",
		    "student": [
				      	"student1@test.com",
				      	"student2@test.com",
				      	"student3@test.com"
				    ]
		})
		.then(function(res) {
		    expect(res).to.have.status(200)
		    expect(res).to.be.json
		    expect(res.body).to.be.an('object')
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false)
		    expect(res.body.message).to.be.a('string')
		    expect(res.body.message).to.equal('All student(s) have already been assigned')
		});
});