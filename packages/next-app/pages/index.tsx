import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import ChainCard from "../components/ChainCard";
import { useState } from "react";
import PopUp from "../components/PopUp";
import GitHubIcon from "../components/icons/GitHubIcon";

const Home: NextPage = () => {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

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
          tokenBalance={200}
          onApprove={() => {
            alert("Approve");
          }}
          onBridge={() => {
            alert("Bridge");
          }}
        />
        <ChainCard
          chainName="Hyperspace"
          tokenBalance={100}
          onApprove={() => {
            alert("Approve");
          }}
          onBridge={() => {
            alert("Bridge");
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
