# GovTech NodeJS Assessment


One Paragraph of project description goes here

---

## Technical Choices

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1. helmet
Protect the APIs from some web vulnerabilities by setting HTTP headers appropriately

2. x-powered-by
Hide x-powered-by for allowing attacker to known it's running on Express

3. Express and middlewares
Used for the purpose of routing and access to both request object and response object
http://expressjs.com/en/guide/using-middleware.html

4. node-postgres
Interface for PostgreSQL database with SQL injection prevention

5. node-pg-format
For formatting query to allow formatting of query string for batch insert

6. email-validator
Library to validate email address

7. body-parser
Parse incoming request bodies

8. nodemon
Allow continuous running and redeployment of project upon code changes without stopping the node

9. Chai, chai-http and mocha
For unit testing purpose

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
6. (Optional) The source code automatically connect to a public database. However, if require to deploy the database locally, proceed to import the SQL dump (database-dump 01-2018). After importing is completed, navigate to /db/index.js and change the following:
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





