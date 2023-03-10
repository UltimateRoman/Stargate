import { useState } from "react";

import Card from "./Card";

interface ChainCardProps {
  chainName: string;
  tokenBalance: string;
  onApprove?: () => void;
  onBridge?: () => void;
}

export default function ChainCard({
  chainName,
  tokenBalance,
  onApprove,
  onBridge,
}: ChainCardProps) {
  const [amount, setAmount] = useState<number | undefined>();

  return (
    <Card title={chainName} className="min-w-[300px]">
      <p className="text-gray-600 w-full flex flex-row">
        <span className="bg-gray-200 rounded-lg rounded-r-none p-2">
          Token Balance
        </span>
        <span className="bg-gray-100 rounded-lg rounded-l-none p-2 text-center flex-grow">
          {tokenBalance}
        </span>
      </p>
      <input
        type="text"
        placeholder="Enter amount to bridge"
        className="border border-gray-400 p-2 min-w-full rounded-lg bg-inherit"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div className="py-2 flex flex-col items-center w-full">
        <button
          onClick={onApprove}
          className="bg-blue-500 text-white p-2 rounded-lg min-w-full"
        >
          Approve Tokens
        </button>
        <button
          onClick={onBridge}
          className="bg-blue-500 text-white p-2 rounded-lg mt-2 min-w-full"
        >
          Bridge Tokens
        </button>
      </div>
    </Card>
  );
}
