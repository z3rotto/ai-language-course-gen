
export interface DialogueLine {
  speaker: string;
  line: string;
}

export interface Dialogue {
  title: string;
  participants: string[];
  lines: DialogueLine[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface Theory {
  title: string;
  content: string;
}

export interface CourseData {
  title: string;
  language: string;
  theory?: Theory;
  dialogues: Dialogue[];
  quiz: Quiz;
  flashcards: Flashcard[];
}

export interface WordInfo {
    definition: string;
    translation: string;
}