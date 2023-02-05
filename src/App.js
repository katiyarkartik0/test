import React, { useState } from "react";
import Form from "./Components/Form/Form";
import Test from "./Components/Test/Test";
import "./App.css";
function App() {
  const [constraints, setConstraints] = useState([]);
  const inputDetails = (details) => {
    setConstraints([...constraints, details]);
  };


  return (
    <div className="App">
      <Form inputDetails={inputDetails} />
      <div className="displayTests">
        {constraints.map((item, index) => {
          return <Test constraints={item} key={`test${index}`}/>;
        })}
      </div>
    </div>
  );
}

export default App;
