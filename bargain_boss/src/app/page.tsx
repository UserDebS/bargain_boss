'use client';
import { useEffect } from "react";

export default function LandingPage() {
  return (
    <main>
      <div className="banner w-screen flex justify-center items-center p-16">
        <div className="bannerbody flex flex-col justify-center items-center gap-5">
          <h1 className="text-5xl font-bold text-center">Unlock the Best Deals <br /> with Bargain Boss!</h1>
          <h5 className="dark:text-sky-700 text-center opacity-70">Your Ultimate Destination for Unbeatable <br />Prices on Products You Love.</h5>
          <a href="/login" className="text-xl p-4 rounded bg-blue-950 text-white">Find the best offer</a>
        </div>
      </div>
    </main>
  );
}
