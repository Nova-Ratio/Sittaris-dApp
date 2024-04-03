import Synaptiq from "@/services/synaptiq";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EarthInfo({
  addClass = "",
}:{
  addClass?: string;
}) {
  const synaptiq = Synaptiq();
  const [info, setInfo] = useState<{
    total: number | null;
    count: number | null;
  }>({
    total: null,
    count: null,
  });

  async function getEarthInfo() {
    try {
      let res = await synaptiq.getZones();
      console.log("res", res);
      let total = 0;
      if (res && res.length === 0) return;
      res.map((zone: any) => {
        console.log("zone", zone);
        total += Number(zone?.capacity_dc / 1000 || 0);
      });
      setInfo({
        total: total,
        count: res.length,
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getEarthInfo();
  }, []);
  return (
    <div className={`grid grid-cols-3 gap-10 px-3 md:p-6 ${addClass} `}>
      <div className="w-full justify-center items-center flex">
        <Image
          src="/assets/img/earth.png"
          width={500}
          height={500}
          className="w-full h-fit"
          alt="earth"
        />
      </div>
      <div className=" col-span-2 w-full font-medium flex flex-col gap-6">
        <div className=" w-full flex items-center gap-6">
          <Image
            src="/assets/img/energy.png"
            width={40}
            height={40}
            quality={100}
            className="w-20 h-fit"
            alt="energy"
          />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <span>Total Current Capacity:</span>
              <span className="text-sittaris-800">{info?.total ? info?.total?.toFixed(1) : "N/A"} MWp</span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span>Total Number of Our Facilities: </span>
              <span className="text-sittaris-800">{info?.count ? info?.count : "N/A"}</span>
            </div>
          </div>
        </div>
        <div className=" w-full flex items-center gap-6">
          <Image
            src="/assets/img/energy.png"
            width={40}
            height={40}
            quality={100}
            className="w-20 h-fit"
            alt="energy"
          />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <span>2025 Expected Capacity:</span>
              <span className="text-sittaris-800">50 MWp</span>
            </div>
            
          </div>
        </div>
        <div className=" w-full flex items-center gap-6">
          <Image
            src="/assets/img/energy.png"
            width={40}
            height={40}
            quality={100}
            className="w-20 h-fit"
            alt="energy"
          />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <span>2026 Expected Capacity:</span>
              <span className="text-sittaris-800">100 MWp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
