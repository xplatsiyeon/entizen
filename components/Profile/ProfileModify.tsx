import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import AvatarIcon from 'public/images/avatar.png';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import Arrow from 'public/guide/Arrow.svg';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useMutation } from 'react-query';
import { isTokenPatchApi, multerApi } from 'api';
import Modal from 'components/Modal/Modal';
import useProfile from 'hooks/useProfile';
import { requestPermissionCheck } from 'bridge/appToWeb';

export interface ImgFile {
  originalName: string;
  size: number;
  url: string;
}
export interface UploadFileResponse {
  isSuccess: boolean;
  uploadedFiles: ImgFile[];
}

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};
const TAG = 'components/Profile/ProfileModify.tsx';
const ProfileModify = ({ setTabNumber }: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const { selectedType } = useSelector((state: RootState) => state.selectType);
  const [data, setData] = useState<any>();
  const [isPassword, setIsPassword] = useState(false);
  const [checkSns, setCheckSns] = useState<boolean>(false);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, invalidate, isLoading } = useProfile(accessToken);

  const { mutate: profileMutae, isLoading: profileLoading } = useMutation(
    isTokenPatchApi,
    {
      onSuccess: (res) => {
        console.log(`🔥 이미지 변경 성공 ~line 53 ${TAG}`);
        console.log(res);
        invalidate();
      },
      onError: (error) => {
        console.log(`🔥 이미지 변경 실패 ~line 57 ${TAG}`);
        console.log(error);
      },
    },
  );

  const { mutate: multerMutae, isLoading: multerLoading } = useMutation<
    UploadFileResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(' 👀 ~ line 95 multer onSuccess' + TAG);
      console.log(res);
      profileMutae({
        url: '/members/profile-image',
        data: {
          profileImageUrl: res?.uploadedFiles[0]?.url,
        },
      });
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userAgent === '') {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  // 프로필 이미지 변경
  const onImgInputBtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    // 이미지 저장
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'profileImage', // 어디로 해야 할까
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerMutae(formData);
  };
  // 비밀번호 변경
  const HandlePassword = async () => {
    let key = sessionStorage.getItem('key');
    let data = JSON.parse(key!);
    setTabNumber(1);
  };
  // 나이스 인증
  const fnPopup = (event: any) => {
    const { id } = event.currentTarget;
    if (id === 'password') {
      setIsPassword(true);
    }
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document as any;
      console.log(cloneDocument.form_chk);

      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument?.form_chk?.submit();
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
    const snsMember = JSON.parse(sessionStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }
    console.log(`☂️ SNS 멤버 확인 ~line 180 -> ${TAG}`);
    console.log(snsMember);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {/* 에러 모달 */}
      {isModal && (
        <Modal
          click={() => {
            setIsModal(false);
          }}
          text={errorMessage}
        />
      )}
      <Wrapper>
        <Body>
          <Avatar>
            <div className="img-bg">
              {/* 아바타 */}
              <button className="avatar-bg" onClick={imgHandler}>
                <Image
                  src={
                    profile?.profileImageUrl?.length! > 1
                      ? profile?.profileImageUrl!
                      : AvatarIcon
                  }
                  alt="avatar"
                  layout="fill"
                  className="test"
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
              </button>
              {/* 포토 이미지 */}
              <label className="avatar-photo">
                <input
                  ref={imgRef}
                  className="file-input"
                  type={'file'}
                  accept="image/*"
                  onChange={onImgInputBtnClick}
                  capture={userAgent === 'Android_App' && true}
                  style={{ display: 'none' }}
                />
                <Image src={AvatarPhoto} alt="avatar-photo" />
              </label>
            </div>
          </Avatar>
          <Label mt={33}>아이디</Label>
          <InputBox type="text" readOnly placeholder={profile?.id} />
          <Label mt={30}>이름</Label>
          <InputBox type="text" readOnly placeholder={profile?.name} />
          {!checkSns && (
            <>
              {/* 나이스 인증 */}
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
                <Form>
                  <TitleSection
                    id="phone"
                    onClick={() => {
                      setTabNumber(0);
                    }}
                  >
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
                  <TitleSection id="password" onClick={fnPopup}>
                    <Label mt={0}>비밀번호 변경</Label>
                    <div>
                      <Image src={Arrow} alt="arrow-img" />
                    </div>
                  </TitleSection>
                </Form>
              </form>
            </>
          )}
          {isPassword && (
            <Buttons className="firstNextPage" onClick={HandlePassword}>
              숨겨진 비밀번호 버튼
            </Buttons>
          )}
        </Body>
      </Wrapper>
    </React.Fragment>
  );
};

export default ProfileModify;
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

  @media (max-width: 899.25pt) {
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

  @media (max-width: 899.25pt) {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`;
const Body = styled.div`
  @media (min-width: 900pt) {
    padding-top: 27pt;
    padding-bottom: 96pt;
  }
  @media (max-width: 900pt) {
    padding: 27pt 15pt 96pt 15pt;
  }
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
