import React, { Fragment } from 'react';
import { Chip, Typography } from '@material-ui/core';


const Display = ({ total, delimiter }) => {
    return (
        <Fragment>
            <div>
                <Typography variant="caption" display="block" gutterBottom>
                    Active Delimiters:
                </Typography>
                {delimiter && delimiter.map((item, i) => <Chip label={item} key={item + i} color="primary" style={{ margin: '0 .1rem' }} />)}
            </div>
            <Typography color="textSecondary" variant="h4" style={{ margin: '25px 0' }}>
                Your total is <span style={{ color: 'blue' }}>{total}</span>
            </Typography>
        </Fragment>
    )
}

export default Display;
