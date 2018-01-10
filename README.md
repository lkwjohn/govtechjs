# GovTech NodeJS Assessment


---

## Technical Choices

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1. helmet<br />
Protect the APIs from some web vulnerabilities by setting HTTP headers appropriately

2. Express and middlewares<br />
Used for the purpose of routing and access to both request object and response object<br />
http://expressjs.com/en/guide/using-middleware.html

3. node-postgres<br />
Interface for PostgreSQL database with SQL injection prevention

4. node-pg-format<br />
For formatting query to allow formatting of query string for batch insert, especially insert with multiple variable per record. It comes with SQL injection prevention as well

5. email-validator<br />
Library to validate email address

6. body-parser<br />
Parse incoming request bodies

7. nodemon<br />
Allow continuous running and redeployment of project upon code changes without stopping the node

8. Chai, chai-http and mocha<br />
For unit testing purpose which Chai have a long history from 2012 and still have processive support

9. Mocha<br/>
Together with Chai to run unit test cases and provide Async and Sync processing of the test cases. Also like Chai, from 2012 till now still have processive support

---

## Assumption

1. /api/register
	* Only can register student who are not suspended
	* Teacher email must be an existing teacher
	* Valid email
	* Cannot re-register again

2. /api/retrieve
	* Teacher email must be an existing teacher
	* Valid email

3. /api/commonstudents
	* Minimum input of teacher's email must be two or more
	* Common student(s) between two or more teachers don't include suspended student(s)
	* Teacher email must be an existing teacher
	* Valid email

4. /api/suspend
	* Student email must be an existing student
	* Student has not been suspended yet
	* Valid email

5. /api/retrievefornotifications
	* Valid email
	* Email of both teacher and student(s) must be an existing student(s)
	* Others conditions mentioned in GitHub
---

### Prerequisites

Ensure node, npm and dependencies of nodejs are installed. The following are based on Operating System in linux environment (Ubuntu/Debian)
Reference: http://blog.teamtreehouse.com/install-node-js-npm-linux

---

### Dependencies
```
$ sudo apt-get install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev
```

##### Install Linuxbrew
```
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"

$ test -d ~/.linuxbrew && $ PATH="$HOME/.linuxbrew/bin:$HOME/.linuxbrew/sbin:$PATH"
$ test -d /home/linuxbrew/.linuxbrew && $ PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:$PATH"
$ test -r ~/.bash_profile && echo "export PATH='$(brew --prefix)/bin:$(brew --prefix)/sbin'":'"$PATH"' >>~/.bash_profile
$ echo "export PATH='$(brew --prefix)/bin:$(brew --prefix)/sbin'":'"$PATH"' $ >>~/.profile
```

##### Install Node 
```
$ brew install node
```

##### Install Postgres (if deploying locally)
```
$ sudo apt-get update
$ sudo apt-get install postgresql postgresql-contrib
```

---


### Deployment

A step by step series of examples for deploying this source code

1. Copy the source code to the server
2. Ensure port 8080 (production) and 8081 (testing) are open
3. Go to the project directory and run npm install to install the packages required
```
$ npm install
```

4. Run the project

```
$ node app.js 8080
```
5. To run the unit test, run the following command:
```
$ npm test
```
6. (Optional) The source code automatically connect to a public database. However, if require to deploy the database locally, proceed to import the SQL dump (PostgreSQL). After importing is completed, navigate to /db/index.js and change the following:
```
var config = {
  user: <USERNAME>,
  host: 'localhost',
  database: 'govtech',
  password: <PASSWORD>,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 3000
  }
```

API should be accessible at <base url>:8080/api/<function name> 

7. Following teacher email are available:
teacherken@example.com
teacherjoe@example.com
teachermary@example.com

## Running the tests

Unit test case are held under test/apis folder
To run the unit test, run the following command at the project directory level:
```
$ npm test
> govtechjs@1.0.0 test /var/www/html/govtechjs
> mocha --recursive --exit

Running at port 8081

  ✓ COMMON STUDENT - 1: post with a non-existent teacher email (46ms)
  ✓ COMMON STUDENT - 2: post with a invalid  email
  ✓ COMMON STUDENT - 3: post with missing field
  ✓ COMMON STUDENT - 4: post with teachers field not array type
  ✓ COMMON STUDENT - 5: post with only one email
  ✓ COMMON STUDENT - 6: post with correct param
  ✓ REGISTER - 1: Invalid path
  ✓ REGISTER - 2: post with a non-exist teacher email
  ✓ REGISTER - 3: post with a invalid teacher email
  ✓ REGISTER - 4: post with a invalid student email
  ✓ REGISTER - 5: post with student mail as the teacher email
  ✓ REGISTER - 6: post with teacher mail as one of the student email
  ✓ REGISTER - 7: post with teacher mail empty
  ✓ REGISTER - 8: post with teacher field missing
  ...
  
```


---

## Authors

* **Lee Keng Wee, John** 






