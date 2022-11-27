/* eslint-disable */
// map
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// project-import
import MainCard from 'ui-component/cards/MainCard';

// mui
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';
import { HttpGet } from 'helper/api';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';

const LaunchePad = () => {
    const [launchePadData, setLaunchePadData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const GetSpaceXLaunchePadLocation = async () => {
        setLoading(true);
        const result = await HttpGet('launchpads');
        if (result?.length) {
            const resultWithLatLongArrFormat = result?.map((res) => ({
                ...res,
                cordinate: [res?.location?.longitude , res?.location?.latitude]
            }));
            setLaunchePadData(resultWithLatLongArrFormat);
            setLoading(false);
        } else {
            setLaunchePadData([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        let isActive = true;
        if (isActive) {
            GetSpaceXLaunchePadLocation();
        }

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <MainCard>
            <Box sx={{ p: 0.2 }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Typography>Launchpad Locations</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {loading ? (
                            <Skeleton width={200} height={200} />
                        ) : (
                            <ComposableMap projection="geoAlbersUsa">
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => <Geography stroke="#FFF" fill="#DDD" key={geo.rsmKey} geography={geo} />)
                                    }
                                </Geographies>
                                {launchePadData?.length
                                    ? launchePadData?.slice(0, 3)?.map(({ name, cordinate }) => (
                                          <Marker
                                              key={name}
                                              coordinates={cordinate}
                                              onMouseEnter={() => {
                                                  setContent(name);
                                              }}
                                              onMouseLeave={() => {
                                                  setContent('');
                                              }}
                                          >
                                              <circle cx="12" cy="10" r="3" />
                                              <text textAnchor="middle" y={-15} style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}>
                                                  {name}
                                              </text>
                                          </Marker>
                                      ))
                                    : null}
                                {launchePadData?.length
                                    ? launchePadData?.slice(4, launchePadData?.length)?.map(({ name, cordinate }) => (
                                          <Marker
                                              key={name}
                                              coordinates={cordinate}
                                              onMouseEnter={() => {
                                                  setContent(name);
                                              }}
                                              onMouseLeave={() => {
                                                  setContent('');
                                              }}
                                          >
                                              <circle cx="12" cy="10" r="3" />
                                              <text textAnchor="middle" y={-15} style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}>
                                                  {name}
                                              </text>
                                          </Marker>
                                      ))
                                    : null}
                            </ComposableMap>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <ReactTooltip>{content}</ReactTooltip>
        </MainCard>
    );
};

export default LaunchePad;
