import { formatCurrency } from "../utils/formatters";

type Props = { balance: number; limit: number; currency?: string };

export default function CardBalance({
  balance,
  limit,
  currency = "USD",
}: Props) {
  const available = Math.max(0, limit - balance);
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
      <div className="text-slate-900 font-semibold text-base mb-2">
        Card Balance
      </div>
      <div>
        <span className="text-3xl font-bold text-slate-900 align-baseline">
          {formatCurrency(balance, currency)}
        </span>
      </div>
      <div className="mt-1 text-slate-600 text-sm">
        {formatCurrency(available, currency)} Available
      </div>
    </div>
  );
}
