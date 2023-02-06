import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import { Chain, chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const hyperspace = {
  id: 3141,
  name: 'Hyperspace',
  network: 'hyperspace',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: 'https://api.hyperspace.node.glif.io/rpc/v1',
    default: 'https://api.hyperspace.node.glif.io/rpc/v1',
  },
  blockExplorers: {
    etherscan: { name: 'filfox', url: 'https://hyperspace.filfox.info/en' },
    default: { name: 'filfox', url: 'https://hyperspace.filfox.info/en' },
  }
} as Chain

const { chains, provider } = configureChains(
  [chain.goerli, hyperspace],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://api.hyperspace.node.glif.io/rpc/v0`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Stargate Token Bridge",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
