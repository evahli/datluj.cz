import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  // Reset při změně slova
  useEffect(() => {
    setLettersLeft(word);
    setMistake(false);
  }, [word]);

  //reakce na kazdy stisk klavesnice
  useEffect(() => {
    if (!active) return;

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      if (!key || key.length !== 1) return;

      const expected = lettersLeft?.[0];
      if (!expected) return;

      const isCorrect = expected.toLowerCase() === key.toLowerCase();

      if (isCorrect) {
        // Správné písmeno: reset chyby a odebrání písmena
        if (mistake) setMistake(false);

        if (lettersLeft.length === 1) {
          onFinish();
          return;
        }

        setLettersLeft(prev => prev.slice(1));
        return;
      }

      if (!mistake) {
        setMistake(true);
        onMistake();
      }
    };

    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [active, lettersLeft, mistake, onMistake, onFinish]);

  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
    {lettersLeft}
    </div>
  );
};

export default Wordbox;
