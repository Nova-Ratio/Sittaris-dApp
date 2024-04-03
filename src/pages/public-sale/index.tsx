import Image from "next/image";
import MainLayout from "@/layout/mainLayout";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import ZoneApexChart from "@/components/charts/zoneChart";
import { useEffect, useState } from "react";

import { Token } from "@/components/token";

import InputText from "@/components/tailwind/input";
import TitleComp from "@/components/title";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { selectData, setChange, setLoading } from "@/redux/auth/auth";
import {
  callBuyTokens,
  callGetVestingInfo,
  callPaymentTokenAllowance,
  callPaymentTokenDecimals,
  callSaleEndTimestamp,
  callSaleStartTimestamp,
  callTotalSaleLimit,
  callTotalSaledTokens,
} from "@/contractInteractions/useAppContract";
import { callSaleContract } from "@/contractInteractions/ethereumContracts";
import { CircleIcon } from "@/components/icons";
import EarthInfo from "@/components/charts/earth";
import EarthInfoVertical from "@/components/charts/earthVertical";

export default function Home() {
  const [zone, setZone] = useState({
    label: "Zone 1",
    key: "plants/P25829",
  });
  const [tokenAmount, setTokenAmount] = useState({
    sold: 0,
    total: 0,
  });
  const [myTokenAmount, setMyTokenAmount] = useState({
    claimed: 200,
    total: 2400,
    claimedMonth: 1,
  });
  const [amount, setAmount] = useState(0);
  const {
    loading,
    price: sitPrice,
    sitData,
    change,
  } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  //console.log("paymentMethod", paymentMethod);

  const [timeData, setTimeData] = useState({
    start: "2022-03-01",
    end: "2022-03-31",
  });
  async function initialize() {
    try {
      const decimals: number = await callPaymentTokenDecimals();
      console.log("decimals", decimals);
      const { msgSender, publicSaleAddress } = await callSaleContract();
      const Total = await callPaymentTokenAllowance(publicSaleAddress);
      console.log(
        "checker",
        (Number(Total) / 10 ** Number(decimals)).toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
      let totalSaled = await callTotalSaledTokens();
      let limit = await callTotalSaleLimit();
      console.log(
        "total",
        Number(totalSaled).toLocaleString("fullwide", { useGrouping: false })
      );
      setTokenAmount({
        sold: Number(totalSaled),
        total: Number(limit),
      });
      if (msgSender) {
        let vesting = await Promise.all(await callGetVestingInfo(msgSender));

        console.log("vesting", vesting);
      }
      let startTime = await callSaleStartTimestamp();
      let endTime = await callSaleEndTimestamp();
      console.log("endTime", endTime);
      setTimeData({
        start: new Date(Number(startTime) * 1000).toLocaleDateString(),
        end: new Date(Number(endTime) * 1000).toLocaleDateString(),
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async function buySit() {
    dispatch(setLoading(true));
    try {
      let res = await callBuyTokens(amount);
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

  useEffect(() => {
    initialize();
  }, [change]);

  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-10">
        {/* <h3 className={`${"font-fontspringBold"} font-semibold`}>
          Buy SIT Token
        </h3> */}
        <div className="px-0 grid grid-cols-5 w-full gap-3 ">
          <div className="w-full col-span-2  gap-6 flex flex-col relative">
            <CircleIcon className="absolute hidden 2xl:block -bottom-10 -left-6 w-36 h-36" />
            <div className="card !h-full !px-10 lg:gap-10 2xl:gap-10">
              <div className="flex flex-col w-full items-center gap-1">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={42}
                  height={60}
                  className=" h-28 w-fit dark:text-white text-black"
                />
                <h3 className="font-fontspring">SIT Public Sale</h3>
                <span className="dark:text-white/70 text-black/70">
                  {timeData.start} - {timeData.end}
                </span>
              </div>
              <div className="w-full flex flex-col gap-3">
                <div className="flex gap-4 items-center w-full justify-between">
                  <span>Total Sittaris (SIT) Token Sold:</span>
                  <b>
                    {Number(tokenAmount.sold).toLocaleString("fullwide", {
                      useGrouping: false,
                    })}{" "}
                    /{" "}
                    {Number(tokenAmount.total).toLocaleString("fullwide", {
                      useGrouping: false,
                    })}
                  </b>
                </div>
                <div className="w-full bg-black/10 rounded-lg h-8 relative">
                  <div className=" absolute left-0 top-0  h-full w-full flex justify-center items-center">
                      {((tokenAmount.sold / tokenAmount.total) * 100).toFixed(2)} %
                  </div>
                  <div
                    className="bg-[#03AE5A] rounded-lg h-8"
                    style={{
                      width: `${(tokenAmount.sold / tokenAmount.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className=" w-full">
                <div className="flex gap-6 items-center">
                  <div className="shrink-0  flex items-center gap-3">
                    <Token width={32} height={32} amount={""} />
                    <h2 className="">SIT</h2>
                  </div>
                  <InputText
                    type="text"
                    onChange={(e: any) =>
                      setAmount(Number(e.target.value) || 0)
                    }
                    value={amount}
                  />
                </div>
                <div className="w-full flex justify-end pt-2">
                  <span>1 SIT = {Number(1 * sitPrice)} USDT</span>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <button
                  disabled={amount <= 0 || !amount || loading}
                  onClick={buySit}
                  className="inlineBtn w-1/2 mb-6 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="w-full col-span-3 flex flex-col gap-4">
            {/* <AppDetails addClass=" dark:text-white/70 text-black/70" />
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
            /> */}
            <EarthInfoVertical addClass="text-sm gap-4" />
          </div>
        </div>
        <div className="card items-center 2xl:gap-10 !py-10 relative">
          <CircleIcon className="absolute hidden 2xl:block -top-10 -right-3 w-20 h-20" />
          <CircleIcon className="absolute hidden 2xl:block -top-8 left-20 w-28 h-28" />
          <div className="flex gap-3 text-xl">
            <span>My Sittaris (SIT) Token Amount:</span>
            <b>
              {" "}
              {myTokenAmount.claimed} / {myTokenAmount.total}{" "}
            </b>
          </div>
          <div className="flex items-end flex-col gap-2">
            <div className="h-fit !w-fit card  !flex-row !p-0 relative">
              <div
                className="bg-[#03AE5A] rounded-lg absolute left-0 top  h-full z-0"
                style={{
                  width: `${
                    (myTokenAmount.claimed / myTokenAmount.total) * 100
                  }%`,
                }}
              />
              {[
                {
                  id: 2,
                  name: "March",
                },
                {
                  id: 3,
                  name: "April",
                },
                {
                  id: 4,
                  name: "May",
                },
                {
                  id: 5,
                  name: "June",
                },
                {
                  id: 6,
                  name: "July",
                },
                {
                  id: 7,
                  name: "August",
                },
                {
                  id: 8,
                  name: "September",
                },
                {
                  id: 9,
                  name: "October",
                },
                {
                  id: 10,
                  name: "November",
                },
                {
                  id: 11,
                  name: "December",
                },
                {
                  id: 12,
                  name: "January",
                },
                {
                  id: 1,
                  name: "February",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex z-10 border-2 rounded-md border-transparent p-2 gap-3 items-center"
                  style={{
                    //this month active
                    borderColor:
                      new Date().getMonth() + 1 === item.id ? "#03AE5A" : "",
                  }}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <span className="text-xs dark:text-white/60 text-black/60">
              {myTokenAmount.claimedMonth} / 12 M
            </span>
          </div>
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-3 gap-10">
              <h2>March 2024</h2>
              <h2>200 SIT</h2>
              <span className="text-sittaris-800 flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.6585 6.24744C20.0742 6.61112 20.1163 7.24288 19.7526 7.65852L11.0026 17.6585C10.6403 18.0726 10.0114 18.1162 9.59546 17.756L4.34546 13.2106C3.92792 12.8491 3.8825 12.2175 4.244 11.8C4.6055 11.3825 5.23704 11.337 5.65457 11.6985L10.1525 15.5929L18.2474 6.34151C18.6111 5.92587 19.2429 5.88375 19.6585 6.24744Z"
                    fill="#03AE58"
                  />
                </svg>
                Claimed
              </span>
            </div>
            <div className="grid grid-cols-3 gap-10">
              <h2>April 2024</h2>
              <h2>200 SIT</h2>
            </div>
          </div>
          <button className="inlineBtn  w-1/3 2xl:w-1/4 mt-6">Claim</button>
        </div>
      </div>
    </MainLayout>
  );
}
