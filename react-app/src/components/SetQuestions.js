import React from 'react';

export default function SetQuestions({ set }) {
    console.log(set.cards);
    return (<>
        <div className="setdisplay__question-list">
            <table>
                <thead>
                    <tr>
                        <th colspan="1">Question</th>
                        <th colspan="1">Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {set.cards.map((card) => {
                        return(<>
                            <tr>
                                <td>{card.question}</td>
                                <td>{card.answer}</td>
                            </tr>
                            {/* <div className="setdisplay__item">
                                <div className="setdisplay__item-question">
                                    {card.question}
                                </div>
                                <div className="item-separator"></div>
                                <div className="setdisplay__item-answer">
                                    {card.answer}
                                </div>
                            </div> */}
                        </>)
                    })}

                </tbody>
            </table>
        </div>
    </>)
}
