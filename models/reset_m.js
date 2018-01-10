/**
 * Author: John Lee, Jan 2018
 */

const db 		= require('../db')
var format 		= require('pg-format')

/**
* Get TEST teachers id
* 
* Description: Only retrieve test teacher1@test.com, teacher2@test.com and teacher3@test.com 
* 
* @returns {(pool.Result|boolean)} - return response or false for fail
*/
exports.get_test_teacher_ids = function(){
	try{
		var response = db.query_text_only(format('SELECT id FROM teachers WHERE email = %L OR email = %L OR email = %L ', 'teacher1@test.com', 'teacher2@test.com', 'teacher3@test.com'))
		
		return response
	}
	catch(e){
		console.log(e.toString())
		return false
	}
}

/**
* Remove test teacher record 
* 
* Description: Remove teachers' id that are for unit testing only in "teacher_stuedent" table
* 
* @returns {boolean} - return true for success or false for fail
*/
exports.empty_teacher_student = function(teacher_ids){
	try{
		var ids = []
		for (var i = teacher_ids.length - 1; i >= 0; i--) {
			ids.push([teacher_ids[i]])
		}

		// console.log(format('DELETE FROM teacher_student WHERE teacher_id IN %L', [ids]))
		var response = db.query_text_only(format('DELETE FROM teacher_student WHERE teacher_id IN %L', [ids]))


		return response
	}
	catch(e){
		console.log(e.toString())
		return false
	}
}

/**
* Remove test student record 
* 
* Description: Remove test student that are for unit testing only in "students" table
* student4@test.com will not be deleted to simulate an existing student who had been suspended
* 
* @returns {boolean} - return true for success or false for fail
*/
exports.delete_student = function(){
	try{
		var response = db.query('DELETE FROM students WHERE email in ($1, $2, $3) ', ['student1@test.com', 'student2@test.com', 'student3@test.com'])
		
		return response
	}
	catch(e){
		console.log(e.toString())
		return false
	}
}