import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import ZoneApexChart from "@/components/charts/zoneChart";
import { useEffect, useState } from "react";
import { DownIcon, ZoneDropDown } from "@/components/charts";
import { Zones } from "@/data/zones";
import { InfoIcon, SwitchIcon, WalletIcon } from "@/components/icons";
import { Token } from "@/components/token";
import Dropdown from "@/components/tailwind/Dropdown";
import {
  AlchemyIcon,
  TetherTokenIcon,
  UsdcIcon,
} from "@/components/icons/tokens";
import InputText from "@/components/tailwind/input";
import {
  callBuyTokens,
  callIsBeneficiary,
  callPurchasedTokens,
} from "@/contractInteractions/useAppContract";
import { ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { selectData, setChange, setLoading } from "@/redux/auth/auth";

const inter = Inter({ subsets: ["latin"] });

const tokens = [
  {
    id: 1,
    symbol: "USDT",
    icon: <TetherTokenIcon className="w-6 h-6" />,
    key: "SIT",
  },
  {
    id: 2,
    symbol: "USDC",
    icon: <UsdcIcon className="w-6 h-6" />,
    key: "USD",
  },
];

const paymentMethods = [
  {
    id: 1,
    title: "Credit Card",
    icon: <WalletIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Alchemy",
    icon: <AlchemyIcon className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Crypto",
    icon: <SwitchIcon className="w-6 h-6" />,
  },
];
export default function Home() {
  const [zone, setZone] = useState({
    label: "Zone 1",
    key: "plants/P25829",
  });
  const [token, setToken] = useState(tokens[0]);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[2].id);
  const { loading,price:sitPrice, sitData,change } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  
  
  async function buySit() {
    dispatch(setLoading(true));
    try {
      let res = await callBuyTokens(amount/ sitPrice);
      if (res) {
        console.log("res", res);
        dispatch(setChange(!change));
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
 


  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <h3 className={`${"font-fontspringBold"} font-semibold`}>
          Buy SIT Token
        </h3>
        <div className="px-0 flex w-full gap-3 md:gap-6 lg:gap-10 2xl:gap-16">
          <div className="w-2/3  gap-6 flex flex-col ">
            <div className="flex gap-6 w-full">
              <div className="w-1/3 flex justify-center">
                <Image
                  src="/assets/img/treecircle.svg"
                  alt="buy sit"
                  className=" w-full 2xl:w-2/3"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3 h-fit flex flex-col gap-6">
                <div className="card">
                  <h4>Amount of Payment</h4>
                  <div className="flex gap-4 items-center">
                    <InputText
                      type="text"
                      onChange={(e: any) =>
                        setAmount(Number(e.target.value) || 0)
                      }
                      value={amount}
                      addClass="text-right"
                      placeholder="0.00"
                    />
                    <Dropdown
                      offset={[0, 4]}
                      placement={`bottom-end`}
                      btnClassName="block p-0  dark:text-white w-fit "
                      button={
                        <div className="flex dark:text-white items-center justify-between hover:text-sittaris-800 dark:hover:text-[#03AE5A] gap-3 md:gap-6 w-[140px] border-2 rounded dark:border-white/10  border-black/10 py-2 px-3 h-11 ">
                          <div className="flex gap-2 items-center">
                            {token.icon}
                            {token?.symbol}
                          </div>
                          <DownIcon className="w-3 h-fit" />
                        </div>
                      }
                    >
                      <div className="flex flex-col gap-0 bg-black/50 backdrop-blur-sm border-black/60 dark:border-white/40 border  text-white rounded-lg ">
                        {tokens.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => setToken(item)}
                            className="flex items-center gap-2 first:border-0 border-t py-3 px-6  hover:text-sittaris-800 dark:hover:text-[#03AE5A]"
                          >
                            {item.icon}
                            <span>{item?.symbol}</span>
                          </button>
                        ))}
                      </div>
                    </Dropdown>
                  </div>
                </div>
                <div className="card">
                  <h4>Amount to be Received</h4>
                  <div className="flex gap-3 justify-between items-center ">
                    <h4 className="">{Number(amount / sitPrice)}</h4>
                    <Token amount="SIT" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card">
                <h4>Using Payment Method</h4>
                <div className="flex gap-6 items-center font-semibold">
                  {paymentMethods.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setPaymentMethod(item.id)}
                      className={`flex dark:text-white items-center justify-between hover:text-sittaris-800 dark:hover:text-[#03AE5A] gap-3 md:gap-6 2xl:gap-8 border-2 rounded dark:border-white/10  border-black/10 py-2 px-3 h-11 w-fit ${
                        paymentMethod === item.id
                          ? "border-sittaris-800 dark:border-sittaris-800 !text-sittaris-800  bg-white backdrop-blur-sm  dark:bg-white/10 "
                          : "border-black/10"
                      }`}
                    >
                      {item?.icon}
                      <span>{item?.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full text-black/60 dark:text-white/60">
              <div className="flex items-center gap-6">
                <div>
                  <div className="flex gap-1">
                    <h5>Total Fees</h5>
                    <button>
                      <InfoIcon className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <p>{Number((amount / sitPrice) * 0.01).toFixed(1)} SIT</p>
                </div>
                <div>
                  <div className="flex gap-1">
                    <h5>Rate</h5>{" "}
                    <button>
                      <InfoIcon className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <p>1 USDT = {Number(1 / sitPrice).toFixed(2)} SIT</p>
                </div>
              </div>
              <button
                onClick={buySit}
                disabled={amount === 0 || !amount || loading}
                className="inlineBtn w-1/3 text-white disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* <div className="w-1/2 flex flex-col gap-4">
            <AppDetails addClass=" dark:text-white/70 text-black/70" />
            <ParametreVertical
              addClass=" dark:text-white/70 text-black/70"
              plantKey={zone.key}
            />
            <ZoneApexChart
              key={zone.key}
              zoneData={zone}
              height={280}
              seriesNames={true}
              align="left"
            />
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
}
