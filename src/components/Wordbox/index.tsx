import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}


const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      if (!key) return;
      if (key.length !== 1) return;
      const expected = lettersLeft?.[0];
      if (!expected) return;
      const isCorrect = expected.toLowerCase() === key.toLowerCase();
      if (isCorrect) {
        setMistake(false);
        if (lettersLeft.length === 1) {
          onFinish();
          return;
        }


        setLettersLeft(prev => prev.slice(1));
        return;
      }
      setMistake(true);
    };

    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [lettersLeft]);


  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
      {lettersLeft || '✔️ Hotovo!'}
    </div>
  );
};

export default Wordbox;
