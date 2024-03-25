import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import { useState } from "react";
import { Zones } from "@/data/zones";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [zoneId, setZoneId] = useState(1);
  //console.log(zoneId);
  
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <h3 className={`${'font-fontspringBold'} font-semibold`}>
          Dashboard
        </h3>
        <div className="px-3 md:px-6 border-[3px] border-black/20 dark:border-white/20 rounded-[18px]">
          <ApexChart setZoneId={setZoneId} seriesNames={true} />
        </div>
        <div className="grid md:grid-cols-2 gap-6  font-normal md:font-medium ">
          <div className="flex w-full md:border-r pr-6 border-white/60">
            <AppDetails />
          </div>
          <ParametreVertical plantKey={Zones[zoneId-1].ref} />
        </div>
      </div>
    </MainLayout>
  );
}
