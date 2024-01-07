import React, { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");
  const [finaOutput, setFinalOutput] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/capitalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.data[0]);
      setFinalOutput(data.data[0]);
      setName("");
      // setCapitalizedName(data.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flexbox">
      <h1>Enter text to analyze</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Enter the text to analyze"
          value={name}
          onChange={handleNameChange}
          rows={10}
        />

        <button type="submit">Submit</button>
      </form>
      {finaOutput && (
        <>
          <h2>Label: {finaOutput.label}</h2>
          <h2>Score: {finaOutput.score}</h2>
        </>
      )}
    </div>
  );
}

export default NameForm;
