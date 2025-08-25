interface OptionButtonProps {
  option: { id: string; text: string };
  isSelected: boolean;
  onClick: (id: string) => void;
}

export default function OptionButton({
  option,
  correctAnswer,
  isSelected,
  isSubmitted,
  onClick,
}: OptionButtonProps & { correctAnswer: string; isSubmitted: boolean }) {
  const isCorrect = isSubmitted && option.id === correctAnswer;
  const isWrong = isSubmitted && isSelected && option.id !== correctAnswer;

  return (
    <button
      onClick={() => onClick(option.id)}
      disabled={isSubmitted}
      className={[
        "w-full rounded-lg border border-slate-200 bg-white text-left",
        "px-4 py-3 shadow-sm",
        "transition hover:bg-slate-50",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",

        // "w-full rounded-xl border px-4 py-3 text-left transition",
        // "hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none",
        isSubmitted ? "cursor-not-allowed opacity-80" : "cursor-pointer",
        isSelected && !isSubmitted ? "ring-2 ring-sky-300" : "",
        isCorrect ? "border-green-500 bg-green-50 text-green-700" : "",
        isWrong ? "border-red-500 bg-red-50 text-red-700" : "",
      ].join(" ")}
    >
      {option.text}
    </button>
  );
}
