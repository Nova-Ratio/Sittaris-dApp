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

export default function Header() {
  const { loading, change, sitData: data,address } = useAppSelector(selectData);
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
        let sitBalance = Number(await callBalanceOfSit(address[0])) / 10 ** Number(decimals);
        console.log("sitBalance", sitBalance);
        let usdcBalance =  Number(await callBalanceOfPaymentToken(address[0])) / 10 ** Number(decimals);
        setUsdcBalance(usdcBalance);
        let res = await callIsBeneficiary(address[0]);
        console.log("CallIsBeneficiary", res);

        let purchease = await callPurchasedTokens(address[0]);
        console.log("purchease", Number(purchease));
        dispatch(
          setSitData({
            ...data,
            isBeneficiary: res,
            purchasedTokens: Number(purchease) ,
            totalBalance: sitBalance,
          })
        );
        const priceWD = await callGetPrice();
        console.log("priceWD", Number(priceWD));

        const price = (Number(priceWD) / 10 ** Number(decimals));
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
  }, [change,address]);
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
                  pathname === "/public-sale"
                    ? "   font-medium border-b-2 border-sittaris-300"
                    : " "
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
              {usdcBalance.toFixed(2)}
            </div>
            <div className=" flex items-center gap-2">
              <Image
                src={"/assets/tokens/sittaris.svg"}
                width={16}
                height={16}
                alt=""
              />
              {data.totalBalance.toFixed(2)}
            </div>
            <div className=" flex items-center gap-2">
              <Image
                src={"/assets/tokens/sittaris-locked.svg"}
                width={16}
                height={16}
                alt=""
              />
              {data.purchasedTokens.toFixed(2)}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
