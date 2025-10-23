import { calculateDailyPoints } from "../utils/calculatePoints";
import { formatK } from "../utils/formatters";

export default function DailyPoints() {
  const pts = calculateDailyPoints(new Date());
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
      <div className="text-slate-900 font-semibold text-base mb-2">
        Daily Points
      </div>
      <div className="text-2xl font-bold text-slate-600 opacity-60">
        {formatK(pts)}
      </div>
    </div>
  );
}
