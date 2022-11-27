import { useEffect, useState } from 'react';

// material-ui
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import LaunchePad from './LaunchePad';
import TimeLineLaunch from './TimeLineLaunch';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const LAUNCHES_TYPES = [
        {
            url: 'launches/upcoming',
            title: 'Upcoming'
        },
        {
            url: 'launches/past',
            title: 'Past'
        },
        {
            url: 'launches',
            title: 'Total'
        }
    ];

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography varaint="h4" sx={{ m: 2 }}>
                    Anyalytics Dashboard
                </Typography>
                <Card>
                    <CardHeader title="Launches" />
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            {LAUNCHES_TYPES?.map((launches) => (
                                <Grid key={launches?.title} item lg={4} md={6} sm={6} xs={12}>
                                    <EarningCard isLoading={isLoading} launchesInfo={launches} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <LaunchePad />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TimeLineLaunch isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
