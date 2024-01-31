import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HeaderActionButton = () => {
  const { data: session, status } = useSession();
  return status != "loading" ? (
    <></>
  ) : session ? (
    <div className="flex items-center">
      <Link href="/write" className="h-fit">
        <Button className="text-[#ecd7d7] bg-[#5d353b] hover:bg-[#73434A] active:bg-[#7c4c53]">
          Write an article
        </Button>
      </Link>
    </div>
  ) : (
    <div className="flex items-center">
      <Link href="/login" className="h-fit">
        <Button className="text-[#ecd7d7] bg-[#5d353b] hover:bg-[#73434A] active:bg-[#7c4c53]">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default HeaderActionButton;
