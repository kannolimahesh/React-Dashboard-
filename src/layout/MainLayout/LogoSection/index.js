import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Typography variant="h5">Space X</Typography>
    </ButtonBase>
);

export default LogoSection;
