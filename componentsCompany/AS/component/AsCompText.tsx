import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import Image from 'next/image';
import { Button } from '@mui/material';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import camera from 'public/images/gray_camera.png';
import { BusinessRegistrationType } from 'components/SignUp';
import CloseImg from 'public/images/XCircle.svg';

type Props = {
  request?: boolean;
  requestConfirm?: boolean;
  confirmWait?: boolean;
};

const AsCompText = ({ request, requestConfirm, confirmWait }: Props) => {
  //dummy text

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>();

  // 필수 확인 채우면 버튼 활성화
  const [isValid, setIsValid] = useState(false);

  // 파일 다운로드 함수
  const DownloadFile = useCallback(() => {
    let fileName = 'Charge Point 카탈로그_7 KW';
    let content = 'Charge Point 카탈로그_7 KW 테스트';
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  // 이미지
  const [imgArr, setImgArr] = useState<BusinessRegistrationType[]>([]);

  // 사진 온클릭
  // const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   imgRef?.current?.click();
  // };

  // 사진 저장
  // const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { files } = e.target;
  //   //console.log('files', files, files![0])
  //   const maxLength = 3;
  //   // max길이 보다 짧으면 멈춤
  //   const formData = new FormData();
  //   for (let i = 0; i < maxLength; i += 1) {
  //     if (files![i] === undefined) {
  //       break;
  //     }
  //     formData.append(
  //       'chargerProduct',
  //       files![i],
  //       encodeURIComponent(files![i].name),
  //     );
  //   }
  //   multerImage(formData);

  /* 파일 올린 후 혹은 삭제 후, 똑같은 파일 올릴 수 있도록*/
  //   e.target.value = '';
  // };

  // 사진 삭제
  // const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const name = Number(e.currentTarget.dataset.name);
  //   const copyArr = [...imgArr];
  //   for (let i = 0; i < copyArr.length; i++) {
  //     if (i === name) {
  //       copyArr.splice(i, 1);
  //       return setImgArr(copyArr);
  //     }
  //   }
  // };

  return (
    <>
      <Wrapper>
        <DownArrowBox>
          <Image src={DoubleArrow} alt="double-arrow" />
        </DownArrowBox>
        <Contents>
          <Customer>고객 정보</Customer>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">윤세아</span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <span className="text phone">010-3392-0580</span>
          </div>
        </Contents>
        <ReceiptTitle>접수내용</ReceiptTitle>
        <SecondList>
          <Items>
            <span className="name">제목</span>
            <span className="value">
              100kW 충전기의 충전 건이 파손되었습니다.
            </span>
          </Items>
          <Items>
            <span className="name">요청내용</span>
            <span className="value">
              사용자의 실수로 충전 건이 파손되었습니다. 수리 또는 교체 해주세요.
            </span>
          </Items>
          <Items>
            <span className="name">접수일자</span>
            <span className="value">2022.05.17 18:13 </span>
          </Items>
          <Items>
            <div className="name">첨부파일</div>
            <div className="value">
              <FileBox>
                <FileBtn onClick={DownloadFile}>
                  <Image src={fileImg} alt="file-icon" />
                  충전건 1.jpg
                </FileBtn>
                <FileBtn onClick={DownloadFile}>
                  <Image src={fileImg} alt="file-icon" />
                  충전건 2.jpg
                </FileBtn>
              </FileBox>
            </div>
          </Items>
        </SecondList>
        {/* 1. 접수 요청 뱃지가 달려 있을 때 */}
        {request === true && (
          <InputBox className="lastInputBox">
            <div className="withTextNumber">
              <span>접수확인</span>
              {/* <span>{.length}/500</span> */}
              <span>0/500</span>
            </div>
            <div className="monthFlex">
              <TextArea
                // onChange={(e) => (e.target.value)}
                // value={}
                name="firstPageTextArea"
                placeholder="추정 원인 및 대응 계획에 대해 입력 후 &#13;&#10;접수 확인을 클릭해주세요!"
                rows={5}
              />
            </div>
          </InputBox>
        )}
        {/* 2. 접수 확인 뱃지가 달려 있을 때 */}
        {requestConfirm === true && (
          <>
            <ReceiptTitle>접수확인</ReceiptTitle>
            <SecondList>
              <Items>
                <span className="name">내용</span>
                <span className="value">
                  파손 정도 파악 및 수리/교체를 위해 금주 중 방문하도록
                  하겠습니다.
                </span>
              </Items>
              <Items>
                <span className="name">답변일자</span>
                <span className="value">2022.05.18 20:21 </span>
              </Items>
            </SecondList>
            <InputBox className="lastInputBox">
              <div className="withTextNumber">
                <span>A/S결과</span>
                {/* <span>{.length}/500</span> */}
                <span>0/500</span>
              </div>
              <div className="monthFlex">
                <TextArea
                  // onChange={(e) => (e.target.value)}
                  // value={}
                  name="firstPageTextArea"
                  placeholder="A/S 결과를 입력해주세요"
                  rows={5}
                />
              </div>
            </InputBox>
            {/* 사진 첨부 부분 */}
            <RemainderInputBox>
              <Label>사진첨부</Label>
              <PhotosBox>
                <AddPhotos>
                  <Image src={camera} alt="" />
                </AddPhotos>
                <input
                  style={{ display: 'none' }}
                  // ref={imgRef}
                  type="file"
                  accept="image/*"
                  // onChange={saveFileImage}
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
                    {/* <Xbox onClick={handlePhotoDelete} data-name={index}> */}
                    <Xbox data-name={index}>
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
          </>
        )}
        {/* 3. 완료대기 뱃지가 달려 있을 때 */}
        {confirmWait === true && (
          <>
            <ReceiptTitle>A/S결과</ReceiptTitle>
            <SecondList>
              <Items>
                <span className="name">내용</span>
                <span className="value">충전 건 교체</span>
              </Items>
              <Items>
                <span className="name">A/S일자</span>
                <span className="value">2022/05.20 14:52</span>
              </Items>
              <Items>
                <div className="name">첨부파일</div>
                <div className="value">
                  <FileBox>
                    <FileBtn onClick={DownloadFile}>
                      <Image src={fileImg} alt="file-icon" />
                      DSFJEIFKSL.jpg
                    </FileBtn>
                  </FileBox>
                </div>
              </Items>
            </SecondList>
          </>
        )}
        {/* 나중에 data 연결된다면 onClick으로 백엔드에 text 적은거 보내 줘야해요! */}
        {/* <Btn buttonActivate={isValid}  onClick={buttonOnClick}> </Btn>*/}
        {request === true && <WebBtn buttonActivate={isValid}>접수확인</WebBtn>}
        {requestConfirm === true && (
          <WebBtn buttonActivate={isValid}>A/S 완료하기</WebBtn>
        )}
        {router.pathname !== `/company/as/history` && (
          <CommunityButton
            onClick={() => alert('소통하기로')}
            confirmWait={confirmWait}
          >
            <div>
              <Image src={CommunicationIcon} alt="right-arrow" />
            </div>
            고객과 소통하기
            <div>
              <Image src={RightArrow} alt="right-arrow" />
            </div>
          </CommunityButton>
        )}

        {/* 나중에 data 연결된다면 onClick으로 백엔드에 text 적은거 보내 줘야해요! */}
        {/* <Btn buttonActivate={isValid}  onClick={buttonOnClick}> </Btn>*/}
        {request === true && <Btn buttonActivate={isValid}>접수확인</Btn>}
        {requestConfirm === true && (
          <Btn buttonActivate={isValid}>A/S 완료하기</Btn>
        )}
      </Wrapper>
    </>
  );
};

export default AsCompText;

const Wrapper = styled.div`
  padding-top: 21pt;
  /* padding-left: 15pt;
  padding-right: 15pt; */
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }

  .phone {
    text-decoration: underline;
    color: ${colors.main};
  }
`;

const Customer = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;

const ReceiptTitle = styled.h1`
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  margin-top: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const SecondList = styled.ul`
  margin-top: 12pt;
  padding-bottom: 18pt;
  gap: 12pt;
  border-bottom: 1px solid #e9eaee; ;
`;

const Items = styled.li`
  display: flex;
  gap: 26.5pt;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    width: 20%;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .value {
    width: 80%;
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
    position: relative;
  }
`;

const FileBox = styled.div``;

const FileBtn = styled(Button)`
  display: flex;
  gap: 3pt;
  /* margin-top: 15pt; */
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 8px;
  margin-bottom: 7.5pt;
`;

const InputBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;
  position: relative;
  margin-top: 30pt;
  & > div {
  }
  & > div:first-of-type {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & > .withAfter::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
  & > .withTextNumber {
    position: relative;
    & span:nth-of-type(2) {
      position: absolute;
      right: 0;
      font-family: Spoqa Han Sans Neo;
      font-size: 9pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  & > .withAfter {
    position: relative;
    & span:nth-of-type(2) {
      position: absolute;
      right: 0;
      font-family: Spoqa Han Sans Neo;
      font-size: 9pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  & div:nth-of-type(2) {
    display: flex;
  }
  .monthFlex {
    display: flex;
    gap: 12pt;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid ${colors.gray};
  width: 100%;
  padding: 12pt;
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

const Btn = styled.div<{ buttonActivate: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  /* border-radius: 6pt; */
  cursor: pointer;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? `#E2E5ED` : `#5221CB`};
  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
  @media (min-width: 900pt) {
    display: none;
  }
`;

const WebBtn = styled.div<{ buttonActivate: boolean }>`
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  border-radius: 6pt;
  cursor: pointer;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? `#E2E5ED` : `#5221CB`};
  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
  @media (max-width: 899pt) {
    display: none;
  }
`;

const CommunityButton = styled.button<{
  confirmWait: boolean | undefined;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 60pt auto 48.75pt; */
  margin: ${({ confirmWait }) =>
    confirmWait === true ? `60pt auto 48.75pt` : `60pt auto 100pt`};
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: #222222;
  @media (min-width: 900pt) {
    margin: 60pt auto 0;
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
  background-color: #ffffff;
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
