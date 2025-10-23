import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  bgClassForId,
  dateLabel,
  formatCurrency,
  iconFor,
} from "../utils/formatters";

type Txn = {
  id: number;
  type: "Payment" | "Credit";
  name: string;
  description: string;
  amount: number;
  percent: number;
  status: "Pending" | "Approved";
  authorizedUser?: string;
  date: string;
};

export default function TransactionsListItem({ txn }: { txn: Txn }) {
  const amountStr =
    txn.type === "Payment"
      ? `+${formatCurrency(txn.amount)}`
      : formatCurrency(txn.amount);
  const isPositive = txn.type === "Payment";
  const line1 = `${txn.status === "Pending" ? "Pending – " : ""}${
    txn.description
  }`;
  const label = dateLabel(txn.date);
  const line2 = txn.authorizedUser ? `${txn.authorizedUser} – ${label}` : label;
  const bg = bgClassForId(txn.id);
  return (
    <Link
      to={`/tx/${txn.id}`}
      className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50"
    >
      <div
        className={`h-10 w-10 rounded-full ${bg} flex items-center justify-center text-white text-base`}
      >
        <FontAwesomeIcon icon={iconFor(txn.name, txn.type)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-slate-900 text-sm font-medium truncate">
          {txn.name}
        </div>
        <div className="text-slate-500 text-xs truncate">{line1}</div>
        <div className="text-slate-500 text-xs truncate">{line2}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-semibold">{amountStr}</div>
        <div className="text-xs text-slate-500 flex justify-end">
          <p className="bg-slate-100 w-fit px-1 rounded-sm">{txn.percent}%</p>
        </div>
      </div>
    </Link>
  );
}
