import styled from '@emotion/styled';
import Image from 'next/image';
import noAs from 'public/images/noAs.png';

const NoAsHistyoryUnder = () => {
  return (
    <Body>
      <ImageWrap>
        <Image src={noAs} layout="fill" />
      </ImageWrap>
    </Body>
  );
};

export default NoAsHistyoryUnder;

const Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const ImageWrap = styled.div`
  object-fit: cover;
  object-fit: cover;
  width: 138pt;
  position: absolute;
  height: 72pt;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 70pt;
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;
