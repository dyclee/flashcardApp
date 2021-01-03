import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Button} from '@material-ui/core';
import '../styles/quiz.css';

export default function Quiz({setId}) {
    // console.log(setId);
    const dispatch = useDispatch();
    const set = useSelector(state => state.setReducer[setId])
    const [questions, setQuestions] = useState();

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // console.log("SET FROM QUIZ", set);
    useEffect(() => {
        const answerBank = []
        const questionsT = set.cards.map((card) => {
            answerBank.push(card.answer);
            let obj = {}
            obj.q = card.question;
            obj.a = card.answer;
            return obj
        });
        // console.log("QUESTIONS", questionsT)
        // console.log("ANSWERS", answerBank);
        const makeQuestions = [];
        // for (let question in questionsT) {
        questionsT.forEach((question) => {
            const newQobj = {}
            // console.log("QUESTION", question)
            newQobj.questionText = question.q;
            newQobj.answerOptions = [{answerText: question.a, isCorrect: true}];

            let answerBankTemp = [...answerBank];
            for (let i=0; i < 3; i++) {
                if (answerBankTemp.length === 0) {
                    continue;
                }
                let randomIndex = getRandomInt(answerBankTemp.length);
                if (answerBankTemp[randomIndex] === question.a) {
                    answerBankTemp.splice(randomIndex, 1);
                    if (answerBankTemp.length === 0) {
                        continue;
                    }
                    randomIndex = getRandomInt(answerBankTemp.length);
                }
                const answerArr = answerBankTemp.splice(randomIndex, 1)
                const answer = answerArr[0]
                const randomA = { answerText: answer, isCorrect: false}
                newQobj.answerOptions.push(randomA)
            }
            const shuffleOptions = shuffle(newQobj.answerOptions)
            newQobj.answerOptions = shuffleOptions;
            // console.log("NEW Q OBJ", newQobj)
            makeQuestions.push(newQobj)

        })
        const shuffleQuestions = shuffle(makeQuestions);
        setQuestions(shuffleQuestions);
    }, [])
    // const [restart, setRestart] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
    };

    const handleResetQuiz = (e) => {
        e.preventDefault();
        setCurrentQuestion(0);
        setScore(0);
        setQuestions(shuffle(questions));
        setShowScore(false);
    }
    // console.log("SET", set);
    if (!set || !questions || !set.cards.length) return null;
    return (
        <div className='quiz-body'>
            <div className='quiz-app'>
                {showScore ? (<>
                    <div className='quiz-score-section'>
                        <h2>You scored {score} out of {questions.length}</h2>
                        <Button style={{width: "150px"}} color="secondary" variant="contained" onClick={handleResetQuiz}>Start Over</Button>
                    </div>
                </>) : (
                    <>
                        <div className='quiz-question-section'>
                            <div className='quiz-question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='quiz-question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='quiz-answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button className="quiz-button" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
	);
}
