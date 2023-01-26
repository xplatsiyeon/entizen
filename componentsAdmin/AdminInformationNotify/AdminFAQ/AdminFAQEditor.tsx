import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import {
  getApi,
  isTokenAdminDeleteApi,
  isTokenAdminGetApi,
  isTokenAdminPostApi,
  isTokenAdminPutApi,
} from 'api';
import {
  multerApi,
  isTokenPostApi,
  isTokenPutApi,
  isTokenPatchApi,
  isTokenDeleteApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import DropDownBtn from 'componentsAdmin/DropDownBtn';
import { css } from '@emotion/react';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { convertEn, convertKo } from 'utils/calculatePackage';
type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
  setChangeNumber: React.Dispatch<React.SetStateAction<boolean>>;
};
import { ServiceKr, ServiceEn } from './AdminFAQList';
import { AdminFAQListResponse } from 'types/tableDataType';

export interface FaqsUpdate {
  isSuccess: true;
  data: {
    faq: {
      createdAt: string;
      faqIdx: number;
      faqKind: string;
      question: string;
      answer: string;
      isVisible: boolean;
    };
  };
}

const AdminFAQEditor = ({ setIsDetail, detatilId, setChangeNumber }: Props) => {
  const queryClient = useQueryClient();

  // FAQ 에디터 데이터 불러오는 api
  const { data, isLoading, isError, refetch } = useQuery<FaqsUpdate>(
    'adminFaqsDetail',
    () => isTokenAdminGetApi(`/admin/faqs/${detatilId}`),
  );

  // FAQ 리스트 불러오는 api
  const { data: adminFaqList, refetch: adminFaqListRefetch } =
    useQuery<AdminFAQListResponse>('adminFaqList', () => getApi(`/admin/faqs`));

  // 수정된 value가 있는지 없는지
  const [checkAll, setCheckAll] = useState<boolean>(false);

  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);

  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');

  const userTypeEn = ['USER', 'COMPANY'];
  const userType = ['일반회원', '기업회원 '];
  const [userNum, setUserNum] = useState(0);

  const [checkValue, setCheckValue] = useState('일반회원');

  // 본문 초기값
  const firstTitle = data?.data?.faq?.question;
  const firstContent = data?.data?.faq?.answer;

  // 제목
  const [title, setTitle] = useState<string | undefined>('');

  // 본문
  const [bodyText, setBodyText] = useState<string | undefined>('');

  // 약관 타입
  const [selectValue, setSelectValue] = useState<string>('');

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
      queryClient.invalidateQueries('adminFaqList');
      adminFaqListRefetch();
      setMessageModal(true);
      setMessage('추가가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('추가 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  // 여기에 나중에 userType 추가 해야함 →userTypeEn[userNum]
  const modalPostBtnControll = () => {
    if (detatilId === '') {
      postMutate({
        url: `/admin/faqs`,
        data: {
          faqKind: convertEn(ServiceKr, ServiceEn, selectValue),
          answer: bodyText,
          question: title,
          visibleTarget: userTypeEn[userNum],
        },
      });
    }
  };

  // 수정 api

  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPutApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminFaqList');
        adminFaqListRefetch();
        setMessageModal(true);
        setMessage('수정이 완료됐습니다!');
      },
      onError: (error: any) => {
        setMessageModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  // 여기에 나중에 userType 추가 해야함 →userTypeEn[userNum]
  const onClickModifiedBtn = () => {
    if (checkAll) {
      modifiedMutate({
        url: `/admin/faqs/${detatilId}`,
        data: {
          faqKind: selectValue
            ? convertEn(ServiceKr, ServiceEn, selectValue)
            : data?.data?.faq?.faqKind,
          answer: bodyText,
          question: title,
          visibleTarget: userTypeEn[userNum],
        },
      });
    }
  };

  // 삭제 api
  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      adminFaqListRefetch();
      queryClient.invalidateQueries('adminFaqList');
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
      url: `/admin/faqs/${detatilId}`,
    });
  };

  useEffect(() => {
    setBodyText(firstContent);
    setTitle(firstTitle);
  }, [data]);

  // 데이터 보내는 버튼 활성화 여부
  useEffect(() => {
    if (bodyText !== firstContent) {
      setCheckAll(true);
    } else if (title !== firstTitle) {
      setCheckAll(true);
    }
  }, [bodyText, title]);

  console.log('🐳 userTypeEn[userNum] 🐳', userTypeEn[userNum]);

  return (
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
          <SubText>FAQ</SubText>
        </TitleWrapper>
        <SubText>FAQ 등록</SubText>
        <TitleBox1>
          <TitleText>구분</TitleText>
          <SelectBox>
            {userType.map((item, idx) => (
              <Select>
                <input
                  type="radio"
                  key={idx}
                  style={{ marginRight: '5px', cursor: 'pointer' }}
                  value={item}
                  id={item}
                  name="userType"
                  onChange={(e) => {
                    setCheckValue(e.target.value);
                  }}
                  onClick={() => {
                    if (detatilId !== '') {
                      false;
                    } else {
                      setUserNum(idx);
                    }
                  }}
                  checked={
                    detatilId !== '' ? item === userType[userNum] : undefined
                  }
                />
                {item}
              </Select>
            ))}
          </SelectBox>
        </TitleBox1>
        <TitleContainer>
          <DropDownBtn
            dropDownValue={ServiceKr}
            setSelectValue={setSelectValue}
            selectValue={selectValue}
            currentStep={convertKo(
              ServiceKr,
              ServiceEn,
              data?.data?.faq?.faqKind,
            )}
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
        <MainTextArea
          placeholder="내용을 입력해주세요"
          value={bodyText}
          onChange={(e) => {
            setBodyText(e.target.value);
          }}
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
  );
};

export default AdminFAQEditor;

const smallText = css`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  color: #000000;
  font-weight: 500;
`;

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

const TitleBox1 = styled.div`
  width: 964px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e5ed;
  border-radius: 3px;
  padding: 0 6px;
  margin-bottom: 10px;
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
  width: 650px;
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

const ImgWrapper = styled.div`
  display: flex;
  width: 964px;
  height: 130px;
  border: 1px solid #e2e5ed;
  padding: 14px 11px;
  margin-bottom: 8px;
`;

const AddImgText = styled.div`
  ${smallText}
  margin-bottom: 8px;
`;

const AddImg = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: 1px solid #e2e5ed;
  padding-right: 40px;
`;

const ImgSpanBox = styled.div`
  height: auto;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
`;

const ImgSpan = styled.div`
  position: relative;
  width: 140px;
  height: 104px;
  border-radius: 4px;
  border: 0.75pt solid #e2e5ed;
  & > span > img {
    border-radius: 4px;
  }
`;

const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
  cursor: pointer;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Select = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-weight: 400;
`;
