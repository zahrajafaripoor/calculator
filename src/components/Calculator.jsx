import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import '../App.css'; // Relative path to App.css

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const clickSound = new Audio('/sound/click-sound.wav'); // Load the click sound

  const handleButtonClick = (button) => {
    clickSound.play(); // Play the click sound on button press
    
    if (button === 'AC') {
      setExpression('');
      setResult('');
    } else if (button === '=') {
      try {
        const evalExpression = expression
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/−/g, '-');
        const evalResult = evaluate(evalExpression);
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else {
      setExpression((prev) => prev + button);
    }
  };

  const buttons = [
    'AC', '+/-', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '−',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="calculator-container">
      <div className="expression">{expression || '0'}</div>
      <div className="result">{result}</div>
      <div className="button-grid">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button)}
            className={`button ${
              button === '0' ? 'button-zero' : 
              button === '=' ? 'button-equals' :
              ['÷', '×', '−', '+'].includes(button) ? 'button-orange' :
              ['AC', '+/-', '%'].includes(button) ? 'button-gray-light' :
              'button-gray-dark'
            }`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
