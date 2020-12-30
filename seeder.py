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
    test4 = User(
        username="karatekid2",
        email="karate@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
    )
    test5 = User(
        username="codemaster34",
        email="codemaster@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
        avatarUrl="https://img2.wikia.nocookie.net/__cb20140810222650/disney/images/0/0d/Mighty_ducks_primary_logo.png",
    )
    test6 = User(
        username="lemonbarzz",
        email="lemon@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
    )
    test7 = User(
        username="sprinkles88",
        email="sprinkles@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
    )
    test8 = User(
        username="rocketeer",
        email="rocket@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
    )
    test9 = User(
        username="makiroll",
        email="maki@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
    )
    users = [demo, test, test2, test3, test4, test5, test6, test7, test8, test9]

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
        name="Statistics",
    )
    subject4 = Subject(
        name="Javascript",
    )
    subject5 = Subject(
        name="HTML & CSS",
    )
    subject6 = Subject(
        name="Python",
    )
    subject7 = Subject(
        name="Data Science",
    )
    subjects = [subject1, subject2, subject3, subject4, subject5, subject6, subject7]

    for subject in subjects:
        db.session.add(subject)
    db.session.commit()

    set1 = Set(
        title="Javascript Syntax",
        description="As vanilla as it gets",
        subject_id=4,
        created_by=1,
        created_at=datetime(2019, 12, 17)
    )
    set2 = Set(
        title="Graphs and Trees",
        description="Random practice questions",
        subject_id=1,
        created_by=1,
        created_at=datetime(2019, 12, 28)
    )
    set3 = Set(
        title="Time and Space Complexities",
        description="Quiz for DSA time and space complexities",
        subject_id=1,
        created_by=2,
        created_at=datetime(2020, 1, 15)
    )
    set4 = Set(
        title="STATS 101",
        description="Primer for intro stats",
        subject_id=3,
        created_by=3,
        created_at=datetime(2020, 2, 15)
    )
    set5 = Set(
        title="HTML Basics",
        description="Elements and such",
        subject_id=5,
        created_by=5,
        created_at=datetime(2020, 4, 3)
    )
    set6 = Set(
        title="Basic Python Syntax",
        description="Become a python.",
        subject_id=6,
        created_by=6,
        created_at=datetime(2020, 5, 9)
    )
    set7 = Set(
        title="SQL Stuff 2",
        description="The sequel",
        subject_id=7,
        created_by=7,
        created_at=datetime(2020, 5, 16)
    )
    set8 = Set(
        title="CSS Basics",
        description="Attributes and such",
        subject_id=5,
        created_by=5,
        created_at=datetime(2020, 8, 20)
    )
    set9 = Set(
        title="Asian American Classics",
        description="quiz review for AA-LIT 479",
        subject_id=2,
        created_by=4,
        created_at=datetime(2020, 10, 30)
    )
    sets = [set1, set2, set3, set4, set5, set6, set7, set8, set9]
    for each in sets:
        db.session.add(each)
    db.session.commit()

    card1 = Card(
        question="Who is the author of 'No-No Boy'?",
        answer="John Okada",
        set_id=9,
    )
    card2 = Card(
        question="Who is the author of 'Interpreter of Maladies'?",
        answer="Jhumpa Lahiri",
        set_id=9,
    )
    card3 = Card(
        question="Who is the author of 'A Gesture Life'?",
        answer="Chang-rae Lee",
        set_id=9,
    )
    card4 = Card(
        question="Who is the protagonist of 'No-No Boy'?",
        answer="Ichiro Yamada",
        set_id=9,
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
    card16 = Card(
        question="What is the time complexity for inserting a value onto a stack?",
        answer="O(1) - Constant",
        set_id=3,
    )
    card7 = Card(
        question="Rank all the time complexities from most efficient to least efficient using a large data set.",
        answer="Constant, Logarithmic, Linear, Loglinear, Polynomial, Exponential, Factorial",
        set_id=3,
    )
    card12 = Card(
        question="What is time complexity?",
        answer="the amount of time it takes to run an algorithm",
        set_id=3,
    )
    card13 = Card(
        question="What is space complexity?",
        answer="the amount of memory used by an algorithm",
        set_id=3,
    )
    card14 = Card(
        question="What is memoization?",
        answer="a programming technique to increase efficiency by storing the results of expensive function calls and returning the cached result when inputs are repeated",
        set_id=3,
    )
    card15 = Card(
        question="What is tabulation?",
        answer="a systematic & logical presentation of numeric data in rows and columns to facilitate comparison and statistical analysis",
        set_id=3,
    )
    card17 = Card(
        question="What is the time complexity of iterating through an array?",
        answer="O(n) - Linear",
        set_id=3,
    )
    card18 = Card(
        question="What's the difference between a graph and a tree?",
        answer="A tree must have a root node but graphs may not; graphs can have cyles but trees cannot",
        set_id=2,
    )
    card19 = Card(
        question="In a binary search tree, which of depth-first traversal results in retrieving the nodes in ascending sorted order?",
        answer="In-order traversal",
        set_id=2,
    )
    card20 = Card(
        question="What search would you use to determine the shortest distance between two people in a social network?",
        answer="Breadth-first search",
        set_id=2,
    )
    card21 = Card(
        question="What is the name of the node in a tree that does not have a parent node?",
        answer="the root node",
        set_id=2,
    )
    card22 = Card(
        question="What is a binary tree?",
        answer="A tree where each node may have up to two children",
        set_id=2,
    )
    card23 = Card(
        question="What is a leaf node?",
        answer="A node without child nodes",
        set_id=2,
    )
    card24 = Card(
        question="What is a graph cycle?",
        answer="A path that begins and ends at the same node",
        set_id=2,
    )
    card25 = Card(
        question="Mean",
        answer="the average of a data set",
        set_id=4,
    )
    card26 = Card(
        question="Median",
        answer="The middle-most number of a data set",
        set_id=4,
    )
    card27 = Card(
        question="Range",
        answer="The difference between the the maximum and minimum",
        set_id=4,
    )
    card28 = Card(
        question="Minimum",
        answer="The smallest value of a data set",
        set_id=4,
    )
    card29 = Card(
        question="Maximum",
        answer="The greatest value of a data set",
        set_id=4,
    )
    card30 = Card(
        question="Empirical Rule",
        answer="AKA 68-95-99.7 rule - percentages representing the values that lie within 2, 4, and 6 standard deviations of a 'normal' distribution ",
        set_id=4,
    )
    card31 = Card(
        question="What is HTML?",
        answer="hyper text markup language",
        set_id=5,
    )
    card32 = Card(
        question="What are 'ul', 'ol', and 'li' tags?",
        answer="<ul> stands for unordered list, <ol> stands for ordered list, and <li> is a list item",
        set_id=5,
    )
    card33 = Card(
        question="What is a <link> tag?",
        answer="a tag that defines the relationship between the current document and an external resource (commonly used for css stylesheets)",
        set_id=5,
    )
    card34 = Card(
        question="HTML element",
        answer="any start and end tag with content in between them",
        set_id=5,
    )
    card35 = Card(
        question="HTML attribute",
        answer="provides additional information about HTML elements (Ex. <img src='random-pic.jpg'>)",
        set_id=5,
    )
    card36 = Card(
        question="What are the two types of JavaScript values?",
        answer="literals and variables",
        set_id=1,
    )
    card37 = Card(
        question="True or False: JS is case-sensitive",
        answer="true",
        set_id=1,
    )
    card38 = Card(
        question="What are the six primitive JS data-types?",
        answer="undefined, boolean, number, string, BigInt, symbol",
        set_id=1,
    )
    card39 = Card(
        question="What are the two structural JS data-types?",
        answer="object, function",
        set_id=1,
    )
    card40 = Card(
        question="What are the logical operators for NOT, AND, OR?",
        answer="NOT: '!', AND: '&&', OR: '||' ",
        set_id=1,
    )

    cards = [card1, card2, card3, card4, card5, card6, card7,\
            card12, card13, card14, card15, card16, card17, card18, card19, card20, \
            card21, card22, card23, card24, card25, card26, card27, card28, card29, card30, \
            card31, card32, card33, card34, card35, card36, card37, card38, card39, card40]
    for card in cards:
        db.session.add(card)
    db.session.commit()

    like1 = Like(
        user_id=1,
        set_id=1,
    )
    like2 = Like(
        user_id=2,
        set_id=1,
    )
    like3 = Like(
        user_id=3,
        set_id=1,
    )
    like4 = Like(
        user_id=4,
        set_id=1,
    )
    like5 = Like(
        user_id=5,
        set_id=1,
    )
    like6 = Like(
        user_id=6,
        set_id=1,
    )
    like7 = Like(
        user_id=7,
        set_id=1,
    )
    like8 = Like(
        user_id=8,
        set_id=1,
    )
    like9 = Like(
        user_id=7,
        set_id=4,
    )
    like10 = Like(
        user_id=2,
        set_id=2,
    )
    like11 = Like(
        user_id=2,
        set_id=8,
    )
    like12 = Like(
        user_id=2,
        set_id=3,
    )
    like13 = Like(
        user_id=2,
        set_id=4,
    )
    like14 = Like(
        user_id=2,
        set_id=5,
    )
    like15 = Like(
        user_id=2,
        set_id=6,
    )
    like16 = Like(
        user_id=2,
        set_id=9,
    )
    like17 = Like(
        user_id=3,
        set_id=5,
    )
    like18 = Like(
        user_id=4,
        set_id=5,
    )
    like19 = Like(
        user_id=6,
        set_id=5,
    )
    like20 = Like(
        user_id=9,
        set_id=3,
    )
    like21 = Like(
        user_id=8,
        set_id=3,
    )
    like22 = Like(
        user_id=7,
        set_id=3,
    )
    like23 = Like(
        user_id=6,
        set_id=3,
    )
    like24 = Like(
        user_id=9,
        set_id=4,
    )
    like25 = Like(
        user_id=8,
        set_id=4,
    )
    like26 = Like(
        user_id=8,
        set_id=6,
    )
    like27 = Like(
        user_id=8,
        set_id=3,
    )

    likes = [like1, like2, like3, like4, like5, like6, like7, like8, like9, like10, \
            like11, like12, like13, like14, like15, like16, like17, like18, like19, like20, \
            like21, like22, like23, like24, like25, like26, like27]
    for like in likes:
        db.session.add(like)
    db.session.commit()


    favorite1 = Favorite(
        user_id=1,
        set_id=1,
    )
    favorite2 = Favorite(
        user_id=1,
        set_id=3,
    )
    favorite3 = Favorite(
        user_id=1,
        set_id=6,
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
