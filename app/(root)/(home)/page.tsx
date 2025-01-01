import Auth from "@/components/auth";

export default function page() {
  const isSignedIn = false;

  if (!isSignedIn)
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  return <div>page</div>;
}
