"use client"

import { Card } from "@repo/ui/card";
import { useRouter } from "next/navigation";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: "success" | "failure" | "processing"; // More specific type for status
    provider: string;
  }[];
}) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push("/transactions");
  };

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  const displayedTransactions = transactions.slice(0, 4);

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {displayedTransactions.map((t, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div>
              <div className="text-sm flex items-center">
                {t.status !== "processing" && "Received INR"}
                <span
                  className={`ml-2 text-xs ${
                    t.status === "success"
                      ? "text-green-500"
                      : t.status === "failure"
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
              <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div>+ Rs {t.amount}</div>
            </div>
          </div>
        ))}
      </div>
      {transactions.length > 4 && (
        <div className="text-center pt-4">
          <button
            onClick={handleViewMore}
            className="text-blue-500 hover:underline"
          >
            View More
          </button>
        </div>
      )}
    </Card>
  );
};