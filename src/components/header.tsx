import pb from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./tailwind/loader";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";
import { LogoTextIcon } from "./icons/logo";
import { ArrowLeftGradientIcon } from "./icons";
import { useRouter } from "next/router";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const { loading: Loading } = useAppSelector(selectData);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setLoading(Loading);
  }, [Loading]);
  return (
    <>
      {loading && <Loader />}
      <header className=" absolute left-0 top-0 w-full px-3 md:px-6 py-2 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={42}
              height={60}
              className="mr-4 h-24 w-fit dark:text-white text-black"
            />
            <LogoTextIcon className="h-4 w-fit" />
          </Link>
          <div className="flex items-center gap-6 dark:text-white">
            <div className="flex gap-0 items-center">
              <Link
                href="/public-sale"
                className={`flex items-center font-fontspringBold font-bold gap-3 pb-1 textStyle ${
                  pathname === "/public-sale" ? "   font-medium border-b-2 border-sittaris-300" : " "
                } `}
              >
                <span>Public Sale</span>
              </Link>
            </div>
            <div className=" flex items-center gap-2">
              <Image
                src={"/assets/tokens/tether.svg"}
                width={16}
                height={16}
                alt=""
              />
              123.000
            </div>
            <div className=" flex items-center gap-2">
              <Image
                src={"/assets/tokens/sittaris.svg"}
                width={16}
                height={16}
                alt=""
              />
              123.000
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
