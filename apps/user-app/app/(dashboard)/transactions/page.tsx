import { Card } from "@repo/ui/card";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getAllTransactions() {
    const session = await getServerSession(authOptions);

  const transactions = await prisma.onRampTransaction.findMany({
    where: {
        userId: Number(session?.user?.id)
    },
  });
  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status.toLowerCase() as "success" | "failure" | "processing",
    provider: t.provider,
  }));
}

export default async function TransactionsPage() {
  const transactions = await getAllTransactions();

  if (!transactions.length) {
    return (
      <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">All Transactions</div>
        <div className="p-4">
          <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">No Recent transactions</div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">All Transactions</div>
      <div className="p-4">
        <Card title="Recent Transactions">
          <div className="pt-2">
            {transactions.map((t, index) => (
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
        </Card>
      </div>
    </div>
  );
}