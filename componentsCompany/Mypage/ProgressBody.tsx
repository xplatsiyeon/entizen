import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import progressCircle from 'public/images/progressCircle.png';
import progressBlueCircle from 'public/images/progressBlueCircle.png';
import UpArrow from 'public/images/smallUpArrow.png';
import DownArrow from 'public/images/smallDownArrow.png';
import MessageBox from './MessageBox';
import colors from 'styles/colors';
import {
  Contract,
  GET_contract,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import { changeDataFn } from 'utils/calculatePackage';
import askDate from 'public/images/askDate.png';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import {
  useMutation,
  useQuery as reactQuery,
  useQueryClient,
} from 'react-query';
import { getDocument } from 'api/getDocument';
import {
  fileDownload,
  openExternalBrowser,
  requestPermissionCheck,
} from 'bridge/appToWeb';
import { isTokenPutApi, multerApi } from 'api';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import Modal from 'components/Modal/Modal';
import FileSelectModal from 'components/Modal/FileSelectModal';

export interface fileDownLoad {
  originalName: string;
  size: number;
  type: string;
  url: string;
}

type Props = {
  dateArr: boolean[];
  setDateArr: Dispatch<SetStateAction<boolean[]>>;
  toggleOpen: boolean[];
  setToggleOpen: Dispatch<SetStateAction<boolean[]>>;
  presentProgress: number;
  setProgressNum: Dispatch<SetStateAction<number>>;
  planed: string[];
  progressNum?: number;
  data: InProgressProjectsDetailResponse;
  badge: string;

  inProgressRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
};

export type ImageType = 'IMAGE' | 'FILE';

const ProgressBody = ({
  inProgressRefetch,
  dateArr,
  setDateArr,
  toggleOpen,
  setToggleOpen,
  setProgressNum,
  data,
  badge,
}: Props) => {
  const router = useRouter();
  const routerId = router.query.projectIdx!;

  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const contractContent = JSON.parse(data?.project?.contract?.contractContent!);
  // -----진행중인 프로젝트 상세 리스트 api-----
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // 자체 계약서 파일 모달
  const [openSelfContract, setOpenSelfContract] = useState(false);
  const [tpye, setType] = useState<ImageType>();

  const {
    loading: contractLoading,
    error: contractError,
    data: contractData,
  } = useQuery<Contract>(GET_contract, {
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });
  // 자체 계약서 업데이트
  const { mutate: selfMutate, isLoading: isLoading } = useMutation(
    isTokenPutApi,
    {
      onSuccess: () => {
        setOpenSelfContract(false);
        setIsModal(true);
        setModalMessage('자체 계약서를 전송하였습니다.');
      },
      onError: () => {
        setOpenSelfContract(false);
        setIsModal(true);
        setModalMessage('계약서 전송을 실패했습니다. 다시 시도해주세요.');
      },
    },
  );
  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: async (res) => {
      const newArr: any = [];
      await res?.uploadedFiles.forEach((img) => {
        newArr.push({
          type: tpye,
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });

      selfMutate({
        url: `/contracts/self/${data?.project?.contract?.contractIdx}`,
        data: {
          selfContracts: newArr,
          projectIdx: routerId,
        },
      });
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setModalMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setModalMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setModalMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });

  const onClickModal = () => {
    if (modalMessage === '자체 계약서를 전송하였습니다.') {
      inProgressRefetch();
      setIsModal(false);
    } else {
      setIsModal(false);
      // router.push('/company/mypage?id=0');
    }
  };

  // 사진 || 파일 저장
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
        'chatting',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    // setType(() => type);
    multerImage(formData);

    /* 파일 올린 후 혹은 삭제 후, 똑같은 파일 올릴 수 있도록,*/
    e.target.value = '';
  };

  // 사진 온클릭
  const imgHandler = () => {
    setType('IMAGE');
    if (!userAgent) {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  //파일 온클릭
  const handleFileClick = () => {
    setType('FILE');
    if (!userAgent) {
      fileRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'file');
    }
  };
  //  펼쳐지는거 관리
  const handleToggleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let copyArr = [...toggleOpen];
    if (e.currentTarget.id === 'contract') {
      copyArr[0] = !copyArr[0];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'prepare') {
      copyArr[1] = !copyArr[1];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'install') {
      copyArr[2] = !copyArr[2];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'inspection') {
      copyArr[3] = !copyArr[3];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'success') {
      copyArr[4] = !copyArr[4];
      setToggleOpen(copyArr);
    }
  };

  // 목표일 설정 모달창 관리
  const handleDateModal = (e: React.MouseEvent<HTMLDivElement>) => {
    let copyArr = [...dateArr];
    if (e.currentTarget.id === 'prepareDate') {
      copyArr[0] = !copyArr[0];
      setDateArr(copyArr);
    } else if (e.currentTarget.id === 'installDate') {
      copyArr[1] = !copyArr[1];
      setDateArr(copyArr);
    } else if (e.currentTarget.id === 'inspectionDate') {
      copyArr[2] = !copyArr[2];
      setDateArr(copyArr);
    } else if (e.currentTarget.id === 'successDate') {
      copyArr[3] = !copyArr[3];
      setDateArr(copyArr);
    }
  };
  interface documentResponse {
    embeddedUrl: string;
  }

  const {
    data: contractDocumentData,
    isLoading: contractDocumentLoading,
    isError: contractDocumentError,
  } = reactQuery<documentResponse>(
    'contract',
    () => getDocument(contractData?.project?.contract?.documentId!),
    {
      enabled: contractData?.project?.contract?.documentId ? true : false,
    },
  );

  // 자체계약서 다운로드
  const onClickBtn = (data: fileDownLoad) => {
    const a = document.createElement('a');
    a.download = data?.originalName;
    a.href = data?.url;
    a.onclick = () => fileDownload(userAgent, data?.originalName, data?.url);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };

  // 계약서 보기
  const selfContractView = () => {
    const contractUrl = JSON.parse(
      contractData?.project?.contract?.contractContent!,
    )[0];
    onClickBtn(contractUrl);
  };

  // 계약서 보기 버튼 클릭
  const onClickContract = () => {
    // 브릿지
    openExternalBrowser(userAgent, contractDocumentData?.embeddedUrl!);
  };

  let textArr;
  let initToggle;

  switch (badge) {
    case '계약대기':
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      initToggle = [false, false, false, false, false];
      break;
    case '준비 중':
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      initToggle = [false, true, false, false, false];
      break;
    case '설치 중':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      initToggle = [false, false, true, false, false];
      break;
    case '검수 중':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전이 완료되었습니다',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      initToggle = [false, false, false, true, false];
      break;
    case '완료 중':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전이 완료되었습니다',
        '충전기 검수가 완료되었습니다',
        '프로젝트를 완료해주세요',
      ];
      initToggle = [false, false, false, false, true];
      break;
    case '완료 대기':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전이 완료되었습니다',
        '충전기 검수가 완료되었습니다',
        '프로젝트 완료 진행중입니다',
      ];
      initToggle = [false, false, false, false, true];
      break;
    // 취소
    default:
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      initToggle = [false, false, false, false, false];
  }

  return (
    <>
      {isModal && <Modal click={onClickModal} text={modalMessage} />}
      {openSelfContract && (
        <FileSelectModal
          fileText="앨범에서 가져오기"
          photoText="파일에서 가져오기"
          cencleBtn={() => setOpenSelfContract(false)}
          onClickFile={handleFileClick}
          onClickPhoto={imgHandler}
        />
      )}
      <DoubleArrowBox>
        <Image src={DoubleArrow} alt="doubleArrow" />
      </DoubleArrowBox>
      <Wrapper>
        {/* 이미지 input */}
        <input
          style={{ display: 'none' }}
          ref={imgRef}
          className="imageClick"
          type="file"
          accept="image/*"
          onChange={saveFileImage}
          multiple
          capture={userAgent === 'Android_App' && true}
        />
        {/* 파일 input */}
        <input
          style={{ display: 'none' }}
          ref={fileRef}
          className="imageClick"
          type="file"
          accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
          onChange={saveFileImage}
          multiple
        />
        {/* 계약 */}
        <FlexBox margin={toggleOpen[0]}>
          <div>
            <CircleImgBox>
              <Image
                src={
                  data?.project?.badge === '계약대기'
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="contract" onClick={handleToggleClick}>
                <div>계약</div>
                <div>
                  <Image
                    src={!toggleOpen[0] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[0] && (
            <>
              {/* 모두싸인 계약서 */}
              {!Array.isArray(contractContent) ? (
                <ContractBtnBox
                  onClick={onClickContract}
                  presentProgress={
                    data?.project?.badge === '계약대기' ? true : false
                  }
                >
                  <div>계약서 보기</div>
                </ContractBtnBox>
              ) : (
                <>
                  {/* 자체 계약서 */}
                  <SeftContract
                    presentProgress={
                      data?.project?.badge === '계약대기' ? true : false
                    }
                  >
                    <span onClick={selfContractView}>계약서 보기</span>
                    <span onClick={() => setOpenSelfContract((prev) => !prev)}>
                      계약서 수정
                    </span>
                  </SeftContract>
                </>
              )}
            </>
          )}
        </FlexBox>
        {/* 준비 */}
        <FlexBox>
          <div>
            <CircleImgBox className="topCircle">
              {/* 동그라미 컬러 */}
              <Image
                src={
                  data?.project?.badge === '준비 중'
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="prepare" onClick={handleToggleClick}>
                <div>준비</div>
                <div>
                  <Image
                    src={!toggleOpen[1] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.readyStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedReadyStep === true
                      ? '#e2e5ed'
                      : colors.main
                  }
                >
                  {/* 목표 요일  */}
                  {data?.project?.readyStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(
                        data?.project?.readyStepCompletionDate
                          ? data?.project?.readyStepCompletionDate
                          : data?.project?.readyStepGoalDate,
                      )}
                </PickedDate>
              ) : badge === '계약대기' ? (
                <></>
              ) : (
                <SetDate id="prepareDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[1] && (
            <ToggleWrapper>
              <MessageBox
                handleClick={() => setProgressNum(1)}
                presentProgress={
                  data?.project?.badge === '준비 중' ? true : false
                }
                title={textArr[0]}
                firstText={'충전기 및 부속품 준비'}
                secondText={'설계 및 공사계획 신고 등'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 설치 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              {/* 동그라미 */}
              <Image
                src={
                  data?.project?.badge === '설치 중'
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="install" onClick={handleToggleClick}>
                <div>설치</div>
                <div>
                  <Image
                    src={!toggleOpen[2] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.installationStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedInstallationStep === true
                      ? '#e2e5ed'
                      : colors.main
                  }
                >
                  {data?.project?.installationStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(
                        data?.project?.installationStepCompletionDate
                          ? data?.project?.installationStepCompletionDate
                          : data?.project?.installationStepGoalDate,
                      )}
                </PickedDate>
              ) : badge === '계약대기' ? (
                <></>
              ) : (
                <SetDate id="installDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[2] && (
            <ToggleWrapper>
              <MessageBox
                handleClick={() => setProgressNum(2)}
                presentProgress={
                  data?.project?.badge === '설치 중' ? true : false
                }
                title={textArr[1]}
                firstText={'충전기 설치 및 배선작업'}
                secondText={'충전기 시운전 (자체 테스트)'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 검수 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              {/* 동그라미 컬러 */}
              <Image
                src={
                  data?.project?.badge === '검수 중'
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="inspection" onClick={handleToggleClick}>
                <div>검수</div>
                <div>
                  <Image
                    src={!toggleOpen[3] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.examStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedExamStep === true
                      ? '#e2e5ed'
                      : colors.main
                  }
                >
                  {data?.project?.examStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(
                        data?.project?.examStepCompletionDate
                          ? data?.project?.examStepCompletionDate
                          : data?.project?.examStepGoalDate,
                      )}
                </PickedDate>
              ) : badge === '계약대기' ? (
                <></>
              ) : (
                <SetDate id="inspectionDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[3] && (
            <ToggleWrapper>
              <MessageBox
                handleClick={() => setProgressNum(3)}
                presentProgress={
                  data?.project?.badge === '검수 중' ? true : false
                }
                title={textArr[2]}
                firstText={'검수 및 전기차 충전 테스트 (고객 참관)'}
                secondText={'한전 계량기 봉인'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 완료 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              {/* 동그라미 컬러 */}
              <Image
                className="bottomCircle"
                src={
                  data?.project?.badge === '완료 중' ||
                  data?.project?.badge === '완료 대기'
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="success" onClick={handleToggleClick}>
                <div>완료</div>
                <div>
                  <Image
                    src={!toggleOpen[4] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.completionStepGoalDate ? (
                <PickedDate color={colors.main}>
                  {data?.project?.completionStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(
                        data?.project?.completionStepCompletionDate
                          ? data?.project?.completionStepGoalDate
                          : data?.project?.completionStepGoalDate,
                      )}
                </PickedDate>
              ) : badge === '계약대기' ? (
                <></>
              ) : (
                <SetDate id="successDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[4] && (
            <ToggleWrapper className="lastBox">
              <MessageBox
                handleClick={() => setProgressNum(4)}
                presentProgress={
                  data?.project?.badge === '완료 중' ||
                  data?.project?.badge === '완료 대기'
                    ? true
                    : false
                }
                title={textArr[3]}
                firstText={'사용 전 검사 및 점검'}
                secondText={'신고 및 사용 승인'}
                thirdText={'완료현장 사진 기록'}
                file={data?.project?.projectCompletionFiles}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        <Line lineHeight={toggleOpen[4]}></Line>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const DoubleArrowBox = styled.div`
  margin: 21pt auto 24pt auto;
  width: 24pt;
  height: 24pt;
`;

const CircleImgBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
  z-index: 10;
`;

const FlexBox = styled.div<{ margin?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: ${({ margin }) => (margin ? 24 : 22.5)}pt;
  & > div {
    display: flex;
    align-items: center;
    gap: 7.75pt;
  }
`;

const ProgressName = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3pt;
  & :first-of-type {
    position: relative;
    font-family: Spoqa Han Sans Neo;
    top: 1.3pt;
    font-size: 15pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
  }
  & :nth-of-type(2) {
    width: 12pt !important;
    height: 12pt !important;
    position: relative;
  }
  cursor: pointer;
`;

const InsideFlex = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const ImageWrap = styled.div`
  width: 93pt;
  height: 22.5pt;
  position: absolute;
  top: -100%;
  right: 0;
  transform: translateY(-3.5pt);
`;

const SetDate = styled.div`
  padding: 4.5pt 7.5pt;
  border: 1px solid #e2e5ed;
  position: relative;
  border-radius: 6pt;
  color: #a6a9b0;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt !important;
  font-weight: 500;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  text-align: left;
  cursor: pointer;
`;

const PickedDate = styled.div`
  padding: 4.5pt 7.5pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${(props) => {
    return props.color;
  }};
  border: 0.75pt solid ${(props) => props.color};
  border-radius: 6pt;
`;

const ContractBtnBox = styled.div<{ presentProgress: boolean }>`
  display: flex;
  gap: 11.625pt;
  padding-top: 12pt;
  padding-left: 27pt;
  & div {
    display: flex;
    justify-content: center;
    padding-top: 15pt;
    padding-bottom: 15pt;
    width: 100%;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    color: #a6a9b0;
    cursor: pointer;
    ${({ presentProgress }) =>
      presentProgress === true &&
      css`
        border: 0.75pt solid ${colors.main};
      `}
  }
`;

const SeftContract = styled.div<{ presentProgress: boolean }>`
  display: flex;
  gap: 11.625pt;
  padding-top: 12pt;
  padding-left: 27pt;
  & span {
    display: flex;
    justify-content: center;
    padding-top: 15pt;
    padding-bottom: 15pt;
    width: 100%;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    color: #a6a9b0;
    cursor: pointer;
    text-decoration: none !important;
    ${({ presentProgress }) =>
      presentProgress === true &&
      css`
        border: 0.75pt solid ${colors.main};
      `}
  }
  & a:hover {
    text-decoration: none !important;
  }
`;

const ToggleWrapper = styled.div<{ presentProgress?: boolean }>`
  padding-left: 27pt;
  padding-top: 12pt;
  position: relative;
  z-index: 100;
`;

const Line = styled.div<{ lineHeight: boolean }>`
  position: absolute;
  height: ${({ lineHeight }) =>
    lineHeight ? `calc(100% - 112pt)` : `calc(100% - 15pt)`};
  top: 5pt;
  left: 22.5pt;
  width: 0.25pt;
  border: 0.75pt solid silver;
  @media (min-width: 900pt) {
    height: ${({ lineHeight }) =>
      lineHeight ? `calc(100% - 165pt)` : `calc(100% - 15pt)`};
  }
`;

export default ProgressBody;
