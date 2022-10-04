import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import colors from 'styles/colors';

interface Props {
  img: StaticImageData;
  text1: string;
  text2: string;
}

const Slider = ({ img, text1, text2 }: Props) => {
  return (
    <Wrapper>
      <ImgBg>
        <ImgBox>
          <Image src={img} alt="img" layout="fill" />
        </ImgBox>
      </ImgBg>
      <TextBox>
        <Text variant="h3">
          {text1}
          <br />
        </Text>
        <Text2 variant="h3">{text2}</Text2>
      </TextBox>
    </Wrapper>
  );
};
export default Slider;

const Wrapper = styled.div`
  height: calc(100vh - 85pt);
`;
const ImgBg = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.start};
  height: 290.25pt;
  overflow: hidden;
`;
const ImgBox = styled(Box)`
  display: flex;
  justify-content: center;
  position: relative;
  width: 168pt;
  margin-top: 60pt;
  height: 100%;
`;
const TextBox = styled(Box)`
  height: calc(100% - 290.25pt);
  padding-top: 27pt;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled(Typography)`
  font-weight: 700;
  font-size: 18pt;
  line-height: 28.5pt;
  text-align: center;
  letter-spacing: -0.02em;
`;
const Text2 = styled(Typography)`
  font-weight: 700;
  font-size: 18pt;
  line-height: 28.5pt;
  text-align: center;
  letter-spacing: -0.02em;
  margin-bottom: 28.5pt;
  color: ${colors.main};
`;
