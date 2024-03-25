import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import { InfoIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import ZoneApexChart from "@/components/charts/zoneChart";
import { Token } from "@/components/token";
import { Zones } from "@/data/zones";
import { useAppDispatch } from "@/hook/redux/hooks";
import { setLoading } from "@/redux/auth/auth";
import { callSaleContract } from "@/contractInteractions/ethereumContracts";
import {
  callCalculateReward,
  callStakeInfo,
} from "@/contractInteractions/useAppContract";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [stakeData, setStakeData] = useState<any>([
    {
      amount: 0,
      rewardDebt: 0,
      date: "",
      isClaimed: false,
    },
  ]);
  const dispatch = useAppDispatch();

  async function getStakeAmount() {
    try {
      dispatch(setLoading(true));
      const { msgSender } = await callSaleContract();
      let res = await callStakeInfo(msgSender);

      if (res) {
        //kalan gün hesaplanacak
        res = await Promise.all(
          await res.map(async (item: any) => {
            return { ...item };
          })
        );
        console.log("callStakeInfo", res);
        let days = (date: any) =>
          Math.round(
            (new Date(Number(date) * 1000).getTime() - Date.now()) / 86400000
          );
        if (res.length > 0) {
          setStakeData(
            await Promise.all(
              res.map(async (item: any, index: number) => {
                return {
                  amount: Number(item[0]) / 10 ** 18,
                  rewardDebt: Number(item[1]),
                  date: days(Number(item[2]) + Number(item[3])),
                  reward: await callCalculateReward(msgSender, index),
                  isClaimed: item[4],
                };
              })
            )
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    getStakeAmount();
  }, []);
  
  const [stakeInfo, setStakeInfo] = useState<any>({
    currentStake: 0,
    totalStake: 0,
    rewards: 0,
  });
  useEffect(() => {
    setStakeInfo({
      currentStake: stakeData.reduce((acc: number, item: any) => {
        return acc + item.amount;
      }, 0),
      totalStake: stakeData.reduce((acc: number, item: any) => {
        return acc + item.reward;
      }, 0),
      rewards: stakeData.reduce((acc: number, item: any) => {
        return acc + item.reward;
      }, 0),
    });
  }, [stakeData]);
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam 
        mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6  h-full w-full">
        <AppDetails vertical={true} />
        <div className="flex justify-between items-center gap-6">
          <h3 className={`${"font-fontspringBold"} font-semibold`}>
            Personel Information
          </h3>
          <div className="levelCard w-full">Level 5</div>
        </div>

        <div className="p-6 flex gap-10 zoneCard w-full ">
          <div className="w-1/3 flex flex-col gap-10 py-3 ">
            <div className="flex gap-2 w-full justify-between">
              <h3 className={`${"font-satoshi"} font-semibold`}>
                {Zones[0].name}
              </h3>
              <Token amount={stakeInfo?.currentStake || 0} />
            </div>
            <ParametreVertical plantKey={Zones[0].ref} />
          </div>
          <div className=" w-2/3 ">
            <ZoneApexChart
              height={280}
              zoneId={1}
              seriesNames={true}
              align="right"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
