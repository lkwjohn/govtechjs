/**
 * Author: John Lee, Jan 2018
 */
 
const db 		= require('../db')
var format 		= require('pg-format')

/**
* Get Teacher ID
* 
* @description Local function that query the "Teachers" table to retrieve list of ids
*
* @param {(string|array)} email - either a single teacher's email or list of students' email
* 
* @returns {pool.Result | string} - return list or a single students' email or string of error message
*/
exports.get_teacher_id = function(email){
	try{
		if(email instanceof Array){
			var tmp = []
			for (var i = 0; i < email.length; i++) {
				tmp.push([email[i]])
			}
			// console.log(format('SELECT id FROM teachers WHERE email IN  %L ', [tmp] ))
			return db.query_text_only(format('SELECT id FROM teachers WHERE email IN  %L ', [tmp] ))
			// return db.query('SELECT id FROM teachers WHERE email IN  ( $1 )', [email])
		}
		else{
			return db.query('SELECT id FROM teachers WHERE email = $1', [email])
		}
	}
	catch(e){
		console.log(e.toString());
		return null;
	}
}//end of get_teacher_id function