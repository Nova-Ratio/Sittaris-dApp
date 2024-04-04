import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import ZoneApexChart from "@/components/charts/zoneChart";
import { ZoneDropDown } from "@/components/charts";
import { Zones } from "@/data/zones";
import { SwitchIcon } from "@/components/icons";
import { Token } from "@/components/token";
import { useState } from "react";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";

const inter = Inter({ subsets: ["latin"] });

export default function LeaderBoard() {
  const [zone, setZone] = useState({
    label: "Zone 1",
    key: "plants/P25829",
    name: Zones[0]?.name || "Zone 1",
  });
  const { price } = useAppSelector(selectData);
  const [status, setStatus] = useState(false);
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <div className="flex justify-between items-center gap-6 w-full ">
          <h3 className={`${"font-fontspringBold"} font-semibold`}>
            LeaderBoard
          </h3>
          <div className="flex flex-col h-fit gap-2 items-center">
            <h4>Current currency: {status ? "SIT" : "USD"} </h4>
            <button
              onClick={() => setStatus(!status)}
              className="flex items-center gap-2"
            >
              <SwitchIcon />
              Switch to SIT
              <Token amount={""} />
            </button>
          </div>
        </div>
        <div className="px-0 flex w-full gap-3 md:gap-6 lg:gap-10 2xl:gap-16">
          <div className="w-2/3  gap-6 flex flex-col ">
            <div className="flex justify-between gap-6 w-full">
              {/* <div className="w-2/3 max-w-sm">
                <ZoneDropDown
                  placement="bottom-end"
                  setZone={setZone}
                  zone={zone}
                  data={
                    Zones?.map((item, index) => {
                      return {
                        label: "Zone " + (index + 1),
                        key: item?.ref || "",
                        name: item?.name || "",
                      };
                    }) || []
                  }
                />
              </div> */}
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[
                {
                  userId: "1",
                  power: 8600,
                  reward: 100,
                  level: 5,
                },
                {
                  userId: "2",
                  power: 8600,
                  reward: 60,
                  level: 5,
                },
                {
                  userId: "3",
                  power: 8600,
                  reward: 50,
                  level: 5,
                },
              ].map((item, index) => (
                <div className="card" key={index}>
                  <div className="flex items-center justify-between w-full">
                    <h2 className="font-fontspringBold">{index + 1}</h2>
                    <div className="levelCard !px-2 !py-1">
                      Level {item.level}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-base w-full">
                    <span className="dark:text-white/80 text-black/80 font-medium">
                      User ID: {item.userId}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col dark:text-white/80 text-black/80">
                    <span className="text-xs">Daily Reward</span>$
                    {status ? item.reward / price : item.reward}{" "}
                    {status ? "SIT" : "USD"}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 border border-black/30 dark:border-white/30 rounded-full p-2">
              {["No", "Address", "Point"].map((item, index) => (
                <div
                  key={index}
                  className={`flex first:col-span-1  items-center w-full justify-center  ${
                    index === 1 ? " col-span-4" : " col-span-2 "
                  } `}
                >
                  <h5 className="text-xs">{item}</h5>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3 text-sm font-medium px-3">
              {[
                {
                  userId: "11",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 5,
                },
                {
                  userId: "22",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 4,
                },
                {
                  userId: "33",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 3,
                },
                {
                  userId: "45",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 3,
                },
                {
                  userId: "57",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 2,
                },
                {
                  userId: "69",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 2,
                },
                {
                  userId: "71",
                  point: 7600,
                  address: "inj1akqp…8g3xu",
                  level: 1,
                },
              ].map((item, index) => (
                <>
                  <span className="text-base font-semibold first:col-span-1  w-full text-center ">
                    {index + 1}
                  </span>
                  <span className=" col-span-4 w-full text-center ">
                    {item?.address}
                  </span>
                  {/*  <div className="col-span-2 w-full flex justify-center">
                    <span
                      className={`  w-fit text-center min-w-16 py-0 font-semibold text-white level${item.level} `}
                    >
                      Level {item?.level}
                    </span>
                  </div> */}

                  {/* <span className=" col-span-2 w-full text-center ">
                    {
                     status ?  (item.reward / price) + ' SIT' : '$'+ item.reward
                    }
                  </span> */}

                  <span className=" col-span-2 w-full text-center ">
                    {item.point}
                  </span>
                </>
              ))}
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
