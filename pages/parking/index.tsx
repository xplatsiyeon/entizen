import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

import pcImg from 'public/new/parking_page_pc.png';
import moImg from 'public/new/parking_page_mo.png';

const ParkingPage = () => {
  console.log('123');
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Image src={isTablet ? moImg : pcImg} />
    </div>
  );
};

export default ParkingPage;
