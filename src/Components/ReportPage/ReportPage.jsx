import React from "react";
import "./ReportPage.css"
const ReportPage = ({ reportCardData, finalScore }) => {
  const {numberOfQuestions,timer} = reportCardData[0];
  return (
    <>
      <form className="box">
        <div className="rowHeading">REPORT CARD</div>
        <div className="rowDescription">
          {numberOfQuestions} QUESTIONS {timer} SECONDS EACH
        </div>
        <br />
        <br />
        <div className="scorecard">SCORE--{finalScore}</div>
        <br></br>

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Question</th>
              <th>Response</th>
              <th>Answer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportCardData.map((item, index) => {
              const { question, answer, solution, result } = item;
              return (
                <tr key={`row${index + 1}`}>
                  <td>{index + 1}</td>
                  <td>{question}</td>
                  <td>{answer}</td>
                  <td>{solution}</td>
                  <td>{result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default ReportPage;
