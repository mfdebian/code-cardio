import type { QuestionList } from '@/types/question';

export const questions: QuestionList = {
  questions: [
    {
      id: 777,
      text: 'what does typeof NaN return in JavaScript?',
      options: ['number', 'NaN', 'undefined', 'object'],
      correctOptionIndex: 0,
    },
    {
      id: 666,
      text: 'Which method is used to add one or more elements to the end of an array in JavaScript?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctOptionIndex: 0,
    },
    {
      id: 420,
      text: 'In JavaScript, which keyword is used to declare a variable that cannot be reassigned?',
      options: ['let', 'var', 'const', 'static'],
      correctOptionIndex: 2,
    },
  ],
};
