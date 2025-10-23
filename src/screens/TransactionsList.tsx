import data from "../data.json";
import CardBalance from "../components/CardBalance";
import DailyPoints from "../components/DailyPoints";
import TransactionsListItem from "../components/TransactionsListItem";

const LIMIT = 1500;

export default function TransactionsList() {
  // generate a random starting balance (sticky per mount)
  const balance = Math.round(Math.random() * LIMIT * 100) / 100;
  const txns = [...data.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <section className="p-1">
      <div className="flex gap-2 items-stretch">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <CardBalance balance={balance} limit={LIMIT} />
          <DailyPoints />
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="text-slate-900 font-semibold text-base">
              No Payment Due
            </div>
            <div className="mt-1 text-sm text-slate-600">
              You’ve paid your September balance.
            </div>
          </div>
          <div className="text-right text-slate-400 text-4xl leading-none">
            →
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200">
          <h2 className="text-slate-900 font-semibold text-base">
            Latest Transactions
          </h2>
        </div>
        <ul className="divide-y divide-slate-200">
          {txns.map((t) => (
            <li key={t.id}>
              <TransactionsListItem txn={t as any} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
