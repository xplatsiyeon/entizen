import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { excelDownloadFile } from 'hooks/excelDown';
import { isTokenAdminPostApi } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AlertModal from 'componentsAdmin/Modal/AlertModal';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const AdminAllAlarm = ({ setNowHeight }: Props) => {
  const queryClient = useQueryClient();

  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);

  const [messageModal, setMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  // 제목 전송
  const [title, setTitle] = useState('');
  const handleTitleArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(() => e.target.value);
  };

  // 내용
  const [contents, setContents] = useState('');
  const handleContentsArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(() => e.target.value);
  };

  // 링크
  const [link, setLink] = useState('');
  const handleLinkArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLink(() => e.target.value);
  };

  // 등록 api
  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      setMessageModal(true);
      setMessage('전송이 완료 됐습니다.');
      setTitle('');
      setContents('');
      setLink('');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('전송 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const modalPostBtnControll = () => {
    postMutate({
      url: `/admin/alerts/transmission/all`,
      data: {
        title: title,
        content: contents,
        link: link,
      },
    });
  };

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      {messageModal && (
        <AlertModal
          setIsModal={setMessageModal}
          message={message}
          setIsDetail={setIsDetail}
        />
      )}
      <AdminHeader type="main" title="알람" subTitle="알람 전체 전송" />
      <FlexHorizontal>
        <SubTitle>제목</SubTitle>
        <InputText
          value={title}
          placeholder="제목을 써주세요."
          onChange={handleTitleArea}
          required
          maxLength={15}
        />
      </FlexHorizontal>
      <FlexHorizontal>
        <SubTitle>내용</SubTitle>
        <InputText2
          value={contents}
          placeholder="내용을 써주세요."
          onChange={handleContentsArea}
          required
          maxLength={15}
        />
      </FlexHorizontal>

      <FlexHorizontal>
        <SubTitle>링크</SubTitle>
        <InputText
          value={link}
          placeholder="링크를 넣어주세요."
          onChange={handleLinkArea}
          required
        />
      </FlexHorizontal>
      <BtnBox>
        <Btn onClick={modalPostBtnControll}>전송</Btn>
      </BtnBox>
    </Wrapper>
  );
};

export default AdminAllAlarm;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  color: #222222;
  line-height: 150%;
`;

const Wrapper = styled.div`
  padding-left: 18pt;
`;

const Line = styled.div`
  width: 946px;
  height: 2px;
`;

const Manager = styled.ul`
  border-top: 2px solid #464646;
  border-bottom: 2px solid #e7e7e7;
  padding: 20px 0;
  li {
    /* gap: 7.5pt; */
    display: flex;
    align-items: center;
    background: #ffffff;
    /* border: 1px solid ${colors.lightWhite3}; */
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
    width: 100%;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
    padding-left: 10px;
  }
  .row {
    width: 946px;
  }
  .label {
    min-width: 94px;
    margin-right: 24px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.main2};
  }
  .checkBoxContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-right: 16px;
  }
  .checkBox {
    width: 16px;
    height: 16px;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Btn = styled.button`
  padding: 5px 19px;
  border-radius: 6px;
  background: #464646;
  border: none;
  color: ${colors.lightWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  &:hover {
    background-color: #5221cb;
  }
`;
const FlexHorizontal = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  align-items: initial;
  padding: 0 24px;
  padding-top: 17px;
`;

const SubTitle = styled.div`
  ${Text}
  text-align: left;
  font-weight: 400;
  font-size: 16px;
`;

const InputText = styled.textarea`
  width: 598px;
  height: 50px;
  border: none;
  overflow-y: scroll;
  outline: none;
  resize: none;
  border: 1px solid #e2e5ed;
  background-color: #fbfcff;
  border-radius: 2px;
  color: ${colors.lightGray3};
  font-weight: 400;
  padding: 5px;
`;

const InputText2 = styled.textarea`
  width: 598px;
  height: 300px;
  border: none;
  overflow-y: scroll;
  outline: none;
  resize: none;
  border: 1px solid #e2e5ed;
  background-color: #fbfcff;
  border-radius: 2px;
  color: ${colors.lightGray3};
  font-weight: 400;
  padding: 5px;
`;

const AdminBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3pt;
  padding: 5px 5px;
  height: 26px;
  background: #e2e5ed;
  border: 1px solid #747780;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  text-align: center;
`;
