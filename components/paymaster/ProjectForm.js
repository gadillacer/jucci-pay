import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';


const ProjectForm = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedApiKey = "/* Encrypt the API key */";
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, { projectName, serviceProvider, apiKey });
    setProjectName('');
    setServiceProvider('');
    setApiKey('');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
        Add New Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="service-provider">Service Provider</InputLabel>
                <Select
                  label="Service Provider"
                  value={serviceProvider}
                  onChange={(e) => setServiceProvider(e.target.value)}
                  inputProps={{
                    name: 'service-provider',
                    id: 'service-provider',
                  }}
                >
                  <MenuItem value="Biconomy">Biconomy</MenuItem>
                  <MenuItem value="ZeroDev" disabled>ZeroDev</MenuItem>
                  <MenuItem value="StackUp" disabled>StackUp</MenuItem>
                  <MenuItem value="Custom" disabled>Your Custom Paymaster</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={serviceProvider === 'Biconomy' ? 'Funding Key' : 'API Key?'}
                variant="outlined"
                fullWidth
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={serviceProvider !== 'Biconomy'}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
              Add Project
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ProjectForm;