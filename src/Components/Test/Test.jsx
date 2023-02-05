import { useState, useEffect, useCallback } from "react";
import QuestionPage from "../QuestionPage/QuestionPage";
import ReportPage from "../ReportPage/ReportPage";
import {
  randomNumber,
  randomNumberAvoidingZero,
  pickAnOperator,
  pickAnOperatorAvoidingDivision,
  solve
} from "../../HelperFunctions";

export const Test = ({
  constraints: {
    minimumLimit,
    maximumLimit,
    numberOfQuestions,
    timer,
    operationsAllowed: arrayOfOperators = []
  }
}) => {
  const [isTestActive, setIsTestActive] = useState(true);
  const [reportCardData, setReportCardData] = useState([]);
  const [finalScore, setFinalScore] = useState();

  const generateRandomNumber = useCallback(
    () => randomNumber(minimumLimit, maximumLimit),
    [maximumLimit, minimumLimit]
  );

  const [firstOperand, setFirstOperand] = useState(generateRandomNumber);
  const [secondOperand, setSecondOperand] = useState(generateRandomNumber);
  const [operator, setOperator] = useState(
    pickAnOperatorAvoidingDivision(arrayOfOperators)
  );

  const [time, setTime] = useState(timer);
  const [questionsLeft, setquestionsLeft] = useState(numberOfQuestions);
  const [answer, setAnswer] = useState("");
  const [reportCard, setReportCard] = useState([]);
  const [score, setScore] = useState(0);

  const question = `${firstOperand} ${operator} ${secondOperand}`;
  const solution = solve(firstOperand, secondOperand, operator).toFixed(2);

  useEffect(() => {
    setOperator(() => {
      return secondOperand !== 0
        ? pickAnOperator(arrayOfOperators)
        : pickAnOperatorAvoidingDivision(arrayOfOperators);
    });
  }, [arrayOfOperators, secondOperand, questionsLeft]);

  const isAnswerValid = () => {
    return parseFloat(answer) === parseFloat(solution);
  };

  const updateQuestion = useCallback(() => {
    setquestionsLeft((prevQuestionsLeft) => prevQuestionsLeft - 1);
    setFirstOperand(generateRandomNumber);
    setSecondOperand(
      arrayOfOperators.length === 1 && arrayOfOperators[0] === "/"
        ? randomNumberAvoidingZero(minimumLimit, maximumLimit)
        : generateRandomNumber
    );
  }, [arrayOfOperators, maximumLimit, minimumLimit, generateRandomNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnswerValid()) {
      setScore((prevScore) => prevScore + 1);
    }
    updateReportCard();
    updateQuestion();
    setAnswer(""); //empty answer field for user to input
    setTime(timer); //update clock for a new question
  };

  const handleChange = ({ target: { value } }) => {
    setAnswer(value);
  };

  const updateReportCard = useCallback(() => {
    setReportCard((prevReportCard) => [
      ...prevReportCard,
      {
        numberOfQuestions,
        timer,
        question,
        answer,
        solution,
        result:
          parseFloat(solution) === parseFloat(answer)
            ? "CORRECT"
            : answer
            ? "INCORRECT"
            : "N/A"
      }
    ]);
  }, [numberOfQuestions, timer, question, answer, solution]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (time === 0) {
        //when time runs out for each question, bring new question after updating the report card
        updateReportCard();
        setTime(timer);
        updateQuestion();
      } else {
        setTime(time - 1);
      }
    }, 1000);

    const generateReportCard = () => {
      //generating reportCard before unmounting the question page
      setReportCardData(reportCard);
      setFinalScore(score);
      setIsTestActive(false);
    };

    if (questionsLeft === 0) {
      generateReportCard();
      clearTimeout(timeoutID);
    }
    return () => clearTimeout(timeoutID);
  }, [
    timer,
    updateReportCard,
    time,
    updateQuestion,
    question,
    questionsLeft,
    reportCard,
    score
  ]);

  const collectionOfTestDetailsAndHandlers = {
    handleSubmit,
    numberOfQuestions,
    timer,
    questionsLeft,
    time,
    question,
    answer,
    handleChange,
    score
  };
  return (
    <>
      {isTestActive ? (
        <QuestionPage {...collectionOfTestDetailsAndHandlers} />
      ) : (
        <ReportPage reportCardData={reportCardData} finalScore={finalScore} />
      )}
    </>
  );
};
export default Test;
