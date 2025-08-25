import OptionButton from "./OptionButton";

interface QuestionProps {
  question: {
    question: string;
    options: { id: string; text: string }[];
    answer: string;
  };
  index: number;
  total: number;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelect: (optionId: string) => void;
}

export default function Question({
  question,
  index,
  total,
  selectedAnswer,
  isSubmitted,
  onSelect,
}: QuestionProps) {
  const number = index + 1;

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium">
          Question {number} of {total}
        </span>
      </header>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold md:text-xl">
          {question.question}
        </legend>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-1">
          {question.options.map((option) => (
            <li key={option.id}>
              <OptionButton
                option={option}
                correctAnswer={question.answer}
                isSelected={selectedAnswer === option.id}
                isSubmitted={isSubmitted}
                onClick={onSelect}
              />
            </li>
          ))}
        </ul>
      </fieldset>
    </section>
  );
}
