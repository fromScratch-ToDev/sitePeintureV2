import React, { useState, useEffect } from 'react';

const data = ["Option 1", "Option 2", "Option 3"]; // Votre tableau de chaînes de caractères

function YearSelector() {
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [checkboxes, setCheckboxes] = useState(data.map(() => false));

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setMaxYear(currentYear);
  }, []);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  return (
    <form>
      <label htmlFor="year">Choisissez une année:</label>
      <input
        type="number"
        id="year"
        name="year"
        min="1970"
        max={maxYear}
        step="1"
        style={{
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          paddingLeft: '5px',
          fontSize: '16px',
          width: '100px'
        }}
      />
      {data.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`option-${index}`}
            name={`option-${index}`}
            checked={checkboxes[index]}
            onChange={() => handleCheckboxChange(index)}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </form>
  );
}

export default YearSelector;
