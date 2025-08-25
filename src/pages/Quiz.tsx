import { useState } from "react";
import Question from "./../components/QuizApp/Question";
import ProgressBar from "../components/QuizApp/ProgressBar";
import Button from "./../components/Button";
import QuizResult from "./../components/QuizApp/QuizResult";

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: "a", text: "Berlin " },
      { id: "b", text: "Madrid" },
      { id: "c", text: "Paris" },
      { id: "d", text: "Rome" },
    ],
    answer: "c",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "22" },
    ],
    answer: "b",
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizData[currentIndex];

  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <QuizResult
        quizData={quizData}
        score={score}
        selectedAnswers={selectedAnswers}
      />
    );
  }

  return (
    <div className="bg-bg text-text flex min-h-screen items-center justify-center p-6 font-sans">
      <Button variant="primary" size="md" className="absolute top-4 left-4">
        <a href="/">Back</a>
      </Button>
      <div className="w-full max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 md:p-8">
        <h1 className="flex w-full justify-center text-xl font-bold uppercase">
          Quiz App
        </h1>
        <ProgressBar current={currentIndex} total={quizData.length} />

        <Question
          question={currentQuestion}
          index={currentIndex}
          total={quizData.length}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          isSubmitted={isSubmitted}
          onSelect={handleOptionSelect}
        />

        <div className="flex justify-between pt-4">
          <Button
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            Previous
          </Button>

          {currentIndex < quizData.length - 1 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
