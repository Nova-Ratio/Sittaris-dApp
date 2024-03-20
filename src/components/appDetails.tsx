import { useState } from "react";
import { InfoIcon } from "./icons";

export function AppDetails({
  vertical = false,
  getData,
  addClass = "",
}: {
  vertical?: boolean;
  getData?: {
    capacity: string;
    stake: string;
  };
  addClass?: string;
}) {
  const [data, setData] = useState(
    getData || {
      capacity: "10.7 MWp",
      stake: "1.000 SIT",
    }
  );
  return (
    <div className={`flex flex-col gap-4 w-full ${addClass} `}>
      <h3 className="text-sittaris-300">Sittaris App Details</h3>
      <div
        className={` ${
          vertical ? "grid grid-cols-2 gap-12 " : "flex flex-col gap-6"
        }   w-full`}
      >
        <div className="flex justify-between items-center w-full">
          <h4>
            Total Current Capacity of Our Facilities{" "}
            <button className=" hover:text-black transition-colors dark:hover:text-white">
              <InfoIcon />
            </button>
          </h4>
          <span className="text-sittaris-700">{data?.capacity}</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <h4>
            Total Stake Amount{" "}
            <button className=" hover:text-black transition-colors dark:hover:text-white">
              <InfoIcon />
            </button>
          </h4>
          <span className="text-sittaris-700">{data?.stake}</span>
        </div>
      </div>
    </div>
  );
}
