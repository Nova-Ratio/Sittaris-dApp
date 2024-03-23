import { ethers } from "ethers";
import {
  callSaleContract,
  callStakingContract,
  callTokenContract,
  callPaymentTokenContract,
} from "./ethereumContracts";
import {
  ToastError,
  ToastSuccess,
} from "@/components/tailwind/alert/SweatAlert";
import { parseTo18Decimals, parseToDecimals } from "@/hook/parse18decimals";

//Token Contract's functions
export const callAllowance = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callTokenContract();
    const allowance = await contractWithSigner.allowance(msgSender, address);
    return allowance;
  } catch (error) {
    console.error("Error during allowance:", error);
    //alert("There was an error during the allowance process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the allowance process. Please try again.",
    });
    return false;
  }
};

export const callApprove = async (address: string, amount: number) => {
  try {
    const { contractWithSigner, msgSender } = await callTokenContract();
    const tx = await contractWithSigner.approve(address, amount);
    await tx.wait();
  } catch (error) {
    console.error("Error during approve:", error);
    //alert("There was an error during the approve process. Please try again.");
    ToastError.fire({
      title: "There was an error during the approve process. Please try again.",
    });
    return false;
  }
};

export const callBalanceOfSit = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callTokenContract();
    const balance = await contractWithSigner.balanceOf(address);
    const decimals = await callSitTokenDecimals();
    return Number(balance) / 10 ** Number(decimals);
  } catch (error) {
    console.error("Error during balanceOf:", error);
    //alert("There was an error during the balanceOf process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the balanceOf process. Please try again.",
    });
    return false;
  }
};

export const callSitTokenDecimals = async () => {
  try {
    const { contractWithSigner, msgSender } = await callTokenContract();
    const decimals = await contractWithSigner.decimals();
    return decimals;
  } catch (error) {
    console.error("Error during tokenDecimals:", error);
    //alert("There was an error during the tokenDecimals process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the tokenDecimals process. Please try again.",
    });
    return false;
  }
};

//Payment Token Contract's functions
export const callPaymentTokenAllowance = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callPaymentTokenContract();
    let allowance = await contractWithSigner.allowance(msgSender, address);
    return allowance;
  } catch (error) {
    console.error("Error during paymentTokenAllowance:", error);
    //alert("There was an error during the paymentTokenAllowance process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the paymentTokenAllowance process. Please try again.",
    });
    return false;
  }
};

export const callPaymentTokenApprove = async (
  address: string,
  amount: string
) => {
  try {
    const { contractWithSigner, msgSender } = await callPaymentTokenContract();
    const tx = await contractWithSigner.approve(address, amount);
    await tx.wait();
  } catch (error) {
    console.error("Error during paymentTokenApprove:", error);
    //alert("There was an error during the paymentTokenApprove process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the paymentTokenApprove process. Please try again.",
    });
    return false;
  }
};

export const callPaymentTokenDecimals = async () => {
  try {
    const { contractWithSigner, msgSender } = await callPaymentTokenContract();
    const decimals = await contractWithSigner.decimals();
    return decimals;
  } catch (error) {
    console.error("Error during paymentTokenDecimals:", error);
    //alert("There was an error during the paymentTokenDecimals process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the paymentTokenDecimals process. Please try again.",
    });
    return false;
  }
};

export const callBalanceOfPaymentToken = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callPaymentTokenContract();
    let balance = await contractWithSigner.balanceOf(address);
    const decimals = await callPaymentTokenDecimals();
    balance = Number(balance) / 10 ** Number(decimals);
    return balance;
  } catch (error) {
    console.error("Error during balanceOf:", error);
    //alert("There was an error during the balanceOf process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the balanceOf process. Please try again.",
    });
    return false;
  }
};

//Public Sale Contract's functions
export const callBuyTokens = async (amount: number) => {
  try {
    console.log("amount", amount);

    const price = await callGetPrice();
    console.log("price", Number(price));

    const decimals: number = await callPaymentTokenDecimals();
    console.log("decimals", decimals);

    console.log("price", price);

    const amountToPay = amount * Number(price);
    console.log("amountToPay", amountToPay);

    const { contractWithSigner, msgSender, publicSaleAddress } =
      await callSaleContract();
    const checker = await callPaymentTokenAllowance(publicSaleAddress);
    console.log(
      "checker",
      Number(checker).toLocaleString("fullwide", { useGrouping: false })
    );

    if (Number(checker) < amountToPay) {
      console.log("amountToPay2", amountToPay.toString());

      await callPaymentTokenApprove(publicSaleAddress, amountToPay.toString());
    }
    const decimalsToken = await callSitTokenDecimals();
    console.log("decimalsToken", Number(decimalsToken));

    const buyingAmount = amount * 10 ** Number(decimalsToken);
    const tx = await contractWithSigner.buyTokens(buyingAmount.toString());
    await tx.wait();
    let hash = tx.hash;
    ToastSuccess({
      tHashLink: hash,
    }).fire({
      title: "Transaction completed successfully.",
    });
    return true;
  } catch (error) {
    console.log("error", error);

    console.error("Error during buyTokens:", error);
    //alert("There was an error during the buyTokens process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the buyTokens process. Please try again.",
    });
    return false;
  }
};

export const callIsBeneficiary = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const isBeneficiary = await contractWithSigner.isBeneficiary(address);
    return isBeneficiary;
  } catch (error) {
    console.error("Error during isBeneficiary:", error);
    //alert("There was an error during the isBeneficiary process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the isBeneficiary process. Please try again.",
    });
    return false;
  }
};

export const callGetPrice = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const price = await contractWithSigner.price();
    return price;
  } catch (error) {
    console.error("Error during getPrice:", error);
    //alert("There was an error during the getPrice process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the getPrice process. Please try again.",
    });
    return false;
  }
};

export const callGetVestingInfo = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const vestingInfo = await contractWithSigner.vestingInfo(address);
    return await vestingInfo;
  } catch (error) {
    console.error("Error during getVestingInfo:", error);
    //alert("There was an error during the getVestingInfo process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the getVestingInfo process. Please try again.",
    });
    return false;
  }
};

export const callSaleStartTimestamp = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const startTimestamp = await contractWithSigner.saleStartTime();
    return startTimestamp;
  } catch (error) {
    console.error("Error during saleStartTimestamp:", error);
    //alert("There was an error during the saleStartTimestamp process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the saleStartTimestamp process. Please try again.",
    });
    return false;
  }
};

export const callSaleEndTimestamp = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const endTimestamp = await contractWithSigner.saleEndTime();
    return endTimestamp;
  } catch (error) {
    console.error("Error during saleEndTimestamp:", error);
    //alert("There was an error during the saleEndTimestamp process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the saleEndTimestamp process. Please try again.",
    });
    return false;
  }
};

export const callVestingStartTimestamp = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const startTimestamp = await contractWithSigner.vestingStartTime();
    return startTimestamp;
  } catch (error) {
    console.error("Error during vestingStartTimestamp:", error);
    //alert("There was an error during the vestingStartTimestamp process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the vestingStartTimestamp process. Please try again.",
    });
    return false;
  }
};

export const callVestingEndTimestamp = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const endTimestamp = await contractWithSigner.vestingEndTime();
    return endTimestamp;
  } catch (error) {
    console.error("Error during vestingEndTimestamp:", error);
    //alert("There was an error during the vestingEndTimestamp process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the vestingEndTimestamp process. Please try again.",
    });
    return false;
  }
};

export const callNextDistributionTimestamp = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const nextDistributionTimestamp =
      await contractWithSigner.nextDistributionTime();
    return nextDistributionTimestamp;
  } catch (error) {
    console.error("Error during nextDistributionTimestamp:", error);
    //alert("There was an error during the nextDistributionTimestamp process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the nextDistributionTimestamp process. Please try again.",
    });
    return false;
  }
};

export const callTotalSaledTokens = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const decimals = await callSitTokenDecimals();
    let totalSaledToken = await contractWithSigner.totalSaledTokens();
    totalSaledToken = Number(totalSaledToken) / 10 ** Number(decimals);
    return totalSaledToken;
  } catch (error) {
    console.error("Error during totalSaledToken:", error);
    //alert("There was an error during the totalSaledToken process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the totalSaledToken process. Please try again.",
    });
    return false;
  }
};

export const callTotalSaleLimit = async () => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const decimals = await callSitTokenDecimals();
    let totalSaleLimit = await contractWithSigner.totalSaleLimit();
    totalSaleLimit = Number(totalSaleLimit) / 10 ** Number(decimals);
    return totalSaleLimit;
  } catch (error) {
    console.error("Error during totalSaleLimit:", error);
    //alert("There was an error during the totalSaleLimit process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the totalSaleLimit process. Please try again.",
    });
    return false;
  }
};

export const callPurchasedTokens = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callSaleContract();
    const decimals = await callSitTokenDecimals();
    let purchasedTokens = await contractWithSigner.purchasedTokes(address);
    purchasedTokens = Number(purchasedTokens) / 10 ** Number(decimals);
    return purchasedTokens;
  } catch (error) {
    console.error("Error during purchasedTokens:", error);
    //alert("There was an error during the purchasedTokens process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the purchasedTokens process. Please try again.",
    });
    return false;
  }
};

//Staking Contract's functions
export const callStake = async (amount: any, period: number) => {
  try {
    const { contractWithSigner, msgSender, stakingAddress } =
      await callStakingContract();
    let decimals = await callSitTokenDecimals();
    let checker = await callAllowance(stakingAddress);
    console.log(
      "checker",
      Number(checker).toLocaleString("fullwide", { useGrouping: false }),
      amount
    );
    amount = await parseToDecimals(amount,decimals);
    console.log("amount", amount);

    if (Number(checker) < Number(amount)) {
      await callApprove(stakingAddress, amount);
    }

    const tx = await contractWithSigner.stake(amount, period);
    await tx.wait();
    return true;
  } catch (error) {
    console.log("Error during stake:", error);
    //alert("There was an error during the stake process. Please try again.");
    ToastError.fire({
      title: "There was an error during the stake process. Please try again.",
    });
    return false;
  }
};

export const callUnstake = async (amount: number) => {
  try {
    const { contractWithSigner, msgSender } = await callStakingContract();
    const decimals = await callSitTokenDecimals();
    const amountToUnstake = parseToDecimals(amount,decimals);
    const tx = await contractWithSigner.unstake(amountToUnstake);
    await tx.wait();
    return true;
  } catch (error) {
    console.log("Error during unstake:", error);
    //alert("There was an error during the unstake process. Please try again.");
    ToastError.fire({
      title: "There was an error during the unstake process. Please try again.",
    });
    return false;
  }
};

export const callClaim = async () => {
  try {
    const { contractWithSigner, msgSender } = await callStakingContract();
    const tx = await contractWithSigner.claimReward();
    await tx.wait();
  } catch (error) {
    console.error("Error during claim:", error);
    //alert("There was an error during the claim process. Please try again.");
    ToastError.fire({
      title: "There was an error during the claim process. Please try again.",
    });
    return false;
  }
};

export const callStakeInfo = async (address: string) => {
  try {
    //console.log("address", address);
    
    const { contractWithSigner, msgSender } = await callStakingContract();
    const stakeInfo = await contractWithSigner.stakes(address);
    return stakeInfo;
  } catch (error) {
    console.log("Error during stakeInfo:", error);
    //alert("There was an error during the stakeInfo process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the stakeInfo process. Please try again.",
    });
    return false;
  }
};

export const callCalculateReward = async (address: string) => {
  try {
    const { contractWithSigner, msgSender } = await callStakingContract();
    let rewards = await contractWithSigner.calculateReward(address);
    const decimals = await callSitTokenDecimals();
    rewards = Number(rewards) / 10 ** Number(decimals);
    return rewards;
  } catch (error) {
    console.error("Error during calculateRewards:", error);
    //alert("There was an error during the calculateRewards process. Please try again.");
    ToastError.fire({
      title:
        "There was an error during the calculateRewards process. Please try again.",
    });
    return false;
  }
};

export const callAPY = async () => {
  try {
    const { contractWithSigner, msgSender } = await callStakingContract();
    const apy = await contractWithSigner.APY();
    return apy;
  } catch (error) {
    console.error("Error during apy:", error);
    //alert("There was an error during the get apy process. Please try again.");
    ToastError.fire({
      title: "There was an error during the get apy process. Please try again.",
    });
    return false;
  }
};
