import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AvatarIcon from 'public/images/AvatarIconSvg.svg';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import Arrow from 'public/guide/Arrow.svg';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useProfile from 'hooks/useProfile';

const LeftProfileBox = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string>('');
  const [data, setData] = useState<any>();

  const [checkSns, setCheckSns] = useState<boolean>(false);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  useEffect(() => {
    if (memberType === 'USER') {
      setAvatar(profile?.profileImageUrl!);
    } else {
      setAvatar(profile?.companyMemberAdditionalInfo?.companyLogoImageUrl!);
    }
  }, [profile, memberType]);

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
                    {avatar !== '' ? (
                      <Image
                        src={!isLoading && avatar ? avatar : AvatarIcon}
                        alt="avatar"
                        layout="fill"
                        priority={true}
                        unoptimized={true}
                        objectFit="cover"
                        className="test"
                      />
                    ) : (
                      <Image
                        src={AvatarIcon}
                        alt="avatar"
                        layout="fill"
                        className="test"
                      />
                    )}
                  </div>
                </div>
              </Avatar>
              <Label mt={33}>이메일</Label>
              <InputBox type="text" readOnly placeholder={profile?.id} />
              <Label mt={30}>
                {profile?.companyMemberAdditionalInfo ? '기업명' : '이름'}
              </Label>
              <InputBox
                type="text"
                readOnly
                placeholder={
                  profile?.companyMemberAdditionalInfo
                    ? profile.companyMemberAdditionalInfo.companyName
                    : profile?.name
                }
              />
            </Body>
            {/* ============================== 기업 추가 정보 ============================= */}
            {profile?.companyMemberAdditionalInfo ? (
              <CompanyUserBox>
                <Label mt={33}>담당자 이름</Label>
                <InputBox type="text" readOnly placeholder={profile?.name} />
                <Label mt={30}>담당자 휴대폰 번호</Label>
                <InputBox type="text" readOnly placeholder={profile?.phone} />
                <Label mt={30}>담당자 이메일</Label>
                <InputBox
                  type="text"
                  readOnly
                  placeholder={
                    profile?.companyMemberAdditionalInfo.managerEmail
                  }
                />
              </CompanyUserBox>
            ) : null}
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
  margin: 0 auto;
  //height: 810pt;
  background-color: #ffffff;

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
  /* height: 597pt; */
  height: 535pt;
  overflow-y: scroll;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;

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
  padding: 32.25pt 0pt 42pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
const Body = styled.div`
  padding: 27pt 22.5pt 30pt;
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

const CompanyUserBox = styled.div`
  padding: 0pt 22.5pt 0;
  position: relative;
  &::before {
    position: absolute;
    display: block;
    content: '';
    clear: both;
    width: 100%;
    height: 6pt;
    top: -36pt;
    left: 0;
    background: #f3f4f7;
  }
`;
