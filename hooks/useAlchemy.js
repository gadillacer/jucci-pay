import { Network, Alchemy } from "alchemy-sdk";
import { useMemo } from "react";

export const useAlchemy = () => {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    network: Network.MATIC_MUMBAI,
    maxRetries: 10,
  };

  const web3 = useMemo(() => {
    return new Alchemy(settings);
  }, []);

  return web3;
};
