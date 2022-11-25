import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AvatarIcon from 'public/images/avatar.png';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import Arrow from 'public/guide/Arrow.svg';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const LeftProfileBox = () => {
  const router = useRouter();
  const { selectedType } = useSelector((state: RootState) => state.selectType);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string>('');
  const [data, setData] = useState<any>();

  const [checkSns, setCheckSns] = useState<boolean>(false);

  // 유저정보 받아 오는 API
  const getUserInfo = () => {
    const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
    try {
      axios({
        method: 'get',
        url: 'https://test-api.entizen.kr/api/members/info',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      })
        .then((res) => {
          console.log('---res 데이터---');
          console.log(res);
          setId(res.data.id);
          setName(res.data.name);
        })
        .catch((error) => {
          console.log('실패');
          console.log(error);
          alert('다시 시도해주세요.');
          router.push('/');
        });
    } catch (error) {
      alert('다시 시도해주세요.');
      router.push('/');
      console.log('api 통신 에러');
      console.log(error);
    }
  };

  // 유저 정보 받아오기
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <React.Fragment>
      <WebBody>
        <Inner>
          <Wrapper>
            <Header back={true} title="프로필 변경" />
            <Body>
              <Avatar>
                <div className="img-bg">
                  {/* 아바타 */}
                  <div className="avatar-bg">
                    <Image
                      src={avatar.length > 1 ? avatar : AvatarIcon}
                      alt="avatar"
                      layout="fill"
                      className="test"
                    />
                  </div>
                </div>
              </Avatar>
              <Label mt={33}>아이디</Label>
              <InputBox type="text" readOnly placeholder={id} />
              <Label mt={30}>이름</Label>
              <InputBox type="text" readOnly placeholder={name} />
            </Body>
          </Wrapper>
        </Inner>
      </WebBody>
    </React.Fragment>
  );
};

export default LeftProfileBox;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 800pt) {
    display: block;
  }

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 255pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    margin: 0;
    box-shadow: none;
    background: none;
  }

  @media (min-width: 900pt) {
    margin: 0 auto;
  }

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
const Body = styled.div`
  padding: 27pt 0 222pt 0;
`;
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  .img-bg {
    position: relative;
  }
  .avatar-bg {
    position: relative;
    width: 75pt;
    height: 75pt;
    border-radius: 50%;
    overflow: hidden;
  }
  .avatar-photo {
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
  }
  .file-input {
    display: none;
  }
`;
const Label = styled.h3<{ mt: number }>`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  margin-top: ${({ mt }) => mt + 'pt'};
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 13.5pt 16pt;
  margin-top: 9pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  letter-spacing: -0.02em;
  /* color: ${colors.main2}; */
  border: 0.75pt solid ${colors.gray};
  ::placeholder {
    color: ${colors.lightGray3};
  }
`;
