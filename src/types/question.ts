interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

interface QuestionList {
  questions: Question[];
}

export type { Question, QuestionList };
