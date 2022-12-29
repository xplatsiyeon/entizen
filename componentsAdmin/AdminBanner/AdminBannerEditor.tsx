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
  isTokenGetApi,
  multerApi,
  isTokenPostApi,
  isTokenPutApi,
  isTokenPatchApi,
  isTokenDeleteApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import WriteModal from 'componentsAdmin/WriteModal';
import AlertModal from 'componentsAdmin/AlertModal';
import { AxiosError } from 'axios';
import { css } from '@emotion/react';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import Image from 'next/image';
import CloseImg from 'public/images/XCircle.svg';
import { Label } from '@mui/icons-material';
import { AdminBannerDetailResponse } from '../../types/tableDataType';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
};

type IMG = {
  originalName: string;
  size: number;
  url: string;
  createdAt?: string;
  bannerImageIdx?: number;
};

const AdminBannerEditor = ({ setIsDetail, detatilId }: Props) => {
  const queryClinet = useQueryClient();
  const { data, isLoading, isError, refetch } =
    useQuery<AdminBannerDetailResponse>('bannerDetail', () =>
      isTokenGetApi(`/admin/banners/${detatilId}`),
    );
  const imgRef = useRef<any>(null);
  const userTypeEn = ['USER', 'COMPANY'];
  const userType = ['일반회원', '기업회원 '];
  const [userNum, setUserNum] = useState(0);

  const [checkValue, setCheckValue] = useState('일반회원');

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

  // url
  const [url, setUrl] = useState<string | undefined>('');

  const [insideImgArr, setInsideImgArr] = useState<IMG[]>([]);
  const [insideImgUrl, setInsideImgUrl] = useState<string | undefined>('');
  const [insideImgName, setInsideImgName] = useState<string | undefined>('');
  const [outsideImgArr, setOutsideImgArr] = useState<IMG[]>([]);
  const [outsideImgUrl, setOutsideImgUrl] = useState<string | undefined>('');
  const [outsideImgName, setOutsideImgName] = useState<string | undefined>('');
  const [outsideImgSize, setOutsideImgSize] = useState<number | undefined>();

  const firstTitle = data?.data?.banner?.title;
  const firstUrl = data?.data?.banner?.url;
  const targetMemberType = data?.data?.banner?.targetMemberType;
  const firstOutsideImgArr = data?.data?.banner?.mainImage;
  const firstInsideImgArr = data?.data?.banner?.innerImages?.map((e) => {
    const { createdAt, bannerImageIdx, ...rest } = e;
    return { ...rest };
  });

  console.log('firstInsideImgArr', firstInsideImgArr);

  console.log('🐳 firstOutsideImgArr 🐳', firstOutsideImgArr);

  console.log('🎀 outsideImgArr 🎀', outsideImgArr);

  console.log('url', url);

  // file s3 multer 저장 API (with useMutation)
  const { mutate: outImage, isLoading: multerOutImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      // console.log(res);
      const preFile = outsideImgArr;
      const newFile = preFile.map((e) => {
        const { createdAt, bannerImageIdx, ...rest } = e;
        return { ...rest };
      });
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
        setOutsideImgName(decodeURIComponent(img.originalName));
        setOutsideImgUrl(img.url);
        setOutsideImgSize(img.size);
      });
      setOutsideImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(`첫번째 에러:${error.response.data.message}`);
        setMessageModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setMessageModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setMessageModal(true);
      }
    },
  });

  const { mutate: inImage, isLoading: multerInImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      // console.log(res);
      const preFile = insideImgArr;
      const newFile = preFile.map((e) => {
        const { createdAt, bannerImageIdx, ...rest } = e;
        return { ...rest };
      });
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
        setInsideImgName(decodeURIComponent(img.originalName));
        setInsideImgUrl(img.url);
      });
      setInsideImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
        setMessageModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setMessageModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setMessageModal(true);
      }
    },
  });

  // 이미지 첨부 api
  const saveFileOutsideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('library', files![i], encodeURIComponent(files![i].name));
    }
    outImage(formData);
    e.target.value = '';
  };

  const saveFileInsideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    inImage(formData);
    e.target.value = '';
  };

  // 사진 삭제
  const handleOutPhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    setOutsideImgName('');
    setOutsideImgUrl('');
    setOutsideImgSize(0);
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...outsideImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setOutsideImgArr(copyArr);
      }
    }
  };

  const handleInPhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    setInsideImgName('');
    setInsideImgUrl('');
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...insideImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setInsideImgArr(copyArr);
      }
    }
  };

  // 사진 온클릭
  const imgOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    imgRef?.current?.click();
  };

  const imgInHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    imgRef?.current?.click();
  };

  // -------------------------배너리스트 조회 (수정하기) -------------------
  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenPutApi,
    {
      onSuccess: () => {
        queryClinet.invalidateQueries('entizenLibrary');
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

  // 배너리스트 수정하기 버튼
  const onClickModifiedBtn = () => {
    modifiedMutate({
      url: `/admin/banners/${detatilId}`,
      data: {
        targetMemberType: userTypeEn[userNum],
        title: title,
        url: url,
        mainImage: outsideImgArr,
        innerImages: insideImgArr,
      },
    });
  };

  // 배너리스트 등록 api
  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('bannerList');
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
        url: `/admin/banners`,
        data: {
          targetMemberType: userTypeEn[userNum],
          title: title,
          url: url,
          mainImage: outsideImgArr,
          innerImages: insideImgArr,
        },
      });
    }
  };

  // 배너리스트 삭제 api

  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenDeleteApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('bannerList');
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
      url: `/admin/banners/${detatilId}`,
    });
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

  useEffect(() => {
    setTitle(firstTitle);
    setUrl(firstUrl);
    setOutsideImgArr([firstOutsideImgArr!]);
    setInsideImgArr(firstInsideImgArr!);
    if (targetMemberType !== undefined && detatilId !== '') {
      setUserNum(userTypeEn.indexOf(targetMemberType));
    }
  }, [data]);

  return (
    <Background>
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
        <SubText>배너 등록</SubText>
        <TitleBox>
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
        </TitleBox>
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
        <TitleBox>
          <TitleText>URL</TitleText>
          <TitleArea
            type="text"
            value={url}
            placeholder="URL을 입력해주세요"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </TitleBox>
        <ImgWrapper>
          <AddImg>
            <AddImgText>메인 이미지 추가</AddImgText>
            <AdminBtn onClick={imgOutHandler}>사진첨부</AdminBtn>
          </AddImg>
          <input
            style={{ display: 'none' }}
            ref={imgRef}
            type="file"
            accept="image/*"
            onChange={saveFileOutsideImage}
            multiple
          />
          {/* <Preview> */}
          <ImgSpanBox>
            {outsideImgArr?.map((img, index) => (
              <ImgSpan>
                <Image
                  layout="fill"
                  alt="preview"
                  data-name={index}
                  key={index}
                  src={img?.url}
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
                <Xbox onClick={handleOutPhotoDelete} data-name={index}>
                  <Image
                    src={CloseImg}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            ))}
          </ImgSpanBox>
        </ImgWrapper>
        <ImgWrapper>
          <AddImg>
            <AddImgText>내부 이미지 추가</AddImgText>
            <AdminBtn onClick={imgInHandler}>사진첨부</AdminBtn>
          </AddImg>
          <input
            style={{ display: 'none' }}
            ref={imgRef}
            type="file"
            accept="image/*"
            onChange={saveFileInsideImage}
            multiple
          />
          {/* <Preview> */}
          <ImgSpanBox>
            {insideImgArr?.map((img, index) => (
              <ImgSpan>
                <Image
                  layout="fill"
                  alt="preview"
                  data-name={index}
                  key={index}
                  src={img?.url}
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
                <Xbox onClick={handleInPhotoDelete} data-name={index}>
                  <Image
                    src={CloseImg}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            ))}
          </ImgSpanBox>
        </ImgWrapper>
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

export default AdminBannerEditor;

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
  width: 790px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 10px;
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
