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
import PasswordModify from 'components/Profile/PasswordModify';
import ProfileModify from 'components/Profile/ProfileModify';
import PhoneNumberModify from 'components/Profile/PhonenumberModify';
import UserRightMenu from 'components/UserRightMenu';

interface Components {
  [key: number]: JSX.Element;
}

const ProfileEditing = () => {
  const router = useRouter();
  const { selectedType } = useSelector((state: RootState) => state.selectType);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string>('');
  const [data, setData] = useState<any>();
  const [isPassword, setIsPassword] = useState(false);
  const [checkSns, setCheckSns] = useState<boolean>(false);

  // 오른쪽 컴포넌트 변경
  const [tabNumber, setTabNumber] = useState<number>(2);

  // 오른쪽 컴포넌트

  const components: Components = {
    0: <PhoneNumberModify setTabNumber={setTabNumber} />,
    1: <PasswordModify setTabNumber={setTabNumber} />,
  };

  console.log('여기에 tabNumber 뭐나옴?', tabNumber);
  // 프로필 이미지 변경
  const onImgInputBtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const fileReader: any = new FileReader();
    if (!files) return;
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setAvatar(fileReader.result);
      }
    };
  };
  // 비밀번호 변경
  const HandlePassword = async () => {
    let key = localStorage.getItem('key');
    let data = JSON.parse(key!);
    console.log('---------비밀번호 변경 data입니다 ---------');
    console.log(data);
    // router.push('/profile/editing/password');
    setTabNumber(1);
  };
  // 나이스 인증
  const fnPopup = (event: any) => {
    console.log('나이스 인증');
    console.log(event);
    const { id } = event.currentTarget;
    console.log(`id -> ${id}`);
    if (id === 'password') {
      setIsPassword(true);
      console.log('passowrd입니다');
    }
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document as any;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };
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
  // 나이스 인증
  useEffect(() => {
    const memberType = selectedType;
    axios({
      method: 'post',
      url: 'https://test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error('나이스 인증 에러 발생');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // sns 체크
  useEffect(() => {
    const snsMember = JSON.parse(localStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }
    console.log('여기임둥');
    console.log(checkSns);
    console.log(snsMember);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 유저 종보 받아오기
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <React.Fragment>
      <UserRightMenu />
      {tabNumber === 2 && <Header back={true} title="프로필 변경" />}
      <WebBody>
        <WebHeader />
        <WebHide>
          {tabNumber === 2 && <ProfileModify setTabNumber={setTabNumber} />}
          {tabNumber !== 2 && <div>{components[tabNumber]}</div>}
        </WebHide>
        <WebRapper>
          <Inner>
            <ProfileModify setTabNumber={setTabNumber} />
          </Inner>
          {tabNumber !== 2 && <div>{components[tabNumber]}</div>}
        </WebRapper>

        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default ProfileEditing;

const WebHide = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 800pt) {
    display: block;
  }

  @media (min-width: 900pt) {
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 345pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  margin: 0 auto;
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
    height: 100%;
  }
`;

const WebRapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900pt;
  margin: 0 auto;
  margin-top: 59pt;
  margin-bottom: 90pt;
  gap: 30pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const MobileComponent = styled.div<{ tabNumber: number }>`
  @media (max-width: 899.25pt) {
    display: ${({ tabNumber }) => tabNumber !== 2 && 'none'};
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
  padding: 27pt 15pt 96pt 15pt;
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
const Form = styled.div`
  margin-top: 30pt;
  border-bottom: 0.75pt solid ${colors.gray};
  padding-bottom: 18pt;
  cursor: pointer;
`;
const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const Text = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 9pt;
  color: ${colors.gray2};
`;
const Buttons = styled.button`
  display: none;
`;
