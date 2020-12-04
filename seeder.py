from dotenv import load_dotenv
load_dotenv()

from datetime import datetime

from app import app, db
from app.models.everything import User, Subject, Set, Card, Like, Favorite, friendships, recommendations, messages

with app.app_context():
    db.drop_all()
    db.create_all()

    demo = User(
        username="demo",
        email="email@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#16db93",
        created_at=datetime(2020, 10, 20),
    )
    test = User(
        username="hunter24",
        email="hunter@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#000",
        created_at=datetime(2020, 10, 20),
    )
    test2 = User(
        username="ramenman",
        email="ramen@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#af4d98",
        created_at=datetime(2020, 10, 20),
    )
    test3 = User(
        username="rainbows",
        email="rainbow@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
    )
    users = [demo, test, test2, test3]

    for user in users:
        db.session.add(user)
    db.session.commit()

    subject1 = Subject(
        name="Data Structures and Algorithms",
    )
    subject2 = Subject(
        name="American Literature",
    )
    subject3 = Subject(
        name="Introductory Statistics",
    )
    subject4 = Subject(
        name="Data Science 101",
    )
    subjects = [subject1, subject2, subject3, subject4]

    for subject in subjects:
        db.session.add(subject)
    db.session.commit()

    set1 = Set(
        title="Asian American Classics",
        description="quiz review for AA-LIT 479",
        subject_id=2,
        created_by=4,
    )
    set2 = Set(
        title="Graphs and Trees",
        description="general questions about graphs and trees",
        subject_id=1,
        created_by=1,
    )
    set3 = Set(
        title="Time and Space Complexities",
        description="quiz for DSA time and space complexities",
        subject_id=1,
        created_by=2,
    )
    sets = [set1, set2, set3]
    for each in sets:
        db.session.add(each)
    db.session.commit()

    card1 = Card(
        question="Who is the author of 'No-No Boy'?",
        answer="John Okada",
        set_id=1,
    )
    card2 = Card(
        question="Who is the author of 'Interpreter of Maladies'?",
        answer="Jhumpa Lahiri",
        set_id=1,
    )
    card3 = Card(
        question="Who is the author of 'A Gesture Life'?",
        answer="Chang-rae Lee",
        set_id=1,
    )
    card4 = Card(
        question="Who is the protagonist of 'No-No Boy'?",
        answer="Ichiro Yamada",
        set_id=1,
    )
    card5 = Card(
        question="What is the mathematical notation of the 'linear' complexity class?",
        answer="O(n)",
        set_id=3,
    )
    card6 = Card(
        question="Which of the following complexities has the best performance for a large input? O(2^n), O(n^2), O(n!), O(n*log(n))",
        answer="O(n*log(n)) - loglinear",
        set_id=3,
    )
    card6 = Card(
        question="What is the time complexity for inserting a value onto a stack?",
        answer="O(1) - Constant",
        set_id=3,
    )
    card7 = Card(
        question="Rank all the time complexities from most efficient to least efficient using a large data set.",
        answer="Constant, Logarithmic, Linear, Loglinear, Polynomial, Exponential, Factorial",
        set_id=3,
    )
    card8 = Card(
        question="What's the difference between a graph and a tree?",
        answer="A tree must have a root node but graphs may not; graphs can have cyles but trees cannot",
        set_id=2,
    )
    card9 = Card(
        question="In a binary search tree, which of depth-first traversal results in retrieving the nodes in ascending sorted order?",
        answer="In-order traversal",
        set_id=2,
    )
    card11 = Card(
        question="What search would you use to determine the shortest distance between two people in a social network?",
        answer="Breadth-first search",
        set_id=2,
    )
    card10 = Card(
        question="What is the name of the node in a tree that does not have a parent node?",
        answer="the root node",
        set_id=2,
    )

    cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11]
    for card in cards:
        db.session.add(card)
    db.session.commit()

    like1 = Like(
        user_id=1,
        set_id=1,
    )
    like2 = Like(
        user_id=1,
        set_id=2,
    )
    like3 = Like(
        user_id=2,
        set_id=1,
    )
    like4 = Like(
        user_id=2,
        set_id=2,
    )
    like5 = Like(
        user_id=2,
        set_id=3,
    )
    like6 = Like(
        user_id=3,
        set_id=2,
    )
    like7 = Like(
        user_id=4,
        set_id=3,
    )
    like8 = Like(
        user_id=4,
        set_id=1,
    )

    likes = [like1, like2, like3, like4, like5, like6, like7, like8]
    for like in likes:
        db.session.add(like)
    db.session.commit()


    favorite1 = Favorite(
        user_id=1,
        set_id=1,
    )
    favorite2 = Favorite(
        user_id=1,
        set_id=2,
    )
    favorite3 = Favorite(
        user_id=2,
        set_id=1,
    )
    favorites = [favorite1, favorite2, favorite3]
    for favorite in favorites:
        db.session.add(favorite)
    db.session.commit()

    friendship = friendships.insert().values(friender=1, friended=2, pending=False)
    friendship2 = friendships.insert().values(friender=1, friended=3, pending=False)
    friendship3 = friendships.insert().values(friender=4, friended=1, pending=True)
    friendship4 = friendships.insert().values(friender=2, friended=3, pending=False)
    friendship5 = friendships.insert().values(friender=3, friended=4, pending=False)
    db.engine.execute(friendship)
    db.engine.execute(friendship2)
    db.engine.execute(friendship3)
    db.engine.execute(friendship4)
    db.engine.execute(friendship5)

    recommendation = recommendations.insert().values(sender=3, to=1, received=True, set_id=1)
    recommendation1 = recommendations.insert().values(sender=2, to=1, received=False, set_id=2)
    recommendation2 = recommendations.insert().values(sender=1, to=2, received=False, set_id=3)
    recommendation3 = recommendations.insert().values(sender=3, to=1, received=False, set_id=3)
    db.engine.execute(recommendation)
    db.engine.execute(recommendation1)
    db.engine.execute(recommendation2)
    db.engine.execute(recommendation3)

    message = messages.insert().values(sender=3, to=1, received=True, created_at=datetime( 2020, 11, 20), message="hey!!")
    message1 = messages.insert().values(sender=2, to=1, received=True, created_at=datetime(2020, 10, 25), message="did you see my rec?")
    message2 = messages.insert().values(sender=3, to=1, received=False, created_at=datetime.now(), message="how's studying been going?")
    message3 = messages.insert().values(sender=1, to=3, received=True, created_at=datetime(2020, 11, 30), message="heyyy its been a while")
    db.engine.execute(message)
    db.engine.execute(message1)
    db.engine.execute(message2)
    db.engine.execute(message3)
