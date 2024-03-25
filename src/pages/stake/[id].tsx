import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { Zones } from "@/data/zones";
import { BottomGrid, StakeModal, UnstakeModal } from "@/components/stake";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { selectData, setLoading } from "@/redux/auth/auth";
import { callSaleContract } from "@/contractInteractions/ethereumContracts";
import {
  callCalculateReward,
  callStakeInfo,
} from "@/contractInteractions/useAppContract";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [zoneID, setZoneID] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [unstakeModal, setUnstakeModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const { change } = useAppSelector(selectData);
  useEffect(() => {
    setZoneID(Number(id));
  }, [id, router.query]);

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
  }, [change, unstakeModal]);

  useEffect(() => {
    if (zoneID) {
      router.push(`/stake/${zoneID}`);
    }
  }, [zoneID]);

  return (
    <MainLayout title="Home">
      <StakeModal
        modal={modal}
        setModal={setModal}
        amount={amount}
        setAmount={setAmount}
      />
      <UnstakeModal
        stakeData={stakeData}
        unstakeModal={unstakeModal}
        setUnstakeModal={setUnstakeModal}
        amount={amount}
        setAmount={setAmount}
      />
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <h3 className={`${"font-fontspringBold"} font-semibold`}>Stake</h3>
        <div className=" flex gap-10  w-full ">
          <div className="px-6 w-2/3 border-[3px] text-base border-black/20 dark:border-white/20 rounded-[18px]">
            {zoneID && (
              <ApexChart
                key={zoneID}
                height={280}
                zoneId={zoneID}
                setZoneId={setZoneID}
                seriesNames={true}
              />
            )}
          </div>
          <div className="w-1/3 flex flex-col gap-10 py-3 ">
            <ParametreVertical
              plantKey={zoneID ? Zones[zoneID - 1].ref : "plants/P25829"}
            />
          </div>
        </div>
        <BottomGrid
          stakeData={stakeData}
          setModal={setModal}
          setUnstakeModal={setUnstakeModal}
        />
      </div>
    </MainLayout>
  );
}
