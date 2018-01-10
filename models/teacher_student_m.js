/**
 * Author: John Lee, Jan 2018
 */

const db 		= require('../db')
var format 		= require('pg-format')

/**
* Get Students
* 
* Description: function that query the list of students under one or more teacher(s)
*
* @param {(string|array)} teacher_id - either a single id or list of ids
* 
* @returns {(pool.Result|string)} - return list or a single students' id and email or string of error message
*/
exports.get_students = function(teacher_id){
	try{
		if(teacher_id instanceof Array){
			var tmp = []
			for (var i = 0; i < teacher_id.length; i++) {
				tmp.push([teacher_id[i]])
			}
			return db.query_text_only(format('SELECT DISTINCT teacher_student.student_id, students.email FROM teacher_student LEFT JOIN students ON (teacher_student.student_id = students.id) WHERE teacher_student.teacher_id IN %L ', [tmp] ))
			// return db.query('SELECT DISTINCT teacher_student.student_id, students.email FROM teacher_student LEFT JOIN students ON (teacher_student.student_id = students.id) WHERE teacher_student.teacher_id IN ($1)', [teacher_id])
		}
		else{
			return db.query('SELECT teacher_student.student_id, students.email FROM teacher_student LEFT JOIN students ON (teacher_student.student_id = students.id) WHERE teacher_student.teacher_id = $1', [teacher_id])
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
}//end of get_teacher_id function

/**
* Get List of Common Students
* 
* Description: function that query the list of commeon students under two or more teacher(s)
*
* @param {(string|array)} teacher_id - either a single id or list of ids
* 
* @returns {(pool.Result|string)} - return list of students' email or string of error message
*/
exports.get_common_students = function(teacher_id){
	try{
		if(teacher_id instanceof Array){
			if(teacher_id.length < 2){
				return "require two or more teacher emails"
			}

			// var params = []
			var tmp = []
			var number_of_teacher = 0
			for (var i = 0; i < teacher_id.length; i++) {
				// params.push('$' + (i+1))
				tmp.push([teacher_id[i]])
				number_of_teacher++
			}
			
			return db.query_text_only(format('SELECT students.email FROM teacher_student LEFT JOIN students ON (teacher_student.student_id = students.id) WHERE teacher_student.teacher_id IN %L GROUP BY students.email HAVING COUNT(students.email) > %L ', [tmp], number_of_teacher-1))
			// return db.query('SELECT students.email FROM teacher_student LEFT JOIN students ON (teacher_student.student_id = students.id) WHERE teacher_student.teacher_id IN ('+params.join(',')+') GROUP BY students.email HAVING COUNT(students.email) > 1 ', teacher_id)
		}
		else{
			return 'require two or more teacher emails'
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
}//e

/**
* Assign Student
* 
* Description: function to insert a student under a teacher. The relationship between student and teacher are mapped in teacher_student table
*
* @param {(array)} data - array of student data in the followin format:
* [[teacher_id, student_id_1], [teacher_id, student_id_2], ...]
* 
* @returns {(pool.Result|string)} - return list of students' id or string of error message
*/
exports.assign_student = function(data){
	try{
		if(data.length > 0 ){
			return db.query_text_only(format('INSERT INTO teacher_student (teacher_id, student_id) VALUES %L RETURNING student_id', data))

		}
		else{
			return 'Data empty'
		}
	}
	catch(e){
		console.log(e.toString());
		return e.toString();
	}
}//end of get_teacher_id function