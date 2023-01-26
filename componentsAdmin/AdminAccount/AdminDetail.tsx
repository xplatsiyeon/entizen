import styled from '@emotion/styled';
import {
  isTokenAdminDeleteApi,
  isTokenAdminGetApi,
  isTokenAdminPatchApi,
} from 'api';
import { AxiosDefaults } from 'axios';
import AdminHeader from 'componentsAdmin/Header';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import { hyphenFn } from 'utils/calculatePackage';

type Props = {
  setIsDetail: Dispatch<SetStateAction<boolean>>;
  detatilId: string;
};
interface Manger {
  email: string;
  id: string;
  isRepresentativeAdmin: boolean;
  managerIdx: number;
  name: string;
  phone: string;
}
interface AdminDetailResponse {
  data: {
    manager: Manger;
  };
  isSuccess: boolean;
}

const AdminDetail = ({ detatilId, setIsDetail }: Props) => {
  const clientQuery = useQueryClient();
  const [alertModal, setAlertModal] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');
  const [writeModal, setWriteModal] = useState(false);
  const [writeModalMessage, setWriteModalMessage] = useState('');
  const [writeModalSubMessage, setWriteModalSubMessage] = useState('');
  const [rightBtnMessage, setRightBtnMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // managerIdx
  const { data, isLoading, isError } = useQuery<
    AdminDetailResponse,
    AxiosDefaults,
    Manger
  >('adminDetail', () => isTokenAdminGetApi(`/admin/managers/${detatilId}`), {
    select: (data) => {
      return data?.data?.manager;
    },
    onSuccess(data) {
      setIsChecked(data.isRepresentativeAdmin);
    },
  });

  const { mutate: gradeMutate } = useMutation(isTokenAdminPatchApi, {
    onSuccess: (res) => {
      console.log(res);
      setWriteModal(false);
      setAlertModal(true);
      setAlertModalMessage('관리자 등급 변경이 완료되었습니다.');
      clientQuery.refetchQueries('adminAccountList');
    },
    onError: (error) => {
      console.log(error);
      alert('다시 시도해주세요.');
    },
  });

  const { mutate: deleteMutate } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      setWriteModal(false);
      setAlertModal(true);
      setAlertModalMessage('삭제가 완료 됐습니다.');
      clientQuery.refetchQueries('adminAccountList');
    },
    onError: (error) => {
      console.log(error);
      alert('다시 시도해주세요.');
    },
  });

  // 상세페이지 모달 클릭 이벤트
  const onClickBack = () => {
    setIsDetail((prev) => !prev);
    // remove();
  };
  // 안내 메시지 모달 클릭 이벤트
  const onClickChangeBtn = () => {
    setWriteModal(true);
    setWriteModalMessage('관리자 등급 변경을 진행하시겠습니까?');
    setWriteModalSubMessage(
      `관리자 등급 변경 진행 시 슈퍼관리자 권한은 \n권한을 부여받은 관리자에게 모두 넘어가게 됩니다.\n 계속 진행하시겠습니까?`,
    );
    setRightBtnMessage('등급변경 진행');
  };
  // 변경 진행 여부 모달 오른쪽 클릭 이벤트
  const onClickRightModal = () => {
    switch (writeModalMessage) {
      case '관리자 등급 변경을 진행하시겠습니까?':
        const grade: 'normal' | 'super' = isChecked ? 'super' : 'normal';
        const JsonGrade = JSON.stringify(grade);
        gradeMutate({
          data: {
            grade: grade,
          },
          url: `/admin/managers/${data?.managerIdx}/grade`,
        });
        break;
      case '해당 아이디를 삭제하시겠습니까?':
        deleteMutate({ url: `/admin/managers/${data?.managerIdx}` });
    }
  };

  // 삭제 버튼 클릭
  const onClickDeleteBtn = () => {
    setWriteModalMessage('해당 아이디를 삭제하시겠습니까?');
    setWriteModalSubMessage('아이디 삭제 시 해당 데이터를 복구할 수 없습니다.');
    setRightBtnMessage('삭제');
    setWriteModal(true);
  };

  return (
    <Background>
      {/* 안내 메세지 모달 */}
      {alertModal && (
        <AlertModal
          size="lg"
          message={alertModalMessage}
          setIsModal={setAlertModal}
          setIsDetail={setIsDetail}
        />
      )}
      {/* 변경 진행 여부 모달 */}
      {writeModal && (
        <WriteModal
          message={writeModalMessage}
          subMessage={writeModalSubMessage}
          leftBtn="취소"
          leftBtnHandle={() => {
            setWriteModal(false);
          }}
          rightBtn={rightBtnMessage}
          rightBtnHandle={onClickRightModal}
          size={'lg'}
          setWriteModal={setWriteModal}
        />
      )}
      <Wrapper>
        {/* 헤더 */}
        <AdminHeader
          title="관리자 관리"
          subTitle="관리자 조회 상세"
          type="admin"
          deleteBtn={data?.isRepresentativeAdmin ? false : true}
          deleteFn={onClickDeleteBtn}
          backBtn={onClickBack}
        />
        {/* 본문 */}
        <Line>
          <label>관리자 등급</label>
          <CheckBoxContainer>
            <div className="raidoBoxWrapper">
              <input
                type={'radio'}
                className="radioBox"
                name="adminClass"
                checked={!isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
              <span>일반관리자</span>
            </div>
            <div className="raidoBoxWrapper">
              <input
                type={'radio'}
                className="radioBox"
                name="adminClass"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
              <span>슈퍼관리자</span>
            </div>
            <button className="adminBtn" onClick={onClickChangeBtn}>
              변경
            </button>
          </CheckBoxContainer>
        </Line>
        <Line>
          <label>아이디</label>
          <span>{data?.id}</span>
        </Line>
        <Line>
          <label>이름</label>
          <span>{data?.name}</span>
        </Line>
        <Line>
          <label>전화번호</label>
          <span>{hyphenFn(data?.phone!)}</span>
        </Line>
        <Line>
          <label>이메일</label>
          <span>{data?.email}</span>
        </Line>
      </Wrapper>
    </Background>
  );
};

export default AdminDetail;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;
const Wrapper = styled.div`
  width: 946px;
`;
const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 14px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  & > label {
    width: 90px;
    font-weight: 500;
  }
`;
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  .radioBox {
    margin-right: 4px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .raidoBoxWrapper {
    display: flex;
    align-items: center;
  }
  .adminBtn {
    margin-left: 32px;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.gray2};
    padding: 3px 19px;
    background: ${colors.lightWhite3};
    border: 1px solid ${colors.gray2};
    border-radius: 2px;
  }
`;
