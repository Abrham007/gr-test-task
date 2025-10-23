import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faBuildingColumns,
  faCartShopping,
  faCreditCard,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

export function formatCurrency(n: number, currency = "USD") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export function formatK(n: number) {
  const abs = Math.round(Math.abs(n));
  if (abs >= 1000) return `${Math.round(abs / 1000)}K`;
  return `${abs}`;
}

export function dateLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diffDays = Math.floor(
    (today.setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) /
      (24 * 60 * 60 * 1000)
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7 && diffDays > 1)
    return new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(
      new Date(iso)
    );
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear().toString().slice(-2);
  return `${mm}/${dd}/${yy}`;
}

const darkBg = [
  "bg-slate-800",
  "bg-zinc-800",
  "bg-neutral-800",
  "bg-stone-800",
  "bg-indigo-800",
  "bg-emerald-800",
  "bg-rose-800",
  "bg-cyan-800",
];
export function bgClassForId(id: number | string) {
  const s = String(id);
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return darkBg[hash % darkBg.length];
}

export function iconFor(
  name: string,
  type: "Payment" | "Credit"
): IconDefinition {
  if (type === "Payment") return faBuildingColumns;
  const lower = name.toLowerCase();
  if (lower.includes("apple")) return faApple;
  if (lower.includes("ikea") || lower.includes("target")) return faStore;
  if (lower.includes("amazon") || lower.includes("cart")) return faCartShopping;
  return faCreditCard;
}
