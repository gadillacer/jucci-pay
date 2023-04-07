import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import Project from './Project';
import axios from 'axios';
import { styled } from '@mui/system';

const ProjectName = styled(ListItemText)(({ theme }) => ({
      fontWeight: 600,
      color: theme?.palette?.primary?.main || '#3f51b5',
  }));
  
const ServiceProvider = styled(ListItemText)(({ theme }) => ({
      fontStyle: 'italic',
      color: theme?.palette?.secondary?.main || '#f50057',
}));

  
const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
            setProjects(data);
        };
        fetchData();
    }, []);
    
    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 3 }}>
                Current Paymaster projects by owners
            </Typography>
            <List component="nav">
            {projects.map((project) => (
                <div key={project._id}>
                    <Link href={`/projects/${project._id}`} passHref>
                        <ListItem button component="a">
                            <ProjectName primary={project.projectName} />
                            <ServiceProvider primary={project.serviceProvider} />
                        </ListItem>
                    </Link>
                    <Divider />
                </div>
            ))}
            </List>
        </>
    );
};

export default ProjectList;