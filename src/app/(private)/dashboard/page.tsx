import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const role = user?.publicMetadata?.role;

  if (role === "admin") {
    redirect("/dashboard/medico");
  } else if (role === "atendente") {
    redirect("/dashboard/atendente");
  } else {
    // Role indefinida
    redirect("/unauthorized");
  }

  return null;
}
