import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionsList from "./screens/TransactionsList";
import TransactionDetail from "./screens/TransactionDetail";

const MOBILE_MAX_WIDTH = 768;

export default function App() {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : MOBILE_MAX_WIDTH
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width <= MOBILE_MAX_WIDTH;

  return (
    <div className="min-h-screen">
      {!isMobile && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/5 p-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-lg shadow-xl">
            <h1 className="text-lg font-semibold text-slate-900 mb-1">
              Mobile only
            </h1>
            <p className="text-slate-600">
              This app is designed for mobile screens (≤ {MOBILE_MAX_WIDTH}px).
            </p>
            <p className="text-slate-600">
              Please resize your window or open it on a mobile device.
            </p>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="mx-auto min-h-[100dvh] max-w-[428px] bg-slate-50 border-x border-black/5 flex flex-col">
          <main className="p-4 flex-1">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<TransactionsList />} />
                <Route path="/tx/:id" element={<TransactionDetail />} />
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      )}
    </div>
  );
}
