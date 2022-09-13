import styled from '@emotion/styled';
import Header from 'components/header';
import colors from 'styles/colors';
import Input from 'components/input';
import Btn from 'components/button';

const findPassword = () => {
  return (
    <Wrapper>
      <Header />
      <Text>새 비밀번호를 설정해주세요</Text>
      <InputBox>
        <Input placeholder="새 비밀번호 입력" />
        <Input placeholder="비밀번호 재입력" />
      </InputBox>
      <Btn marginTop="191.25" isClick={false} />
    </Wrapper>
  );
};

export default findPassword;

const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Text = styled.p`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45pt;
`;
