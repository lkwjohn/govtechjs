'use strict';
 
/**
 * Author: John Lee, Jan 2018
 */

const common = require("./common");

function importTestCase(name, path) {
    describe(name, function () {
        require(path);
    });
}


describe('API endpoint /api', function() {  
  this.timeout(5000); // How long to wait for a response (ms)
 
  	before(function() {
 		// console.log("running each api unit test");
  	});

    after(function() {
    // console.log("test completed");
    });

  	importTestCase("register", './api/register.js');

  	importTestCase("retrieve", './api/retrieve.js');

  	importTestCase("commonstudent", './api/commonstudent.js');

    importTestCase("suspend", './api/suspend.js');

    importTestCase("retrievefornotifications", './api/retrievefornotifications.js');
 
  	importTestCase("retrievefornotifications", './reset.js');


});
