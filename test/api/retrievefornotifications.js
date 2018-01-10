'use strict';

const common 	= require('../common'); 
const chai 		= common.chai;  
const expect 	= common.expect;
const app 		= common.app


it('RETRIEVE FOR NOTIFICATION - 1: post with a non-existent student email and student2@test.com is active and is under teacherken', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
	    	"teacher": "teacher2@test.com",
			"notification": "Hello students! student1000@test.com.jp and student2@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		    expect(res.body.recipients).to.be.a('array');
		    expect(res.body.recipients).to.have.lengthOf(1);
		});
});
 
it('RETRIEVE FOR NOTIFICATION - 2: post with a invalid teacher email', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
	    	"teacher": "teacher2",
			"notification": "Hello students! student1@test.com and student2@test.com"
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

it('RETRIEVE FOR NOTIFICATION - 3: post with a non-existent teacher email', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
	    	"teacher": "nonexistent@test.com",
			"notification": "Hello students! student1@test.com and student2@test.com"
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

it('RETRIEVE FOR NOTIFICATION - 4: post with missing teacher field', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
			"notification": "Hello students! student1@test.com and student2@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('invalid teacher field');
		});
});

it('RETRIEVE FOR NOTIFICATION - 5: post with missing notification field', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
			"teacher": "nonexistent@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(false);
		    expect(res.body.message).to.be.a('string');
		    expect(res.body.message).to.equal('invalid notification field');
		});
});



it('RETRIEVE FOR NOTIFICATION - 6: post with a no student email mentioned in notification', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
	    	"teacher": "teacher2@test.com",
			"notification": "Hello students! "
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		    expect(res.body.recipients).to.be.a('array');
		    expect(res.body.recipients).to.have.lengthOf(0);
		});
});

it('RETRIEVE FOR NOTIFICATION - 7: post with the three students email for teacher2 where student1 have been suspended', function() {
	return chai.request(app)
		.post('/api/retrievefornotifications')
		.send({
	    	"teacher": "teacher2@test.com",
			"notification": "Hello students! student1@test.com and student2@test.com and also student3@test.com"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		    expect(res.body.recipients).to.be.a('array');
		    expect(res.body.recipients).to.have.lengthOf(2);
		});
});











