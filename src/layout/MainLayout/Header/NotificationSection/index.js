import { useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';

import User1 from 'assets/images/users/user-round.svg';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <Box
            sx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}
            display="flex"
            alignItems="center"
            columnGap={1}
        >
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            background: theme.palette.secondary.dark,
                            color: theme.palette.secondary.light
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                    src={User1}
                />
            </ButtonBase>
            <Typography variant="h6">Elon Musk</Typography>
        </Box>
    );
};

export default NotificationSection;
