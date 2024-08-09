"use client";

import { useState } from 'react';

const TestLayout = () => {
  const [amount, setAmount] = useState<number | string>('');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-white rounded shadow-md w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Test Layout</h2>
        <label className="block mb-2">
          Enter the Amount
          <input
            type="number"
            value={amount}
            placeholder="Please enter the total amount"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <p>Scrollable content goes here. Add more content to test scrolling behavior.</p>
        <p>Scrollable content goes here. Add more content to test scrolling behavior.</p>
        <p>Scrollable content goes here. Add more content to test scrolling behavior.</p>
        <p>Scrollable content goes here. Add more content to test scrolling behavior.</p>
        <p>Scrollable content goes here. Add more content to test scrolling behavior.</p>
      </div>
      <div className="p-4 sm:p-6 bg-white rounded shadow-md w-full max-w-sm mx-auto fixed bottom-0 left-0 right-0">
        <button className="w-full py-2 mt-4 bg-blue-500 text-white rounded">Test Button</button>
      </div>
    </div>
  );
};

export default TestLayout;
