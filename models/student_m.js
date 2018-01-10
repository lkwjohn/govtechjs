const db 		= require('../db')
var format 		= require('pg-format')

/**
* Get Student ID
* 
* Description: Local function that query the "Students" table to retrieve list of ids
*
* @param {(string|array)} - either a single email or list of emails
* 
* @returns {(pool.Result|string)}  - return list of students' id or string of error message
*/
exports.get_student_id = function(email){
	try{
		if(email instanceof Array){
			// var params = []
			// for (var i = 0; i < email.length; i++) {
			// 	params.push('$' + (i+1))
			// }

			return db.query('SELECT id FROM students WHERE email IN  ($1)', [email])
		}
		else{
			return db.query('SELECT id FROM students WHERE email = $1', [email])
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
}//end of get_student_id function

/**
* Get Students
* 
* Description: function that query the list of students based on email(s)
*
* @param {(string|array)} - either a single id or list of emails
* 
* @returns {(pool.Result|string)}  - return list or a single students' id, email,status and insert date or string of error message
*/
exports.get_student = function(student_email){
	try{

		if(student_email instanceof Array){
			var tmp = []
			for (var i = 0; i < student_email.length; i++) {
				tmp.push([student_email[i]]);
			}

			// return db.query('SELECT * FROM students WHERE email IN  ( $1)', [student_email])
			return db.query_text_only(format('SELECT * FROM students WHERE email IN  %L ', [student_email]))
		}
		else{
			return db.query('SELECT * FROM students WHERE email = $1 ', [student_email])
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
}

/**
* Add Students
* 
* Description: function that insert new students
*
* @param {(string|array)} - either a single id or list of emails
* 
* @returns {(pool.Result|string)}  - return list or a single students' id or string of error message
*/
exports.add_student = function(new_student){
	try{
		if(new_student instanceof Array){
			if(new_student.length == 0){
				return 'Empty array';
			}
			var tmp = [];
			// var params = []
			for (var i = 0; i < new_student.length; i++) {
				// params.push('$' + (i+1))
				tmp.push([new_student[i]]);
			}

			return db.query_text_only(format('INSERT INTO students (email) VALUES %L RETURNING id', tmp))
		}
		else{
			if(new_student == ''){
				return 'Empty email';
			}
			return db.query('INSERT INTO students (email) VALUES ($1) RETURNING id', [new_student])
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
	
}

/**
* Set Students Status
* 
* Description: function that update student status to active or inactive (suspend)
*
* @param {(string & string)} - either a single email and a string, status (active|inactive)
* 
* @returns {(pool.Result|string)} - return list or a single students' id or string of error message
*/
exports.set_student_status = function(email, status){
	try{
		if(status != 'active' && status != 'inactive'){
			return 'status must be active or inactive'
		}
		else{
			return db.query('UPDATE students SET status = $1 WHERE email = $2 RETURNING id', [status, email])
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
	
}

/**
* Get Students By Status
* 
* Description: function that query list of student based on their email and status
*
* @param {(string & string |array & string)} - either a single email or list of emails and a string of status (active|inactive)
* 
* @returns {(pool.Result|string)} - return list or a single students' email or string of error message
*/
exports.get_student_by_status = function(student_email, status){
	try{
		if(status != 'active' && status != 'inactive'){
			return 'status must be active or inactive'
		}

		if(student_email instanceof Array){
			var tmp = []
			for (var i = 0; i < student_email.length; i++) {
				tmp.push([student_email[i]])
			}

			// student_email.push(status)
			return db.query_text_only(format('SELECT * FROM students WHERE email IN  %L AND status = %L', [tmp], status ))
			// return db.query('SELECT email FROM students WHERE email IN  ( $1 ) AND status = $2'  , [student_email, status])
		}
		else{
			return db.query('SELECT email FROM students WHERE email = $1 AND status = $2', [student_email, status])
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
}