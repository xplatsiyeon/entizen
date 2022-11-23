import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import Header from './Header';
import camera from 'public/images/gray_camera.png';
import Image from 'next/image';
import CloseImg from 'public/images/XCircle.svg';
import { useRouter } from 'next/router';
import SelectComponents from 'components/Select';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { useMutation, useQuery as reactQuery } from 'react-query';
import {
  isTokenGetApi,
  isTokenPatchApi,
  isTokenPostApi,
  isTokenPutApi,
  multerApi,
} from 'api';
import Modal from 'components/Modal/Modal';
import {
  chargingStations,
  ChargingStationsResponse,
} from 'QueryComponents/UserQuery';
import { useQuery } from '@apollo/client';
import Loader from 'components/Loader';
import { AsDetailReseponse } from 'pages/mypage/as';

export interface DateType {
  new (): Date;
}
export interface Charger {
  projectName: string;
  projectIdx: string;
}
const TAG = 'components/mypage/as/AsResquestWrite.tsx';
const AsRequestWrite = () => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  const imgRef = useRef<any>(null);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [imgValidation, setImgValidation] = useState(false);
  const [reqeustText, setRequestText] = useState('');
  const [review, setReview] = useState<ImgFile[]>([]);
  // 충전소 리스트 목록
  const [chargerList, setChargerList] = useState<Charger[]>([]);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
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
      });
      setReview(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // ---------------- 내 충전소 불러오기 ------------------
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: chargingData,
    loading: chargingLoading,
    error: chargingError,
    refetch: chargingRefetch,
  } = useQuery<ChargingStationsResponse>(chargingStations, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // ------------------AS POST 요청 -------------------------
  const { mutate: asMutate, isLoading: asIsLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: () => {
        router.replace('/mypage/as/complete');
      },
      onError: (error: any) => {
        setIsModal(true);
        setErrorMessage('AS 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );
  // -------------------------AS 조회 (수정하기) -------------------
  const {
    data: detailData,
    isLoading: detailIsLoading,
    isError: detailIsError,
    remove: detailRemove,
  } = reactQuery<AsDetailReseponse>(
    'as-detail-modified',
    () => isTokenGetApi(`/after-sales-services/${routerId}`),
    {
      enabled: routerId !== undefined && router?.isReady!,
    },
  );

  // -------------------------AS 조회 (수정하기) -------------------
  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenPutApi,
    {
      onSuccess: () => {
        router.replace({
          pathname: '/mypage/as/complete',
          query: {
            selectedIndex: selectedIndex,
          },
        });
      },
      onError: (error: any) => {
        setIsModal(true);
        setErrorMessage('AS 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  // 모달 클릭
  const onClickModal = () => {
    if (networkError) {
      setIsModal(false);
      router.push('/');
    } else {
      setIsModal(false);
    }
  };
  // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef?.current?.click();
  };
  // 사진 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'chargerProduct',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerImage(formData);
    e.target.value = '';
  };
  // 사진 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...review];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setReview(copyArr);
      }
    }
  };
  // as 신청하기 버튼
  const onClickNextBtn = () => {
    asMutate({
      url: '/after-sales-services',
      data: {
        requestTitle: title,
        requestContent: reqeustText,
        projectIdx: selectedIndex,
        afterSalesServiceRequestFiles: review,
      },
    });
  };
  // as 수정하기 버튼
  const onClickModifiedBtn = () => {
    modifiedMutate({
      url: `/after-sales-services/${routerId}`,
      data: {
        requestTitle: title,
        requestContent: reqeustText,
        projectIdx: selectedIndex,
        afterSalesServiceRequestFiles: review,
      },
    });
  };
  const handleChange = (data: Charger) => {
    setSelectedOption(data.projectName);
    setSelectedIndex(data.projectIdx);
  };
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestText(() => e.target.value);
  };

  // 수정하기 초기값
  useEffect(() => {
    if (detailData) {
      const afterSalesServiceRequestFiles =
        detailData?.data.afterSalesService.afterSalesService
          .afterSalesServiceRequestFiles;

      const newFile = [...afterSalesServiceRequestFiles].map((obj: any) => {
        delete obj.afterSalesServiceIdx;
        delete obj.afterSalesServiceRequestFileIdx;
        delete obj.createdAt;
        return obj;
      });

      setTitle(
        detailData.data.afterSalesService.afterSalesService.requestTitle,
      );
      setRequestText(
        detailData.data.afterSalesService.afterSalesService.requestContent,
      );
      setSelectedOption(
        detailData.data.afterSalesService.afterSalesService.project
          .finalQuotation.preQuotation.quotationRequest.installationAddress,
      );
      setSelectedIndex(
        detailData.data.afterSalesService.afterSalesService.afterSalesServiceIdx.toString(),
      );
      setReview(newFile);
    }
    // return () => {
    //   detailRemove();
    // };
  }, [detailData]);

  useEffect(() => {
    if (!chargingLoading && !chargingError && chargingData?.chargingStations) {
      const tempArr: Charger[] = [];
      chargingData?.chargingStations.forEach((e) => {
        tempArr.push({
          projectName: e.projectName,
          projectIdx: e.projectIdx,
        });
      });
      setChargerList(tempArr);
    }
  }, [chargingData]);

  // 유효성 검사
  useEffect(() => {
    if (
      title !== '' &&
      selectedOption.length > 1 &&
      imgValidation &&
      reqeustText !== ''
    ) {
      setCheckAll(() => true);
    } else {
      setCheckAll(() => false);
    }

    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, review, title, reqeustText]);

  // if (chargingLoading || asIsLoading) {
  //   return <Loader />;
  // }

  if (chargingError || detailIsError) {
    console.log('🔥 ~line 107 ~ AS 충전소 리스트 ' + TAG);
    console.log(chargingError);
  }

  // console.log('🔥 ~line 107 ~ AS 충전소 리스트 데이터 확인 ' + TAG);
  // console.log(chargingData);

  return (
    <>
      {/* 에러 모달 */}
      {isModal && <Modal click={onClickModal} text={errorMessage} />}
      <Container>
        <Header text={'A/S 요청하기'} colorselect={checkAll} />
        <TitleInputBox>
          <Label>제목</Label>
          <Input value={title} onChange={titleChange} type="text" required />
        </TitleInputBox>
        <RemainderInputBox>
          <Label>충전소</Label>
          <SelectContainer>
            <SelectComponents
              // option={chargerList}
              asOption={chargerList}
              placeholder="충전소를 선택해주세요"
              value={selectedOption}
              onClickAs={handleChange}
            />
          </SelectContainer>
        </RemainderInputBox>
        <RemainderInputBox>
          <Label>요청내용</Label>
          <TextArea
            placeholder="고장제품 종류, 증상, 사진, 발생 시점 등을 알려주시면 더욱 빠른 서비스에 도움이 됩니다."
            rows={7}
            value={reqeustText}
            onChange={handleTextArea}
            required
          />
        </RemainderInputBox>
        <RemainderInputBox>
          <Label>사진첨부</Label>
          <PhotosBox>
            <AddPhotos onClick={imgHandler}>
              <Image src={camera} alt="camera-icon" />
            </AddPhotos>
            <input
              style={{ display: 'none' }}
              ref={imgRef}
              type="file"
              accept="image/*"
              onChange={saveFileImage}
              multiple
            />
            {/* <Preview> */}
            {review?.map((img, index) => (
              <ImgSpan key={index} data-name={index}>
                <Image
                  layout="fill"
                  alt="preview"
                  data-name={index}
                  key={index}
                  src={img.url}
                  priority={true}
                  unoptimized={true}
                />
                <Xbox onClick={handlePhotoDelete} data-name={index}>
                  <Image
                    src={CloseImg}
                    data-name={index}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            ))}
          </PhotosBox>
        </RemainderInputBox>
      </Container>
      {routerId ? (
        <NextBtn
          onClick={onClickModifiedBtn}
          disabled={checkAll}
          checkAll={!checkAll}
        >
          A/S 수정하기
        </NextBtn>
      ) : (
        <NextBtn
          onClick={onClickNextBtn}
          disabled={checkAll}
          checkAll={!checkAll}
        >
          A/S 요청하기
        </NextBtn>
      )}
    </>
  );
};

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;
const TitleInputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12pt;
  gap: 9pt;
`;
const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;
`;
const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const Input = styled(TextField)`
  width: 100%;
  border-radius: 6pt;
  border: 1px solid #e2e5ed;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .MuiInputBase-root {
    padding: 10.5pt 12pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    text-align: left;
    padding: 0;
  }
  ::placeholder {
    color: #caccd1;
    font-weight: 400;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }
`;
const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 9pt;
`;
const TextArea = styled.textarea`
  resize: none;
  border: 1px solid #e2e5ed;
  padding: 12pt;
  margin-top: 9pt;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  &::placeholder {
    color: #caccd1;
  }
`;
const PhotosBox = styled.div`
  width: 100%;
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  gap: 9.1875pt;
  align-items: center;
`;
const AddPhotos = styled.button`
  display: inline-block;
  width: 56.0625pt;
  height: 56.0625pt;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
`;
const NextBtn = styled.button<{ checkAll: boolean }>`
  width: 100%;
  margin-top: 40.6875pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${({ checkAll }) =>
    checkAll ? `${colors.main}` : `${colors.blue3}`};
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-align: center;
  @media (max-width: 899.25pt) {
    padding-bottom: 39pt;
  }
`;
const ImgSpan = styled.div`
  position: relative;
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
`;
const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
`;

export default AsRequestWrite;
