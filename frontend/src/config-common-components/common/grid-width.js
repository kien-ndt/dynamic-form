import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function GridWidth(props) {
    let {onGridWidthChange} = props
    const [state, setState] = useState(props?props.gridWidth:1)
    const marks = [
        {
            value: 1,
            label: "1"
        },
        {
            value: 12,
            label: "12"
        }
    ]

    useEffect(() => {
        onGridWidthChange(state)
    }, [state])
    return(
    <Box>
        <Typography id="track-false-range-slider" gutterBottom>
            Width
        </Typography>
        <Slider
            aria-label="Gridwidth"
            defaultValue={state?Number(state):4}
            getAriaValueText={(valuetext) => setState(valuetext)}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={1}
            max={12}
        />
    </Box>
     
    )
}
export default GridWidth