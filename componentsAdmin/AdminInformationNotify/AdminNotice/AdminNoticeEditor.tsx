import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import {
  isTokenAdminGetApi,
  isTokenAdminDeleteApi,
  isTokenAdminPutApi,
  isTokenAdminPostApi,
  multerAdminApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import { AxiosError } from 'axios';
import { css } from '@emotion/react';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AdminNoticeListResponse } from 'types/tableDataType';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
  setChangeNumber: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NoticeDetail = {
  isSuccess: true;
  data: {
    createdAt: string;
    noticeIdx: number;
    title: string;
    content: string;
    isVisible: boolean;
  };
};

const AdminNoticeEditor = ({
  setIsDetail,
  detatilId,
  setChangeNumber,
}: Props) => {
  const queryClient = useQueryClient();
  // 리스트 페이지

  const { data: adminNoticeList, refetch: adminNoticeListRefetch } =
    useQuery<AdminNoticeListResponse>('adminNoticeList', () =>
      isTokenAdminGetApi(`/admin/notices`),
    );

  const { data, isLoading, isError, refetch } = useQuery<NoticeDetail>(
    'adminNoticeDetail',
    () => isTokenAdminGetApi(`/admin/notices/${detatilId}`),
  );
  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 수정된 value가 있는지 없는지
  const [checkAll, setCheckAll] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  // 제목
  const [title, setTitle] = useState<string | undefined>('');
  // 본문
  const [bodyText, setBodyText] = useState<string | undefined>('');

  const firstImgUrl = '';
  const firstTitle = data?.data?.title;
  const firstBodyText = data?.data?.content;

  const [imgArr, setImgArr] = useState<ImgFile[]>([]);
  const [imgUrl, setImgUrl] = useState<string | undefined>(firstImgUrl);
  const [imgName, setImgName] = useState<string | undefined>('');

  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      // console.log(res);
      const newFile = [...imgArr];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
        setImgName(decodeURIComponent(img.originalName));
        setImgUrl(img.url);
      });
      setImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });

  // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef?.current?.click();
  };

  // 이미지 첨부 api
  const imgRef = useRef<any>(null);
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('library', files![i], encodeURIComponent(files![i].name));
    }
    multerImage(formData);
    e.target.value = '';
  };

  // 사진 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    setImgName('');
    setImgUrl('');
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...imgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setImgArr(copyArr);
      }
    }
  };

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

  // 등록 api
  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminNoticeList');
      adminNoticeListRefetch();
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
    if (bodyText && title) {
      if (detatilId === '') {
        postMutate({
          url: `/admin/notices`,
          data: {
            title: title,
            content: bodyText,
          },
        });
      }
    } else {
      setMessageModal(true);
      setMessage('제목과 내용은 필수 항목입니다');
    }
  };

  // 수정 api
  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPutApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminNoticeList');
        setMessageModal(true);
        setMessage('수정이 완료됐습니다!');
        adminNoticeListRefetch();
      },
      onError: (error: any) => {
        setMessageModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  const onClickModifiedBtn = () => {
    if (checkAll) {
      modifiedMutate({
        url: `/admin/notices/${detatilId}`,
        data: {
          title: title,
          content: bodyText,
        },
      });
    }
  };

  // 삭제 api
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminNoticeList');

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
    deleteMutate({
      url: `/admin/notices/${detatilId}`,
    });
  };

  useEffect(() => {
    setBodyText(firstBodyText);
    setTitle(firstTitle);
  }, [data]);

  // 데이터 보내는 버튼 활성화 여부
  useEffect(() => {
    if (bodyText !== firstBodyText) {
      setCheckAll(true);
    } else if (title !== firstTitle) {
      setCheckAll(true);
    }
  }, [bodyText, title]);

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
          <SubText> 공지사항</SubText>
        </TitleWrapper>
        <SubText>공지사항 등록</SubText>
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

export default AdminNoticeEditor;

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
  width: 946px;
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

const TitleBox = styled.div`
  width: 964px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e5ed;
  border-radius: 3px;
  padding: 0 6px;
  margin-bottom: 8px;
`;

const TitleText = styled.span`
  ${smallText}
  margin-right: 10px;
  padding-right: 8px;
  border-right: 2px solid #e2e5ed;
`;

const TitleArea = styled.input`
  border: none;
  outline: none;
  resize: none;
  background: none;
  width: 900px;
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
