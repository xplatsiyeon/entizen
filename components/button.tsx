import { Button } from '@mui/material';
import { Box } from '@mui/system';
interface Props {
  text: string;
  isClick?: boolean;
  marginTop: string;
}

export default function Btn({ text = '확인', isClick, marginTop }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button
        sx={{
          fontWeight: '700',
          marginTop: `${parseInt(marginTop)}pt`,
          marginLeft: '15pt',
          marginRight: '15pt',
          width: '100%',
          height: '42pt',
          borderRadius: '6pt',
          alignItems: 'center',
          background: '#5a2dc9',
          color: 'white',
        }}
      >
        {text}
      </Button>
    </Box>
  );
}
