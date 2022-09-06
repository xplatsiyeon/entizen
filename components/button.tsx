import { Button } from '@mui/material';
export default function Btn(text: string = '확인', isClick?: string) {
  return (
    <Button
      sx={{
        fontWeight: '700',
        margin: '80pt 20pt 0 20pt',
        width: '100%',
        height: '56pt',
        borderRadius: '8pt',
        alignItems: 'center',
        background: '#5a2dc9',
        color: 'white',
      }}
    >
      {text}
    </Button>
  );
}
