import { ethers } from "ethers";
import PSAbi from "./ABIS/publicSaleAbi.json";
import StakingAbi from "./ABIS/stakingAbi.json";
import tokenAbi from "./ABIS/ERC20Abi.json";
declare global {
  interface Window {
    ethereum: any;
  }
}

export const callSaleContract = async () => {
    const metamaskAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const msgSender = metamaskAddress[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = PSAbi;
    const publicSaleAddress = process.env.NEXT_PUBLIC_SALE_CONTRACT_ADDRESS as string;
    const publicSaleContract = new ethers.Contract(publicSaleAddress, abi, signer);
    const contractWithSigner:any = publicSaleContract.connect(signer);
    return { contractWithSigner, publicSaleAddress, abi, msgSender };
  };

  export const callStakingContract = async () => {
    const metamaskAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const msgSender = metamaskAddress[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = StakingAbi;
    const stakingAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as string;
    const stakingContract = new ethers.Contract(stakingAddress, abi, signer);
    const contractWithSigner:any = stakingContract.connect(signer);
    return { contractWithSigner, stakingAddress, abi, msgSender };
  };

  export const callTokenContract = async () => {
    const metamaskAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const msgSender = metamaskAddress[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = tokenAbi;
    const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string;
    const tokenContract = new ethers.Contract(tokenContractAddress, abi, signer);
    const contractWithSigner:any = tokenContract.connect(signer);
    return { contractWithSigner, tokenContractAddress, abi, msgSender };
  };

  export const callPaymentTokenContract = async () => {
    const metamaskAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const msgSender = metamaskAddress[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = tokenAbi;
    const paymentTokenContractAddress = process.env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT_ADDRESS as string;
    const paymnetTokenContract = new ethers.Contract(paymentTokenContractAddress, abi, signer);
    const contractWithSigner:any = paymnetTokenContract.connect(signer);
    return { contractWithSigner, paymentTokenContractAddress, abi, msgSender };
  };