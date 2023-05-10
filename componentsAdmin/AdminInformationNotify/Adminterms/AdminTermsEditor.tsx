import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
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
import { EditorState } from 'draft-js';
import AdminTibtapEditor from './AdminTibtapEditor';
import { multerAdminApi } from 'api';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  detatilId?: string;
  setChangeNumber: React.Dispatch<React.SetStateAction<boolean>>;
};

// service-for-user | service-for-company | personal-info | location
export const dropDownValueEn = [
  'SERVICE_FOR_USER',
  'SERVICE_FOR_COMPANY',
  'PERSONAL_INFO',
  'LOCATION',
];
export const dropDownValue = [
  '고객 이용 약관',
  '파트너 이용 약관',
  '개인 정보 동의 약관',
  '위치 정보 동의 약관',
];

export interface TermsUpdate {
  isSuccess: true;
  data: { type: string; content: string; createdAt: string; termIdx: number };
}

const AdminTermsEditor = ({
  setIsDetail,
  setDetailId,
  detatilId,
  setChangeNumber,
}: Props) => {
  const queryClient = useQueryClient();

  console.log('🔥 detatilId : ', detatilId);
  // 공지사항 등록, 수정시 refetch
  // 리스트 페이지 데이터 불러오는 api 임
  const { data: termsList, refetch: termsListRefetch } =
    useQuery<AdminTermsListResponse>('termsList', () =>
      isTokenAdminGetApi(`/admin/terms`),
    );
  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);

  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  const {
    data: termsDetailData,
    isLoading,
    isError,
    refetch,
  } = useQuery<TermsUpdate>(
    'adminTermsDetail',
    () => isTokenAdminGetApi(`/admin/terms/${detatilId}`),
    {
      onSuccess: (res) => {
        console.log('🔥 res : ', res);
        setBodyText(res?.data?.content!);
      },
    },
  );

  const [dropDownState, setDropDownState] = useState<string[]>([
    ...dropDownValue,
  ]);

  const editorImgRef = useRef<any>(null);
  // 이미지 set
  const [editorImg, setEditorImg] = useState<any>();
  // 본문 초기값
  const firstContent = termsDetailData?.data?.content;
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

  // 수정 api

  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPutApi,
    {
      onSuccess: () => {
        termsListRefetch();
        setMessageModal(true);
        setMessage('수정이 완료됐습니다!');
      },
      onError: (error: any) => {
        setMessageModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
      },
    },
  );

  // 등록 버튼
  const modalPostBtnControll = () => {
    const type = dropDownValueEn[selctValueEn];

    console.log('🔥 type : ', type);
    console.log('🔥 bodyText : ', bodyText);
    // return;
    if (bodyText && type) {
      if (detatilId === '') {
        postMutate({
          url: `/admin/terms`,
          data: {
            type: type,
            content: bodyText,
          },
        });
      }
    } else {
      setMessageModal(true);
      setMessage('타입과 내용은 필수 항목입니다.');
    }
  };
  // 수정 버튼
  const onClickModifiedBtn = () => {
    if (bodyText) {
      modifiedMutate({
        url: `/admin/terms/${detatilId}`,
        data: {
          type: selectValue
            ? dropDownValueEn[selctValueEn]
            : termsDetailData?.data?.type,
          content: bodyText,
        },
      });
    } else {
      setMessageModal(true);
      setMessage('타입과 내용은 필수 항목입니다.');
    }
  };

  // 삭제 api
  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-mypage');
      termsListRefetch();
      // queryClient.invalidateQueries('adminTermsDetail');
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

  const { mutate: termsImage, isLoading: multerMobileImageLoading } =
    useMutation<MulterResponse, AxiosError, FormData>(multerAdminApi, {
      onSuccess: (res) => {
        // console.log(TAG + ' 👀 ~ line 104 multer onSuccess');
        // console.log(res);
        const newFile = editorImg;
        res?.uploadedFiles.forEach((img) => {
          newFile.push({
            url: img.url,
            size: img.size,
            originalName: decodeURIComponent(img.originalName),
          });
        });
        setEditorImg(newFile);
      },
      onError: (error: any) => {
        if (error.response.data.message) {
          console.log(`첫번째 에러:${error.response.data.message}`);
        } else if (error.response.status === 413) {
          console.log('용량이 너무 큽니다.');
        } else {
          console.log('다시 시도해주세요');
        }
      },
    });

  const saveFileTermsImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('term', files![i], encodeURIComponent(files![i].name));
    }
    termsImage(formData);
    e.target.value = '';
  };

  useEffect(() => {}, [termsDetailData]);

  // 약관 중복 제거
  const deleteTerms = (temp: string[], target: string) => {
    const index = temp.indexOf(target);
    temp.splice(index, 1);
  };
  // 수정 및 등록
  useEffect(() => {
    setSelctValueEn(dropDownValue.indexOf(selectValue));
    const temp: string[] = [...dropDownValue];
    if (termsDetailData !== undefined) {
      // 수정
      if (detatilId) {
        const targetIdx = dropDownValueEn.indexOf(termsDetailData?.data?.type);

        termsList?.data.terms.forEach((list) => {
          if (list.type !== dropDownValueEn[targetIdx]) {
            switch (list.type) {
              case 'PERSONAL_INFO': // 개인약관
                deleteTerms(temp, '개인 정보 동의 약관');
                break;
              case 'LOCATION': // 위치정보
                deleteTerms(temp, '위치 정보 동의 약관');
                break;
              case 'SERVICE_FOR_COMPANY': // 파트너
                deleteTerms(temp, '파트너 이용 약관');
                break;
              case 'SERVICE_FOR_USER': // 고객
                deleteTerms(temp, '고객 이용 약관');
                break;
            }
          }
        });
      } else {
        // 초기 값
        termsList?.data.terms.forEach((list) => {
          switch (list.type) {
            case 'PERSONAL_INFO': // 개인약관
              deleteTerms(temp, '개인 정보 동의 약관');
              break;
            case 'LOCATION': // 위치정보
              deleteTerms(temp, '위치 정보 동의 약관');
              break;
            case 'SERVICE_FOR_COMPANY': // 파트너
              deleteTerms(temp, '파트너 이용 약관');
              break;
            case 'SERVICE_FOR_USER': // 고객
              deleteTerms(temp, '고객 이용 약관');
              break;
          }
        });
      }
      setSelctValueKr(dropDownValueEn.indexOf(termsDetailData?.data?.type));
      setDropDownState([...temp]);
    }
  }, [selctValueEn, selctValueKr, selectValue, termsDetailData]);

  console.log('bodyText🖤💔💖💝', bodyText);

  return (
    <>
      <Background>
        <Wrapper>
          {messageModal && (
            <AlertModal
              setIsModal={setMessageModal}
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
              dropDownValue={dropDownState}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
              currentStep={dropDownValue[selctValueKr]}
              width={'230px'}
              background={'#E2E5ED'}
              border={'#747780'}
            />
          </TitleContainer>
          <AdminTibtapEditor
            setBodyText={setBodyText}
            bodyText={bodyText}
            firstContent={firstContent!}
            setEditorImg={setEditorImg}
            editorImg={editorImg}
            detatilId={detatilId}
          />
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
                <>
                  <input
                    style={{ display: 'none' }}
                    ref={editorImgRef}
                    type="file"
                    accept="image/*"
                    onChange={saveFileTermsImage}
                    multiple
                  />
                  <AdminBtn
                    onClick={() => {
                      onClickModifiedBtn();
                    }}
                  >
                    수정
                  </AdminBtn>
                </>
              </>
            ) : (
              <>
                <AdminBtn
                  onClick={() => {
                    modalPostBtnControll();
                  }}
                >
                  등록
                </AdminBtn>
              </>
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

const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 60px;
`;
