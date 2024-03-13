//convert to tsx nextjs
import Synaptiq from "@/services/synaptiq";
import dynamic from "next/dynamic";
import React, { Component, useEffect, useState } from "react";
import Dropdown from "../tailwind/Dropdown";
import { Granularities } from "@/types";
import { PeriodData } from "@/data/period";
import AnimateHeight from "react-animate-height";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";
import { InfoIcon } from "../icons";
import { GranularitiesDropDown, PeriodDropDown, ZoneDropDown } from ".";
import Parametre from "../parameter";
import { Zones } from "@/data/zones";
/* import Chart from "react-apexcharts"; */
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// convert to functional component

const ZoneApexChart = ({
  seriesNames = true,
  zoneData,
  zoneId = 1,
  height = 350,
  align = "left",
}: {
  seriesNames?: boolean;
  zoneData?: { label: string; key: string };
  zoneId?: number;
  align?: string;
  height?: number;
}) => {
  const { darkMode } = useAppSelector(selectData);
  const [token, setToken] = useState("");
  const [line, setLineData]: any = useState([]);
  const [column, setColumnData]: any = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [zone, setZone] = useState(
    zoneData || {
      label: "Zone " + zoneId,
      key: Zones[zoneId - 1]?.ref || "plants/P25829",
      name: Zones[zoneId - 1]?.name || "Zone " + zoneId,
    }
  );
  const [period, setPeriod] = useState({
    label: "Yesterday",
    key: "yesterday",
  });
  const [parameterPeriod, setParameterPeriod] = useState({
    label: "Yesterday",
    key: "yesterday",
  });
  const [granularities, setGranularities] = useState({
    label: "Hour",
    key: "1-hours",
  });

  const synaptiq = Synaptiq();

  async function getData() {
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
        (item) => item.key === period.key
      )?.start_date?.toISOString();
      const end_date = PeriodData.find(
        (item) => item.key === period.key
      )?.end_date?.toISOString();
      let column = await synaptiq.getIndicatorData(
        NewToken,
        granularities.key,
        "energy.generation",
        start_date || "",
        end_date || "",
        zone.key
      );
      await synaptiq.getZones();
      setLineData(column || []);
      let line = await synaptiq.getIndicatorData(
        NewToken,
        granularities.key,
        "irradiation.actual",
        start_date || "",
        end_date || "",
        zone.key
      );
      setColumnData(line);
    } catch (error: any) {
      alert(error.message);
      console.log("error", error);
    }
  }
  useEffect(() => {
    getData();
  }, [granularities, zone]);

  const series = [
    {
      name: seriesNames ? "Energy (kWh)" : "",
      type: "column",
      data: column?.data
        ? column.data.map((item: any) => item[1][0][0]?.toFixed(0) || 0)
        : [],
    },
    {
      name: seriesNames ? "Irradiation (Wh/m2)" : "",
      type: "line",
      data: line?.data
        ? line.data.map((item: any) => item[1][0][0]?.toFixed(0) || 0)
        : [],
    },
  ];
  const options: any = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },

    stroke: {
      width: [0, 4],
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
    },
    labels: line?.data ? line.data.map((item: any) => item[0]) : [],
    xaxis: {
      type: "datetime",
    },
    colors: ["#0F5429", "#F69320", "#9C27B0"],
    theme: {
      mode: darkMode ? "dark" : "light",
    },
    fill: {
      colors: ["#0F5429", "#F69320", "#9C27B0"],
    },
    markers: {
      colors: ["#0F5429", "#F69320", "#9C27B0"],
    },
    yaxis: [
      {
        title: {
          text: "",
        },
      },
      {
        opposite: true,
        title: {
          text: "",
        },
      },
    ],
  };

  useEffect(() => {
    setData(
      Zones?.map((item, index) => {
        return {
          label: "Zone " + (index + 1),
          key: item?.ref || "",
          name: item?.name || "",
        };
      }) || []
    );
  }, []);
  //console.log("data", data);

  return (
    <div className="w-full apexChart flex flex-col text-black dark:text-white py-0 gap-3 ">
      <div
        className="w-full flex items-end text-xl gap-3 text-black/80 dark:text-white/80"
        style={{
          justifyContent: align === "left" ? "flex-start" : "flex-end",
        }}
      >
        <div className="flex items-center gap-2 ">
          Period: <PeriodDropDown period={period} setPeriod={setPeriod} />{" "}
        </div>
        <div className="flex items-center gap-2 ">
          Granularity:
          <GranularitiesDropDown
            period={period}
            setPeriod={setPeriod}
            granularities={granularities}
            setGranularities={setGranularities}
          />
        </div>
      </div>
      <div className="border-[3px] border-black/20 dark:border-white/20 rounded-[18px] px-6 py-3 w-full">
        <Chart
          options={options}
          series={series}
          type="line"
          height={height}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ZoneApexChart;
