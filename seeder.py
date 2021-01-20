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
        avatarUrl="https://www.insightsonindia.com/wp-content/uploads/2017/12/Indian-Forest-Act-1.jpg",
    )
    test2 = User(
        username="ramenman",
        email="ramen@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#af4d98",
        created_at=datetime(2020, 10, 20),
        avatarUrl="https://blog.williams-sonoma.com/wp-content/uploads/2018/09/oct-7-Pork-Ramen-with-Bean-Sprouts.jpg",
    )
    test3 = User(
        username="rainbows",
        email="rainbow@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
        avatarUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Rainbow-gradient-fully-saturated.svg/1024px-Rainbow-gradient-fully-saturated.svg.png",
    )
    test4 = User(
        username="karatekid2",
        email="karate@email.com",
        hashed_password="pbkdf2:sha256:150000$X9FojJy5$2716c66169cc5cc6ef21a128297931b625f0082ba58c963bda1f41b84f5d8920",
        color="#2c699a",
        created_at=datetime(2020, 10, 20),
        avatarUrl="https://thehappypuppysite.com/wp-content/uploads/2015/12/adopt-rescue.png",
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
        title="Asian American LIT - classics",
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
        question="Big O notation of 'factorial'",
        answer="O(n!)",
        set_id=3,
    )
    card6 = Card(
        question="time and space complexities of a merge sort",
        answer="O(n*log(n)), O(n)",
        set_id=3,
    )
    card16 = Card(
        question="time complexity for inserting a value onto a stack",
        answer="O(1)",
        set_id=3,
    )
    card7 = Card(
        question="Rank all the time complexities from most efficient to least efficient",
        answer="Constant, Logarithmic, Linear, Loglinear, Polynomial, Exponential, Factorial",
        set_id=3,
    )
    card8 = Card(
        question="time complexity of a binary search algorithm",
        answer="O(log n)",
        set_id=3,
    )
    card9 = Card(
        question="time complexity of a bubble sort",
        answer="O(n^2)",
        set_id=3,
    )
    card12 = Card(
        question="time complexity",
        answer="the amount of time it takes to run an algorithm",
        set_id=3,
    )
    card13 = Card(
        question="space complexity",
        answer="the amount of memory used by an algorithm",
        set_id=3,
    )
    card14 = Card(
        question="memoization",
        answer="a programming technique to increase efficiency by storing the results of expensive function calls and returning the cached result when inputs are repeated",
        set_id=3,
    )
    card15 = Card(
        question="tabulation",
        answer="a systematic & logical presentation of numeric data in rows and columns to facilitate comparison and statistical analysis",
        set_id=3,
    )
    card17 = Card(
        question="time complexity of iterating through an array",
        answer="O(n)",
        set_id=3,
    )
    card18 = Card(
        question="difference between a graph and a tree",
        answer="A tree must have a root node but graphs may not; graphs can have cyles but trees cannot",
        set_id=2,
    )
    card10 = Card(
        question="order of nodes visited using an 'In-order' traversal",
        answer="left subtree, root, right subtree",
        set_id=2,
    )
    card11 = Card(
        question="order of nodes visited using an 'Pre-order' traversal",
        answer="root, left subtree, right subtree",
        set_id=2,
    )
    card45 = Card(
        question="order of nodes visited using an 'Post-order' traversal",
        answer="left subtree, right subtree, root",
        set_id=2,
    )
    card19 = Card(
        question="traversal that results in retrieving the nodes in ascending sorted order",
        answer="In-order traversal",
        set_id=2,
    )
    card20 = Card(
        question="search would you use to determine the shortest distance between two people in a social network",
        answer="Breadth-first search",
        set_id=2,
    )
    card21 = Card(
        question="node in a tree that does not have a parent node",
        answer="the root node",
        set_id=2,
    )
    card22 = Card(
        question="binary tree",
        answer="A data structure where each node may have up to two children",
        set_id=2,
    )
    card23 = Card(
        question="leaf node",
        answer="A node without child nodes",
        set_id=2,
    )
    card24 = Card(
        question="graph cycle",
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
        answer="AKA 68-95-99.7 rule - normal distribution",
        set_id=4,
    )
    card31 = Card(
        question="HTML",
        answer="hyper text markup language",
        set_id=5,
    )
    card32 = Card(
        question="<ul> tag",
        answer="unordered list",
        set_id=5,
    )
    card41 = Card(
        question="<ol> tag",
        answer="ordered list",
        set_id=5,
    )
    card42 = Card(
        question="<li> tag",
        answer="list item",
        set_id=5,
    )
    card33 = Card(
        question="<link> tag",
        answer="defines the relationship between the current document and an external resource (commonly used for css stylesheets)",
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
        question="types of JavaScript values",
        answer="literals and variables",
        set_id=1,
    )
    card37 = Card(
        question="JS is case-sensitive",
        answer="true",
        set_id=1,
    )
    card38 = Card(
        question="the primitive JS data-types",
        answer="undefined, boolean, number, string, BigInt, symbol",
        set_id=1,
    )
    card39 = Card(
        question="structural JS data-types",
        answer="object, function",
        set_id=1,
    )
    card40 = Card(
        question="logical operator of 'NOT'",
        answer="'!'",
        set_id=1,
    )
    card43 = Card(
        question="logical operator of 'AND'",
        answer="'&&'",
        set_id=1,
    )
    card44 = Card(
        question="logical operator of 'OR'",
        answer="'||'",
        set_id=1,
    )
    card46 = Card(
        question="time and space complexities of heap sort",
        answer="O(n*log(n)) , O(1)",
        set_id=3,
    )
    card47 = Card(
        question="linked list",
        answer="a linear collection of data elements whose order is not given by their physical placement in memory, instead, each element points to the next",
        set_id=2,
    )
    card48 = Card(
        question="orphan node",
        answer="a node that has been removed from a collection and has no reference",
        set_id=2,
    )
    card49 = Card(
        question="select element by ID",
        answer="Document.getElementById(#value)",
        set_id=1,
    )
    card50 = Card(
        question="select element by class",
        answer="Document.querySelector(.value)",
        set_id=1,
    )
    card51 = Card(
        question="method that cancels the default action of an event",
        answer="e.preventDefault()",
        set_id=1,
    )
    card52 = Card(
        question="'AJAX'",
        answer="'Aysynchrous JavaScript and XML', a technique used to create interactivity by using partial page updates",
        set_id=1,
    )
    card53 = Card(
        question="'DOM'",
        answer="Document Object Model, cross-platform and language-independent interface using a tree structure",
        set_id=1,
    )
    card54 = Card(
        question="BOM",
        answer="Browser Object Model, browser-specific convention referring to all the objects exposed by the web browser, no standard implementation",
        set_id=1,
    )
    card55 = Card(
        question="whitespace",
        answer="used to structure code, must be aligned properly to prevent syntax errors",
        set_id=6,
    )
    card56 = Card(
        question="single-line comment",
        answer="line begins with a number sign '#'",
        set_id=6,
    )
    card57 = Card(
        question="multi-line comment",
        answer="lines surrounded by triple quotations",
        set_id=6,
    )
    card58 = Card(
        question="'**'",
        answer="used for exponentiation",
        set_id=6,
    )
    card59 = Card(
        question="len(value)",
        answer="used to calculate the length of an data structure (string, list, tuple, dictionary)",
        set_id=6,
    )
    card60 = Card(
        question="sequence data-types",
        answer="string, bytes, tuple, list, range",
        set_id=6,
    )
    card61 = Card(
        question="collection data-types",
        answer="dictionary, set, frozen set",
        set_id=6,
    )
    card63 = Card(
        question="lower(value)",
        answer="makes all characters lowercase",
        set_id=6,
    )
    card64 = Card(
        question="upper(value)",
        answer="makes all characters uppercase",
        set_id=6,
    )
    card65 = Card(
        question="str(value)",
        answer="converts value into a string data-type",
        set_id=6,
    )
    card66 = Card(
        question="print(value)",
        answer="a command that displays value onto the console",
        set_id=6,
    )
    card67 = Card(
        question="'=', equal sign",
        answer="a symbol used to define variables",
        set_id=6,
    )
    card68 = Card(
        question="'===', triple equal sign",
        answer="a symbol used to compare left and right values, results in a boolean",
        set_id=6,
    )
    card69 = Card(
        question="'append' method",
        answer="adds a value onto the end of a list",
        set_id=6,
    )
    card70 = Card(
        question="index(value)",
        answer="returns the position at the first occurrence of the specified value",
        set_id=6,
    )
    card71 = Card(
        question="max(value)",
        answer="returns the greatest element in a list",
        set_id=6,
    )
    card71 = Card(
        question="min(value)",
        answer="returns the smallest element in a list",
        set_id=6,
    )
    card72 = Card(
        question="slice method",
        answer="returns specified elements within a list, arr[start : stop : step]",
        set_id=6,
    )
    card73 = Card(
        question="splice method",
        answer="changes an array by removing existing elements and adding new elements in place, arr.splice(start, deleteCount, item1,..)",
        set_id=1,
    )
    card74 = Card(
        question="tuple",
        answer="data-type used to store multiple items in a single variable, ('apple', 'banana', 'cherry')",
        set_id=6,
    )
    card75 = Card(
        question="dictionary",
        answer="data-type used to store key-value pairs, unordered, changeable, and does not allow duplicate keys",
        set_id=6,
    )
    card76 = Card(
        question="set",
        answer="data-type used to store unique items in a single variable, {'apple', 'banana', 'cherry'}",
        set_id=6,
    )
    card77 = Card(
        question="falsey values",
        answer="undefined, null, NaN, 0, '', false",
        set_id=1,
    )
    card78 = Card(
        question="string interpolation",
        answer="used to incorporate variables into value, `${variable }`",
        set_id=1,
    )
    card62 = Card(
        question="self-loop",
        answer="an edge that links a vertex to itself",
        set_id=2,
    )
    card79 = Card(
        question="simple graph",
        answer="a graph without self-loops",
        set_id=2,
    )


    cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, \
            card12, card13, card14, card15, card16, card17, card18, card19, card20, \
            card21, card22, card23, card24, card25, card26, card27, card28, card29, card30, \
            card31, card32, card33, card34, card35, card36, card37, card38, card39, card40, \
            card41, card42, card43, card44, card45, card46, card47, card48, card49, card50, \
            card51, card52, card53, card54, card55, card56, card57, card58, card59, card60, \
            card61, card62, card63, card64, card65, card66, card67, card68, card69, card70, \
            card71, card72, card73, card74, card75, card76, card77, card78, card79]
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
