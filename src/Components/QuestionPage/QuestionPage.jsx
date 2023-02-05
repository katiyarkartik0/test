import React from "react";
import "./QuestionPage.css";

const QuestionPage = ({handleSubmit,numberOfQuestions,timer,questionsLeft,time,question,answer,handleChange,score}) => {
  return (
    <>
      <form className="box" onSubmit={handleSubmit}>
        <div className="rowHeading">QUIZ</div>
        <div className="rowDescription">
          {numberOfQuestions} QUESTIONS {timer} SECONDS EACH
        </div>
        <br />
        <br />
        <div className="progress">
          <div>QUESTIONS LEFT :{questionsLeft}</div>{" "}
          <div>TIME LEFT: {time} SECONDS</div>
        </div>
        <br />
        <br />
        <div className="form">
          <div className="question">{question}</div>
          <input
            className="answer"
            value={answer}
            onChange={handleChange}
          ></input>
          <button type="submit">SUBMIT</button>
        </div>
        <br />
        <br />
        <div className="scorecard">SCORE--{score}</div>
      </form>
    </>
  );
};

export default QuestionPage;
