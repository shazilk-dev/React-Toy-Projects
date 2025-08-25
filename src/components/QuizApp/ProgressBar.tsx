import { useState, useEffect } from "react";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.round(((current + 1) / total) * 100);
  const [displayPercent, setDisplayPercent] = useState(percent);

  useEffect(() => {
    let frame: number | undefined;
    if (displayPercent !== percent) {
      const step = () => {
        setDisplayPercent((prev) => {
          if (prev < percent) return Math.min(prev + 1, percent);
          if (prev > percent) return Math.max(prev - 1, percent);
          return prev;
        });
      };
      frame = setInterval(step, 15);
    }
    return () => clearInterval(frame);
  }, [percent, displayPercent]);

  return (
    <div className="w-full">
      <span className="sr-only">Progress: {percent}%</span>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="bg-primary absolute top-0 left-0 h-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />

        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {displayPercent}%
        </span>
      </div>

      {/* <div className="mt-2 text-sm font-medium text-slate-600">
        Question {current + 1} of {total}
      </div> */}
    </div>
  );
}
