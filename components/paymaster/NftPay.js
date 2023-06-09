import React, { useState } from "react";
import { Contract } from "ethers";
import { erc721ABI, useSigner, useAccount } from "wagmi";
import { AddLiquidity } from "../app/AddLiquidity";
import { Buy } from "../app/Buy";
import { RemoveLiquidity } from "../app/RemoveLiquidity";
import { Sell } from "../app/Sell";
import { useSubpools } from "../../hooks/useSubpools";
import { Button, Box } from '@mui/material';
import styled from "styled-components";
import nftCollections from "../../ethereum/nftCollections.json";

const Container = styled.div`
  display: grid;
  margin-top: 12px;
`;

function NftPay() {
  const [tab, setTab] = useState("Sell");
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [showNFTPay, setShowNFTPay] = useState(false);

  const [tokenAddress, setTokenAddress] = useState(
    nftCollections.tokens[0].address
  );

  const [_, poolAddress] = useSubpools({
    tokenAddress,
  });

  const approve = async () => {
    const token = new Contract(tokenAddress, erc721ABI, signer);

    const tx = await token.setApprovalForAll(poolAddress, true);
    await tx.wait();

    alert("Approved token for spending");
  };

  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowNFTPay(!showNFTPay)}
        >
          {showNFTPay ? "Hide NFT Pay" : "Pay with NFT (wip)"}
        </Button>
      </Box>
      { showNFTPay && address && (
        <div>
          <p>NFT AMM with trait-classify</p>

          <select
            value={tokenAddress}
            style={{ marginTop: 12 }}
            onChange={(e) => setTokenAddress(e.target.value)}
          >
            {nftCollections.tokens.map(({ address, name, symbol }) => (
              <option value={address} key={address}>
                {name} ({symbol})
              </option>
            ))}
          </select>

          <button style={{ marginTop: 12 }} onClick={approve}>
            Approve NFT for pool
          </button>

          <Container>
            <select
              style={{ width: "fit-content" }}
              value={tab}
              onChange={(e) => setTab(e.target.value)}
            >
              {["Add liquidity", "Remove liquidity", "Buy", "Sell"].map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>

            {tab === "Add liquidity" && (
              <AddLiquidity tokenAddress={tokenAddress} />
            )}
            {tab === "Remove liquidity" && (
              <RemoveLiquidity tokenAddress={tokenAddress} />
            )}
            {tab === "Buy" && <Buy tokenAddress={tokenAddress} />}
            {tab === "Sell" && <Sell tokenAddress={tokenAddress} />}
          </Container>
        </div>
      )}
    </>
  );
}

export default NftPay;



