import styled from '@emotion/styled';
import colors from 'styles/colors';
import MypageHeader from 'components/mypage/request/header';
import React from 'react';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Key {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: number;
}

const phone = () => {
  const router = useRouter();
  const key: Key = JSON.parse(localStorage.getItem('key')!);
  const onClickBtn = () => {
    //수정완료 api
    const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
    const PASSWORD_CHANGE = `https://test-api.entizen.kr/api/members/password/${key.memberIdx}`;
    try {
      axios({
        method: 'patch',
        url: PASSWORD_CHANGE,
        data: {
          phone: key.phone,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => {
        console.log('백엔드에서 받은 데이터');
        console.log(res);
        // router.push('/');
      });
    } catch (error) {
      console.log('비밀번호 변경 실패');
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            <MypageHeader back={true} title={'휴대폰 번호 변경'} />
            <Title>휴대폰 번호</Title>
            <Notice>
              휴대폰 번호 변경 시 가입하신 분의 명의로 된 <br />
              번호로만 변경이 가능합니다.
            </Notice>
            <InputBox>
              <Input type="text" placeholder="123123" readOnly />
              {/* <InputBtn>확인</InputBtn> */}
            </InputBox>
            <BtnBox>
              <Btn onClick={onClickBtn}>수정완료</Btn>
            </BtnBox>
          </Wrapper>
        </Inner>
        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default phone;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;
  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 27pt;
  padding-left: 15pt;
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: 9pt;
  padding-left: 15pt;
`;
const InputBox = styled.div`
  position: relative;
  padding: 0 15pt;
`;
const Input = styled.input`
  padding: 13.5pt 0;
  margin-top: 9pt;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  width: 100%;
  position: relative;
  ::placeholder {
    padding-left: 15pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
`;
const InputBtn = styled.button`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background-color: ${colors.main};
  padding: 7.5pt 9pt;
  border-radius: 6pt;
  position: absolute;
  right: 21pt;
  top: 15pt;
`;
const BtnBox = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 30pt;
  width: 100%;
  padding: 0 15pt;
`;
const Btn = styled.button`
  cursor: pointer;
  background: ${colors.gray};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0;

  :hover {
    background-color: ${colors.main};
  }
`;
