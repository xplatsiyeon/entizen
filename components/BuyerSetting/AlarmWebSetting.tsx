import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPostApi } from 'api';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  leftTabNumber: number;
};

type Alert = {
  [key: string]: any;
  alertQuotationRequest: boolean;
  alertProject: boolean;
  alertAfterSalesService: boolean;
  alertChatting: boolean;
  alertChargingStation: boolean;
  alertEvent: boolean;
};

// type: EMAIL, APP, KAKAO

type AlertsResponse = {
  isSuccess: boolean;
  data: {
    alertSettings: {
      alertSettingIdx: number;
      type: string;
      alertQuotationRequest: boolean;
      alertProject: boolean;
      alertAfterSalesService: boolean;
      alertChatting: boolean;
      alertChargingStation: boolean;
      alertEvent: boolean;
      alertNoDisturbanceTime: boolean;
      noDisturbanceStartTime: string;
      noDisturbanceEndTime: string;
    }[];
  };
};

const AlarmWebSetting = ({ tabNumber, setTabNumber, leftTabNumber }: Props) => {
  // 알람 조회
  const {
    data: alertsList,
    isLoading: alertsListIsLoading,
    isError: alertsListIsError,
    refetch: alertsListRefetch,
  } = useQuery<AlertsResponse>('alert-list', () => isTokenGetApi(`/alerts`));

  // 알람 POST
  const { mutate: postMutate, isLoading: postLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: () => {
        console.log('알람 수정 성공');
      },
      onError: (error: any) => {
        const {
          response: { data },
        } = error;
        if (data) {
          console.log(data.message);
        } else {
          console.log('다시 시도해주세요');
        }
      },
    },
  );

  const router = useRouter();
  const [endTime, setEndTime] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');

  // 카카오 전체 알림(하나라도 flase면 토글 꺼짐)
  const [kakao, setKakao] = useState<boolean>(true);
  // 카카오 전체 알림 클릭시 나머지 토글도 바꿔줌
  const [clickKakao, setClickKakao] = useState<boolean>(true);

  // 이메일 전체 알림(하나라도 flase면 토글 꺼짐)
  const [email, setEmail] = useState<boolean>(true);
  // 이메일 전체 알림 클릭시 나머지 토글도 바꿔줌
  const [clickEmail, setClickEmail] = useState<boolean>(true);
  // 이메일 idx =

  //  방해금지 시간
  const [alertNoDisturbanceTime, setAlertNoDisturbanceTime] =
    useState<boolean>(false);
  // 유저인지 회사인지
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const [kakaoChecked, setKakaoChecked] = useState<Alert>({
    alertQuotationRequest: true,
    alertProject: true,
    alertAfterSalesService: true,
    alertChatting: true,
    alertChargingStation: true,
    alertEvent: true,
  });

  const [mailChecked, setMailChecked] = useState<Alert>({
    alertQuotationRequest: true,
    alertProject: true,
    alertAfterSalesService: true,
    alertChatting: true,
    alertChargingStation: true,
    alertEvent: true,
  });

  // 알람 submit  /alerts/:alertSettingIdx
  const onSubmitText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postMutate({
      url: `/alerts/1`,
      data: {
        type: 'EMAIL',
        alertQuotationRequest: false,
        alertProject: false,
        alertAfterSalesService: false,
        alertChatting: false,
        alertChargingStation: false,
        alertEvent: false,
        alertNoDisturbanceTime: false,
        noDisturbanceStartTime: null,
        noDisturbanceEndTime: null,
      },
    });
  };

  // kakaoChecked, mailChecked에 하나라도 false가 있는지 없는지 판독
  const resultKakao = Object.values(kakaoChecked).some(
    (item) => item === false,
  );
  const resultEmail = Object.values(mailChecked).some((item) => item === false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp = { ...kakaoChecked };
    setKakaoChecked({
      ...temp,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp = { ...mailChecked };
    setMailChecked({
      ...temp,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    alertsListRefetch();

    if (resultEmail === true) {
      setEmail(false);
    } else {
      setEmail(true);
    }
    postMutate({
      url: `/alerts/1`,
      data: {
        type: 'EMAIL',
        alertQuotationRequest: mailChecked.alertQuotationRequest,
        alertProject: mailChecked.alertProject,
        alertAfterSalesService: mailChecked.alertAfterSalesService,
        alertChatting: mailChecked.alertChatting,
        alertChargingStation: mailChecked.alertChargingStation,
        alertEvent: mailChecked.alertEvent,
        // alertNoDisturbanceTime: alertNoDisturbanceTime,
        // noDisturbanceStartTime: startTime,
        // noDisturbanceEndTime: endTime,
      },
    });
  }, [mailChecked]);

  useEffect(() => {
    alertsListRefetch();
    if (resultKakao === true) {
      setKakao(false);
    } else {
      setKakao(true);

      postMutate({
        url: `/alerts/3`,
        data: {
          type: 'KAKAO',
          alertQuotationRequest: kakaoChecked.alertQuotationRequest,
          alertProject: kakaoChecked.alertProject,
          alertAfterSalesService: kakaoChecked.alertAfterSalesService,
          alertChatting: kakaoChecked.alertChatting,
          alertChargingStation: kakaoChecked.alertChargingStation,
          alertEvent: kakaoChecked.alertEvent,
          alertNoDisturbanceTime: alertNoDisturbanceTime,
          noDisturbanceStartTime: startTime,
          noDisturbanceEndTime: endTime,
        },
      });
    }
  }, [kakaoChecked]);

  // 카카오 전체 알림
  useEffect(() => {
    alertsListRefetch();
    const temp = { ...kakaoChecked };
    for (const value in kakaoChecked) {
      if (clickKakao === true) {
        temp[value] = true;
      } else {
        temp[value] = false;
      }
      setKakaoChecked(temp);
    }
  }, [clickKakao]);

  // 메일 전체 알림
  useEffect(() => {
    alertsListRefetch();
    const temp = { ...mailChecked };
    for (const value in mailChecked) {
      if (clickEmail === true) {
        temp[value] = true;
      } else {
        temp[value] = false;
      }
      setMailChecked(temp);
    }
  }, [clickEmail]);

  // useEffect(() => {
  //   setStartTime()
  //   setEndTime()
  // }, [alertsList]);

  return (
    <Wrapper>
      <Header>
        <span className="text">알림 설정</span>
      </Header>
      <TitleWrapper memberType={memberType}>
        {memberType === 'COMPANY' && <EmailText>이메일</EmailText>}
        <KaKaoTalkText memberType={memberType}>카카오톡</KaKaoTalkText>
      </TitleWrapper>
      <FlexWrap>
        <AlamLabel>알림</AlamLabel>
        <PaddingBox>
          <AlamForm>
            <CheckBox>
              <span className="text">전체 알림</span>
              <SwitchWrapper memberType={memberType}>
                {memberType === 'COMPANY' && (
                  <CustomSwitch
                    name="email"
                    // onChange={handleMailChange}
                    // checked={mailChecked.email}
                    checked={email}
                    onChange={() => {
                      setEmail(!email);
                      setClickEmail(!clickEmail);
                    }}
                  />
                )}
                <CustomSwitch
                  name="kakao"
                  // onChange={handleChange}
                  // checked={kakaoChecked.kakao}
                  checked={kakao}
                  onChange={() => {
                    setKakao(!kakao);
                    setClickKakao(!clickKakao);
                  }}
                />
              </SwitchWrapper>
            </CheckBox>
          </AlamForm>
          <EventForm>
            <CheckBox>
              <span>방해금지시간 설정</span>
              <CustomSwitch
                name="alertNoDisturbanceTime"
                // onChange={handleChange}
                // checked={kakaoChecked.alertNoDisturbanceTime}
                onChange={() => {
                  setAlertNoDisturbanceTime(!alertNoDisturbanceTime);
                }}
                checked={alertNoDisturbanceTime}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </CheckBox>
            {alertNoDisturbanceTime && (
              <OptionContainer>
                <OptionBox>
                  <span>시작 시간</span>
                  <input
                    type="time"
                    className="time"
                    required
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                  />
                </OptionBox>
                <OptionBox>
                  <span>종료 시간</span>
                  <label>
                    <input
                      type="time"
                      className="time"
                      required
                      onChange={(e) => {
                        setEndTime(e.target.value);
                      }}
                    />
                  </label>
                </OptionBox>
              </OptionContainer>
            )}
            <CheckBox>
              <span>이벤트 및 혜택 알림</span>
              <SwitchWrapper memberType={memberType}>
                {memberType === 'COMPANY' && (
                  <CustomSwitch
                    name="alertEvent"
                    onChange={handleMailChange}
                    checked={mailChecked.alertEvent}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                )}
                <CustomSwitch
                  name="alertEvent"
                  onChange={handleChange}
                  checked={kakaoChecked.alertEvent}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </SwitchWrapper>
            </CheckBox>
          </EventForm>
        </PaddingBox>
      </FlexWrap>
      <FlexWrap>
        <FunctionLabel>기능</FunctionLabel>
        <FuntionForm>
          <CheckBox>
            <div>
              <span className="text">간편견적 알림</span>
              <div className="remark">견적 진행상황 알림</div>
            </div>
            <SwitchWrapper memberType={memberType}>
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="alertQuotationRequest"
                  onChange={handleMailChange}
                  checked={mailChecked.alertQuotationRequest}
                />
              )}
              <CustomSwitch
                name="alertQuotationRequest"
                onChange={handleChange}
                checked={kakaoChecked.alertQuotationRequest}
              />
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">내 프로젝트 알림</span>
            </div>
            <SwitchWrapper memberType={memberType}>
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="alertProject"
                  onChange={handleMailChange}
                  checked={mailChecked.alertProject}
                />
              )}
              <CustomSwitch
                name="alertProject"
                onChange={handleChange}
                checked={kakaoChecked.alertProject}
              />
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">A/S 알림</span>
            </div>
            <SwitchWrapper memberType={memberType}>
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="alertAfterSalesService"
                  onChange={handleMailChange}
                  checked={mailChecked.alertAfterSalesService}
                />
              )}
              <CustomSwitch
                name="alertAfterSalesService"
                onChange={handleChange}
                checked={kakaoChecked.alertAfterSalesService}
              />
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">소통하기 알림</span>
              <div className="remark">신규 메세지 알림</div>
            </div>
            <SwitchWrapper memberType={memberType}>
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="alertChatting"
                  onChange={handleMailChange}
                  checked={mailChecked.alertChatting}
                />
              )}
              <CustomSwitch
                name="alertChatting"
                onChange={handleChange}
                checked={kakaoChecked.alertChatting}
              />
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">내 충전소 알림</span>
              <div className="remark">구독종료 미리 알림</div>
            </div>
            <SwitchWrapper memberType={memberType}>
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="alertChargingStation"
                  onChange={handleMailChange}
                  checked={mailChecked.alertChargingStation}
                />
              )}
              <CustomSwitch
                name="alertChargingStation"
                onChange={handleChange}
                checked={kakaoChecked.alertChargingStation}
              />
            </SwitchWrapper>
          </CheckBox>
        </FuntionForm>
      </FlexWrap>
      <Line />
    </Wrapper>
  );
};

export default AlarmWebSetting;

const Wrapper = styled.div`
  @media (min-width: 900pt) {
    padding-top: 42pt;
    width: 580.5pt;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
    padding-bottom: 25pt;
    background-color: white;
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Header = styled(Box)`
  display: flex;
  height: 36pt;
  padding-left: 38.25pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 18pt;
    line-height: 24pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const TitleWrapper = styled.div<{ memberType: string }>`
  display: ${({ memberType }) => (memberType === 'COMPANY' ? 'flex' : '')};
  align-items: center;
`;
const KaKaoTalkText = styled.div<{ memberType: string }>`
  position: relative;
  /* margin-left: 495pt; */
  margin-left: ${({ memberType }) =>
    memberType === 'COMPANY' ? '80%' : '86%'};
  top: 10pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const EmailText = styled.div`
  position: relative;
  left: 74%;
  top: 10pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 38.25pt;
  padding-right: 39.75pt;
  padding-top: 22.5pt;
`;
const AlamForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 438.75pt;
`;
const AlamLabel = styled.label`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${colors.main2};
  padding-top: 5pt;
`;

const PaddingBox = styled.div``;

const CheckBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: #222222;
  padding-bottom: 27pt;
  &:not(:first-of-type) {
    /* padding-top: 21pt; */
  }
  .remark {
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
`;
const Line = styled.div`
  margin: 30pt 0;
`;
const FunctionLabel = styled.label`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${colors.main2};
  padding-top: 5pt;
`;
const FuntionForm = styled.form`
  padding-top: 5pt;
  width: 438.75pt;
`;
const EventForm = styled.form``;

const OptionContainer = styled.div`
  padding-bottom: 12pt;
`;
const OptionBox = styled(Box)`
  padding-bottom: 15pt;
  padding-right: 10pt;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: #222222;
  .time {
    color: ${colors.main};
  }
`;

const CustomSwitch = styled(Switch)`
  .MuiSwitch-root {
  }
  .MuiSwitch-input {
  }
  .MuiSwitch-thumb {
    color: white;
    width: 12pt;
    height: 12pt;
    margin-top: 2.75pt;
    display: flex;
  }
  .MuiSwitch-track {
    background-color: #e2e5ed;
    height: 13.125pt;
    width: 21pt;
    padding: 0 7.5pt;
    border-radius: 15pt;
  }
  .Mui-checked + .MuiSwitch-track {
    background-color: ${colors.main} !important;
    opacity: 1 !important;
  }
`;

const SwitchWrapper = styled.div<{ memberType: string }>`
  display: ${({ memberType }) => (memberType === 'COMPANY' ? 'flex' : '')};
  align-items: center;
  justify-content: space-between;
  width: ${({ memberType }) => (memberType === 'COMPANY' ? '115.5pt' : '')};
`;
