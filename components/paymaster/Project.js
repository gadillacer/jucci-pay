import React, { useState } from 'react';
import axios from 'axios';
// import Web3Auth from 'web3auth';
import { ethers } from 'ethers';
import { useAccount, useSigner } from "wagmi";
import { ListItemText, TextField, Typography, Button } from '@mui/material';
import { ConnectWalletButton } from "../core/ConnectWalletButton";
import PoolContractABI from '../../contracts/depositGateway.abi.json'; // Import the compiled ABI of your Pool contract
import { styled } from '@mui/system';
import NFTPay from './NftPay';

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme?.palette?.primary?.main || '#3f51b5'
}));

const SecondaryText = (props) => <Typography color="text.secondary" {...props} />;

const Project = ({ project }) => {
  const [amount, setAmount] = useState('');
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const deposit = async () => {
    const poolContractAddress = "0xF8A694157F6C8ddA0b5243554bCA06e76Ec15D2A"
    const poolContract = new ethers.Contract(poolContractAddress, PoolContractABI, signer);
    const parsedAmount
        = ethers.utils.parseUnits(amount, 18); // Assuming the token has 18 decimals
    
    try {
        const tx = await poolContract.deposit({ from: address, value: parsedAmount });
        await tx.wait();
        alert('Deposit successful');
    } catch (error) {
        alert('Deposit failed');
        console.error(error);
    }
  };

  const handleTransfer = async (amount, signature, userAddress) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${project._id}/deposit`, { amount, signature, userAddress });
      alert(data.message);
    } catch (error) {
      alert('Error transferring funds');
      console.error(error);
    }
  };

  const handleDeposit = async () => {
      await deposit();
      // Sign a message with the deposit amount
      const message = ethers.utils.solidityKeccak256(["uint256"], [ethers.utils.parseUnits(amount, 18)]);
      const signature = await signer.signMessage(ethers.utils.arrayify(message));
      handleTransfer(ethers.utils.parseUnits(amount, 18).toString(), signature, address);
  };

  return (
    <div>
      {/* Render project details */}
      <ConnectWalletButton />
      <ListItemText>
        <PrimaryText>{project.projectName}</PrimaryText>
        <SecondaryText>{project.serviceProvider}</SecondaryText>
        <SecondaryText>apiKey: **** (aha, you can&apos;t see it)</SecondaryText>
        <SecondaryText>Gas Balance: {(+ethers.utils.formatEther(project.dappBalance)).toFixed(4)}</SecondaryText>
      </ListItemText>
      {address && (
        <div>
          <TextField
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter deposit amount (Min: 0.1 $MATIC)"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        </div>
      )}
      <NFTPay />

    </div>
  );
};

export default Project;