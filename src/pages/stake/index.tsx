import Image from "next/image";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { useState } from "react";
import { Zones } from "@/data/zones";
import { BottomGrid, StakeModal, UnstakeModal } from "@/components/stake";

export default function Home() {
  const [zoneId, setZoneId] = useState(1);
  const [modal, setModal] = useState(false);
  const [unstakeModal, setUnstakeModal] = useState(false);
  const [amount, setAmount] = useState(0);
  return (
    <MainLayout title="Home">
      <StakeModal
        modal={modal}
        setModal={setModal}
        amount={amount}
        setAmount={setAmount}
      />
      <UnstakeModal
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
            <ApexChart height={280} setZoneId={setZoneId} seriesNames={true} />
          </div>
          <div className="w-1/3 flex flex-col gap-10 py-3 ">
            <ParametreVertical
              plantKey={zoneId ? Zones[zoneId - 1].ref : "plants/P25829"}
            />
          </div>
        </div>
        <BottomGrid setModal={setModal} setUnstakeModal={setUnstakeModal} />
      </div>
    </MainLayout>
  );
}
