import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import ChainCard from "../components/ChainCard";
import { useState, useEffect } from "react";
import PopUp from "../components/PopUp";
import GitHubIcon from "../components/icons/GitHubIcon";

import { useAccount, useContractRead  } from 'wagmi';
import { OriginTokenAbi } from "../abis/OriginToken";
import { DestinationTokenAbi } from "../abis/DestinationToken";
import { Contract, ethers } from "ethers";

const Home: NextPage = () => {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [goerliBalance, setGoerliBalance] = useState<string>("0");
  const [hyperspaceBalance, setHyperspaceBalance] = useState<string>("0");
  const [goerliToken, setGoerliToken] = useState<Contract>();
  const [hyperspaceToken, setHyperspaceToken] = useState<Contract>();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    async function load() {
      if (isConnected) {
        const goerliProvider = new ethers.providers.JsonRpcProvider(
          "https://rpc.ankr.com/eth_goerli"
        );
        const hyperspaceProvider = new ethers.providers.JsonRpcProvider(
          "https://api.hyperspace.node.glif.io/rpc/v1"
        );
        const goerliToken = new ethers.Contract("0x04c2BF100ae20d3214520C7B548049AD6E210bBF", OriginTokenAbi, goerliProvider);
        const hyperspaceToken = new ethers.Contract("0x04c2BF100ae20d3214520C7B548049AD6E210bBF", DestinationTokenAbi, hyperspaceProvider);
        const goerliBalance = ethers.utils.formatEther(await goerliToken.balanceOf(address));
        const hyperspaceBalance = ethers.utils.formatEther(await hyperspaceToken.balanceOf(address));
        setGoerliToken(goerliToken);
        setHyperspaceToken(hyperspaceToken);
        setGoerliBalance(goerliBalance);
        setHyperspaceBalance(hyperspaceBalance);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goerliBalance, hyperspaceBalance]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="bg-blue-500 py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Stargate</h2>
          <ConnectButton />
        </div>
      </header>
      <main className="flex flex-grow gap-8 flex-col md:flex-row justify-center my-20 px-8">
        {showPopUp ? (
          <PopUp successfulConfirmations={5} totalConfirmations={10} />
        ) : null}
        <ChainCard
          chainName="Goerli"
          tokenBalance={goerliBalance}
          onApprove={async () => {
            
          }}
          onBridge={() => {
            setShowPopUp(true);
          }}
        />
        <ChainCard
          chainName="Hyperspace"
          tokenBalance={hyperspaceBalance}
          onApprove={async () => {
            alert("Approve");
          }}
          onBridge={() => {
            setShowPopUp(true);
          }}
        />
      </main>
      <footer className="bg-blue-500 py-4 px-6 flex flex-row justify-center align-middle items-center">
        <div className="text-white w-full flex items-center justify-center">
          <GitHubIcon
            size={24}
            href="https://github.com/UltimateRoman/Stargate"
            alt="GitHub Repository"
          />
          &nbsp;&nbsp;
          <a href="https://github.com/UltimateRoman/Stargate" title="GitHub Repository">
            Made by Team Stargate
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
