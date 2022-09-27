import * as React from 'react';
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number },
) => {
  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <ProgressBar variant="determinate" {...props} />
      </Box>
      <Box>
        {/* <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography> */}
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;

const ProgressBar = styled(LinearProgress)`
  background: ${colors.gray};
  border-radius: 2px;
  color: red;
  .css-5xe99f-MuiLinearProgress-bar1 {
    background-color: ${colors.main};
  }
`;
