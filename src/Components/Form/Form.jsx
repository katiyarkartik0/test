import React, { useState } from "react";

const Form = ({ inputDetails }) => {
  const [operationAllowed, setOperationAllowed] = useState([]);
  const [details, setDetails] = useState({});
  const handleOperations = (e, operation) => {
    e.target.checked ? addOperation(operation) : removeOperation(operation);
  };
  const addOperation = (operation) => {
    setOperationAllowed([...operationAllowed, operation]);
  };
  const removeOperation = (operation) => {
    setOperationAllowed(
      operationAllowed.filter((item) => {
        return item !== operation;
      })
    );
  };
  const handleSubmit = (e) => {
    const { minimumLimit, maximumLimit, operationsAllowed } = details;
    e.preventDefault();
    if (operationAllowed.length === 0) {
      alert("operations field cannot be left empty");
      return;
    }
    if (
      minimumLimit === "0" &&
      maximumLimit === "0" &&
      operationsAllowed.length === 1 &&
      operationsAllowed[0] === "/"
    ) {
      alert("please enter an input that can be calculated");
      return;
    }
    inputDetails(details);
  };
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label>
                Min Limit:
                <input
                  type="number"
                  required
                  onChange={(e) => {
                    setDetails({ ...details, minimumLimit: e.target.value });
                  }}
                ></input>
              </label>
            </td>
            <td>
              <label>
                Max Limit:
                <input
                  type="number"
                  min={"" + (details.minimumLimit ? details.minimumLimit : "")}
                  required
                  onChange={(e) => {
                    setDetails({ ...details, maximumLimit: e.target.value });
                  }}
                ></input>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Number of Questions:
                <input
                  type="number"
                  min="1"
                  required
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      numberOfQuestions: e.target.value
                    });
                  }}
                ></input>
              </label>
            </td>
            <td>
              <label>
                Timer:
                <input
                  type="number"
                  min="1"
                  required
                  onChange={(e) => {
                    setDetails({ ...details, timer: e.target.value });
                  }}
                ></input>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div>CHOOSE OPERATIONS</div>
      <br />
      <label>
        addition:
        <input
          type="checkbox"
          onChange={(e) => {
            handleOperations(e, "+");
          }}
        ></input>
      </label>
      <br />
      <label>
        subtraction:
        <input
          type="checkbox"
          onChange={(e) => {
            handleOperations(e, "-");
          }}
        ></input>
      </label>
      <br />
      <label>
        multiplication:
        <input
          type="checkbox"
          onChange={(e) => {
            handleOperations(e, "*");
          }}
        ></input>
      </label>
      <br />
      <label>
        division:
        <input
          type="checkbox"
          onChange={(e) => {
            handleOperations(e, "/");
          }}
        ></input>
      </label>
      <br />
      <br />
      <button
        onClick={() => {
          setDetails({ ...details, operationsAllowed: operationAllowed });
        }}
        type="submit"
      >
        SUBMIT
      </button>
    </form>
  );
};

export default Form;
