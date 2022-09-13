import styled from '@emotion/styled';
import { Button } from '@mui/material';
import colors from '../styles/colors';
interface Props {
  text?: string;
  isClick?: boolean;
  marginTop: string;
  [key: string]: any; // 필요한 props 작성하세요.
}

const Btn = ({ text = '확인', isClick, marginTop }: Props) => {
  return (
    <Wrapper>
      <Button
        sx={{
          fontWeight: '700',
          marginTop: `${parseInt(marginTop)}pt`,
          width: '100%',
          height: '42pt',
          borderRadius: '6pt',
          alignItems: 'center',
          background: `${isClick ? '#5a2dc9' : '#E2E5ED'}`,
          color: 'white',
          ':hover': {
            outline: `2pt solid ${colors.main}`,
            borderRadius: '0',
          },
        }}
      >
        {text}
      </Button>
    </Wrapper>
  );
};

export default Btn;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
