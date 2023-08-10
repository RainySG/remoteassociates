import React, { useState } from 'react';
import './Questiongenerator.css';
function getQuestionPart(phrases: string[]): string[] {
  const commonWord = phrases[0]
    .split(' ')
    .find(word => phrases.slice(1).every(phrase => phrase.includes(word))) || '';

  const commonWordWithoutSpaces = commonWord.replace(/\s/g, '');

  const uniqueParts = phrases.map(phrase => {
    const words = phrase.split(' ');
    const uniqueWords = words.filter(word => !commonWordWithoutSpaces.includes(word.replace(/\s/g, '')));
    return uniqueWords.join('');         
  });

  return uniqueParts;
}

const QuestionGenerator: React.FC = () => {
  const [phrases, setPhrases] = useState(['', '', '']);
  const [questionParts, setQuestionParts] = useState<string[]>(getQuestionPart(phrases));

  const handlePhrasesChange = (index: number, value: string) => {
    const newPhrases = [...phrases];
    newPhrases[index] = value.toUpperCase();
    setPhrases(newPhrases);
    setQuestionParts(getQuestionPart(newPhrases));
  };

  return (
    <div className='main'>
      <h1>Remote Associates Test</h1>
      <p>Please word spacing</p>
      <p>Ex.BATH ROOM </p>
      {phrases.map((phrase, index) => (
        <input
          key={index}
          type="text"
          value={phrase}
          onChange={(e) => handlePhrasesChange(index, e.target.value)}
        />
      ))}
      <h2>Question Parts:</h2>
      <ul>
        {questionParts.map((part, index) => (
          <li key={index}>{part}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionGenerator;