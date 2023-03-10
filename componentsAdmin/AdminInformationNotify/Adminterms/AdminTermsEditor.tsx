import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminTermsQuill from './AdminTermsQuill';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import { api, getApi } from 'api';
import {
  isTokenAdminGetApi,
  isTokenAdminPostApi,
  isTokenAdminPutApi,
  isTokenAdminDeleteApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import DropDownBtn from 'componentsAdmin/DropDownBtn';
import { AdminTermsListResponse } from 'types/tableDataType';
import AdminTermDraft from './AdminTermDraft';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import dynamic from 'next/dynamic';
import htmlToDraft from 'html-to-draftjs';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
  setChangeNumber: React.Dispatch<React.SetStateAction<boolean>>;
};

export const dropDownValueEn = ['LOCATION', 'PERSONAL_INFO', 'SERVICE'];
export const dropDownValue = [
  '위치 정보 동의 약관',
  '개인 정보 동의 약관',
  '서비스 이용 약관',
];

export interface TermsUpdate {
  isSuccess: true;
  data: { type: string; content: string; createdAt: string; termIdx: number };
}

const AdminTermsEditor = ({
  setIsDetail,
  detatilId,
  setChangeNumber,
}: Props) => {
  const queryClinet = useQueryClient();
  // 공지사항 등록, 수정시 refetch
  // 리스트 페이지 데이터 불러오는 api 임
  const { data: termsList, refetch: termsListRefetch } =
    useQuery<AdminTermsListResponse>('termsList', () =>
      isTokenAdminGetApi(`/admin/terms`),
    );

  // 제목
  const [title, setTitle] = useState<string>('');

  // 수정된 value가 있는지 없는지
  const [checkAll, setCheckAll] = useState<boolean>(false);

  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);

  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');

  const { data, isLoading, isError, refetch } = useQuery<TermsUpdate>(
    'adminTermsDetail',
    () => isTokenAdminGetApi(`/admin/terms/${detatilId}`),
  );

  // 본문 초기값
  const firstContent = data?.data?.content;

  // 본문
  const [bodyText, setBodyText] = useState<string>('');

  // 약관 타입
  const [selectValue, setSelectValue] = useState<string>('');
  const [selctValueEn, setSelctValueEn] = useState<number>(0);
  const [selctValueKr, setSelctValueKr] = useState<number>(0);

  // Draft 값 state
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const rendered = useRef(false);

  const WriteModalHandle = () => {
    setIsModal(true);
  };

  const leftBtnHandle = () => {
    setIsModal(false);
    setIsDetail(false);
  };
  const rightBtnHandle = () => {
    setIsModal(false);
  };

  // id값 없으면 등록 버튼만 나오게 하고 id값 있으면 수정 및 취소 버튼 나오도록

  // 등록 api
  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      termsListRefetch();
      setMessageModal(true);
      setMessage('추가가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('추가 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const modalPostBtnControll = () => {
    if (detatilId === '') {
      postMutate({
        url: `/admin/terms`,
        data: {
          type: dropDownValueEn[selctValueEn],
          // content: bodyText,
          content: editorState,
        },
      });
    }
  };

  // 수정 api

  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPutApi,
    {
      onSuccess: () => {
        setMessageModal(true);
        termsListRefetch();
        setMessage('수정이 완료됐습니다!');
      },
      onError: (error: any) => {
        setMessageModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  const onClickModifiedBtn = () => {
    modifiedMutate({
      url: `/admin/terms/${detatilId}`,
      data: {
        type: selectValue ? dropDownValueEn[selctValueEn] : data?.data?.type,
        // content: bodyText,
        content: editorState,
      },
    });
  };

  // 삭제 api
  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('user-mypage');
      setMessageModal(true);
      setMessage('삭제가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const modalDeleteBtnControll = () => {
    patchMutate({
      url: `/admin/terms/${detatilId}`,
    });
  };

  const DynamicComponent = dynamic(() => import('./AdminTermDraft'), {
    ssr: false,
  });
  // const DynamicComponent = dynamic(() => import('./AdminTermsQuill'), {
  //   ssr: false,
  // });

  useEffect(() => {
    setBodyText(data?.data?.content!);
  }, [data]);

  useEffect(() => {
    setSelctValueEn(dropDownValue.indexOf(selectValue));
    if (data !== undefined) {
      setSelctValueKr(dropDownValueEn.indexOf(data?.data?.type));
    } else {
      setSelctValueKr(0);
    }
  }, [selctValueEn, selctValueKr, selectValue, data]);

  // useEffect(() => {
  //   if (rendered.current) return;
  //   rendered.current = true;
  //   const blocksFromHtml =
  //     firstContent !== undefined && htmlToDraft(firstContent);
  //   if (blocksFromHtml) {
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlocks,
  //       entityMap,
  //     );
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  // }, [firstContent]);

  // 데이터 보내는 버튼 활성화 여부
  // useEffect(() => {
  //   if (bodyText !== firstContent) {
  //     setCheckAll(true);
  //   }

  // }, [bodyText]);

  return (
    <>
      <Background>
        <Wrapper>
          {messageModal && (
            <AlertModal
              setIsModal={setIsModal}
              message={message}
              setIsDetail={setIsDetail}
              setChangeNumber={setChangeNumber}
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
            title=""
            type="text"
            exelHide={false}
            WriteModalHandle={WriteModalHandle}
          />
          <TitleWrapper>
            <MainText>정보 수정</MainText>
            <SubText>약관</SubText>
          </TitleWrapper>
          <SubText>약관 등록</SubText>
          <TitleContainer>
            <DropDownBtn
              dropDownValue={dropDownValue}
              setSelectValue={setSelectValue}
              selectValue={selectValue}
              currentStep={dropDownValue[selctValueKr]}
              width={'230px'}
              background={'#E2E5ED'}
              border={'#747780'}
            />
            <TitleBox>
              <TitleText>제목</TitleText>
              <TitleArea
                type="text"
                value={title}
                placeholder="제목을 입력해주세요"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </TitleBox>
          </TitleContainer>
          {/* <MainTextArea
          placeholder="내용을 입력해주세요"
          value={bodyText}
          onChange={(e) => {
            setBodyText(e.target.value);
          }}
        /> */}
          {/* <AdminTermsQuill
            setBodyText={setBodyText}
            bodyText={bodyText}
            firstContent={firstContent!}
          /> */}

          {/* <DynamicComponent
            setBodyText={setBodyText}
            bodyText={bodyText}
            firstContent={firstContent!}
          /> */}

          <DynamicComponent
            setEditorState={setEditorState}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
          {/* <AdminTermDraft
            setEditorState={setEditorState}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          /> */}
          <BtnBox>
            {detatilId !== '' ? (
              <>
                <AdminBtn
                  onClick={() => {
                    modalDeleteBtnControll();
                  }}
                >
                  삭제
                </AdminBtn>
                <AdminBtn
                  onClick={() => {
                    onClickModifiedBtn();
                  }}
                >
                  수정
                </AdminBtn>
              </>
            ) : (
              <AdminBtn
                onClick={() => {
                  modalPostBtnControll();
                }}
              >
                등록
              </AdminBtn>
            )}
          </BtnBox>
        </Wrapper>
      </Background>
    </>
  );
};

export default AdminTermsEditor;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  width: 964px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  width: 964px;
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  color: #000000;
  font-weight: 500;
  margin-right: 11px;
`;
const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  margin-top: 20px;
  height: 32px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const TitleBox = styled.div`
  width: 778px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e5ed;
  border-radius: 3px;
  padding: 0 6px;
`;

const TitleText = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  color: #000000;
  font-weight: 500;
  margin-right: 10px;
  padding-right: 8px;
  border-right: 2px solid #e2e5ed;
`;

const TitleArea = styled.input`
  border: none;
  outline: none;
  resize: none;
  background: none;
`;

const MainTextArea = styled.textarea`
  width: 964px;
  height: 416px;
  border: 1px solid #e2e5ed;
  outline: none;
  resize: none;
  background: none;
  padding: 8px;
  border-radius: 3px;
  margin-bottom: 8px;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 60px;
`;
