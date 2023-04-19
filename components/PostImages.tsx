import styled from '@emotion/styled';
import Image from 'next/image';

const PosterImage = ({ src }: { src: string }) => {
  return <Img src={src} layout="fill" priority={true} unoptimized={true} />;
};

export default PosterImage;

const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  & > span {
    position: unset !important;
  }
`;
