import styled from '@emotion/styled';
import ChangeDateModal from 'componentsCompany/Modal/ChangeDateModal';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import CloseImg from 'public/images/XCircle.svg';
import camera from 'public/images/gray_camera.png';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import colors from 'styles/colors';
import { BusinessRegistrationType } from 'components/SignUp';
import { useMutation } from 'react-query';
import { multerApi } from 'api';
import { AxiosError } from 'axios';
import TwoBtnModal from 'components/Modal/TwoBtnModal';

type Props = {
  textOne?: boolean;
  textTwo: string;
  textThree: string;
  textFour: string;
  textFive?: string;
  beforeFinish?: boolean;
  afterFinish?: boolean;
  btnText: string;
  almostFinish?: boolean;
  setProgressNum?: Dispatch<SetStateAction<number>>;
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
  textOne,
  textTwo,
  textThree,
  textFour,
  textFive,
  beforeFinish,
  afterFinish,
  almostFinish,
  btnText,
  setProgressNum,
}: Props) => {
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
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(res);
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
    imgRef?.current?.click();
  };

  const handleModalRightBtn = () => {
    if (setProgressNum) {
      setProgressNum(-1);
    }
  };
  return (
    <>
      {twoBtnModalOpen && (
        <TwoBtnModal
          exit={() => setTwoBtnModalOpen(!twoBtnModalOpen)}
          text={'설치를 완료하시겠습니까?'}
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
        />
      )}
      {/* 프로젝트 완료하기 클릭시 보이는 곳 */}
      {almostFinish ? (
        <>
          <DoubleArrowBox>
            <Image src={DoubleArrow} alt="doubleArrow" />
          </DoubleArrowBox>
          <Wrapper>
            <FinishedBox>
              <FinishedFirst>완료 요청일</FinishedFirst>
              <FinishedDate>2022년 5월 13일</FinishedDate>
              <FinishedText>프로젝트 완료 진행중입니다.</FinishedText>
              <FinishedSecondText>
                구매자 동의 후 프로젝트가
                <br />
                최종 완료됩니다!
              </FinishedSecondText>
              <FinishedPhotoText>완료현장 사진</FinishedPhotoText>
              <FinishedPhotoBox></FinishedPhotoBox>
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
              <Top>
                <div className="expectedDate">
                  {textOne ? '완료일' : '완료 예정일'}
                </div>
                <div className="changeDate" onClick={() => setModalOpen(true)}>
                  일정 변경 요청
                </div>
              </Top>
              <Date>2022년 4월 26일</Date>
              <SubTitle>{textTwo}</SubTitle>
              <ListBox>
                <li>{textThree}</li>
                <li>{textFour}</li>
                {textFive && <li>{textFive}</li>}
              </ListBox>
            </Box>
            {/* 완료에서 사진첨부하는곳 보이도록  */}
            {beforeFinish && (
              <RemainderInputBox>
                <Label>사진첨부</Label>
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
                  />
                  {/* <Preview> */}
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
                  {/* </Preview> */}
                </PhotosBox>
              </RemainderInputBox>
            )}
            <Button
              onClick={() => setTwoBtnModalOpen(!twoBtnModalOpen)}
              beforeFinish={beforeFinish}
            >
              {btnText}
            </Button>
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
`;
const Box = styled.div`
  width: 100%;
  border-radius: 6pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  padding: 12pt 13.5pt 9pt 13.5pt;
  box-sizing: border-box;
`;
const FinishedBox = styled.div`
  padding: 12pt 30pt 18pt 30pt;
  width: 100%;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  .expectedDate {
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  .changeDate {
    padding: 4.5pt 7.5pt;
    border: 1px solid #e2e5ed;
    border-radius: 6pt;
    color: #a6a9b0;
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const FinishedFirst = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: center;
`;
const FinishedDate = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${colors.main};
  margin-top: 3pt;
`;
const FinishedText = styled.div`
  font-family: Spoqa Han Sans Neo;
  margin-top: 30pt;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const FinishedSecondText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-top: 6pt;
`;
const FinishedPhotoText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 39pt;
`;
const FinishedPhotoBox = styled.div`
  width: 100%;
  height: 91.5pt;
  border: 1px solid #e2e5ed;
  margin-top: 12pt;
  border-radius: 6pt;
  position: relative;
`;

const Date = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #5221cb;
  margin-top: 3pt;
`;

const SubTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 30pt;
`;

const ListBox = styled.div`
  margin-top: 6pt;
  display: flex;
  flex-direction: column;

  & li {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;
`;

const Label = styled.label`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
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

const Button = styled.div<{ beforeFinish?: boolean }>`
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${colors.main};
  color: #ffffff;
  text-align: center;
  border-radius: 6pt;
  margin-top: ${({ beforeFinish }) => (beforeFinish ? 38.25 : 48.75)}pt;
  box-sizing: border-box;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

export default Reusable;
