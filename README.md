 covid19-backend
-------------------
A Restful Services created in Express JS / Node To serve signin, signup as well covid19 data APIs


### Requirements

- Node js version v12.18.3
- SMTP credentials to run
- Docker with Docker compose

### Setup project

Setup docker

Start docker containers using following command

`sudo docker-compose up` 

First of all install the requirements

`npm install`

Modify following settings in `.env` file

```text
# JSON web token (JWT) secret: this keeps our app's user authentication secure
# This secret should be a random 20-ish character string
JWT_SECRET ='secret-sauce'
REDIS_URL='redis://127.0.0.1:6379'
# Mongo DB
# Local development
MONGODB_URI='mongodb://localhost:27017/covid-demo'

# Port
PORT=5000

# Debug
LOG_LEVEL='debug'

# PLotly credentials
PLOTLY_USERNAME='devangp'
PLOTLY_API_KEY='jFr0METX8w5ibJGhkKNP'
USE_TEST_MAIL=true

SMTP_USER='jada.beatty@ethereal.email'
SMTP_PASSWORD='a1WAeUVDRCFd129D5G'
SMTP_HOST='smtp.ethereal.email'
SMTP_PORT=587
SMTP_SECURE=true
```

Run following command to start the server

`npm start`

