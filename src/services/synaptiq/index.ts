import axios from "axios";
import { log } from "console";
export default function Synaptiq() {
  let token = "";
  let plantDefault = "plants/P25829";
  const url = "https://synaptiq.3esynaptiq.com/sp-sqa/v2";

  async function login() {
    try {
      let data = {
        user: "trioassets",
        password: "Trioinvest123!.",
      };
      let res = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await res.json();
      //console.log("res", response);

      return {
        token: response.token,
      };
    } catch (error: any) {
      console.log("error", error);
      //alert("synaptiq login error");
      return {
        token: "",
      };
    }
  }

  async function getIndicatorData(
    token: string,
    granularity: string,
    indicator: string,
    from_date: string,
    to_date: string,
    plant: string = plantDefault
  ) {
    try {
      //const { token } = await login();
      let res = await axios.get(url + "/data", {
        params: {
          object: plant,
          from_date: from_date, // "2021-01-01",
          to_date: to_date, // "2021-12-31",
          granularity: granularity, //"1-days",
          indicator: indicator, //"energy.generation",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      console.log("error", error);
      //alert("synaptiq getEnergyData error");
      return [];
    }
  }

  async function getZones() {
    try {
      const { token } = await login();
      let res = await axios.get(url + "/plants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log("Plants", res.data);

      return res.data;
    } catch (error: any) {
      console.log("error", error);
      //alert("synaptiq getEnergyData error");
      return [];
    }
  }
  return {
    login,
    getIndicatorData,
    getZones,
  };
}
