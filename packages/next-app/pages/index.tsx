import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Card from "../components/Card";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="bg-blue-500 py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Stargate</h2>
          <ConnectButton />
        </div>
      </header>
      <main className="flex gap-8 flex-col md:flex-row justify-center my-20 px-8">
        <Card
          chainName="Goerli"
          tokenBalance={200}
          onApprove={() => {
            alert("Approve");
          }}
          onBridge={() => {
            alert("Bridge");
          }}
        />
        <Card
          chainName="Filecoin"
          tokenBalance={100}
          onApprove={() => {
            alert("Approve");
          }}
          onBridge={() => {
            alert("Bridge");
          }}
        />
      </main>
    </div>
  );
};

export default Home;
