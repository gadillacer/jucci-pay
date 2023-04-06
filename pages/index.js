import { Contract } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { erc721ABI, useSigner } from "wagmi";
import { AddLiquidity } from "../components/app/AddLiquidity";
import { Buy } from "../components/app/Buy";
import { RemoveLiquidity } from "../components/app/RemoveLiquidity";
import { Sell } from "../components/app/Sell";
import { ConnectWalletButton } from "../components/core/ConnectWalletButton";
import { useSubpools } from "../hooks/useSubpools";
import ProjectForm from '../components/paymaster/ProjectForm.js';
import ProjectList from '../components/paymaster/ProjectList.js';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import * as nftCollections from "../ethereum/nftCollections.json";

const Container = styled.div`
  display: grid;
  margin-top: 12px;
`;

export default function AMM() {
  const [showProjectForm, setShowProjectForm] = useState(false);

  return (
    <div>
      <Head>
        <title>Jucci Service</title>
      </Head>

      <ConnectWalletButton />

      <ProjectList/>
      <Button variant="contained" color="primary" onClick={() => setShowProjectForm(!showProjectForm)} >
        {showProjectForm ? "Close Form" : "Add Paymaster Project"}
      </Button>

      {showProjectForm && <ProjectForm />}

      <Box sx={{ marginY: 5}}></Box>

    </div>
  );
}
