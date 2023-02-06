import { FulfillingBouncingCircleSpinner } from "react-epic-spinners";

import Card from "./Card";

interface PopUpProps {
  successfulConfirmations: number;
  totalConfirmations: number;
}

export default function PopUp({
  successfulConfirmations,
  totalConfirmations,
}: PopUpProps) {
  return (
    <div className="z-20 absolute top-0 left-0 flex flex-col align-middle justify-center h-screen w-screen">
      {/* Background */}
      <div className="absolute bg-black h-screen w-screen opacity-30" />
      {/* Modal Card */}
      <Card className="z-30 md:max-w-[60%] mx-auto p-10">
        <div className="flex flex-col gap-5 justify-center align-middle items-center">
          <FulfillingBouncingCircleSpinner color="blue" />
          <p className="font-bold">Bridging tokens...</p>
        </div>
        <div className="w-full">
          <div className="bg-gray-200 rounded-full h-4 w-full">
            <div
              className="bg-blue-500 rounded-full h-full"
              style={{
                width: `${
                  (100 * successfulConfirmations) / totalConfirmations
                }%`,
              }}
            ></div>
          </div>
          <div className="w-full flex flex-row justify-center align-middle items-center">
            <p className="p-3">
              {successfulConfirmations} / {totalConfirmations} confirmations
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
