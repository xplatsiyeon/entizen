import { Box } from '@mui/system';
import Image from 'next/image';
import btnImg from '../public/images/back-btn.svg';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '48pt',
        marginLeft: '20pt',
      }}
    >
      <Image
        style={{
          cursor: 'pointer',
        }}
        src={btnImg}
        alt="btn"
      />
    </Box>
  );
}
