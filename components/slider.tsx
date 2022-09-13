import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import colors from 'styles/colors';

interface Props {
  img: any;
  text1: string;
  text2: string;
}

const Slider = ({ img, text1, text2 }: Props) => {
  return (
    <>
      <ImgBox>
        <Image src={img} alt="img" />
      </ImgBox>
      <TextBox>
        <Text variant="h3">
          {text1}
          <br />
        </Text>
        <Text1 variant="h3">{text2}</Text1>
      </TextBox>
    </>
  );
};
export default Slider;

const ImgBox = styled(Box)`
  background-color: ${colors.start};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 27pt;
  height: 252pt;
  overflow: hidden;
`;
const TextBox = styled(Box)`
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
const Text1 = styled(Typography)`
  font-weight: 700;
  font-size: 18pt;
  line-height: 28.5pt;
  text-align: center;
  letter-spacing: -0.02em;
  margin-bottom: 28.5pt;
  color: ${colors.main};
`;
