'use client';

import { questions } from '@/utils/questions';
import React, { JSX } from 'react';

export default function Questions(): JSX.Element {
  // state variable should save object with amount of correct guesses and question ids
  const [guessed, setGuessed] = React.useState<{ [key: number]: boolean }>({});
  // track which questions have been answered (regardless of correctness)
  const [answered, setAnswered] = React.useState<Set<number>>(new Set());
  console.log(guessed);
  return (
    <div className='p-8'>
      <h2 className='mb-6 text-2xl font-bold'>Quiz Questions</h2>
      <ul className='space-y-6'>
        {questions.questions.map((question) => (
          <li key={question.id} className='border-b pb-4'>
            <h3 className='mb-2 text-lg font-semibold'>{question.text}</h3>
            <ul className='list-disc list-inside space-y-1'>
              {question.options.map((option, index) => {
                const isAnswered = answered.has(question.id);
                return (
                  <li key={index} className='pl-2'>
                    <button
                      disabled={isAnswered}
                      className={`mt-2 rounded border border-white px-4 py-2 text-white transition-colors ${
                        isAnswered
                          ? 'cursor-not-allowed opacity-50 bg-zinc-900'
                          : 'hover:bg-zinc-800'
                      }`}
                      onClick={() => {
                        if (index === question.correctOptionIndex) {
                          setGuessed((prev) => ({
                            ...prev,
                            [question.id]: true,
                          }));
                          setAnswered((prev) => new Set(prev).add(question.id));
                          alert('✅ Correct!');
                        } else {
                          setGuessed((prev) => ({
                            ...prev,
                            [question.id]: false,
                          }));
                          setAnswered((prev) => new Set(prev).add(question.id));
                          alert('❌ Incorrect!');
                        }
                      }}
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      <div className='mt-8'>
        <h2 className='mb-4 text-2xl font-bold'>Results</h2>
        <p>
          You have answered{' '}
          {Object.values(guessed).filter((isCorrect) => isCorrect).length} out
          of {questions.questions.length} questions correctly.
        </p>
      </div>
    </div>
  );
}
