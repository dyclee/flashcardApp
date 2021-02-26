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

[About](#about-cardme) | [Features](#features) | [Installation](#installation) | [Contact](#contact)


<a href="https://cardme.herokuapp.com/">
Demo the live site!
</a>
</div>

---

<div align="center">

## About CardMe

</div>

<img src="readme/images/flip_cards.gif" alt="navigate homepage gif" width="50%" align="left">

CardMe is a flashcard / study application that allows users to create and maintain sets of flashcards or use sets created by other users. Users can like and favorite specific sets in order to refer to them at a later time. Features include a search bar that can filter particular subjects, sets, cards, and other users. Users may also participate in a randomized multiple-choice quiz specific to the contents of each set. Enjoy!

<br clear="both">

<div align="right">

**Database Schema**
<img src="readme/images/cardmeDBschemaNEW.PNG" alt="DB schema">>

</div>

<div align="center">

## Features

</div>
<img src="readme/images/browse_dash.gif" alt="navigate homepage gif" width="70%" align="right">

* Navigate through all the sets created by CardMe users
* Like and favorite sets in order to build a sets credibility or save it for future reference

<br clear="both">

---

<img src="readme/images/create.gif" alt="create set gif" width="70%" align="right">

* Create a set and its corresponding cards (pin to an existing subject or create a new one)

<br clear="both">

---

* Use the search bar to query and filter the existing database for related sets, subjects, cards, and users
* Quiz yourself using the randomized, multiple-choice quiz specific to each set and constructed with the contents of its flashcards
<img src="readme/images/quiz.gif" alt="quiz gif" width="100%" align="center">

<div align="center">

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

---

<div align="center">

## Contact

Please feel free to reach out!

</div>

### David Lee
*(Full-stack developer, Open to work)*

<a href="readme/Lee_David_Resume(v2.0).pdf" download>![Resume PDF](https://img.shields.io/badge/-Resume-f00?style=flat-square&logo=adobe-acrobat-reader&logoColor=white)</a>
[![David Lee's email](https://img.shields.io/badge/dyclee@umich.edu-f4b400?style=flat-square&logo=gmail&logoColor=black&link=mailto:dyclee@umich.edu)](mailto:dyclee@umich.edu)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077b5?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/daveyclee/)](https://www.linkedin.com/in/daveyclee/)
[![AngelList](https://img.shields.io/badge/-AngelList-black?style=flat-square&logo=AngelList&logoColor=white&link=https://angel.co/u/david-lee-332)](https://angel.co/u/david-lee-332)
[![GitHub dyclee](https://img.shields.io/github/followers/dyclee?label=follow&style=social)](https://github.com/dyclee)
