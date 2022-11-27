import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import { HttpGet } from 'helper/api';
import { useEffect } from 'react';
import { useState } from 'react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, launchesInfo }) => {
    const theme = useTheme();
    const [launchesData, setLaunchesData] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetSpaceXLaunches = async () => {
        setLoading(true);
        const result = await HttpGet(launchesInfo.url);
        if (result?.length) {
            setLaunchesData(result);
            setLoading(false);
        } else {
            setLaunchesData([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        let isActive = true;
        if (isActive && launchesInfo?.url?.length) {
            GetSpaceXLaunches();
        }

        return () => {
            isActive = false;
        };
    }, [launchesInfo?.url]);

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item textAlign="center">
                                        {!loading ? (
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {launchesData.length}
                                            </Typography>
                                        ) : (
                                            <CircularProgress />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }} textAlign="center">
                                <Typography
                                    sx={{
                                        fontSize: '1.2rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    {launchesInfo?.title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool,
    launchesInfo: PropTypes.any
};

export default EarningCard;
