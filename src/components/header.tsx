import pb from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import {
  selectData,
  setLoading,
  setSitData,
  setSitPrice,
} from "@/redux/auth/auth";
import { LogoTextIcon } from "./icons/logo";
import { useRouter } from "next/router";
import Loader from "./tailwind/Loader";
import {
  callBalanceOfPaymentToken,
  callBalanceOfSit,
  callGetPrice,
  callIsBeneficiary,
  callPaymentTokenDecimals,
  callPurchasedTokens,
} from "@/contractInteractions/useAppContract";
import { HambugerIcon } from "./icons";

export default function Header({
  setShow,
  show,
}: {
  setShow: Function;
  show: boolean;
}) {
  const {
    loading,
    change,
    sitData: data,
    address,
  } = useAppSelector(selectData);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname } = router;
  async function initialize() {
    dispatch(setLoading(true));
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("address", address);
      if (address) {
        const decimals: number = await callPaymentTokenDecimals();
        console.log("decimals", decimals);
        let sitBalance = Number(await callBalanceOfSit(address[0]));
        console.log("sitBalance", sitBalance);
        let usdcBalance = Number(await callBalanceOfPaymentToken(address[0]));
        console.log("usdcBalance", usdcBalance);

        setUsdcBalance(usdcBalance);
        let res = await callIsBeneficiary(address[0]);
        console.log("CallIsBeneficiary", res);

        let purchease = await callPurchasedTokens(address[0]);
        console.log("purchease", Number(purchease));
        dispatch(
          setSitData({
            ...data,
            isBeneficiary: res,
            purchasedTokens: Number(purchease),
            totalBalance: sitBalance.toFixed(2) || 0,
          })
        );
        const priceWD = await callGetPrice();
        console.log("priceWD", Number(priceWD));

        const price = Number(priceWD) / 10 ** Number(decimals);
        console.log("price", price);
        dispatch(setSitPrice(price));
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    initialize();
  }, [change, address]);
  return (
    <>
      {loading && <Loader />}
      <header className=" fixed  bg-black/20 backdrop-blur-sm md:bg-transparent md:dark:bg-transparent left-0 top-0 w-[100vw] px-3 md:px-6 py-1 md:py-0  z-40">
        <div className="flex items-center justify-center md:justify-between w-full h-9 md:h-fit">
          <Link
            href="/"
            className="shrink-0 absolute md:relative  top-0 flex gap-2 md:gap-4 items-center"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={42}
              height={60}
              className="h-11 md:h-24 w-fit dark:text-white text-black"
            />
            <LogoTextIcon className="h-1.5 md:h-4 w-fit" />
          </Link>
          <div className="flex items-center justify-between md:justify-start gap-6 dark:text-white w-full md:w-auto">
            <button
              onClick={() => setShow(!show)}
              className=" md:hidden text-black dark:text-white/60 py-1 hover:text-black dark:hover:text-white transition-colors"
            >
              <HambugerIcon className="w-4 h-fit " />
            </button>
            <div className="hidden md:flex gap-0 items-center">
              <Link
                href="/public-sale"
                className={`flex items-center text-[10px] md:text-sm 2xl:text-base font-fontspringBold font-bold gap-3  textStyle ${
                  pathname === "/public-sale"
                    ? "   font-medium border-b-2 border-sittaris-300"
                    : " "
                } `}
              >
                <span>Public Sale</span>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-0 md:gap-3 text-[10px] md:text-sm">
              <div className=" flex items-center gap-2">
                <Image
                  src={"/assets/tokens/tether.svg"}
                  width={16}
                  height={16}
                  className="w-3 h-3 md:h-4 md:w-4"
                  alt=""
                />
                {usdcBalance.toFixed(2)}
              </div>
              <div className=" flex items-center gap-2">
                <Image
                  src={"/assets/tokens/sittaris.svg"}
                  width={16}
                  height={16}
                  className="w-3 h-3 md:h-4 md:w-4"
                  alt=""
                />
                {
                  //TODO: Rakamın büyüklüğüne göre düzenlenyen fonksiyon yazılacak
                }
                {data.totalBalance}
              </div>
              {/* <div className=" flex items-center gap-2">
                <Image
                  src={"/assets/tokens/sittaris-locked.svg"}
                  width={16}
                  height={16}
                  className="w-3 h-3 md:h-4 md:w-4"
                  alt=""
                />
                {data.purchasedTokens.toFixed(2)}
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
