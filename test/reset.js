'use strict';

const common 	= require('./common'); 
const chai 		= common.chai;  
const expect 	= common.expect;
const app 		= common.app


it('******* RESET TEST DATA ****************', function() {
	return chai.request(app)
		.post('/api/reset')
		.send({
			"key": "A916877911AD282B468655434BB69"
		})
		.then(function(res) {
		    expect(res).to.have.status(200);
		    expect(res).to.be.json;
		    expect(res.body).to.be.an('object');
		    expect(res.body.success).to.be.a('boolean')
		    expect(res.body.success).to.equal(true);
		});
});
 