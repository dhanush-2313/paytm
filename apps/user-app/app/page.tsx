import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);

  if (session?.user) {
    console.log("User authenticated, redirecting to /transfer");
    redirect('/transfer');
  } else {
    console.log("User not authenticated, redirecting to /api/auth/signin");
    redirect('/api/auth/signin');
  }
}