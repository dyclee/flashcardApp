<div align="center">

# CardMe
## A Flashcard / Study Application

<img src="readme/images/login-intro.PNG" alt="login">
**Developer** David Lee

**Description**
A flashcard app for studying that allow users to create or search for cards and sets categorized by subject, number of likes and favorited sets with the added ability to quiz themselves

**Table of Contents**
[About](#about-cardme) | [Features](#features) | [How It Works](#how-it-works) | [Installation](#installation) | [Development](#development) | [Contact](#contact)

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
