'use client';

import { Question } from '@/types/question';

import { questions } from '@/utils/questions';
import { AnimatePresence, motion } from 'framer-motion';
import React, { JSX } from 'react';

export default function Questions(): JSX.Element {
  const [questionsSubset, setQuestionsSubset] = React.useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [guessed, setGuessed] = React.useState<{ [key: number]: boolean }>({});
  const [selectedOption, setSelectedOption] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const shuffled = [...questions.questions].sort(() => 0.5 - Math.random());
    setQuestionsSubset(shuffled.slice(0, 5));
  }, []);

  if (questionsSubset.length === 0) {
    return (
      <div className='flex justify-center items-center h-full text-white'>
        Loading...
      </div>
    );
  }

  const currentQuestion = questionsSubset[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= questionsSubset.length;

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctOptionIndex;

    setTimeout(() => {
      setGuessed((prev) => ({
        ...prev,
        [currentQuestion.id]: isCorrect,
      }));
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }, 1000);
  };

  const progress = ((currentQuestionIndex + 1) / questionsSubset.length) * 100;

  return (
    <div className='flex flex-col h-full'>
      {/* Progress Bar */}
      {!isFinished && (
        <div className='w-full bg-zinc-800/50 h-1.5 rounded-full mb-8 overflow-hidden'>
          <motion.div
            className='h-full bg-gradient-to-r from-indigo-500 to-rose-500'
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className='flex-1 flex flex-col justify-center'>
        <AnimatePresence mode='wait'>
          {!isFinished ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className='w-full'
            >
              <div className=''>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='mb-2 text-xs font-bold tracking-widest text-zinc-500 uppercase'
                >
                  Question {currentQuestionIndex + 1}
                </motion.div>

                <h4 className='mb-8 text-2xl font-bold leading-tight text-white'>
                  {currentQuestion.text}
                </h4>

                <ul className='space-y-3'>
                  {currentQuestion.options.map((option, index) => (
                    <li key={index} className='relative'>
                      <button
                        disabled={selectedOption !== null}
                        className={`w-full rounded-2xl border-2 px-6 py-5 text-left transition-all duration-200 shadow-sm active:scale-98 flex justify-between items-center ${
                          selectedOption !== null && selectedOption !== index
                            ? 'opacity-40 border-zinc-800 bg-zinc-900/50 cursor-not-allowed'
                            : selectedOption === index
                              ? index === currentQuestion.correctOptionIndex
                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100' // Correct selected
                                : 'border-rose-500/50 bg-rose-500/10 text-rose-100' // Wrong selected
                              : 'border-transparent bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-100 hover:shadow-md' // Default
                        }`}
                        onClick={() => handleAnswer(index)}
                      >
                        <span className='font-medium text-lg'>{option}</span>
                        {selectedOption === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 2, rotate: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 15,
                            }}
                            className='shrink-0 ml-4'
                          >
                            <span className='text-2xl block'>
                              {index === currentQuestion.correctOptionIndex
                                ? '✅'
                                : '❌'}
                            </span>
                          </motion.div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='results'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className='text-center'
            >
              <div className='py-8'>
                <div className='text-6xl mb-6'>🏆</div>
                <h2 className='mb-2 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-rose-400'>
                  All Done!
                </h2>
                <p className='text-zinc-400 text-lg mb-8'>
                  You scored{' '}
                  <strong className='text-white'>
                    {
                      Object.values(guessed).filter((isCorrect) => isCorrect)
                        .length
                    }
                  </strong>{' '}
                  out of{' '}
                  <strong className='text-white'>
                    {questionsSubset.length}
                  </strong>
                  .
                </p>
                <button
                  onClick={() => {
                    const shuffled = [...questions.questions].sort(
                      () => 0.5 - Math.random()
                    );
                    setQuestionsSubset(shuffled.slice(0, 5));
                    setCurrentQuestionIndex(0);
                    setGuessed({});
                  }}
                  className='w-full rounded-2xl bg-white text-black font-bold text-lg px-8 py-4 hover:bg-zinc-200 transition-colors shadow-xl active:scale-95'
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
