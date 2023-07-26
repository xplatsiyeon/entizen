import styled from '@emotion/styled';
import ChangeDateModal from 'componentsCompany/Modal/ChangeDateModal';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import CloseImg from 'public/images/XCircle.svg';
import camera from 'public/images/gray_camera.png';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from 'styles/colors';
// import { BusinessRegistrationType } from 'components/SignUp';
import { useMutation } from 'react-query';
import { isTokenPatchApi, isTokenPostApi, multerApi } from 'api';
import { AxiosError } from 'axios';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
// import { Data } from 'pages/company/mypage/runningProgress';
import {
  InProgressProjectsDetailResponse,
  InProgressProjectsDetail,
} from 'QueryComponents/CompanyQuery';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { changeDataFn } from 'utils/calculatePackage';
import Carousel from 'components/mypage/projects/Carousel';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { requestPermissionCheck } from 'bridge/appToWeb';
import Back from 'public/images/backImg.png';
import { useMediaQuery } from 'react-responsive';
import { css } from '@emotion/react';
import Loader from 'components/Loader';
import { BusinessRegistrationType } from 'componentsCompany/CompanyQuotation/LastQuotation/ThirdStep';
import ImgDetailCarousel from 'components/ImgDetailCarousel';

type Props = {
  type?: 'READY' | 'INSTALLATION' | 'EXAM' | 'COMPLETION';
  textOne: string;
  textTwo: string;
  textThree: string;
  textFour: string;
  textFive?: string;
  finalStep?: boolean;
  btnText: string;
  almostFinish?: boolean;
  fin: boolean;
  data: InProgressProjectsDetailResponse;
  planed?: string;
  stepType: string;
  preStepState: boolean;
  completionDate: string;
  setProgressNum: Dispatch<SetStateAction<number>>;
  beforeStepDate?: string;
  afterStepDate?: string;
  inProgressRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
  modalText: string;
  // setBadgeState: React.Dispatch<React.SetStateAction<number>>;
  // setData: React.Dispatch<React.SetStateAction<Data>>;
  // setFin: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ImgFile {
  originalName: string;
  size: number;
  url: string;
}
interface MulterResponse {
  isSuccess: boolean;
  uploadedFiles: ImgFile[];
}

const Reusable = ({
  type,
  textOne,
  textTwo,
  textThree,
  textFour,
  textFive,
  finalStep,
  almostFinish,
  btnText,
  fin,
  data,
  planed,
  stepType,
  preStepState,
  inProgressRefetch,
  setProgressNum,
  completionDate,
  beforeStepDate,
  afterStepDate,
  modalText,
}: // setBadgeState,
// setData,

Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  // img ref
  const imgRef = useRef<HTMLInputElement>(null);
  // 날짜 변경 모달 오픈
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 완료하기 누르면 투버튼 모달
  const [twoBtnModalOpen, setTwoBtnModalOpen] = useState<boolean>(false);
  // 토글된거 들어가서 연 모달 일정변경
  const [selectedDay, setSelectedDay] = useState<string>('');
  // 이미지
  const [imgArr, setImgArr] = useState<BusinessRegistrationType[]>([]);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(res);
      const newArr = [...imgArr];
      res?.uploadedFiles.forEach((img) => {
        newArr.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setImgArr(newArr);
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

  const { mutate: deleteDataMutate, isLoading } = useMutation(isTokenPatchApi, {
    onSuccess(data, variables, context) {
      // console.log('일정 변경 취소 성공');
      // console.log(data);
      setErrorMessage('일정 변경이 취소되었습니다.');
      setIsModal(true);
    },
    onError(error, variables, context) {
      // console.log('일정 변경 취소 실패');
      // console.log(error);
      setErrorMessage('다시 시도해주세요.');
      setIsModal(true);
    },
  });
  // 프로젝트 각단계 완료처리 API
  const {
    mutate: stepMuate,
    isLoading: stepIsLoading,
    isError: stepIsError,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      inProgressRefetch();
      setProgressNum(-1);
    },
    onError: (error: any) => {
      // console.log(error);
      // console.log('에러 확인');
    },
  });

  const onClickModal = () => {
    if (errorMessage === '일정 변경이 취소되었습니다.') {
      inProgressRefetch();
    }
    setIsModal(false);
  };
  // 사진 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    // max길이 보다 짧으면 멈춤
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
  };
  // 사진 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...imgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setImgArr(copyArr);
      }
    }
  };
  // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userAgent) {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  // 일정 변경 요청
  const changeData = () => {
    if (planed) {
      setModalOpen(true);
    } else {
      setIsModal(true);
      setErrorMessage('목표일을 작성해주세요.');
    }
  };
  // 일정 변경 취소
  type DeleteType = 'READY' | 'INSTALLATION' | 'EXAM' | 'COMPLETION';
  const deleteData = (tpye: DeleteType) => {
    const projectIdx = data?.project?.projectIdx!;
    const target = data?.project?.unConsentProjectDateChangeHistories.filter(
      (el) => el.changedStep === tpye && el.processingStatus === false,
    );
    if (target?.length! > 0) {
      const projectDateChangeHistoryIdx =
        target[0]?.projectDateChangeHistoryIdx;
      deleteDataMutate({
        url: `/projects/${projectIdx}/goal-date/${projectDateChangeHistoryIdx}/cancel`,
      });
    }
  };
  // '완료하기' 누른 후 실행되는 함수. 배지를 변경하는 api 호출하기.
  const handleModalRightBtn = () => {
    if (planed) {
      if (preStepState === false) {
        alert('이전 단계를 완료해주세요.');
        setTwoBtnModalOpen(false);
      } else if (finalStep) {
        // 마지막 단계
        stepMuate({
          url: `/projects/${routerId}/step`,
          data: {
            projectStep: stepType,
            completedProjectImageFiles: imgArr,
          },
        });
      } else {
        // 이전 단계
        stepMuate({
          url: `/projects/${routerId}/step`,
          data: {
            projectStep: stepType,
          },
        });
      }
    } else {
      alert('목표일자를 작성해주세요.');
      setTwoBtnModalOpen(false);
    }
  };

  // 완료 버튼 클릭
  const onClickDoneButton = () => {
    setTwoBtnModalOpen(!twoBtnModalOpen);
    // if (isButtonValid) {
    //   setTwoBtnModalOpen(!twoBtnModalOpen);
    // }
  };

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
    }
  }, []);

  useEffect(() => {
    // console.log('핀 업데이트 되면 새로 고침');
    // console.log(almostFinish);
  }, [fin]);

  return (
    <>
      {isModal && <Modal text={errorMessage} click={onClickModal} />}
      {twoBtnModalOpen && (
        <TwoBtnModal
          exit={() => setTwoBtnModalOpen(!twoBtnModalOpen)}
          text={modalText}
          leftBtnText={'취소'}
          rightBtnText={'완료하기'}
          leftBtnColor={'#222222'}
          rightBtnColor={'#5221CB'}
          leftBtnControl={() => setTwoBtnModalOpen(!twoBtnModalOpen)}
          rightBtnControl={handleModalRightBtn}
        />
      )}
      {modalOpen && (
        <ChangeDateModal
          selectedDays={selectedDay}
          SetSelectedDays={setSelectedDay}
          exit={() => setModalOpen(false)}
          stepType={stepType}
          setModalOpen={setModalOpen}
          inProgressRefetch={inProgressRefetch}
          beforeStepDate={beforeStepDate!}
          afterStepDate={afterStepDate!}
          completionDate={completionDate!}
        />
      )}
      {/* ------------- 프로젝트 완료하기 클릭시 보이는 곳  -------------*/}
      {almostFinish ? (
        <>
          <DoubleArrowBox>
            <Image src={DoubleArrow} alt="doubleArrow" />
          </DoubleArrowBox>
          <Wrapper>
            <FinishedBox>
              {!mobile && (
                <>
                  <ImgBox>
                    <ImgTag
                      src="/images/LeftArrowBackSvg.svg"
                      alt="arrow"
                      onClick={() => {
                        setProgressNum(-1);
                      }}
                    />
                  </ImgBox>
                  <Top3>
                    <FinishedFirst>완료 요청일</FinishedFirst>
                    <FinishedDate>
                      {/* {planed ? planed : '목표일을 정해주세요'} */}
                      {planed
                        ? planed === 'CHANGING'
                          ? '목표일 변경 중'
                          : changeDataFn(planed)
                        : '목표일을 정해주세요'}
                    </FinishedDate>
                  </Top3>
                </>
              )}
              {mobile && (
                <>
                  <FinishedFirst>완료 요청일</FinishedFirst>
                  <FinishedDate>
                    {/* {planed ? planed : '목표일을 정해주세요'} */}
                    {planed
                      ? planed === 'CHANGING'
                        ? '목표일 변경 중'
                        : changeDataFn(planed)
                      : '목표일을 정해주세요'}
                  </FinishedDate>
                </>
              )}
              <FinishedTextBox>
                <FinishedText>프로젝트 완료 진행중입니다.</FinishedText>
                {mobile ? (
                  <FinishedSecondText>
                    구매자 동의 후 프로젝트가
                    <br />
                    최종 완료됩니다!
                  </FinishedSecondText>
                ) : (
                  <FinishedSecondText>
                    구매자 동의 후 프로젝트가 최종 완료됩니다!
                  </FinishedSecondText>
                )}
              </FinishedTextBox>
              <FinishedPhotoText>완료현장 사진</FinishedPhotoText>
              <FinishedPhotoBox>
                <Carousel
                  file={data?.project?.projectCompletionFiles!}
                  ImgDetail={true}
                />
              </FinishedPhotoBox>
            </FinishedBox>
          </Wrapper>
        </>
      ) : (
        <>
          <DoubleArrowBox>
            <Image src={DoubleArrow} alt="doubleArrow" />
          </DoubleArrowBox>
          <Wrapper>
            <Box>
              {!mobile && (
                <>
                  <Top>
                    <ImgTag
                      src="/images/LeftArrowBackSvg.svg"
                      alt="arrow"
                      onClick={() => {
                        setProgressNum(-1);
                      }}
                    />
                    {fin === false &&
                      (planed === 'CHANGING' ? (
                        <div
                          className="changeDate"
                          onClick={() => deleteData(type!)}
                        >
                          일정 변경 취소
                        </div>
                      ) : (
                        <div className="changeDate" onClick={changeData}>
                          일정 변경 요청
                        </div>
                      ))}
                  </Top>
                  <Top2>
                    <div className="expectedDate">
                      {fin ? '완료일' : '완료 예정일'}
                    </div>
                    <Date>
                      {planed
                        ? planed === 'CHANGING'
                          ? '목표일 변경 중'
                          : changeDataFn(
                              completionDate ? completionDate : planed,
                            )
                        : '목표일을 정해주세요'}
                    </Date>
                  </Top2>
                  <Line />
                </>
              )}
              {mobile && (
                <>
                  <Top>
                    <div className="expectedDate">
                      {/* <div className="backIcon">
                    <Image src={Back} layout="fill" />
                  </div> */}
                      {fin ? '완료일' : '완료 예정일'}
                    </div>
                    {fin === false &&
                      (planed === 'CHANGING' ? (
                        <div
                          className="changeDate"
                          onClick={() => deleteData(type!)}
                        >
                          일정 변경 취소
                        </div>
                      ) : (
                        <div className="changeDate" onClick={changeData}>
                          일정 변경 요청
                        </div>
                      ))}
                  </Top>
                  <Date>
                    {planed
                      ? planed === 'CHANGING'
                        ? '목표일 변경 중'
                        : changeDataFn(completionDate ? completionDate : planed)
                      : '목표일을 정해주세요'}
                  </Date>
                </>
              )}
              <SubTitle>{fin ? textOne : textTwo}</SubTitle>
              <ListBox>
                <li>{textThree}</li>
                <li>{textFour}</li>
                {textFive && <li>{textFive}</li>}
              </ListBox>
            </Box>
            {/* 완료에서 사진첨부하는곳 보이도록  */}
            {finalStep && !almostFinish && (
              <RemainderInputBox>
                <Label>완료현장 사진</Label>
                <PhotosBox>
                  <AddPhotos onClick={imgHandler}>
                    <Image src={camera} alt="" />
                  </AddPhotos>
                  <input
                    style={{ display: 'none' }}
                    ref={imgRef}
                    type="file"
                    accept="image/*"
                    onChange={saveFileImage}
                    multiple
                    capture={userAgent === 'Android_App' && true}
                  />
                  {/* <Preview> */}
                  {multerImageLoading ? (
                    <Loader type="images" />
                  ) : (
                    <ImgSpanBox>
                      {imgArr?.map((img, index) => (
                        <ImgSpan key={index} data-name={index}>
                          <Image
                            layout="fill"
                            alt="preview"
                            data-name={index}
                            key={index}
                            src={img.url}
                            priority={true}
                            unoptimized={true}
                            objectFit="cover"
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
                    </ImgSpanBox>
                  )}
                  {/* </Preview> */}
                </PhotosBox>
              </RemainderInputBox>
            )}
            {fin === false ? (
              <Button
                // isButtonValid={isButtonValid}
                onClick={onClickDoneButton}
                finalStep={finalStep}
                onValid={preStepState}
              >
                {btnText}
              </Button>
            ) : null}
          </Wrapper>
        </>
      )}
    </>
  );
};

const DoubleArrowBox = styled.div`
  margin: 21pt auto 24pt auto;
  width: 24pt;
  height: 24pt;
`;

const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  padding-bottom: 66pt;

  @media (min-width: 900pt) {
    border-radius: 6pt;
    box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
    padding-bottom: 30pt;
  }
`;
const Box = styled.div`
  width: 100%;
  border-radius: 6pt;
  box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
  padding: 12pt 13.5pt 9pt 13.5pt;
  box-sizing: border-box;

  @media (min-width: 900pt) {
    border-radius: 0;
    box-shadow: none;
    padding: 27pt 13.5pt 9pt;
  }
`;
const FinishedBox = styled.div`
  padding: 12pt 30pt 18pt 30pt;
  width: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 899.25pt) {
    box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  .expectedDate {
    /* display: flex;
    flex-direction: column;
    gap: 29.43pt; */
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-size: 15pt;
      font-weight: 400;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .changeDate {
    padding: 4.5pt 7.5pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 6pt;
    color: #a6a9b0;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
    cursor: pointer;
  }
  /* .backIcon {
    position: relative;
    width: 8.75px;
    height: 17.5px;
  } */
`;
const FinishedFirst = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: center;
  @media (min-width: 900pt) {
    font-size: 15pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const FinishedDate = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${colors.main};
  margin-top: 3pt;
  @media (min-width: 900pt) {
    font-size: 21pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
`;
const FinishedTextBox = styled.div`
  @media (min-width: 900pt) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const FinishedText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  margin-top: 30pt;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const FinishedSecondText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-top: 6pt;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 400;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const FinishedPhotoText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 39pt;
  color: #222222;

  @media (min-width: 900pt) {
    margin-top: 45pt;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const FinishedPhotoBox = styled.div`
  cursor: pointer;
  width: 100%;
  /* height: 91.5pt; */
  border: 0.75pt solid #e2e5ed;
  margin-top: 12pt;
  border-radius: 6pt;
  position: relative;
`;

const Date = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #5221cb;
  margin-top: 3pt;
`;

const SubTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 30pt;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const ListBox = styled.div`
  margin-top: 6pt;
  display: flex;
  flex-direction: column;

  & li {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 400;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
`;

const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;

  @media (min-width: 900pt) {
    padding-left: 13.5pt;
  }
`;

const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const PhotosBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 9pt;
  display: flex;
  gap: 9.1875pt;
  align-items: inherit;

  @media (min-width: 900pt) {
    height: auto;
  }
`;

const AddPhotos = styled.button`
  display: inline-block;
  width: 65.0625pt;
  height: 56.0625pt;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
  cursor: pointer;

  background-color: #ffffff;
  @media (min-width: 900pt) {
    width: 92.1pt;
    height: 83.1pt;
  }
`;
const ImgSpanBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
`;

const ImgSpan = styled.div`
  position: relative;
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
  & span {
    border-radius: 6pt;
  }
  @media (min-width: 900pt) {
    width: 83.1pt;
    height: 83.1pt;
  }
`;

const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
  cursor: pointer;
`;

const Button = styled.div<{
  finalStep?: boolean;
  onValid: boolean;
  // isButtonValid: boolean;
}>`
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  cursor: pointer;
  background-color: ${({ onValid }) =>
    onValid === true ? colors.main : '#b096ef'};
  color: #ffffff;
  text-align: center;
  border-radius: 6pt;
  margin-top: ${({ finalStep }) => (finalStep ? 38.25 : 48.75)}pt;
  box-sizing: border-box;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const ImgTag = styled.img<{ option?: boolean }>`
  cursor: pointer;
  ${({ option }) =>
    option === true &&
    css`
      padding-top: 13.6875pt;
      border: 0.75pt solid red;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    `}
`;

const ImgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-top: 13.6875pt;
`;

const Top2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30pt;
  /* align-items: center; */
  .expectedDate {
    /* display: flex;
    flex-direction: column;
    gap: 29.43pt; */
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-size: 15pt;
      font-weight: 400;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .changeDate {
    padding: 4.5pt 7.5pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 6pt;
    color: #a6a9b0;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
    cursor: pointer;
  }
  /* .backIcon {
    position: relative;
    width: 8.75px;
    height: 17.5px;
  } */
`;

const Top3 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 29.4375pt;
  border-bottom: 0.65pt solid #e9eaee;
  padding-bottom: 25.5pt;
`;

const Line = styled.div`
  @media (min-width: 900pt) {
    border-bottom: 0.75pt solid #e9eaee;
    padding-top: 25.5pt;
  }
`;

export default Reusable;
