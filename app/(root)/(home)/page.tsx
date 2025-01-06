import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export default async function page() {
  const session: any = await getServerSession(authOptions);

  return (
    <>
      <Header label="Home" isBack />
      <Form
        placeholder="Write something..."
        user={JSON.parse(JSON.stringify(session?.currentUser))}
      />
    </>
  );
}
