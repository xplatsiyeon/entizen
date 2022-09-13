import { Box } from '@mui/system';
import Image from 'next/image';
import btnImg from '../public/images/back-btn.svg';
import home from '../public/images/home.png';
interface Props {
  isHome?: boolean;
  [key: string]: any; // 필요한 props 작성하세요.
}
const Header = ({ isHome = false }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '36pt',
        justifyContent: 'space-between',
      }}
    >
      <Image
        style={{
          cursor: 'pointer',
        }}
        src={btnImg}
        alt="btn"
      />
      {isHome && (
        <Image
          style={{
            cursor: 'pointer',
          }}
          src={home}
          alt="btn"
          width={28}
          height={28}
        />
      )}
    </Box>
  );
};

export default Header;
