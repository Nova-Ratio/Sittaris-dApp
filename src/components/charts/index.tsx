import Dropdown from "../tailwind/Dropdown";
import { useEffect, useState } from "react";
import { Granularities } from "@/types";
import { PeriodData } from "@/data/period";
import { Zones } from "@/data/zones";

export function PeriodDropDown({
  period,
  setPeriod,
  placement = "bottom-start",
}: {
  period: any;
  setPeriod: Function;
  placement?: string;
}) {
  return (
    <Dropdown
      offset={[0, 4]}
      placement={`${placement}`}
      btnClassName="block p-2  dark:text-white "
      button={
        <div className="flex items-center hover:text-[#03AE5A] gap-2">
          {period.label}
          <DownIcon />
        </div>
      }
    >
      <div className="flex flex-col py-2 gap-2 bg-black/50 backdrop-blur-sm border-black/60 dark:border-white/60 border  text-white rounded-lg">
        {PeriodData.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              setPeriod({
                label: item.label,
                key: item.key,
              })
            }
            className={`flex items-center gap-2 px-2 hover:text-[#03AE5A] ${
              period.key === item.key ? "text-[#03AE5A]" : ""
            } `}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
export function GranularitiesDropDown({
  period,
  setPeriod,
  granularities,
  setGranularities,
}: {
  period: any;
  setPeriod?: Function;
  granularities: any;
  setGranularities: Function;
}) {
  useEffect(() => {
    //console.log("period", period);
    let gran = PeriodData.find((item) => item.key === period.key);
    if (gran?.["default-granularity"]) {
      setGranularities({
        label:
          Granularities[
            gran?.["default-granularity"] as keyof typeof Granularities
          ],
        key: gran?.["default-granularity"],
      });
    }
  }, [period]);

  return (
    <Dropdown
      offset={[0, 4]}
      placement={`${"bottom-start"}`}
      btnClassName="block p-2  dark:text-white "
      button={
        <div className="flex items-center gap-2 hover:text-[#03AE5A]">
          {granularities.label} <DownIcon />
        </div>
      }
    >
      <div className="flex flex-col gap-2 py-2 bg-black/50 backdrop-blur-sm border-black/60 dark:border-white/60 border text-white rounded-lg">
        {PeriodData.find((item) => {
          return item.key === period.key;
        })?.granularities.map((item: any, index) => (
          <button
            key={index}
            onClick={() =>
              setGranularities({
                label: Granularities[item as keyof typeof Granularities],
                key: item,
              })
            }
            className={`flex items-center gap-2 px-2 hover:text-[#03AE5A] rounded-lg hover:bg-white-light/90 dark:hover:bg-dark/60 ${
              granularities.key === item ? "text-[#03AE5A]" : ""
            } `}
          >
            <span>{Granularities[item as keyof typeof Granularities]}</span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}

export const DownIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.146691 0.146447C0.341953 -0.0488157 0.658535 -0.0488157 0.853798 0.146447L4.00024 3.29289L7.14669 0.146447C7.34195 -0.0488157 7.65854 -0.0488157 7.8538 0.146447C8.04906 0.341709 8.04906 0.658291 7.8538 0.853553L4.3538 4.35355C4.15854 4.54882 3.84195 4.54882 3.64669 4.35355L0.146691 0.853553C-0.0485714 0.658291 -0.0485714 0.341709 0.146691 0.146447Z"
        fill="currentColor"
      />
    </svg>
  );
};

export function ZoneDropDown({
  zone,
  setZone,
  data,
  placement = "bottom-start",
}: {
  zone: any;
  setZone: Function;
  data: any;
  placement?: string;
}) {
  
  
  return (
    <Dropdown
      offset={[0, 4]}
      placement={`${placement}`}
      btnClassName="block 2xl:p-2  dark:text-white w-full "
      button={
        <div className="flex text-white items-center justify-between hover:text-[#03AE5A] gap-2 zeroBtn py-3 md:py-4 px-4 md:px-6 w-full">
          {zone?.name}
          <DownIcon className="w-2.5 md:w-4 h-fit" />
        </div>
      }
    >
      <div className="flex flex-col py-2 gap-2 w-full px-4 bg-black/50 backdrop-blur-sm border-black/60 dark:border-white/60 border  text-white rounded-lg">
        {data.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() =>
              setZone({
                label: item?.label,
                key: item?.key,
                name: item?.name,
              })
            }
            className={`flex items-center gap-2 px-2 hover:text-[#03AE5A] ${
               zone?.key === item?.key ? "text-[#03AE5A]" : ""
            } `}
          >
            <span>{item?.name}</span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}

