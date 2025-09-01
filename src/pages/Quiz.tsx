import { useState, useEffect } from "react";
import Question from "./../components/QuizApp/Question";
import ProgressBar from "../components/QuizApp/ProgressBar";
import Button from "./../components/Button";
import QuizResult from "./../components/QuizApp/QuizResult";
import Layout from "../components/Layout";

interface ApiQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ApiResponse {
  response_code: number;
  results: ApiQuestion[];
}

interface QuizQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  answer: string;
}

const fallbackQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      { id: "a", text: "HyperText Markup Language" },
      { id: "b", text: "High Tech Modern Language" },
      { id: "c", text: "Home Tool Markup Language" },
      { id: "d", text: "Hyperlink and Text Markup Language" },
    ],
    answer: "a",
  },
  {
    id: 2,
    question:
      "Which programming language is known as the backbone of web development?",
    options: [
      { id: "a", text: "JavaScript" },
      { id: "b", text: "Python" },
      { id: "c", text: "Java" },
      { id: "d", text: "C++" },
    ],
    answer: "a",
  },
  {
    id: 3,
    question: "What does CPU stand for?",
    options: [
      { id: "a", text: "Central Processing Unit" },
      { id: "b", text: "Computer Personal Unit" },
      { id: "c", text: "Central Program Unit" },
      { id: "d", text: "Computer Processing Unit" },
    ],
    answer: "a",
  },
  {
    id: 4,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: [
      { id: "a", text: "Stack" },
      { id: "b", text: "Queue" },
      { id: "c", text: "Array" },
      { id: "d", text: "Linked List" },
    ],
    answer: "a",
  },
  {
    id: 5,
    question: "What does SQL stand for?",
    options: [
      { id: "a", text: "Structured Query Language" },
      { id: "b", text: "Simple Query Language" },
      { id: "c", text: "Standard Query Language" },
      { id: "d", text: "Sequential Query Language" },
    ],
    answer: "a",
  },
];

export default function Quiz() {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if (timerActive && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft, isSubmitted, currentIndex]);

  useEffect(() => {
    if (quizData.length > 0 && !isSubmitted) {
      setTimeLeft(20);
      setTimerActive(true);
    }
  }, [currentIndex, quizData.length, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      setTimerActive(false);
    }
  }, [isSubmitted]);

  const handleTimeUp = () => {
    setTimerActive(false);
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple",
        );

        if (response.status === 429) {
          throw new Error("RATE_LIMIT");
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch quiz data`);
        }

        const data: ApiResponse = await response.json();

        if (data.response_code !== 0) {
          if (data.response_code === 1) {
            throw new Error("RATE_LIMIT");
          }
          throw new Error(`API Error ${data.response_code}`);
        }

        const transformedData: QuizQuestion[] = data.results.map(
          (apiQuestion, index) => {
            const allAnswers = [
              apiQuestion.correct_answer,
              ...apiQuestion.incorrect_answers,
            ];

            const options = allAnswers.map((answer, i) => ({
              id: String.fromCharCode(97 + i),
              text: answer,
            }));

            const correctAnswerId = "a";

            return {
              id: index + 1,
              question: apiQuestion.question,
              options,
              answer: correctAnswerId,
            };
          },
        );

        setQuizData(transformedData);
        setUsingFallback(false);
        setError(null);
      } catch (err) {
        console.error("Error fetching quiz data:", err);

        if (err instanceof Error && err.message === "RATE_LIMIT") {
          setQuizData(fallbackQuizData);
          setUsingFallback(true);
          setError("API rate limit reached. Using sample questions.");
        } else {
          setQuizData(fallbackQuizData);
          setUsingFallback(true);
          setError(
            "Failed to load questions from API. Using sample questions.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) {
    return (
      <Layout title="Quiz App">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading quiz questions...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && quizData.length === 0) {
    return (
      <Layout title="Quiz App">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mb-4 text-4xl text-red-500">⚠️</div>
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              Oops! Something went wrong
            </h2>
            <p className="mb-4 text-gray-600">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (quizData.length === 0) {
    return (
      <Layout title="Quiz App">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">No quiz questions available.</p>
          </div>
        </div>
      </Layout>
    );
  }

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
    setTimerActive(false);
    setIsSubmitted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    window.location.reload();
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
      <Layout title="Quiz Results">
        <div className="space-y-6">
          <QuizResult
            quizData={quizData}
            score={score}
            selectedAnswers={selectedAnswers}
          />
          <div className="text-center">
            <Button
              variant="primary"
              onClick={handleRestartQuiz}
              className="mt-6"
            >
              Start New Quiz
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Quiz App">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
          {usingFallback && error && (
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-center">
                <div className="mr-3 text-yellow-600">⚠️</div>
                <div>
                  <p className="text-sm text-yellow-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {usingFallback
                ? "Sample Computer Science Quiz"
                : "Computer Science Quiz"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {usingFallback ? "Sample questions" : "Hard difficulty"} •{" "}
              {quizData.length}
            </p>
          </div>

          <div className="space-y-6">
            <ProgressBar current={currentIndex} total={quizData.length} />

            <div className="text-center text-sm text-gray-500">
              Question {currentIndex + 1} of {quizData.length}
            </div>

            {/* Timer Display */}
            <div className="text-center">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  timeLeft <= 5
                    ? "animate-pulse bg-red-100 text-red-700"
                    : timeLeft <= 10
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                <span className="text-lg">⏱️</span>
                <span>{timeLeft}s remaining</span>
              </div>
            </div>

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
                ← Previous
              </Button>

              {currentIndex < quizData.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion.id]}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!selectedAnswers[currentQuestion.id]}
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
