/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../Button";

export default function QuizResult({
  quizData,
  score,
  selectedAnswers,
}: {
  quizData: any[];
  score: number;
  selectedAnswers: Record<number, string>;
}) {
  const downloadCSV = () => {
    const rows = [
      ["Question", "Your Answer", "Correct Answer", "Result"],
      ...quizData.map((q) => {
        const userAns = selectedAnswers[q.id];
        const correctAns = q.answer;
        const isCorrect = userAns === correctAns ? "Correct" : "Wrong";

        return [
          q.question,
          q.options.find((o: { id: string }) => o.id === userAns)?.text ||
            "Not answered",
          q.options.find((o: { id: string }) => o.id === correctAns)?.text,
          isCorrect,
        ];
      }),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "quiz_results.csv";
    link.click();
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-8 rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="mb-2 text-2xl font-bold text-slate-800">
              Quiz Completed
            </h2>
            <p className="text-lg text-slate-600">
              You scored{" "}
              <span className="text-primary font-semibold">{score}</span> out of{" "}
              {quizData.length}
            </p>
          </div>

          <div className="mb-6 flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-green-500 bg-green-200"></span>
              <span className="text-slate-600">Correct Answer</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-red-500 bg-red-200"></span>
              <span className="text-slate-600">Your Wrong Answer</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-slate-400 bg-slate-200"></span>
              <span className="text-slate-600">Not Selected</span>
            </div>
          </div>

          <div className="space-y-6">
            {quizData.map((q, index) => {
              const userAns = selectedAnswers[q.id];
              const correctAns = q.answer;
              const isCorrect = userAns === correctAns;

              return (
                <div
                  key={q.id}
                  className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow"
                >
                  <h3 className="text-lg font-semibold text-slate-800">
                    Q{index + 1}. {q.question}
                  </h3>

                  <div className="space-y-2">
                    {q.options.map((opt: any) => {
                      let optionClass =
                        "px-4 py-2 rounded-lg border transition duration-200";

                      if (opt.id === correctAns) {
                        optionClass +=
                          " bg-green-100 border-green-500 text-green-800 font-medium";
                      } else if (opt.id === userAns && userAns !== correctAns) {
                        optionClass +=
                          " bg-red-100 border-red-500 text-red-800 font-medium";
                      } else {
                        optionClass +=
                          " bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100";
                      }

                      return (
                        <div key={opt.id} className={optionClass}>
                          {opt.text}
                        </div>
                      );
                    })}
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Wrong"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="secondary" onClick={downloadCSV}>
              Download Results (CSV)
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Restart Quiz
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
