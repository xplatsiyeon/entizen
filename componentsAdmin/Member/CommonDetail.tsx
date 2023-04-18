import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import MemberContents from './MemberContents';
import ExitBtn from 'public/adminImages/Group.png';
import { ComUserData, UserData } from 'types/tableDataType';
import {
  isTokenAdminDeleteApi,
  isTokenAdminGetApi,
  isTokenAdminPatchApi,
  isTokenDeleteApi,
  isTokenPatchApi,
} from 'api';
import Loader from 'components/Loader';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import { isAdminJoinApprovedString } from 'utils/calculatePackage';

type Props = {
  setIsDetail: Dispatch<SetStateAction<boolean>>;
  type: 'USER' | 'COMPANY';
  memberIdx: number | string;
};

export interface UserRespnse {
  isSuccess: boolean;
  data: {
    member: {
      memberIdx: number;
      profileImageUrl: string;
      id: string;
      name: string;
      phone: string;
      etc: string;
      birthDate: string;
      createdAt: string;
      deletedAt: string;
    };
  };
}
export interface CompanyResposne {
  isSuccess: boolean;
  data: {
    member: {
      memberIdx: number;
      id: string;
      name: string;
      phone: string;
      etc: string;
      isAdminJoinApproved: boolean;
      createdAt: string;
      deletedAt: string;
      companyMemberAdditionalInfo: {
        companyMemberAdditionalInfoIdx: number;
        companyLogoImageUrl: string;
        companyName: string;
        managerEmail: string;
        companyAddress: string;
        companyDetailAddress: string;
        companyZipCode: string;
      };
      businessRegistrationFiles: [
        {
          businessRegistrationFileIdx: number;
          originalName: string;
          url: string;
          size: number;
        },
      ];
    };
  };
}

const CommonDetail = ({ setIsDetail, type, memberIdx }: Props) => {
  const queryClinet = useQueryClient();
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);
  // 관리자 전용 특이사항
  const [specialNote, setSpecialNote] = useState<string>('');

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    refetch: CommonDetailRefetch,
  } = useQuery<UserRespnse>(
    'user-detail',
    () => isTokenAdminGetApi(`/admin/members/users/${memberIdx}`),
    {
      // enabled: false,
      enabled: type === 'USER' && memberIdx ? true : false,
      onSuccess: (res) => {
        setSpecialNote(res.data.member.etc);
      },
    },
  );
  const {
    data: companyData,
    isLoading: companyLoading,
    isError: companyError,
    refetch: companyRefetch,
  } = useQuery<CompanyResposne>(
    'company-detail',
    () => isTokenAdminGetApi(`/admin/members/companies/${memberIdx}`),
    {
      // enabled: false,
      enabled: type === 'COMPANY' && memberIdx ? true : false,
      onSuccess: (res) => {
        setSpecialNote(res.data.member.etc);
      },
    },
  );

  // console.log('memberIdx 🎃', memberIdx);

  const WriteModalHandle = () => {
    setIsModal(true);
  };

  const currentApprove = companyData?.data?.member?.isAdminJoinApproved!;

  // 승인, 미승인 value 뭐 선택했는지
  const [selectValue, setSelectValue] = useState<string | undefined>(
    isAdminJoinApprovedString(currentApprove),
  );

  // 승인 미승인 값 담아 오슈...
  const [approve, setApprove] = useState<boolean>(currentApprove);

  // console.log(selectValue, 'selectValue', '💔');
  // console.log(approve, 'approve', '💔');
  // console.log(currentApprove, 'currentApprove', '💔');

  // 일반회원 프로필 삭제
  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('user-detail');
      queryClinet.invalidateQueries('company-detail');
      setMessageModal(true);
      setMessage('삭제가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  // 일반회원 프로필 삭제
  const modalDeleteUserBtnControll = () => {
    patchMutate({
      url: `/admin/members/users/${memberIdx}/profile-image`,
    });
  };

  // 기업회원 프로필 삭제
  const modalDeleteCompanyBtnControll = () => {
    patchMutate({
      url: `/admin/members/companies/${memberIdx}/profile-image`,
      data: { isAdminJoinApproved: approve },
    });
  };

  // 기업회원 승인 api (PATCH)
  // /admin/members/companies/:memberIdx/approval
  const {
    mutate: patchApproveMutate,
    isLoading: patchApproveLoading,
    isError: patchApproveError,
  } = useMutation(isTokenAdminPatchApi, {
    onSuccess: () => {
      queryClinet.fetchQuery('comUserInfo');
      queryClinet.invalidateQueries('company-detail');
      setMessageModal(true);
      setMessage('승인이 변경 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('승인변경 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  // 회원 관리자 전용 특이사항
  const {
    mutate: patchSpecialNoteMutate,
    isLoading: patchSpecialNoteLoading,
    isError: patchSpecialNoteError,
  } = useMutation(isTokenAdminPatchApi, {
    onSuccess: () => {
      type === 'COMPANY' ? companyRefetch() : CommonDetailRefetch();
      setMessageModal(true);
      setMessage('수정이 완료됐습니다!');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const adminJoinApprove = () => {
    if (approve !== undefined && currentApprove !== approve) {
      patchApproveMutate({
        url: `/admin/members/companies/${memberIdx}/approval`,
        data: { isAdminJoinApproved: approve },
      });
    }
  };

  const adminSpecialNote = () => {
    patchSpecialNoteMutate({
      url: `/admin/members/${memberIdx}/etc`,
      data: { etc: specialNote ? specialNote : '' },
    });
  };

  const leftBtnHandle = () => {
    setIsModal(false);
    setIsDetail(false);
  };
  const rightBtnHandle = () => {
    setIsModal(false);
  };

  // useEffect(() => {
  //   if (companyData?.data?.member?.isAdminJoinApproved !== approve) {
  //     adminJoinApprove();
  //   }
  // }, [approve]);

  // useEffect(() => {
  //   if (currentApprove !== undefined) {
  //     setSelectValue(isAdminJoinApprovedString(currentApprove));
  //   }
  // }, []);

  const loading = userLoading || companyLoading;

  const nowHeight = window.document.documentElement.scrollHeight;

  const userAvatar = userData?.data?.member?.profileImageUrl;
  const companyAvatar =
    companyData?.data?.member?.companyMemberAdditionalInfo?.companyLogoImageUrl;

  console.log('🔥 userData : ', userData);

  return (
    <Background nowHeight={nowHeight}>
      <Wrapper>
        {messageModal && (
          <AlertModal
            setIsModal={setMessageModal}
            message={message}
            setIsDetail={setIsDetail}
          />
        )}
        {isModal && (
          <WriteModal
            message={'작성 내용이 등록되지 않았습니다.'}
            subMessage={'페이지를 나가시겠습니까?'}
            leftBtn={'예'}
            rightBtn={'아니오'}
            leftBtnHandle={leftBtnHandle}
            rightBtnHandle={rightBtnHandle}
            setWriteModal={setIsModal}
          />
        )}
        <AdminHeader
          title="회원관리"
          subTitle={type === 'USER' ? '일반회원' : '기업회원'}
          type="detail"
          backBtn={WriteModalHandle}
          exelHide={true}
          detailApprove={approve}
          detailModify={adminJoinApprove}
          etcModify={adminSpecialNote}
        />
        <InfoBox>
          {userAvatar !== null && companyAvatar !== null ? (
            <Avatar>
              {type === 'USER' ? (
                <Image
                  src={userData?.data?.member?.profileImageUrl!}
                  alt="avatar"
                  layout="fill"
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={
                    companyData?.data?.member?.companyMemberAdditionalInfo
                      ?.companyLogoImageUrl!
                  }
                  alt="avatar"
                  layout="fill"
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
              )}
              <span className="exitImgBox">
                <Image
                  src={ExitBtn}
                  alt="exit"
                  layout="fill"
                  onClick={() => {
                    if (type === 'USER') {
                      modalDeleteUserBtnControll();
                    } else {
                      modalDeleteCompanyBtnControll();
                    }
                  }}
                />
              </span>
            </Avatar>
          ) : (
            <NoAvatar />
          )}

          {/* 회원 정보 불러오는 컴포넌트 */}
          {loading ? (
            <Loader />
          ) : (
            <MemberContents
              type={type}
              userData={userData!}
              CompanyData={companyData!}
              setApprove={setApprove}
              approve={approve}
              currentApprove={isAdminJoinApprovedString(currentApprove)}
              setSelectValue={setSelectValue}
              selectValue={selectValue}
              memberIdx={memberIdx!}
            />
          )}
        </InfoBox>
        <TextAreaContainer>
          <label>관리자 전용 특이사항</label>
          {type === 'USER' ? (
            <textarea
              rows={10}
              cols={30}
              value={specialNote}
              onChange={(e) => {
                setSpecialNote(e.target.value);
              }}
            />
          ) : (
            <textarea
              rows={10}
              cols={30}
              value={specialNote}
              onChange={(e) => {
                setSpecialNote(e.target.value);
              }}
            />
          )}
        </TextAreaContainer>
      </Wrapper>
    </Background>
  );
};

export default CommonDetail;

const Background = styled.div<{ nowHeight: number }>`
  width: 100%;
  /* height: 100vh; */
  height: ${({ nowHeight }) => `${nowHeight}px`};
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;
const Wrapper = styled.div`
  width: 946px;
`;
const InfoBox = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  gap: 25px;
`;
const Avatar = styled.span`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: #a6a9b0;
  .exitImgBox {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const NoAvatar = styled.span`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: #a6a9b0;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 936px;
  margin-top: 40px;

  label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
  }
  textarea {
    resize: none;
    background: #ffffff;
    border: 2px solid #e7e7e7;
    border-radius: 4px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 12px;
  margin-top: 16px;
  button {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.gray2};
    width: 64px;
    height: 26px;
    background: #e2e5ed;
    border: 1px solid #747780;
    border-radius: 2px;
    cursor: pointer;
  }
`;
