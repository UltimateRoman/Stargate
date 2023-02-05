import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
return (
   <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="bg-blue-500 py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Stargate</h2>
          <button className="bg-white text-blue-500 p-2 rounded-lg">Connect Wallet</button>
        </div>
      </header>
      <main className="flex justify-center mt-8">
        <div className="w-1/2 p-4 border border-gray-400 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-lg font-bold">Chain 1</h2>
          <div className="mt-4">
            <p className="text-gray-600">Token Balance: <span className="font-bold text-blue-500">100</span></p>
            <div className="mt-4">
              <label className="block font-bold mb-2">Enter Amount:</label>
              <input type="text" className="border border-gray-400 p-2 w-32" />
            </div>
            <div className="mt-4 flex flex-col">
              <button className="bg-blue-500 text-white p-2 rounded-lg">Approve Tokens</button>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-2">Bridge Tokens</button>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 border border-gray-400 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-lg font-bold">Chain 2</h2>
          <div className="mt-4">
            <p className="text-gray-600">Token Balance: <span className="font-bold text-blue-500">200</span></p>
            <div className="mt-4">
              <label className="block font-bold mb-2">Enter Amount:</label>
              <input type="text" className="border border-gray-400 p-2 w-32" />
            </div>
            <div className="mt-4 flex flex-col">
              <button className="bg-blue-500 text-white p-2 rounded-lg">Approve Tokens</button>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-2">Bridge Tokens</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home
