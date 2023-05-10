import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import {
  isTokenAdminDeleteApi,
  isTokenAdminGetApi,
  isTokenAdminPostApi,
  isTokenAdminPutApi,
  multerAdminApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import { AxiosError } from 'axios';
import { css } from '@emotion/react';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import Image from 'next/image';
import CloseImg from 'public/images/XCircle.svg';
import { AdminBannerDetailResponse } from '../../../types/tableDataType';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
  setChangeNumber: React.Dispatch<React.SetStateAction<boolean>>;
  userTypeRefetch: string;
};

type IMG = {
  originalName: string;
  size: number;
  url: string;
  createdAt?: string | undefined;
  bannerImageIdx?: number | undefined;
};

const AdminBannerEditor = ({
  setIsDetail,
  detatilId,
  setChangeNumber,
  userTypeRefetch,
}: Props) => {
  const queryClient = useQueryClient();

  // 에디터 불러오는 api
  const { data, isLoading, isError, refetch, remove } =
    useQuery<AdminBannerDetailResponse>('bannerDetail', () =>
      isTokenAdminGetApi(`/admin/banners/${detatilId}`),
    );
  const outsidePcImgRef = useRef<any>(null);
  const outsideTabletImgRef = useRef<any>(null);
  const outsideMobileImgRef = useRef<any>(null);

  const userTypeEn = ['USER', 'COMPANY'];
  const userType = ['일반회원', '기업회원 '];
  const [userNum, setUserNum] = useState(0);

  const [checkValue, setCheckValue] = useState('일반회원');

  // 리스트 불러오는 api
  // const { data: bannerList, refetch: bannerListRefetch } =
  //   useQuery<AdminBannerListResponse>('bannerList', () =>
  //     isTokenAdminGetApi(`/admin/banners?targetMemberType=`),
  //   );

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

  const [pcImgArr, setPcImgArr] = useState<IMG[]>([]);
  const [pcImgUrl, setPcImgUrl] = useState<string | undefined>('');
  const [pcImgName, setPcImgName] = useState<string | undefined>('');
  const [pcImgSize, setPcImgSize] = useState<number | undefined>();

  const [tabletImgArr, setTabletImgArr] = useState<IMG[]>([]);
  const [tabletImgUrl, setTabletImgUrl] = useState<string | undefined>('');
  const [tabletImgName, setTabletImgName] = useState<string | undefined>('');
  const [tabletImgSize, setTabletImgSize] = useState<number | undefined>();

  const [mobileImgArr, setMobileImgArr] = useState<IMG[]>([]);
  const [mobileImgUrl, setMobileImgUrl] = useState<string | undefined>('');
  const [mobileImgName, setMobileImgName] = useState<string | undefined>('');
  const [mobileImgSize, setMobileImgSize] = useState<number | undefined>();

  const firstTitle = data?.data?.banner?.title;
  const firstUrl = data?.data?.banner?.url;
  const targetMemberType = data?.data?.banner?.targetMemberType;

  // 메인이미지에 추가해도 preview에 내부 이미지로 들어가는거 수정...

  // file s3 multer 저장 API (with useMutation)
  const { mutate: pcImage, isLoading: multerPcImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 104 multer onSuccess');
      // console.log(res);
      const newFile = pcImgArr;
      // const newFile = preFile.map((e) => {
      //   const { createdAt, bannerImageIdx, ...rest } = e;
      //   return { ...rest };
      // });
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
        setPcImgName(decodeURIComponent(img.originalName));
        setPcImgUrl(img.url);
        setPcImgSize(img.size);
      });
      setPcImgArr(newFile);
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

  const { mutate: tabletImage, isLoading: multerTabletImageLoading } =
    useMutation<MulterResponse, AxiosError, FormData>(multerAdminApi, {
      onSuccess: (res) => {
        // console.log(TAG + ' 👀 ~ line 104 multer onSuccess');
        // console.log(res);
        const newFile = tabletImgArr;
        // const newFile = preFile.map((e) => {
        //   const { createdAt, bannerImageIdx, ...rest } = e;
        //   return { ...rest };
        // });
        res?.uploadedFiles.forEach((img) => {
          newFile.push({
            url: img.url,
            size: img.size,
            originalName: decodeURIComponent(img.originalName),
          });
          setTabletImgName(decodeURIComponent(img.originalName));
          setTabletImgUrl(img.url);
          setTabletImgSize(img.size);
        });
        setTabletImgArr(newFile);
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

  const { mutate: mobileImage, isLoading: multerMobileImageLoading } =
    useMutation<MulterResponse, AxiosError, FormData>(multerAdminApi, {
      onSuccess: (res) => {
        // console.log(TAG + ' 👀 ~ line 104 multer onSuccess');
        // console.log(res);
        const newFile = mobileImgArr;
        // const newFile = preFile.map((e) => {
        //   const { createdAt, bannerImageIdx, ...rest } = e;
        //   return { ...rest };
        // });
        res?.uploadedFiles.forEach((img) => {
          newFile.push({
            url: img.url,
            size: img.size,
            originalName: decodeURIComponent(img.originalName),
          });
          setMobileImgName(decodeURIComponent(img.originalName));
          setMobileImgUrl(img.url);
          setMobileImgSize(img.size);
        });
        setMobileImgArr(newFile);
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

  // 이미지 첨부 api
  const saveFilePcImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    pcImage(formData);
    e.target.value = '';
  };

  const saveFileTabletImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    tabletImage(formData);
    e.target.value = '';
  };

  const saveFileMobileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    mobileImage(formData);
    e.target.value = '';
  };

  // 사진 삭제
  const handlePcPhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    setPcImgName('');
    setPcImgUrl('');
    setPcImgSize(0);
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...pcImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setPcImgArr(copyArr);
      }
    }
  };

  const handleTabletPhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    setMobileImgName('');
    setMobileImgUrl('');
    setMobileImgSize(0);
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...tabletImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setMobileImgArr(copyArr);
      }
    }
  };

  const handleMobilePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    setMobileImgName('');
    setMobileImgUrl('');
    setMobileImgSize(0);
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...mobileImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setMobileImgArr(copyArr);
      }
    }
  };

  // 사진 온클릭
  const pcImgOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    outsidePcImgRef?.current?.click();
  };

  const tabletImgOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    outsideTabletImgRef?.current?.click();
  };

  const mobileImgOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    outsideMobileImgRef?.current?.click();
  };

  // -------------------------배너리스트 조회 (수정하기) -------------------
  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPutApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bannerList');
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
        pcImage: {
          url: pcImgUrl,
          size: pcImgSize,
          originalName: pcImgName,
        },
        tabletImage: {
          url: tabletImgUrl,
          size: tabletImgSize,
          originalName: tabletImgName,
        },
        mobileImage: {
          url: mobileImgUrl,
          size: mobileImgSize,
          originalName: mobileImgName,
        },
        // innerImages: insideImgArr,
      },
    });
  };

  // 배너리스트 등록 api
  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('bannerList');
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
    if (detatilId === '' && pcImgUrl && tabletImgUrl && mobileImgUrl) {
      postMutate({
        url: `/admin/banners`,
        data: {
          targetMemberType: userTypeEn[userNum],
          title: title,
          url: url,
          pcImage: {
            url: pcImgUrl,
            size: pcImgSize,
            originalName: pcImgName,
          },
          tabletImage: {
            url: tabletImgUrl,
            size: tabletImgSize,
            originalName: tabletImgName,
          },
          mobileImage: {
            url: mobileImgUrl,
            size: mobileImgSize,
            originalName: mobileImgName,
          },
        },
      });
    } else {
      setMessageModal(true);
      setMessage('제목과 배너는 필수 항목입니다.');
    }
  };
  console.log('pcImgName ⚽️', pcImgName);
  console.log('tabletImgName 🪀', tabletImgName);
  console.log('mobileImgName 🛼', mobileImgName);

  // 배너리스트 삭제 api

  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('bannerList');
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
    if (data !== undefined) {
      setTitle(firstTitle);
      setUrl(firstUrl);
      data?.data?.banner?.bannerImages
        ?.filter((item) => item.imageSizeType === 'PC')
        .map((el) => {
          // setPcImgArr([firstOutsideImgArr!]);
          setPcImgUrl(el?.url);
          setPcImgName(el?.originalName);
          setPcImgSize(el?.size);
        });
      data?.data?.banner?.bannerImages
        ?.filter((item) => item.imageSizeType === 'MOBILE')
        .map((el) => {
          // setPcImgArr([firstOutsideImgArr!]);
          setMobileImgUrl(el?.url);
          setMobileImgName(el?.originalName);
          setMobileImgSize(el?.size);
        });
      data?.data?.banner?.bannerImages
        ?.filter((item) => item.imageSizeType === 'TABLET')
        .map((el) => {
          // setPcImgArr([firstOutsideImgArr!]);
          setTabletImgUrl(el?.url);
          setTabletImgName(el?.originalName);
          setTabletImgSize(el?.size);
        });
    }
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
          <SubText>배너</SubText>
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
            <AddImgText>
              메인 이미지 추가 <br />
              (PC 이미지)
            </AddImgText>
            <SizeText>1920px X 480px</SizeText>
            <AdminBtn onClick={pcImgOutHandler} style={{ marginTop: '13px' }}>
              사진첨부
            </AdminBtn>
          </AddImg>
          <input
            style={{ display: 'none' }}
            ref={outsidePcImgRef}
            type="file"
            accept="image/*"
            onChange={saveFilePcImage}
            multiple
          />
          <ImgSpanBox>
            {pcImgUrl !== undefined && pcImgUrl !== '' && (
              <ImgSpan>
                <Image
                  layout="fill"
                  alt="preview"
                  src={pcImgUrl !== undefined ? pcImgUrl : ''}
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
                <Xbox onClick={handlePcPhotoDelete}>
                  <Image
                    src={CloseImg}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            )}
          </ImgSpanBox>
        </ImgWrapper>
        <ImgWrapper>
          <AddImg>
            <AddImgText>
              메인 이미지 추가 <br />
              (태블릿 이미지)
            </AddImgText>
            <SizeText>1024px X 132px</SizeText>
            <AdminBtn
              onClick={tabletImgOutHandler}
              style={{ marginTop: '13px' }}
            >
              사진첨부
            </AdminBtn>
          </AddImg>
          <input
            style={{ display: 'none' }}
            ref={outsideTabletImgRef}
            type="file"
            accept="image/*"
            onChange={saveFileTabletImage}
            multiple
          />
          <ImgSpanBox>
            {tabletImgUrl !== undefined && tabletImgUrl !== '' && (
              <ImgSpan>
                <Image
                  layout="fill"
                  alt="preview"
                  src={tabletImgUrl !== undefined ? tabletImgUrl : ''}
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
                <Xbox onClick={handleTabletPhotoDelete}>
                  <Image
                    src={CloseImg}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            )}
          </ImgSpanBox>
        </ImgWrapper>
        <ImgWrapper>
          <AddImg>
            <AddImgText>
              메인 이미지 추가 <br />
              (모바일 이미지)
            </AddImgText>
            <SizeText>430px X 132px</SizeText>
            <AdminBtn
              onClick={mobileImgOutHandler}
              style={{ marginTop: '13px' }}
            >
              사진첨부
            </AdminBtn>
          </AddImg>
          <input
            style={{ display: 'none' }}
            ref={outsideMobileImgRef}
            type="file"
            accept="image/*"
            onChange={saveFileMobileImage}
            multiple
          />
          <ImgSpanBox>
            {mobileImgUrl !== undefined && mobileImgUrl !== '' && (
              <ImgSpan>
                <Image
                  layout="fill"
                  alt="preview"
                  src={mobileImgUrl !== undefined ? mobileImgUrl : ''}
                  priority={true}
                  unoptimized={true}
                  objectFit="cover"
                />
                <Xbox onClick={handleMobilePhotoDelete}>
                  <Image
                    src={CloseImg}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            )}
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
  margin-bottom: 1px;
  white-space: pre;
  text-align: left;
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

const SizeText = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 7px;
  font-weight: 400;
  text-align: left;
  padding-top: 3px;
`;
