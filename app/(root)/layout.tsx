import Auth from "@/components/auth";
import FollowBar from "@/components/shared/follow-bar";
import Sidebar from "@/components/Sidebar/siderbar";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session: any = await getServerSession(authOptions);

  if (!session?.currentUser) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  return (
    <div className="lg:container h-screen mx-auto lg:max-w-7xl">
      <div className="flex">
        <Sidebar />

        <div className="flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
          <div className="w-full">
            <NextTopLoader
              color="2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
            <Toaster />
          </div>
        </div>

        <FollowBar />
      </div>
    </div>
  );
};

export default Layout;
