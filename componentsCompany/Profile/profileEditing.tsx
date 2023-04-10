import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
// import AvatarIcon from 'public/images/avatar.png';
import AvatarIcon from 'public/images/AvatarIconSvg.svg';
// import AvatarPhoto from 'public/images/avatar-photo.png';
import AvatarPhoto from 'public/images/AvatarPhotosvg.svg';
import colors from 'styles/colors';
import axios, { AxiosError } from 'axios';
import CompanyAddress from 'components/SignUp/CompanyAddress';
import arrowRight from 'public/images/arrow-right.png';
import { isTokenPatchApi, multerApi } from 'api';
import { useMutation } from 'react-query';
import useProfile from 'hooks/useProfile';
import { UploadFileResponse } from 'components/Profile/ProfileModify';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { requestPermissionCheck } from 'bridge/appToWeb';
import Loader from 'components/Loader';

type Props = {
  setComponent: React.Dispatch<React.SetStateAction<number>>;
  setHeightOn?: React.Dispatch<React.SetStateAction<boolean>>;
  component: number;
  routeHandle?: boolean;
  isAddressOn?: boolean;
};
const TAG = 'componentsCompany/Profile/profileEditing.tsx';
const ProfileEditing = ({
  setComponent,
  component,
  routeHandle,
  isAddressOn,
  setHeightOn,
}: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const [checkSns, setCheckSns] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<string>('');
  const [data, setData] = useState<string>('');
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken);
  const { profile, invalidate, isLoading } = useProfile(accessToken);

  // console.log('프로필', profile);

  //주소
  const [addressOn, setAddressOn] = useState<boolean>(Boolean(isAddressOn));
  const [postNumber, setPostNumber] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [companyDetailAddress, setCompanyDetailAddress] = useState<string>('');

  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: profileMutae, isLoading: profileLoading } = useMutation(
    isTokenPatchApi,
    {
      onSuccess: (res) => {
        // console.log(`🔥 이미지 변경 성공 ~line 53 ${TAG}`);
        // console.log(res);
        invalidate();
      },
      onError: (error) => {
        // console.log(`🔥 이미지 변경 실패 ~line 57 ${TAG}`);
        // console.log(error);
      },
    },
  );

  const { mutate: multerMutae, isLoading: multerLoading } = useMutation<
    UploadFileResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(' 👀 ~ line 95 multer onSuccess' + TAG);
      // console.log(res);
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
    if (!userAgent) {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  // 프로필 이미지 변경
  const onImgInputBtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이미지 미리보기
    let reader = new FileReader();
    if (e.target.files![0]) {
      reader.readAsDataURL(e.target.files![0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setImgFile(resultImage as string);
    };
    // 이미지 multer 저장
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
    setComponent(2);
  };

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
    }
  }, []);

  useEffect(() => {
    const snsMember = JSON.parse(sessionStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('component', component);

  return (
    <Scroll>
      <Wrapper component={component}>
        <Header back={true} title="프로필 변경" />
        <Body component={component} className={String(component)}>
          {/* {component === 1 && <ChangeProfileText>프로필 변경</ChangeProfileText>} */}
          {isLoading ? (
            <Loader />
          ) : (
            <Avatar>
              <div className="img-bg">
                {/* 아바타 */}
                <button className="avatar-bg" onClick={imgHandler}>
                  <Image
                    src={
                      // profile?.companyMemberAdditionalInfo?.companyLogoImageUrl
                      //   ?.length! > 1
                      //   ? profile?.companyMemberAdditionalInfo
                      //       ?.companyLogoImageUrl!
                      //   : AvatarIcon

                      imgFile
                        ? imgFile
                        : profile?.companyMemberAdditionalInfo
                            ?.companyLogoImageUrl! &&
                          profile?.companyMemberAdditionalInfo
                            ?.companyLogoImageUrl?.length! > 0
                        ? profile?.companyMemberAdditionalInfo
                            ?.companyLogoImageUrl
                        : AvatarIcon
                    }
                    alt="avatar"
                    layout="fill"
                    priority={true}
                    unoptimized={true}
                    objectFit="cover"
                  />
                </button>
                {/* 포토 이미지 */}
                <button className="avatar-photo" onClick={imgHandler}>
                  <Image src={AvatarPhoto} alt="avatar-photo" />
                </button>
              </div>
              <input
                ref={imgRef}
                className="file-input"
                type={'file'}
                accept="image/*"
                onChange={onImgInputBtnClick}
                capture={userAgent === 'Android_App' && true}
                style={{ display: 'none' }}
              />
            </Avatar>
          )}
          <Label mt={33}>아이디</Label>
          <InputBox type="text" readOnly placeholder={profile?.id} />
          <Label mt={30}>기업명</Label>
          <InputBox
            type="text"
            readOnly
            placeholder={profile?.companyMemberAdditionalInfo?.companyName}
          />
          <Div onClick={() => setComponent(1)}>
            <SubTitle>기업 주소 변경</SubTitle>
            <ImageWrap>
              <Image src={arrowRight} layout="fill" />
            </ImageWrap>
          </Div>

          {/* 나이스 인증 */}
          {/* <form name="form_chk" method="get">
          <input type="hidden" name="m" value="checkplusService" />
          <input type="hidden" id="encodeData" name="EncodeData" value={data} />
          <input type="hidden" name="recvMethodType" value="get" />
          </form> */}
          {/* <Div className="PW" onClick={fnPopup}> */}
          <Div className="PW" onClick={HandlePassword}>
            <SubTitle>비밀번호 변경</SubTitle>
            <ImageWrap>
              <Image src={arrowRight} layout="fill" />
            </ImageWrap>
          </Div>

          <Div onClick={() => setComponent(3)}>
            <SubTitle>사업자 등록증 수정</SubTitle>
            <ImageWrap>
              <Image src={arrowRight} layout="fill" />
            </ImageWrap>
          </Div>

          {/* 나이스 인증 */}
          {/* <Buttons className="firstNextPage" onClick={HandlePassword}>
          숨겨진 비밀번호 버튼
        </Buttons> */}
        </Body>
        <Line />

        <Wrap component={component}>
          <Label mt={30}>담당자 이름</Label>
          <InputBox type="text" readOnly value={profile?.name} />

          <Label mt={30}>담당자 휴대폰</Label>
          <InputBox type="text" readOnly value={profile?.phone} />

          <Label mt={30}>담당자 이메일</Label>
          <InputBox
            type="text"
            readOnly
            value={profile?.companyMemberAdditionalInfo?.managerEmail}
          />

          <MBtn onClick={() => setComponent(4)}>담당자 변경하기</MBtn>
        </Wrap>
      </Wrapper>
    </Scroll>
  );
};

export default ProfileEditing;

const Scroll = styled.div`
  @media (min-width: 900pt) {
    height: 100vh;
    overflow: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      display: initial;
      width: 7.5pt;
    }
    ::-webkit-scrollbar-track {
      // 뒷배경
      background: rgba(33, 122, 244, 0.1);
      border-bottom-right-radius: 12pt;
      border-top-right-radius: 12pt;
    }
    ::-webkit-scrollbar-thumb {
      // 막대
      /* background: #217af4; */
      background-color: #5a2dc9;
      box-shadow: inset 0 0 4.5pt rgba(0, 0, 0, 0.3);
      border-radius: 7.5pt;
      height: 7.5pt;
    }
  }
`;

const Wrapper = styled.div<{ component?: number }>`
  padding-right: 15pt;
  @media (min-width: 900pt) {
    padding-top: 32.25pt;
    padding-bottom: 132.75pt;
    padding-right: ${({ component }) => (component === 0 ? '47.25pt' : '24pt')};
  }
`;

const Body = styled.div<{ component: number }>`
  padding-top: 21.5pt;
  padding-left: 15pt;
  @media (min-width: 900pt) {
    padding-left: ${({ component }) => (component === 0 ? '47.5pt' : '24pt')};
    padding-top: ${({ component }) => (component === 1 ? '10.75pt' : '21.5pt')};
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
    background: none;
  }
  .file-input {
    display: none;
  }
`;
const Label = styled.h3<{ mt: number }>`
  font-family: 'Spoqa Han Sans Neo';
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

const Div = styled.div`
  padding-bottom: 18pt;
  border-bottom: 1px solid #e2e5ed;
  margin-top: 31.5pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const ImageWrap = styled.div`
  width: 4.5pt;
  height: 9pt;
  position: relative;
`;

const Line = styled.div`
  height: 6pt;
  width: 100%;
  background: #f3f4f7;
  margin-top: 30pt;
  position: relative;
  @media (min-width: 900pt) {
    width: 345pt;
    /* margin-left: -47.5pt; */
  }
`;

const Wrap = styled.div<{ component?: number }>`
  padding: ${({ component }) =>
    component === 0 ? '0 0 0 47.25pt  ' : '0 24pt'};
  position: relative;

  @media (max-width: 899.25pt) {
    /* padding: 0; */
    padding-left: 15pt;
  }
`;

const MBtn = styled.button`
  background: none;
  border: none;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #5a2dc9;
  position: absolute;
  bottom: -27pt;
  right: 15pt;
  cursor: pointer;
`;
const Buttons = styled.button`
  display: none;
`;

const SubTitle = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
`;
