import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import { HttpGet } from 'helper/api';
// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TimeLineLaunch = ({ isLoading }) => {
    const [loading, setLoading] = useState(false);
    const [launches, setLaunches] = useState({
        height: 480,
        type: 'line',
        options: {
            chart: {
                id: 'line-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            yaxis: {
                type: 'category',
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
        series: [
            {
                name: 'Laucnh',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    });
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    useEffect(() => {
        const newChartData = {
            ...launches.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading && launches?.options?.xaxis?.categories?.length) {
            ApexCharts.exec(`line-chart`, 'updateOptions', newChartData);
        }
    }, [
        navType,
        primary200,
        primaryDark,
        secondaryMain,
        secondaryLight,
        primary,
        darkLight,
        grey200,
        loading,
        grey500,
        launches?.options?.xaxis?.categories?.length
    ]);

    const GetSpaceXLaunches = async () => {
        setLoading(true);
        const result = await HttpGet('launches');
        if (result?.length) {
            let infoData = {
                height: 480,
                type: 'line',
                options: {
                    chart: {
                        id: 'line-chart',
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                legend: {
                                    position: 'bottom',
                                    offsetX: -10,
                                    offsetY: 0
                                }
                            }
                        }
                    ],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '50%'
                        }
                    },
                    xaxis: {
                        type: 'category',
                        categories: [...new Set(result?.map((res) => new Date(res?.launch_date_utc)?.toLocaleString('fr-CA')))]
                    },
                    legend: {
                        show: true,
                        fontSize: '14px',
                        fontFamily: `'Roboto', sans-serif`,
                        position: 'bottom',
                        offsetX: 20,
                        labels: {
                            useSeriesColors: false
                        },
                        markers: {
                            width: 16,
                            height: 16,
                            radius: 5
                        },
                        itemMargin: {
                            horizontal: 15,
                            vertical: 8
                        }
                    },
                    fill: {
                        type: 'solid'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    grid: {
                        show: true
                    }
                },
                series: [
                    {
                        name: 'Launch Time Line',
                        data: [
                            ...Object.values(
                                result
                                    ?.map((res) => new Date(res?.launch_year)?.toLocaleString('fr-CA'))
                                    .reduce(function (acc, curr) {
                                        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
                                    }, {})
                            )
                        ]
                    }
                ]
            };
            setLaunches(infoData);
            setLoading(false);
        } else {
            setLaunches([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        let isActive = true;
        if (isActive) {
            GetSpaceXLaunches();
        }

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <>
            {isLoading && launches?.options?.xaxis?.categories?.length === 0 ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Launch Per Year</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...launches} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TimeLineLaunch.propTypes = {
    isLoading: PropTypes.bool
};

export default TimeLineLaunch;
