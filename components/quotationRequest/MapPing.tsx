import Image from 'next/image';
import React from 'react';
import mapPin from 'public/images/blueMapPin.png';

type Props = {
  text: string;
};

const MapPing = (props: Props) => {
  const { text } = props;
  return <Image src={mapPin} alt="mapPin" />;
};

export default MapPing;
