<div align="center">

![JavaScript](https://img.shields.io/badge/-JavaScript-f7df1e?style=flat-square&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/-React-61dafb?style=flat-square&logo=React&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572b6?style=flat-square&logo=CSS3&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ed?style=flat-square&logo=Docker&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776ab?style=flat-square&logo=Python&logoColor=white)
![Flask](https://img.shields.io/badge/-Flask-black?style=flat-square&logo=Flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-d01f00?style=flat-square&logo=SQLAlchemy&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgreSQL&logoColor=white)

# CardMe
## A Flashcard and Study Application

**Developer:**
David Lee

<img src="readme/images/login-intro.PNG" alt="login">

**Table of Contents**

[About](#about-cardme) | [Features](#features) | [Installation](#installation) | [Development](#development) | [Contact](#contact)

---

<div align="center">

## About CardMe

CardMe is a flashcard / study application that allows users to create and maintain sets of flashcards or use sets created by other users. Users can like and favorite specific sets in order to refer to them at a later time. Features include a search bar that can filter particular subjects, sets, cards, and other users. Users may also participate in a randomized multiple-choice quiz specific to the contents of each set.

<!-- <br clear=""> -->

## Features
</div>

* Navigate all sets created by CardMe users
* Like and favorite sets in order to build a sets credibility or save it for future reference
* Create a set and its corresponding cards (pin to an existing subject or create a new one)
* Search and filter the existing database for specific sets, subjects, cards, and users
* Quiz yourself using the randomized, multiple-choice quiz particular to each set and constructed with its contents

## Installation
</div>

1. Clone this repository
    ```bash
    git clone https://github.com/dyclee/flashcardApp.git
    ```

2. Install dependencies
    ```bash
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```

3. Create `.env` file (Example is provided within repo)

4. Set up Postgres database based on `.env` credentials

5. Enter pipenv environment, migrate associated database, and run the flask application

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   python seeder.py
   ```

   ```bash
   flask run
   ```

6. To run the application in development, run `npm start` within the `react-app` directory


## Technologies
- JavaScript
- Python 3
- PostgreSQL
- Psycopg2
- Flask
- SQLAlchemy
- Alembic
- React
- Redux
- HTML/CSS
