import React from 'react';
import Typography from '@material-ui/core/Typography';

const Display = ({ total }) => {
    return (
        <Typography color="textSecondary" variant="h4" style={{ margin: '25px 0' }}>
            Your total is <span style={{ color: 'blue' }}>{total}</span>
        </Typography>
    )
}

export default Display;
