import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import { css } from '@emotion/react';
import CloseModal from 'public/adminImages/libraryClose.svg';
import {
  api,
  getApi,
  isTokenAdminDeleteApi,
  isTokenAdminPostApi,
  isTokenAdminPutApi,
  multerAdminApi,
} from 'api';
import normal from 'public/adminImages/undefinedImg.svg';
import CloseImg from 'public/images/XCircle.svg';
import { AdminBtn } from 'componentsAdmin/Layout';
import { InputAdornment, TextField, Typography } from '@mui/material';
import {
  isTokenGetApi,
  multerApi,
  isTokenPostApi,
  isTokenPutApi,
  isTokenPatchApi,
  isTokenDeleteApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import { EntizenLibraryResponse } from 'types/tableDataType';

type Props = {
  afterSalesServiceIdx: string;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface LibraryResponse {
  isSuccess: true;
  data: {
    library: {
      createdAt: string;
      libraryIdx: number;
      imageUrl: string;
      title: string;
      link: string;
    };
  };
}

const ModalLibrary = ({ afterSalesServiceIdx, setIsDetail }: Props) => {
  const queryClinet = useQueryClient();
  const [review, setReview] = useState<ImgFile[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState('');
  const [checkAll, setCheckAll] = useState<boolean>(false);

  // 도서관 리스트
  const { data: entizenLibrary, refetch: entizenLibraryRefetch } =
    useQuery<EntizenLibraryResponse>('entizenLibrary', () =>
      getApi(
        `/admin/libraries?page=1&limit=10&startDate=2022-12-01&endDate=2022-12-31&searchKeyword=`,
      ),
    );

  // 도서관 모달 디테일
  const { data, isLoading, isError, refetch, remove } =
    useQuery<LibraryResponse>('entizenLibraryDetail', () =>
      isTokenGetApi(`/admin/libraries/${afterSalesServiceIdx}`),
    );

  const [title, setTitle] = useState<string | undefined>('');
  const [link, setLink] = useState<string | undefined>('');
  const [imgUrl, setImgUrl] = useState<string | undefined>('');

  const firstTitle = data?.data?.library?.title;
  const firstLink = data?.data?.library?.link;
  const firstImgUrl = data?.data?.library?.imageUrl;

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
      const newFile = [...review];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
        setImgName(decodeURIComponent(img.originalName));
        setImgUrl(img.url);
      });
      setReview(newFile);
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
    const copyArr = [...review];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setReview(copyArr);
      }
    }
  };

  // -------------------------도서관 조회 (수정하기) -------------------
  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPutApi,
    {
      onSuccess: () => {
        queryClinet.invalidateQueries('entizenLibrary');
        entizenLibraryRefetch();
        setIsModal(true);
        setMessage('수정이 완료됐습니다!');
      },
      onError: (error: any) => {
        setIsModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  // 도서관 수정하기 버튼
  const onClickModifiedBtn = () => {
    if (checkAll) {
      modifiedMutate({
        url: `/admin/libraries/${afterSalesServiceIdx}`,
        data: {
          title: title,
          link: link,
          imageUrl: imgUrl,
        },
      });
    }
  };

  // 도서관 삭제 api

  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('entizenLibrary');
      entizenLibraryRefetch();
      setIsModal(true);
      setMessage('삭제가 완료 됐습니다.');
    },
    onError: () => {
      setIsModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const modalDeleteBtnControll = () => {
    patchMutate({
      url: `/admin/libraries/${afterSalesServiceIdx}`,
    });
  };

  // 도서관 추가 api

  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('entizenLibrary');
      setIsModal(true);
      setMessage('추가가 완료 됐습니다.');
      entizenLibraryRefetch();
    },
    onError: () => {
      setIsModal(true);
      setMessage('추가 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const modalPostBtnControll = () => {
    if (data?.data?.library === undefined) {
      postMutate({
        url: `/admin/libraries`,
        data: {
          title: title,
          link: link,
          imageUrl: imgUrl,
        },
      });
    }
  };

  // 제목
  const handleTitleArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(() => e.target.value);
  };

  // 링크
  const handleLinkArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLink(() => e.target.value);
  };

  // input text 초기값
  useEffect(() => {
    setTitle(firstTitle);
    setLink(firstLink);
    setImgUrl(firstImgUrl);
  }, [data]);

  useEffect(() => {
    if (title !== firstTitle) {
      setCheckAll(true);
    } else if (link !== firstLink) {
      setCheckAll(true);
    } else if (imgUrl !== firstImgUrl) {
      setCheckAll(true);
    }
  }, [title, link, imgUrl]);

  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <Modal>
      {isModal && (
        <AlertModal
          setIsModal={setIsModal}
          message={message}
          setIsDetail={setIsDetail}
        />
      )}
      <ModalBox>
        <TitleBox>
          <TitleText>엔티즌 도서관 보기</TitleText>
          <Image
            src={CloseModal}
            layout="intrinsic"
            alt="closeBtn"
            width={16}
            height={16}
            onClick={() => {
              setIsDetail(false);
            }}
            style={{ cursor: 'pointer' }}
          />
        </TitleBox>
        <FlexWrap>
          <ImageSubBox>
            <SubTitle>이미지</SubTitle>
            <ImageDeleteBox>
              {data !== undefined ? (
                <ImageTitleBox>
                  {imgUrl !== firstImgUrl ? imgUrl : firstImgUrl}
                </ImageTitleBox>
              ) : (
                <ImageTitleBox>
                  {imgUrl !== undefined ? imgUrl : '이미지 첨부'}
                </ImageTitleBox>
              )}

              <DeleteTitle>삭제</DeleteTitle>
            </ImageDeleteBox>
          </ImageSubBox>
          <FlexWrap3>
            <AdminBtn
              style={{ width: '65px', marginTop: '10px' }}
              onClick={imgHandler}
            >
              사진첨부
            </AdminBtn>
            <input
              style={{ display: 'none' }}
              ref={imgRef}
              type="file"
              accept="image/*"
              onChange={saveFileImage}
              multiple
            />

            {imgUrl !== undefined && imgUrl !== '' && (
              <Preview>
                <img
                  src={imgUrl !== firstImgUrl ? imgUrl : firstImgUrl}
                  style={{ objectFit: 'cover', width: '82px', height: '82px' }}
                />
                <Xbox onClick={handlePhotoDelete}>
                  <Image
                    src={CloseImg}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </Preview>
            )}
          </FlexWrap3>
        </FlexWrap>

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
          <SubTitle>링크</SubTitle>
          <InputText
            value={link}
            placeholder="링크를 넣어주세요."
            onChange={handleLinkArea}
            required
          />
        </FlexHorizontal>
        <FlexWrap2>
          <div />
          <BtnBox width={data !== undefined ? 160 : 65}>
            {data?.data?.library !== undefined && (
              <AdminBtn
                style={{
                  background: '#747780',
                  border: '1px solid #464646',
                  color: '#ffffff',
                  width: '75px',
                }}
                onClick={() => {
                  modalDeleteBtnControll();
                }}
              >
                삭제
              </AdminBtn>
            )}
            {data?.data?.library !== undefined ? (
              <AdminBtn
                style={{
                  background: '#747780',
                  border: '1px solid #464646',
                  color: '#ffffff',
                  width: '75px',
                }}
                onClick={() => {
                  onClickModifiedBtn();
                }}
              >
                수정
              </AdminBtn>
            ) : (
              <AdminBtn
                style={{
                  background: '#747780',
                  border: '1px solid #464646',
                  color: '#ffffff',
                  marginLeft: '85px',
                  width: '75px',
                }}
                onClick={() => {
                  modalPostBtnControll();
                }}
              >
                추가
              </AdminBtn>
            )}
          </BtnBox>
        </FlexWrap2>
      </ModalBox>
    </Modal>
  );
};

export default ModalLibrary;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  color: #222222;
  line-height: 150%;
`;

const Flex = css`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  padding-top: 17px;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 10pt;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  z-index: 100;
`;

const ModalBox = styled.div`
  background-color: #ffffff;
  top: 20%;
  left: 30%;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 770px;
  height: 528px;
  border-radius: 8px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e5ed;
  padding: 13px 24px;
`;

const TitleText = styled.div`
  ${Text}
  text-align: left;
  font-weight: 500;
  font-size: 16px;
`;

const SubTitle = styled.div`
  ${Text}
  text-align: left;
  font-weight: 400;
  font-size: 16px;
`;

const FlexWrap = styled.div`
  ${Flex}
  flex-direction: column;
`;

const FlexWrap2 = styled.div`
  /* ${Flex} */
  display: flex;
  align-items: initial;
  justify-content: flex-end;
  margin-right: 70px;
`;

const FlexWrap3 = styled.div`
  display: flex;
  align-items: initial;
`;

const FlexHorizontal = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  align-items: initial;
  padding: 0 24px;
  padding-top: 17px;
`;

const ImageSubBox = styled.div`
  width: 203px;
  display: flex;
  justify-content: space-between;
`;

const ImageDeleteBox = styled.div`
  width: 126px;
  display: flex;
  justify-content: space-between;
`;

const ImageTitleBox = styled.div`
  border: 1px solid #a6a9b0;
  border-radius: 2px;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #a6a9b0;
  line-height: 150%;
  text-align: center;
  padding: 1px 3px;
  width: 92px;
  height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteTitle = styled.div`
  line-height: 150%;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  text-align: center;
  color: #747780;
  border-bottom: 1px solid #747780;
  cursor: pointer;
`;

const Xbox = styled.div`
  position: absolute;
  cursor: pointer;
  left: 60px;
  top: 0;
`;

const Preview = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  margin-left: 13px;
  margin-top: 8px;
`;

const TextInput = styled.div`
  width: 246px;
  height: 76px;
  background-color: #fbfcff;
  border: 1px solid #e2e5ed;
  border-radius: 2px;
  padding: 3px;
`;

const InputText = styled.textarea`
  width: 598px;
  height: 128px;
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

const Input = styled(TextField)`
  width: 246px;
  height: 76px;
  border-radius: 2px;
  border: 1px solid #e2e5ed;
  background-color: #fbfcff;
  /* overflow-x: scroll; */
  overflow-y: scroll;
  word-break: break-all;

  /* .MuiInputBase-root {
    padding: 3px 3px;
  } */
  /* & input {
    ${Text}
    color: #222222;
    text-align: left;
    padding: 0;
  } */

  ::placeholder {
    color: ${colors.lightGray3};
    font-weight: 400;
  }

  & fieldset {
    border: none;
  }
`;

const BtnBox = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;
