import { callPaymentTokenDecimals } from "@/contractInteractions/useAppContract";
import { ethers } from "ethers";

export async function parseTo18Decimals(number: number) {
  const decimals: number = await callPaymentTokenDecimals();
  const parsed = ethers.parseUnits(number.toString(), Number(decimals));
  return parsed.toString();
}