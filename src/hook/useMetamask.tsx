import Ethers from "@/lib/ethers";
import {
  setAddress,
  setClear,
} from "@/redux/auth/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChainData from "@/data/chain.json";
import Swal from "sweetalert2";

import { ethers } from "ethers";
import { ToastSuccess } from "@/components/tailwind/alert/SweatAlert";
export default function useMetamask({
  modal,
  Close,
  address,
  chainId,
}: {
  modal?: boolean;
  Close: Function;
  address?: string;
  chainId?: any;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [chain, setChain]: any = useState(ChainData);
  useEffect(() => {
    // ismobil not working
    if (
      //@ts-ignore
      window.ethereum 
    ) {
      const getChainId = async () => {
        const { ethereum } = Ethers();
        const chainIdMetamask = await ethereum?.request({
          method: "eth_chainId",
        });
        //dispatch(setChainId(chainId));
        //console.log("chainIdMetamask", chainIdMetamask);
        const chainId = "0x89"
        console.log("chainIdMetamask", chainIdMetamask, chainId, chainIdMetamask.toString() !== chainId);
        
        if (chainIdMetamask.toString() !== chainId) {
          CheckChain(chainIdMetamask);
        }
      };
      getChainId();
      try {
        //@ts-ignore
        window.ethereum?.on("accountsChanged", (accounts) => {
          localStorage.removeItem("address");
          dispatch(setClear());
          //router.push("/");
          //router.reload();
        });
        //@ts-ignore
        window.ethereum?.on("chainChanged", (chainId) => {
          CheckChain(chainId);
          //console.log("chainId123123123", chainId);
          
          localStorage.removeItem("address");
          if (!address) {
            //dispatch(setChainId(chainId));
          } else {
            dispatch(setClear());
            //localStorage.clear();
          }
          //router.push("/");
          //router.reload();
        });
      } catch (err) {
        console.error(err);
      }
    }
  })

  const CheckChain = (id: string) => {
    const { provider, ethereum } = Ethers();
    

    const chainID = "0x89"
    console.log("chainID", chainID, id, chainId, address); 
    
    if (
      (id.toString() !== chainID && address) 
    ) {
      //dispatch(setClear());
      /* console.log("chainId", chainId);
      console.log("chain", chain[chainId]); */
      const { name } = chain[id] || { name: "UNKNOW" };
      const fromNetwork = name || "Unknown Network";
      const toNetwork = chain[chainID]?.name || "Binance Smart Chain 2";

      const alert = async () =>
        await Swal.fire({
          title: "Please Change Network",
          text: `From ${fromNetwork} to ${toNetwork}`,
          icon: "warning",
          iconColor: "#fff",
          showCancelButton: false,
          backdrop: true,
          background: "#191919",
          confirmButtonColor: "#282828",
          color: "#fff",
          confirmButtonText: "Yes, Change It!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await ethereum?.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chain[chainId].chainId }],
              });
            } catch (error) {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: chain[chainId].chainId,
                    chainName: chain[chainId].name,
                    nativeCurrency: {
                      name: chain[chainId].nativeCurrency.name,
                      symbol: chain[chainId].nativeCurrency.symbol,
                      decimals: 18,
                    },
                    rpcUrls: chain[chainId].rpcUrls,
                    blockExplorerUrls: chain[chainId].blockExplorerUrls,
                  },
                ],
              });
            }
          }
        });
      alert();
    }
    //console.log("id", id, chainID);

    if (id.toString() === chainID) {
      ToastSuccess({}).fire({
        title: "Network Changed",
      });
      //router.reload();
    }
  };
  //console.log("chainId", chainId);

  async function connecWallet() {
    try {
      const { provider, ethereum } = Ethers();

      await ethereum.send("eth_requestAccounts");

      let chainIdNow = await ethereum.request({ method: "eth_chainId" });

      const signer = await provider?.getSigner();

      let signature = await signer.signMessage("Connect To Sittaris dApp");

      const [address /* , chainIdNow, networkName */] = await Promise.all([
        signer.getAddress(),
        signer.provider
          .getNetwork()
          .then((network: { chainId: any }) => network.chainId),
        signer.provider
          .getNetwork()
          .then((network: { name: any }) => network.name),
      ]);
      console.log("address", address);
      localStorage.setItem("address", address);

      console.log("chainId", chainId);
      if (signature){
        Close();
        dispatch(setAddress(address));
        ToastSuccess({}).fire({
          title: "Your wallet is connected successfully.",
        });
      }
      console.log("status", ethers.formatEther(chainId));
      //dispatch(setChainId(chainId));
      console.log("chainIdNow", chainIdNow, chainId, chain[chainId].chainId);

      if (chainId.toString() !== chainIdNow) {
        try {
          await ethereum?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chain[chainId].chainId }],
          });
        } catch (error) {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chain[chainId].chainId,
                chainName: chain[chainId].name,
                nativeCurrency: {
                  name: chain[chainId].nativeCurrency.name,
                  symbol: chain[chainId].nativeCurrency.symbol,
                  decimals: 18,
                },
                rpcUrls: chain[chainId].rpcUrls,
                blockExplorerUrls: chain[chainId].blockExplorerUrls,
              },
            ],
          });
        }
      }
      CheckChain(chainIdNow);
      //router.push("/my-account");
    } catch (error) {
      console.log("error", error);
    }
  }

  return { CheckChain, connecWallet };
}
