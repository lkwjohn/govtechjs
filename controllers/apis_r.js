'use strict';

/**
 * Author: John Lee, Jan 2018
 */

var express 					= require('express')
var router 						= express.Router()
var validator 					= require("email-validator")
const teacher_m 				= require('../models/teacher_m')
const student_m 				= require('../models/student_m')
const teacher_student_m 		= require('../models/teacher_student_m')
const reset_m 					= require('../models/reset_m')

router.use(function timeLog (req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})


/**
* Register Student
*
* API URL: base_url + /api/register
* 
* Description: Allow an existing teacher to register the student and assign under them
* If a student email doesn't exist, function will create an record of them before assigning to the teacher
*
*
* @param (string) teacher 	- email of an existing teacher 
* @param (array) student 	- array of email (string) of student(s) 
*
* @returns {(boolean|(boolean & string))} - if successful return a success of true, else return success of false with message error
*/
router.post('/register', async function (req, res) {
	try{
	  	//POST Params
		var teacher_email 	= req.body.teacher
		var student_emails 	= req.body.student

		//validate field exist and field type 
		if(typeof teacher_email === 'undefined' || typeof teacher_email !== 'string'){
			return res.json({'success': false, 'message': 'missing teacher field'})
		}

		if(typeof student_emails === 'undefined' || !(student_emails instanceof Array)){
			return res.json({'success': false, 'message': 'missing student field'})
		}

		//validate email
		if(validator.validate(teacher_email) == false || teacher_email.trim() == ''){ 
			return res.json({'success': false, 'message': 'invalid teacher email'})
		}

		for (var i = student_emails.length - 1; i >= 0; i--) {
			if(validator.validate(student_emails[i]) == false ||  student_emails[i].trim() == ''){
				return res.json({'success': false, 'message': 'invalid student email'})
			}
		}

	
		var response, teacher_id
		var student_ids = []

		//get teacher id and check whether teacher email is an existing email
		response = await teacher_m.get_teacher_id(teacher_email)

		if(typeof response === "string" || response instanceof String){
			return res.json({'success': false, 'message': response})
		}
		if(response.rowCount > 0){
			teacher_id = response.rows[0].id
		}
		else{
			return res.json({'success': false, 'message': 'invalid teacher email'})
		}


		//cross check student email, to ensure student email doesn't exist in "Teachers" table
		response = await teacher_m.get_teacher_id(student_emails)
		if(typeof response === "string" || response instanceof String){
			return res.json({'success': false, 'message': response})
		}
		else if(response == null || response.rowCount > 0){
			return res.json({'success': false, 'message': 'invalid student email'})
		}

		//get list of student emails that have been registered in 'students' table
		response = await student_m.get_student(student_emails) 
		
		var existing_student_emails = []
		for(var i=0; i<response.rows.length; i++){
			//check for suspended student
			if(response.rows[i].status == 'inactive'){
				return res.json({'success': false, 'message': response.rows[i].email + ' had been suspended'})
			}

			existing_student_emails.push(response.rows[i].email)
			student_ids.push(response.rows[i].id)
		}

		var new_student = []
		for (var i = student_emails.length - 1; i >= 0; i--) {
			if( existing_student_emails.indexOf(student_emails[i]) < 0){ //not exist
				new_student.push(student_emails[i])
			}
		}

		//insert new student to "Students" table
		if(new_student.length > 0){
			response = await student_m.add_student(new_student)
			for (var i = response.rows.length - 1; i >= 0; i--) {
				student_ids.push(response.rows[i].id)
			}
		}
		
		
		//check if teacher have the student assigned to them already
		response = await teacher_student_m.get_students(teacher_id)
		// db.query('SELECT student_id FROM teacher_student WHERE  teacher_id = $1', [teacher_id])

		var assigned_student_id = []
		for (var i = response.rows.length - 1; i >= 0; i--) {
			assigned_student_id.push(response.rows[i].student_id)
		}
		
		var inserting_data = []
		for (var i = student_ids.length - 1; i >= 0; i--) {
			if(assigned_student_id.indexOf(student_ids[i]) < 0){ //not exist
				inserting_data.push(new Array(teacher_id, student_ids[i]) )
			}
		}


		//insert mapping to "teacher_student" table
		if(inserting_data.length > 0){
			response = await teacher_student_m.assign_student(inserting_data)
			
			if(typeof response === "string" || response instanceof String){
				return res.json({'success': false, 'message': response})
			}
			else if( inserting_data.length != response.rows.length){
				var diff = inserting_data.length  - response.rows.length
				return res.json({'success': false, 'message': diff + " student(s) not assigned" })
			}
			return res.json({'success': true})
		}
		else{
			return res.json({'success': false, 'message': "All student(s) have already been assigned" })
		}
		
	}
	catch(e){
		return res.json({'success': false, 'message':  e.toString()})
	}
	
	
}) //end of /register


/**
* Retrieve List of Students
*
* API URL: base_url + /api/retrieve
* 
* Description: To retrieve a list of students that is assigned under a teacher based on the teacher email
*
*
* @param (string) email 	- email of an existing teacher 
*
* @returns {((boolean & array)|(boolean & string))} - if successful return a success of true with the list of students' email, else return success of false with message error
*/
router.post('/retrieve', async function (req, res) {
	try{
		var teacher_email 	= req.body.email

		//validate field exist and field type
		if(typeof teacher_email === 'undefined' || typeof teacher_email !== 'string'){
			return res.json({'success': false, 'message': 'missing email field'})
		}

		//validate email
		if(validator.validate(teacher_email) == false || teacher_email.trim() == ''){ 
			return res.json({'success': false, 'message': 'invalid teacher email'})
		}

		//get teacher id and check whether teacher email is an existing email
		var teacher_id = 0
		var response =  await teacher_m.get_teacher_id(teacher_email, false)

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else if(response.rowCount > 0){
			teacher_id = response.rows[0].id
		}
		else{ 
			return res.json({'success': false, 'message': 'invalid teacher email'}) 
		}

		//retrieve list of student based on the teacher's id
		response = await teacher_student_m.get_students(teacher_id)
		
		var student_emails = []
		for (var i = 0; i < response.rows.length; i++) {
			student_emails.push(response.rows[i].email)
		}

		return res.json({'success': true, 'students': student_emails})
	}
	catch(e){
		console.log(e.toString());
		return res.json({'success': false, 'message': e.toString()});
	}
	
	
}) //end of /retrieve


/**
* Retrieve List of Common Students 
*
* API URL: base_url + /api/commonstudents
* 
* Description: To retrieve a list of common student assigned under two or more teachers
*
*
* @param (array) teachers 	- list of existing teachers' email
*
* @returns {((boolean & array)|(boolean & string))} - if successful return a success of true with the list of common students' email, else return success of false with message error
*/
router.post('/commonstudents', async function (req, res) {
	try{
		var teacher_emails 	= req.body.teachers
		
		//validate field exist and field type
		if(typeof teacher_emails === 'undefined' || !(teacher_emails instanceof Array) ){
			return res.json({'success': false, 'message': 'invalid teachers field'})
		}

		//validate email
		for (var i = 0; i < teacher_emails.length; i++) {
			if(validator.validate(teacher_emails[i]) == false ){ 
				return res.json({'success': false, 'message': 'invalid teacher email'})
			}
		}

		//get teacher id and check whether those email exist in teacher table
		var teacher_ids = []
		var response =  await teacher_m.get_teacher_id(teacher_emails)

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else if(response.rowCount == teacher_emails.length){
			for (var i = 0; i < response.rowCount; i++) {
				teacher_ids.push(response.rows[i].id)
			}
		}
		else{
			return res.json({'success': false, 'message': 'invalid teacher email'})
		}

		response = await teacher_student_m.get_common_students(teacher_ids)

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else{
			var student_emails = []
			for (var i = 0; i < response.rows.length; i++) {
				student_emails.push(response.rows[i].email)
			}

			return res.json({'success': true, 'students': student_emails})
		}
		
	}
	catch(e){
		console.log(e.toString());
		return res.json({'success': false, 'message': e.toString()});
	}
	
}) //end of /commonstudents


/**
* Suspend a Student
*
* API URL: base_url + /api/suspend
* 
* Description: To suspend a student by setting the email to inactive
*
*
* @param (string) email 	- student's email
*
* @returns {((boolean)|(boolean & string))} - if successful return a success of true, else return success of false with message error
*/
router.post('/suspend', async function (req, res) {
	try{
		var student_email 	= req.body.student
		//validate field exist and field type
		if(typeof student_email === 'undefined' || typeof student_email !== 'string'){
			return res.json({'success': false, 'message': 'invalid student field'})
		}

		//validate email
		if(validator.validate(student_email) == false ){ 
			return res.json({'success': false, 'message': 'invalid student email'})
		}

		//get list of student emails that have been registered in 'students' table
		var response = await student_m.get_student(student_email) 

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else if(response.rowCount == 0 ){
			return res.json({'success': false, 'message': 'invalid student email'})
		}
		else{
			if(response.rows[0].status == 'inactive'){
				return res.json({'success': false, 'message': student_email + ' had already been suspended'})
			}
		}

		response =  await student_m.set_student_status(student_email, "inactive")

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else if(response.rowCount == 0 ){
			return res.json({'success': false, 'message': 'invalid student email'})
		}
		else{
			return res.json({'success': true})
		}
	}
	catch(e){
		console.log(e.toString());
		return res.json({'success': false, 'message': e.toString()});
	}
	
}) //end of /suspend


/**
* Retrieve for Notification
*
* API URL: base_url + /api/retrievefornotifications
* 
* Description: Retrieve list of students' email mentioned in the notification text and is/are assigned under the teacher
* 
*
* @param (string) teacher 		 	- teacher' email
* @param (string) notification  	- notification text that can contain student(s) email
*
* @returns {((boolean & array)|(boolean & string))} - if successful return a success of true with list of students' email, else return success of false with message error
*/
router.post('/retrievefornotifications', async function (req, res) {
	try{
		var teacher_email 		= req.body.teacher
		var notification_text 	= req.body.notification
		//validate field exist and field type
		if(typeof teacher_email === 'undefined' || typeof teacher_email !== 'string'){
			return res.json({'success': false, 'message': 'invalid teacher field'})
		}

		if(typeof notification_text === 'undefined' || typeof notification_text !== 'string'){
			return res.json({'success': false, 'message': 'invalid notification field'})
		}
		
		//validate email
		if(validator.validate(teacher_email) == false ){ 
			return res.json({'success': false, 'message': 'invalid teacher email'})
		}

		//retrieve teacher id and also check if the email is an existing teacher
		var teacher_id = 0
		response = await teacher_m.get_teacher_id(teacher_email)

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else if(response.rowCount == 0){
			return res.json({'success': false, 'message': 'invalid teacher email'})
		}
		else{
			teacher_id = response.rows[0].id
		}


		var pattern=/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
		var student_emails = notification_text.match(pattern)
		student_emails = Array.from(new Set(student_emails)); //remove duplicate

		for (var i = student_emails.length - 1; i >= 0; i--) {
			if(validator.validate(student_emails[i]) == false ){ 
				return res.json({'success': false, 'message': 'invalid student email'})
			}
		}

		//get list of student id under 
		var students = []
		response = await teacher_student_m.get_students(teacher_id)

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else if(response.rowCount == 0){
			return res.json({'success': true, 'recipients': []}) //no student assigned
		}
		else{
			for (var i = 0; i < response.rows.length; i++) {
				if(student_emails.indexOf(response.rows[i].email) > -1){
					students.push(response.rows[i].email)
				}
			}

			if(students.length == 0){ //no match found
				return res.json({'success': true, 'recipients': []})
			}
		}


		var number_of_email = students.length
		var response =  await student_m.get_student_by_status(students, 'active')

		if(typeof response === "string" || response instanceof String ){
			return res.json({'success': false, 'message': response})
		}
		else{
			var recipients = []
			for (var i = 0; i < response.rows.length; i++) {
				recipients.push(response.rows[i].email)
			}

			return res.json({'success': true, 'recipients': recipients })
		}
	}
	catch(e){
		console.log(e.toString());
		return res.json({'success': false, 'message': e.toString()});
	}
	
}) //end of /retrievefornotifications


/**
* To Reset After Unit Testing
*
* API URL: base_url + /api/reset
* 
* Description: Reset testing data to original status
* 
*
* @param (string) key 	- secret key
*
* @returns {(boolean)} 	- if successful return a success of true , else return success of false
*/
router.post('/reset', async function (req, res) {
	try{
		var key 		= req.body.key

		if(typeof key === 'undefined' || typeof key !== 'string'){
			return res.json({'success': false})
		}

		if(key != "A916877911AD282B468655434BB69"){
			return res.json({'success': false})
		}

		var teacher_ids = await reset_m.get_test_teacher_ids()

		var ids = []
		if(teacher_ids.rowCount > 0){
			
			for (var i = teacher_ids.rows.length - 1; i >= 0; i--) {
				ids.push(teacher_ids.rows[i].id)
			}
		}
		else{
			return res.json({'success': false})
		}
		

		var response = await reset_m.empty_teacher_student(ids)
		
		response = await reset_m.delete_student()
		
		return res.json({'success': true})
		
	}
	catch(e){
		console.log(e.toString());
		return res.json({'success': false, 'message': e.toString()});
	}
	
}) //end of /reset


router.use(express.static('routes'));



module.exports = router