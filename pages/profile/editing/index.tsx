import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AvatarIcon from 'public/images/avatar.png';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import Arrow from 'public/guide/Arrow.svg';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProfileEditing = () => {
  const router = useRouter();
  const [name, setName] = useState('test유저');
  const [avatar, setAvatar] = useState<string>('');
  const [data, setData] = useState<any>();
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [checkSns, setCheckSns] = useState<boolean>(false);
  // 아이디 변경
  const HandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
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
  // 나이스 인승
  const fnPopup = (event: any) => {
    console.log('check');
    console.log(event?.currentTarget.value);
    const { value } = event.currentTarget;
    if (value === 'id') {
      setIsId(true);
      console.log('id입니다');
    }
    if (value === 'password') {
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
  // 나이스 인증
  useEffect(() => {
    const memberType = 'USER';
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

    axios({
      method: 'post',
      url: 'https://test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
        // encodeData = res.data.executedData;
      })
      .catch((error) => {
        console.error(' 2 곳 입니까?');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 아이디 찾기
  const HandlePassword = async () => {
    let key = localStorage.getItem('key');
    let data = JSON.parse(key!);
    console.log(data);
    // dispatch(findUserInfoAction.addId(data.id));
    // router.push('/profile/editing/password');
  };
  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
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
                  {/* 포토 이미지 */}
                  <label className="avatar-photo">
                    <input
                      className="file-input"
                      type={'file'}
                      accept="image/*"
                      onChange={onImgInputBtnClick}
                    />
                    <Image src={AvatarPhoto} alt="avatar-photo" />
                  </label>
                </div>
              </Avatar>
              <Label mt={33}>아이디</Label>
              <InputBox type="text" readOnly placeholder="test" />
              <Label mt={30}>이름</Label>
              <InputBox type="text" value={name} onChange={HandleOnChange} />
              <Form>
                <TitleSection>
                  <Label mt={0}>휴대폰 번호</Label>
                  <div>
                    <Image src={Arrow} alt="arrow-img" />
                  </div>
                </TitleSection>
                <Text>
                  휴대폰 번호 변경 시 가입하신 분의 명의로 된 번호로만 변경이
                  가능합니다.
                </Text>
              </Form>
              <Form>
                <form name="form_chk" method="get">
                  <input type="hidden" name="m" value="checkplusService" />
                  {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
                  <input
                    type="hidden"
                    id="encodeData"
                    name="EncodeData"
                    value={data !== undefined && data}
                  />
                  <input type="hidden" name="recvMethodType" value="get" />
                  {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}
                  <TitleSection onClick={fnPopup}>
                    <Label mt={0}>비밀번호 변경</Label>
                    <div>
                      <Image src={Arrow} alt="arrow-img" />
                    </div>
                  </TitleSection>
                  {/* <FindBtn value="id" name={'form_chk'} onClick={fnPopup}>
                    아이디 찾기&nbsp;
                  </FindBtn>
                  <FindBtn value="password" name={'form_chk'} onClick={fnPopup}>
                    &nbsp;비밀번호 찾기
                  </FindBtn> */}
                </form>
              </Form>
              {isId && (
                <Buttons className="firstNextPage" onClick={HandlePassword}>
                  숨겨진 아이디 버튼
                </Buttons>
              )}
              {isPassword && (
                <Buttons className="firstNextPage" onClick={() => {}}>
                  숨겨진 비밀번호 버튼
                </Buttons>
              )}
              {!checkSns && (
                <>
                  <Form>
                    <TitleSection>
                      <Label mt={0}>비밀번호 변경</Label>
                      <div>
                        <Image src={Arrow} alt="arrow-img" />
                      </div>
                    </TitleSection>
                  </Form>
                </>
              )}
            </Body>
            {/* <BtnBox>
        <Blur />
        <Btn>수정 완료</Btn>
      </BtnBox>  */}
          </Wrapper>
        </Inner>
        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default ProfileEditing;
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
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    margin: 0;
    box-shadow: none;
    background: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;

  @media (max-width: 899pt) {
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
const BtnBox = styled.div`
  display: none;
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  padding: 15pt;
  width: 100%;

  @media (max-width: 899pt) {
    display: block;
  }
`;
const Btn = styled.div`
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 15pt 0;
  border-radius: 6pt;
`;
const Blur = styled.div`
  position: absolute;
  width: 100%;
  bottom: 32pt;
  left: 0;
  background: #ffffff;
  filter: blur(10px);
  z-index: -1;
  height: 37.5pt;
`;
const FindBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 2pt;
  text-decoration-line: underline;
  text-underline-position: under;
  color: ${colors.gray2};
  cursor: pointer;
`;
const Buttons = styled.button`
  display: none;
`;
