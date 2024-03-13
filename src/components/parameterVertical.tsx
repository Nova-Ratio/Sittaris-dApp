import React, { useEffect, useState } from "react";
import { PeriodDropDown } from "./charts";
import AnimateHeight from "react-animate-height";
import { InfoIcon } from "./icons";
import Synaptiq from "@/services/synaptiq";
import { PeriodData } from "@/data/period";

export default function ParametreVertical({
  plantKey = "plants/P25829",
  addClass = "",
}: {
  plantKey?: string;
  addClass?: string;
}) {
  const [activeParametre, setActiveParametre] = useState(true);
  const [parameterData, setParameterData] = useState({
    energy: "0",
    specific: "0",
    income: "N/A",
    meter: "N/A",
  });
  const [parameterPeriod, setParameterPeriod] = useState({
    label: "Yesterday",
    key: "yesterday",
  });
  const [plant, setPlant] = useState(plantKey);
  const [token, setToken] = useState("");
  useEffect(() => {
    setPlant(plantKey);
  }, [plantKey]);

  useEffect(() => {
    getSumData();
  }, [plant]);

  const synaptiq = Synaptiq();
  async function getSumData() {
    try {
      let NewToken;
      if (!token) {
        let res = await synaptiq.login();
        NewToken = res.token;
        setToken(res.token);
      } else {
        NewToken = token;
      }
      const start_date = PeriodData.find(
        (item) => item.key === parameterPeriod.key
      )?.start_date?.toISOString();
      const end_date = PeriodData.find(
        (item) => item.key === parameterPeriod.key
      )?.end_date?.toISOString();
      let gran = PeriodData.find((item) => item.key === parameterPeriod.key);
      let specific = await synaptiq.getIndicatorData(
        NewToken,
        gran?.["default-granularity"] || "1-hours",
        "energy.specific",
        start_date || "",
        end_date || "",
        plant
      );
      let sumSpecific = specific.data.reduce(
        (acc: any, item: any) => acc + item[1][0][0],
        0
      );
      console.log("sumSpecific", sumSpecific.toFixed(2));
      setParameterData((prev: any) => ({
        ...prev,
        specific: sumSpecific.toFixed(2),
      }));
      let energy = await synaptiq.getIndicatorData(
        NewToken,
        gran?.["default-granularity"] || "1-hours",
        "energy.generation",
        start_date || "",
        end_date || "",
        plant
      );
      let sumEnergy = energy.data.reduce(
        (acc: any, item: any) => acc + item[1][0][0],
        0
      );
      console.log("sumEnergy", sumEnergy.toFixed(2));
      setParameterData((prev: any) => ({
        ...prev,
        energy: sumEnergy.toFixed(2),
      }));
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getSumData();
  }, [parameterPeriod]);
  return (
    <div className={`w-full flex flex-col gap-1 ${addClass} `} >
      <div className="flex items-center gap-3 w-full justify-between">
        <button
          /* onClick={() => setActiveParametre(!activeParametre)} */
          className="flex items-center text-2xl gap-2 text-sittaris-300"
        >
          <h3>Parameter</h3>
          {/* <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-all ${
              !activeParametre ? "rotate-180" : ""
            }`}
          >
            <path
              d="M12 10L8 6L4 10"
              stroke="#F6911D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
        </button>
        <PeriodDropDown
          period={parameterPeriod}
          setPeriod={setParameterPeriod}
          placement="bottom-end"
        />
      </div>
      <AnimateHeight height={activeParametre ? "auto" : 0}>
        <div className="w-full grid gap-3 md:gap-6 py-3 ">
          {[
            {
              label: "Energy (Meter)",
              value: parameterData.meter,
              scale: "",
            },
            {
              label: "Energy Specific (Obsolete)",
              value: parameterData.specific,
              scale: "kWh/kWp",
            },
            {
              label: "Energy (kWh)",
              value: parameterData.energy,
              scale: "kWh",
            },
            { label: "Income", value: parameterData.income, scale: "" },
          ].map((item, index) => (
            <div key={index} className="flex justify-between gap-2 ">
              <div className="flex gap-1">
                {item.label}
                <button className=" hover:text-black transition-colors dark:hover:text-white">
                  <InfoIcon />
                </button>
              </div>
              <div className="text-sittaris-700">
                {item.value} {item.scale}
              </div>
            </div>
          ))}
        </div>
      </AnimateHeight>
    </div>
  );
}
