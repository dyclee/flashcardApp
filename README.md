<div align="center">

# CardMe
## A Flashcard and Study Application

**Developer:**
David Lee

<img src="readme/images/login-intro.PNG" alt="login">

**Table of Contents**

[About](#about-cardme) | [Features](#features) | [How It Works](#how-it-works) | [Installation](#installation) | [Development](#development) | [Contact](#contact)

---

<div align="center">

## About CardMe

CardMe is a flashcard / study application that allows users to create and maintain sets of flashcards or use sets created by other users. Users can like and favorite specific sets in order to refer to them at a later time. Features include a search bar that can filter particular subjects, sets, cards, and other users. Users may also participate in a randomized multiple-choice quiz specific to the contents of each set.

<br clear="both">

## Features
</div>
- Navigate all sets created by CardMe users
- Like and favorite sets in order to build a sets credibility or save it for future reference
- Create a set and its corresponding cards (pin to an existing subject or create a new one)
- Search and filter the existing database for specific sets, subjects, cards, and users
- Quiz yourself using the randomized, multiple-choice quiz particular to each set and constructed with its contents

**Goals**
* user account CRUD and authentication
* allow users to create sets, each with cards that contain a question and an answer
* ability to give sets a subject to be sorted by
* ability to like and 'favorite' a set or subject
* search bar that allows users to find specific topics sets, or cards
* ability to quiz oneself

**Checklist**
* create MVP, database schema, backend and frontend routes
* set up flask backend server using SQLAlchemy and alembic
* set up frontend using React
* complete authentication and CRUD for user
* CRUD for subject, card, and set compoenents
* CRUD for set likes and favorites
* search feature
* quiz feature
* general styling

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

## Feature List
### User
- Signup/login/logout
- User Dashboard (display page with user sets)

### Set / Card CRUD
- Users can create sets containing cards
- Sets can be pinned to a subject

### Likes and Favorites CRUD
- Users can like and favorite sets

### Search Bar
- Users can search for sets/cards/subjects/users using keywords
- ability to filter search results

### Quiz
- Users can quiz themselves
