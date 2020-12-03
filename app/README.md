# Quizlet App

**Developer** David Lee

**Description**
* A flashcard app for studying that allow users to search or create decks categorized by subject, like and favorite decks, and recommend/message decks to other users


**Goals**
* user account CRUD and authentication
* allow users to create sets, each with cards that contain a question and answer
* ability to give sets a subject to be sorted by
* ability to like and 'favorite' a set or subject
* search bar that allows users to find specific topics, sets, or cards
* ability to friend other users to recommend sets (STRETCH: send messages)


**Checklist**
* create MVP, database schema, wireframes, backend and frontend routes
* set up flask backend server using sqlalchemy and alembic
* set up frontend using React
* complete authentication and CRUD for user
* CRUD for subject, card and set components
* CRUD for set likes and favorites
* build out friending system (requests/messages, recommendations?)
* search bar
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
 - HTML/CSS

## Feature List
### User
 - Signup/login/logout
 - User Dashboard (display page with friend requests/messages/recommendations and general stats?)

### Set CRUD
 - Users can create sets containing cards
 - Sets can be pinned to a subject

### Likes and Favorites CRUD
 - Users can like and favorite sets

### Friends/recommendations/messages CRUD
 - Users can 'friend' other users to share recommendations and messages

### Search Bar
 - Users can search for sets/cards/subjects using keywords (include friends?)
