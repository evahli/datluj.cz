import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const makeInitialWords = (count = 3, size = 6) => {
  const arr: string[] = [];
  while (arr.length < count) {
    const w = generateWord(size) || 'jahoda';
    arr.push(w);
  }
  return arr;
};


const Stage = () => {
  const [words, setWords] = useState<string[]>(() => makeInitialWords(3, 6));
  const [mistakes, setMistakes] = useState<number>(0)

  const handleFinish = () => {
    setWords(prev => {
      const newArr = prev.slice(1);
      const next = generateWord(6) || 'jahoda';
      newArr.push(next);
      return newArr;
    });
  };

  const handleMistake = () => {
    setMistakes(prev => prev + 1);
  }

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, idx) => (
          <Wordbox
            word={word}
            key={`${word}-${idx}`}
            onFinish={handleFinish}
            active={idx === 0}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
