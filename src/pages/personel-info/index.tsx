import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import { InfoIcon } from "@/components/icons";
import { useState } from "react";
import ZoneApexChart from "@/components/charts/zoneChart";
import { Token } from "@/components/token";
import { Zones } from "@/data/zones";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam 
        mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6  h-full w-full">
       {/*  <AppDetails vertical={true} /> */}
        <div className="flex justify-between items-center gap-6">
          <h3 className={`${"font-fontspringBold"} font-semibold`}>
            Personel Information
          </h3>
          <div className="levelCard w-full">Level 5</div>
        </div>
        {[1, 2].map((item, index) => {
          return (
            <div key={index} className="p-6 flex gap-10 zoneCard w-full ">
              <div className="w-1/3 flex flex-col gap-10 py-3 ">
                <div className="flex gap-2 w-full justify-between">
                  <h3 className={`${"font-fontspringBold"} font-semibold`}>
                    Zone {item}
                  </h3>
                  <Token amount={12500} />
                </div>
                <ParametreVertical plantKey={Zones[item-1].ref} />
              </div>
              <div className=" w-2/3 ">
                <ZoneApexChart
                  height={280}
                  zoneId={index + 1}
                  seriesNames={true}
                  align="right"
                />
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
