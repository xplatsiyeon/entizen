import styled from '@emotion/styled';
import MessageBox from 'componentsCompany/Mypage/MessageBox';
import Image from 'next/image';
import { Data } from 'pages/company/mypage/runningProgress';
import { useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import progressCircle from 'public/images/progressCircle.png';
import progressBlueCircle from 'public/images/progressBlueCircle.png';
import UpArrow from 'public/images/smallUpArrow.png';
import DownArrow from 'public/images/smallDownArrow.png';
import icon_chats from 'public/images/icon_chats.png';
import colors from 'styles/colors';
import ClientProjectModal from './ClientProjectModal';
import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';

type Props = {
  // info: InProgressProjectsDetailResponse;
  info: Data;
  page: string;
};

const ClientProgress = ({ info, page }: Props) => {
  const presentProgress = info.state;

  let textArr;

  switch (info.state) {
    case 0:
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      break;

    case 1:
      textArr = [
        '공사 준비를 진행됩니다.',
        '충전기를 설치, 시운전이 진행됩니다.',
        '충전기 검수가 진행됩니다!',
        '곧 프로젝트가 완료됩니다!',
      ];
      break;

    case 2:
      textArr = [
        '공사 준비가 완료되었습니다!.',
        '충전기를 설치, 시운전이 진행됩니다.',
        '충전기 검수가 진행됩니다!',
        '곧 프로젝트가 완료됩니다!',
      ];
      break;

    case 3:
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기를 설치, 시운전이 완료되었습니다!',
        '충전기 검수가 완료되었습니다!',
        '프로젝트를 완료해주세요',
      ];
      break;

    case 4:
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기를 설치, 시운전이 완료되었습니다!',
        '충전기 검수가 완료되었습니다!',
        '곧 프로젝트가 완료됩니다!',
      ];
      break;

    case 5:
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기를 설치, 시운전이 완료되었습니다!',
        '충전기 검수가 완료되었습니다!',
        '프로젝트 완료에 동의해주세요!',
      ];
      break;

    default:
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
  }

  const [modal, setModal] = useState<boolean>(false);
  const [toggleOpen, setToggleOpen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

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

  return (
    <Wrapper0>
      <DoubleArrowBox>
        <Image src={DoubleArrow} alt="doubleArrow" />
      </DoubleArrowBox>
      <Wrapper>
        {/* 계약 단계 */}
        <FlexBox margin={toggleOpen[0]}>
          <div>
            <CircleImgBox>
              <Image
                src={
                  presentProgress === 0 ? progressBlueCircle : progressCircle
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
            <ContractBtnBox>
              {page === 'client' ? (
                <ClientP presentProgress={presentProgress === 0}>
                  계약서 보기 및 서명
                </ClientP>
              ) : (
                <YetP presentProgress={presentProgress === 0}>
                  계약서 작성중...
                </YetP>
              )}
            </ContractBtnBox>
          )}
        </FlexBox>
        {/* 준비 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox className="topCircle">
              <Image
                src={
                  presentProgress === 1 ? progressBlueCircle : progressCircle
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
              {info.planed[0] ? (
                <PickedDate color={1 >= info.state ? colors.main : '#e2e5ed'}>
                  {info.planed[0]}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[1] && (
            <ToggleWrapper>
              <MessageBox
                presentProgress={presentProgress === 1 && true}
                title={textArr[0]}
                firstText={'충전기 및 부속품 준비'}
                secondText={'설계 및 공사계획 신고 등'}
                page={'client'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 설치 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              <Image
                src={
                  presentProgress === 2 ? progressBlueCircle : progressCircle
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
              {info.planed[1] ? (
                <PickedDate color={2 >= info.state ? colors.main : '#e2e5ed'}>
                  {info.planed[1]}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
              {/* <SetDate id="installDate" onClick={handleDateModal}>
                목표일 입력중 ...
              </SetDate> */}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[2] && (
            <ToggleWrapper>
              <MessageBox
                presentProgress={presentProgress === 2 && true}
                title={textArr[1]}
                firstText={'충전기 설치 및 배선작업'}
                secondText={'충전기 시운전 (자체 테스트)'}
                page={'client'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 검수 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              <Image
                src={
                  presentProgress === 3 ? progressBlueCircle : progressCircle
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
              {info.planed[2] ? (
                <PickedDate color={3 >= info.state ? colors.main : '#e2e5ed'}>
                  {info.planed[2]}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[3] && (
            <ToggleWrapper>
              <MessageBox
                presentProgress={presentProgress === 3 && true}
                title={textArr[2]}
                firstText={'검수 및 전기차 충전 테스트 (고객 참관)'}
                secondText={'한전 계량기 봉인'}
                page={'client'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 완료 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              <Image
                className="bottomCircle"
                src={
                  presentProgress === 4 || presentProgress === 5
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
              {info.planed[3] ? (
                <PickedDate
                  color={
                    4 >= info.state || 5 >= info.state ? colors.main : '#e2e5ed'
                  }
                >
                  {info.planed[3]}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[4] && (
            <ToggleWrapper className="lastBox">
              <MessageBox
                presentProgress={presentProgress >= 4 && true}
                title={textArr[3]}
                firstText={'사용 전 검사 및 점검'}
                secondText={'신고 및 사용 승인'}
                thirdText={'완료현장 사진 기록'}
                page={'client'}
                num={info.state}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        <Line />
      </Wrapper>
      <Button>
        <IconWrap>
          <Image src={icon_chats} layout="fill" />
        </IconWrap>
        <span>파트너와 소통하기</span>
      </Button>
      {info.state === 5 ? (
        <FinButton onClick={() => setModal(true)}>
          <span>프로젝트 완료 동의하기</span>
        </FinButton>
      ) : null}
      {modal && (
        <ClientProjectModal
          setModal={setModal}
          type={'fin'}
          date={info.planed[3]}
        />
      )}
    </Wrapper0>
  );
};

export default ClientProgress;

const Wrapper0 = styled.div`
  .progress {
    margin-top: 4.5pt;
  }
`;

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
  margin-bottom: ${({ margin }) => (margin ? 24 : 30)}pt;
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
    font-family: 'Spoqa Han Sans Neo';
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
`;

const InsideFlex = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const SetDate = styled.div`
  padding: 4.5pt 7.5pt;
  border: 1px solid #e2e5ed;

  border-radius: 6pt;
  color: #a6a9b0;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt !important;
  font-weight: 500;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  text-align: left;
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
  border: 1px solid ${(props) => props.color};
  border-radius: 6pt;
`;

const ContractBtnBox = styled.div`
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
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    color: #a6a9b0;
  }
`;

const ClientP = styled.p<{ presentProgress: boolean }>`
  box-shadow: ${({ presentProgress }) =>
    !presentProgress && `0px 0px 10px rgba(137, 163, 201, 0.2)`};
  border: ${({ presentProgress }) => presentProgress && '1px solid #5221CB'};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
  width: 100%;
  padding: 15pt 13.5pt;
`;

const YetP = styled.p<{ presentProgress: boolean }>`
  box-shadow: ${({ presentProgress }) =>
    !presentProgress && `0px 0px 10px rgba(137, 163, 201, 0.2)`};
  border: ${({ presentProgress }) => presentProgress && '1px solid #5221CB'};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
  width: 100%;
  padding: 15pt 13.5pt;
`;

const ToggleWrapper = styled.div<{ presentProgress?: boolean }>`
  padding-left: 27pt;
  padding-top: 12pt;
  z-index: 10;
`;

const Line = styled.div`
  position: absolute;
  height: 200pt;
  top: 5pt;
  left: 22.5pt;
  width: 0.25pt;
  border: 0.75pt solid silver;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60pt auto 100pt;
  padding: 10.5pt 13.5pt;
  border-radius: 21.75pt;
  > span {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #222222;
    margin: 0 4.5pt;
  }
`;

const IconWrap = styled.div`
  width: 15pt;
  height: 15pt;
  position: relative;
`;
const FinButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 66pt;
  background: #5221cb;
  color: white;
  z-index: 10;
  > span {
    position: absolute;
    left: 50%;
    top: 15pt;
    transform: translateX(-50%);
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
  }
`;
