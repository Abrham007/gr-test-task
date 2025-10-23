import { useParams, Link } from "react-router-dom";
import data from "../data.json";
import { formatCurrency } from "../utils/formatters";

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const tx = data.transactions.find((t) => String(t.id) === String(id));

  if (!tx) {
    return (
      <div className="p-4">
        <div className="text-slate-900 text-lg font-semibold">
          Transaction not found
        </div>
        <Link to="/" className="text-sky-600 text-sm">
          Back
        </Link>
      </div>
    );
  }

  const dt = new Date(tx.date);
  const dtStr = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(dt);

  return (
    <div className="p-4 space-y-3">
      <Link to="/" className="text-sky-600 text-lg ">
        ←
      </Link>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-slate-900 mt-10">
            {formatCurrency(tx.amount)}
          </div>
          <div className="text-slate-900 text-sm opacity-50">{tx.name}</div>
          <div className="text-slate-600 text-sm opacity-50">{dtStr}</div>
        </div>
        <div className="flex flex-col items-start bg-white w-full mx-8 rounded-xl p-4">
          <p className=" text-sm font-semibold">
            <span>Status:</span> {tx.status}
          </p>
          <div className="text-slate-700 text-sm opacity-50">
            RBC Bank Debit Card
          </div>
          <br className="w-full h-1 bg-black"></br>
          <div className="text-slate-900 font-semibold flex w-full justify-between">
            <span>Total: </span>
            <span>{formatCurrency(tx.amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
