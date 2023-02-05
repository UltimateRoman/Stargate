import { useState } from "react";

interface CardProps {
  chainName: string;
  tokenBalance: number;
  onApprove?: () => void;
  onBridge?: () => void;
}

export default function Card({
  chainName,
  tokenBalance,
  onApprove,
  onBridge,
}: CardProps) {
  const [amount, setAmount] = useState<number | undefined>();

  return (
    <div className="h-fit p-4 min-w-[300px] border border-gray-200 bg-white text-black shadow-lg rounded-lg grid gap-4">
      <div className="text-lg font-bold border-b-2 border-black mb-1 py-1">
        {chainName}
      </div>
      <div className="py-2 flex flex-col items-center gap-8">
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
          placeholder="Enter Amount"
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
      </div>
    </div>
  );
}
