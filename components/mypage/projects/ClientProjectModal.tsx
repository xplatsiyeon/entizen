import styled from '@emotion/styled';
import Image from 'next/image';
import {
  InProgressProjectsDetailResponse,
  UnConsentProjectDateChangeHistories,
} from 'QueryComponents/CompanyQuery';
import React, {
  BaseSyntheticEvent,
  HtmlHTMLAttributes,
  MouseEvent,
  useRef,
} from 'react';
import colors from 'styles/colors';
import changeArrow from 'public/images/date-change-arrow.png';
import { getDayOfWeek } from 'utils/calculatePackage';
import CommunicationBox from 'components/CommunicationBox';

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'finish' | 'change';
  changeData?: UnConsentProjectDateChangeHistories;
  onClickChangeData: () => void;
  onClickCompleteData: () => void;
  data: InProgressProjectsDetailResponse;
  modalStep: string;
};

const ClientProjectModal = ({
  setIsModal,
  type,
  changeData,
  onClickChangeData,
  onClickCompleteData,
  data,
  modalStep,
}: Props) => {
  const backRef = useRef<HTMLDivElement>(null);

  console.log('--------------------------');
  console.log(data);
  const onClickBack = (event: any) => {
    if (event.target.id === 'background') {
      setIsModal(false);
    }
  };

  return (
    <Wrap onClick={onClickBack} id="background" ref={backRef}>
      <Body>
        <P>{type === 'finish' ? '내 프로젝트' : '일정 변경 요청'}</P>
        {type === 'finish' ? (
          // 완료하기
          <FinBox>
            <PBox1>
              <p className="date1">완료 요청일</p>
              <p className="date2">
                {data?.project?.completionStepCompletionDate?.replaceAll(
                  '-',
                  '.',
                )}
              </p>
            </PBox1>
            <PBox1>
              <p className="notice1">동의하기 전 주의사항!</p>
              <p className="notice2">
                문제가 있을 경우 소통하기를 통해 문의해주시고,
                <br /> 추가 작업 후 동의하시기 바랍니다
              </p>
            </PBox1>
          </FinBox>
        ) : (
          // 날짜 변경
          <DateBox>
            <PBox2 className="firstChild">
              <p className="label">완료 예정일</p>
              <p className="date">
                {changeData?.dateAfterChange.replaceAll('-', '.')}
              </p>
            </PBox2>
            <PBox2>
              <p className="label">변경 사유</p>
              <p className="date">{changeData?.changedReason}</p>
            </PBox2>
            <P2DateBox>
              <div className="dateBox">
                <p className="beforeDate">
                  {changeData?.dateBeforeChange?.replaceAll('-', '.')}
                </p>
                <p className="beforeDay">
                  {getDayOfWeek(changeData?.dateBeforeChange!)}요일
                </p>
              </div>
              <span className="imgBox">
                <Image
                  src={changeArrow}
                  alt="change-arrow-icon"
                  layout="fill"
                />
              </span>
              <div className="dateBox">
                <p className="afterDate">
                  {changeData?.dateAfterChange?.replaceAll('-', '.')}
                </p>
                <p className="afterDay">
                  {getDayOfWeek(changeData?.dateAfterChange!)}요일
                </p>
              </div>
            </P2DateBox>
          </DateBox>
        )}
        <ButtonBox>
          <CommunicationBox
            text="소통하기"
            id={data?.project.companyMember.memberIdx}
            hide={true}
          />
          <button
            onClick={
              type === 'change' ? onClickChangeData : onClickCompleteData
            }
          >
            <span>동의하기</span>
          </button>
        </ButtonBox>
      </Body>
    </Wrap>
  );
};

export default ClientProjectModal;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: #1212121c;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Body = styled.div`
  width: 100%;
  height: 300pt;
  background: white;
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 20pt 20pt 0pt 0;
  position: absolute;
  bottom: 0;
  z-index: 2;
  @media (min-width: 900pt) {
    position: absolute;
    top: 30%;
    right: 25%;
    margin: 0 auto;
    width: 420pt;
    /* height: 333pt; */
    height: auto;
    /* height: 349pt; */
    border-radius: 12pt;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 2;
    padding: 30pt 37.5pt;
  }
`;

const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 15pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
  text-align: center;
  padding-bottom: 21pt;
  @media (max-width: 899.25pt) {
    margin: 21pt 24pt;
    padding-bottom: 12pt;
  }
`;

const FinBox = styled.div`
  margin: 0 37.5pt;
  border: 1px solid #e9eaee;
  border-radius: 8px;
  text-align: center;

  @media (max-width: 899.25pt) {
    margin: 0 15pt;
  }
`;
const DateBox = styled.div`
  .firstChild {
    padding-bottom: 12pt;
  }
`;
const ButtonBox = styled.div`
  margin: 30pt 37.5pt;
  display: flex;
  justify-content: space-between;
  gap: 9pt;
  @media (min-width: 900pt) {
    margin: 45pt 37.5pt 0;
  }
  button {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    cursor: pointer;

    &:nth-of-type(1) {
      padding: 15pt 0;
      background: #e2e5ed;
      border-radius: 6pt;
      flex: 1;
      color: #595757;
      @media (min-width: 900pt) {
        margin-top: 0;
      }
    }
    &:nth-of-type(2) {
      background: #5221cb;
      border-radius: 6pt;
      flex: 2;
      color: #ffffff;
      height: 46.875pt;
      margin-top: 12pt;
      @media (min-width: 900pt) {
        margin-top: 0;
      }
    }
  }

  @media (max-width: 899.25pt) {
    margin: 30pt 15pt;
  }
`;

const AgreeButton = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  cursor: pointer;
  padding: 15pt 0;
  background: #5221cb;
  border-radius: 6pt;
  flex: 2;
  color: #ffffff;
  @media (min-width: 900pt) {
  }
`;

const PBox1 = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  > .date1 {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    color: #222222;
    margin-top: 12pt;
    text-align: center;
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 400;
      line-height: 12pt;
      letter-spacing: -0.02em;
    }
  }
  > .date2 {
    font-style: normal;
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    color: #5221cb;
    margin-top: 3pt;
    text-align: center;
    @media (min-width: 900pt) {
      font-size: 18pt;
      font-weight: 700;
      line-height: 15pt;
      letter-spacing: -0.02em;
      padding-top: 12pt;
    }
  }

  > .notice1 {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    color: #222222;
    margin: 30pt 0 6pt;
  }
  > .notice2 {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 15pt;
    color: #222222;
    margin-bottom: 15pt;
    @media (min-width: 900pt) {
      padding-top: 6pt;
      font-size: 12pt;
      font-weight: 400;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
`;
const PBox2 = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15pt;
  @media (min-width: 900pt) {
    padding: 0;
  }
  .label {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    font-size: 10.5pt;
    /* line-height: 12pt; */
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    text-align: left;
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
    }
  }
  .date {
    font-weight: 500;
    font-size: 10.5pt;
    /* line-height: 12pt; */
    line-height: 10.5pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    width: 50%;
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
`;
const P2DateBox = styled(PBox2)`
  padding-top: 42pt;
  align-items: flex-start;
  @media (min-width: 900pt) {
    padding-top: 39pt;
  }
  .dateBox {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    line-height: 18pt;
    padding: 0 15pt;
  }
  .beforeDate {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    font-size: 15pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
    @media (min-width: 900pt) {
      font-size: 18pt;
      font-weight: 500;
      line-height: 24pt;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
  .beforeDay {
    color: ${colors.lightGray2};
    @media (min-width: 900pt) {
      font-size: 18pt;
      font-weight: 500;
      line-height: 24pt;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
  .afterDate {
    font-weight: 500;
    font-size: 15pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main1};
    @media (min-width: 900pt) {
      font-size: 18pt;
      font-weight: 500;
      line-height: 24pt;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
  .afterDay {
    color: ${colors.lightGray2};
    @media (min-width: 900pt) {
      font-size: 18pt;
      font-weight: 500;
      line-height: 24pt;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
  .imgBox {
    position: relative;
    top: 5.25pt;
    width: 25.875pt;
    height: 8.625pt;
  }
`;
