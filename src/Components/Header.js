import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

const Header = () => {
    return (
        <Fragment>
            <Typography color="textPrimary" variant="h3" gutterBottom>
                String Calculator
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Enter your delimitter followed by numbers to receive total (ex. "1,5000")
            </Typography>
        </Fragment>
    )
}

export default Header;
