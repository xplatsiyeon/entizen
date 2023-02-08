import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPostApi, isTokenPutApi } from 'api';
import { AlertsResponse, NewAlert } from './AlarmWebSetting';
import AlarmDropDown, { DropDownTime } from './AlarmDropDown';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  leftTabNumber: number;
  nowWidth: number;
};

const AlarmSetting = ({ tabNumber, setTabNumber, leftTabNumber }: Props) => {
  // 알람 조회
  const {
    data: alertsList,
    isLoading: alertsListIsLoading,
    isError: alertsListIsError,
    refetch: alertsListRefetch,
  } = useQuery<AlertsResponse>('alert-list', () => isTokenGetApi(`/alerts`));

  // 알람 PUT
  const { mutate: putMutate, isLoading: putLoading } = useMutation(
    isTokenPutApi,
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
  const [sendEndTime, setSendEndTime] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [sendStartTime, setSendStartTime] = useState<string>('');
  const [userAllOff, setUserAllOff] = useState(false);
  const [companyAllOff, setCompanyAllOff] = useState(false);
  // 기업 전체 알림 off
  const [companyAlerts, setComapanyAlerts] = useState(true);
  // 일반 user 전테 알림 off
  const [userAlerts, setUserAlerts] = useState(true);
  // 드랍다운 박스
  const [selectValue, setSelectValue] = useState('');
  // 알람 idx
  const [alertSettingIdx, setAlertSettingIdx] = useState(0);

  // 유저인지 회사인지
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [alertChecked, setAlertChecked] = useState<NewAlert>({
    alertApp: alertsList?.data?.alertSetting?.alertApp,
    alertKakao: alertsList?.data?.alertSetting?.alertKakao,
    alertEmail: alertsList?.data?.alertSetting?.alertEmail,
    alertQuotationRequest:
      alertsList?.data?.alertSetting?.alertQuotationRequest,
    alertProject: alertsList?.data?.alertSetting?.alertProject,
    alertAfterSalesService:
      alertsList?.data?.alertSetting?.alertAfterSalesService,
    alertChatting: alertsList?.data?.alertSetting?.alertChatting,
    alertChargingStation: alertsList?.data?.alertSetting?.alertChargingStation,
    alertEvent: alertsList?.data?.alertSetting?.alertEvent,
    alertSubsidy: alertsList?.data?.alertSetting?.alertSubsidy,
    alertNoDisturbanceTime:
      alertsList?.data?.alertSetting?.alertNoDisturbanceTime,
  });

  const handleAlertChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp = { ...alertChecked };
    setAlertChecked({
      ...temp,
      [event.target.name]: event.target.checked,
    });
  };

  // currentValue
  const getTime = (time: string) => {
    let newTime = '';
    DropDownTime?.map((item) => {
      if (item.send === time) {
        return (newTime = item.show);
      }
    });
    return newTime;
  };

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    setAlertSettingIdx(alertsList?.data?.alertSetting?.alertSettingIdx!);
  }, [alertsList]);

  // 실시간으로 백엔드 전달
  useEffect(() => {
    putMutate({
      url: `/alerts/${alertSettingIdx}`,
      data: {
        alertApp: alertsList?.data?.alertSetting?.alertApp,
        alertKakao: alertChecked.alertKakao,
        alertEmail: alertChecked.alertEmail,
        alertQuotationRequest: alertChecked.alertQuotationRequest,
        alertProject: alertChecked.alertProject,
        alertAfterSalesService: alertChecked.alertAfterSalesService,
        alertChatting: alertChecked.alertChatting,
        alertChargingStation: alertChecked.alertChargingStation,
        alertEvent: alertChecked.alertEvent,
        alertSubsidy: alertChecked.alertSubsidy,
        alertNoDisturbanceTime: alertChecked.alertNoDisturbanceTime,
        noDisturbanceStartTime: sendStartTime,
        noDisturbanceEndTime: sendEndTime,
      },
    });
  }, [alertChecked, sendEndTime, sendStartTime]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    setSendEndTime(alertsList?.data?.alertSetting?.noDisturbanceEndTime!);
    setSendStartTime(alertsList?.data?.alertSetting?.noDisturbanceStartTime!);
    setAlertChecked({
      alertApp: alertsList?.data?.alertSetting?.alertApp,
      alertKakao: alertsList?.data?.alertSetting?.alertKakao,
      alertEmail: alertsList?.data?.alertSetting?.alertEmail,
      alertQuotationRequest:
        alertsList?.data?.alertSetting?.alertQuotationRequest,
      alertProject: alertsList?.data?.alertSetting?.alertProject,
      alertAfterSalesService:
        alertsList?.data?.alertSetting?.alertAfterSalesService,
      alertChatting: alertsList?.data?.alertSetting?.alertChatting,
      alertChargingStation:
        alertsList?.data?.alertSetting?.alertChargingStation,
      alertEvent: alertsList?.data?.alertSetting?.alertEvent,
      alertSubsidy: alertsList?.data?.alertSetting?.alertSubsidy,
      alertNoDisturbanceTime:
        alertsList?.data?.alertSetting?.alertNoDisturbanceTime,
    });
  }, [alertsList]);

  useEffect(() => {
    if (
      memberType === 'USER' &&
      alertChecked?.alertKakao === false &&
      alertChecked?.alertApp === false
    ) {
      setUserAllOff(true);
    } else if (
      memberType === 'COMPANY' &&
      alertChecked?.alertEmail === false &&
      alertChecked?.alertKakao === false &&
      alertChecked?.alertApp === false
    ) {
      setCompanyAllOff(true);
    }
  }, [alertChecked]);

  return (
    <>
      {nowWidth < 1200 && (
        <Wrapper>
          <Header>
            <div className="img-item" onClick={() => setTabNumber(0)}>
              <Image
                style={{
                  cursor: 'pointer',
                  width: '18pt',
                  height: '18pt',
                }}
                src={BackImg}
                alt="btn"
              />
            </div>
            <span className="text">알림 설정</span>
          </Header>
          <AlamLabel>알림</AlamLabel>
          <AlamForm>
            {/* <CheckBox>
              <span className="text">앱 푸쉬</span>
              <CustomSwitch
                name="appPush"
                onChange={handleChange}
                checked={checked.appPush}
              />
            </CheckBox> */}
            <CheckBox>
              <span className="text">앱 푸시</span>
              <CustomSwitch
                name="alertApp"
                onChange={handleAlertChange}
                checked={alertChecked.alertApp}
              />
            </CheckBox>
            {memberType === 'COMPANY' && (
              <CheckBox>
                <span className="text">이메일</span>
                <CustomSwitch
                  name="alertEmail"
                  onChange={handleAlertChange}
                  checked={alertChecked.alertEmail}
                />
              </CheckBox>
            )}
            <CheckBox>
              <span className="text">카카오톡</span>
              <CustomSwitch
                name="alertKakao"
                onChange={handleAlertChange}
                checked={alertChecked.alertKakao}
              />
            </CheckBox>
          </AlamForm>
          {/* <Line /> */}
          <Line2 />
          <FunctionLabel>기능</FunctionLabel>
          <FuntionForm>
            {memberType === 'COMPANY' && (
              <CheckBox>
                <div>
                  <span className="text">내 견적 알림</span>
                  <div className="remark">견적 요청, 진행상황 알림</div>
                </div>
                <CustomSwitch
                  name="alertQuotationRequest"
                  onChange={(e) => {
                    if (companyAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false &&
                    alertChecked?.alertEmail === false
                      ? false
                      : alertChecked.alertQuotationRequest
                  }
                />
              </CheckBox>
            )}
            {memberType === 'USER' && (
              <CheckBox>
                <div>
                  <span className="text">간편견적 알림</span>
                  <div className="remark">견적 진행상황 알림</div>
                </div>
                <CustomSwitch
                  name="alertQuotationRequest"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertQuotationRequest
                  }
                />
              </CheckBox>
            )}
            {memberType === 'USER' && (
              <CheckBox>
                <div>
                  <span className="text">내 프로젝트 알림</span>
                </div>
                <CustomSwitch
                  name="alertProject"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertProject
                  }
                />
              </CheckBox>
            )}
            {memberType === 'COMPANY' && (
              <CheckBox>
                <div>
                  <span className="text">내 프로젝트 알림</span>
                </div>
                <CustomSwitch
                  name="alertProject"
                  onChange={(e) => {
                    if (companyAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false &&
                    alertChecked?.alertEmail === false
                      ? false
                      : alertChecked.alertProject
                  }
                />
              </CheckBox>
            )}
            {memberType === 'USER' && (
              <CheckBox>
                <div>
                  <span className="text">A/S 알림</span>
                </div>
                <CustomSwitch
                  name="alertAfterSalesService"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertAfterSalesService
                  }
                />
              </CheckBox>
            )}
            {memberType === 'COMPANY' && (
              <CheckBox>
                <div>
                  <span className="text">A/S 알림</span>
                </div>
                <CustomSwitch
                  name="alertAfterSalesService"
                  onChange={(e) => {
                    if (companyAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false &&
                    alertChecked?.alertEmail === false
                      ? false
                      : alertChecked.alertAfterSalesService
                  }
                />
              </CheckBox>
            )}
            {memberType === 'USER' && (
              <CheckBox>
                <div>
                  <span className="text">소통하기 알림</span>
                  <div className="remark">신규 메세지 알림</div>
                </div>
                <CustomSwitch
                  name="alertChatting"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertChatting
                  }
                />
              </CheckBox>
            )}
            {memberType === 'COMPANY' && (
              <CheckBox>
                <div>
                  <span className="text">소통하기 알림</span>
                  <div className="remark">신규 메세지 알림</div>
                </div>
                <CustomSwitch
                  name="alertChatting"
                  onChange={(e) => {
                    if (companyAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false &&
                    alertChecked?.alertEmail === false
                      ? false
                      : alertChecked.alertChatting
                  }
                />
              </CheckBox>
            )}
            {memberType === 'USER' && (
              <CheckBox>
                <div>
                  <span className="text">내 충전소 알림</span>
                  <div className="remark">구독종료 미리 알림</div>
                </div>

                <CustomSwitch
                  name="alertChargingStation"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertChargingStation
                  }
                />
              </CheckBox>
            )}
            {memberType === 'USER' && (
              <CheckBox>
                <div>
                  <span className="text">보조금 알림</span>
                  <div className="remark">신규 보조금 공고 알림</div>
                </div>

                <CustomSwitch
                  name="alertSubsidy"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertSubsidy
                  }
                />
              </CheckBox>
            )}
          </FuntionForm>
          <Line2 />
          <EventForm>
            {memberType === 'USER' && (
              <CheckBox>
                <span>방해금지시간 설정</span>
                <CustomSwitch
                  name="alertNoDisturbanceTime"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertNoDisturbanceTime
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </CheckBox>
            )}
            {memberType === 'COMPANY' && (
              <CheckBox>
                <span>방해금지시간 설정</span>
                <CustomSwitch
                  name="alertNoDisturbanceTime"
                  onChange={(e) => {
                    if (companyAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false &&
                    alertChecked?.alertEmail === false
                      ? false
                      : alertChecked.alertNoDisturbanceTime
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </CheckBox>
            )}
            {memberType === 'USER' &&
              alertChecked.alertNoDisturbanceTime === true &&
              (alertChecked?.alertKakao === true ||
                alertChecked?.alertApp === true) && (
                <>
                  <OptionBox>
                    <span>시작 시간</span>
                    <AlarmDropDown
                      setSelectValue={setStartTime}
                      selectValue={startTime}
                      currentStep={getTime(
                        alertsList?.data?.alertSetting?.noDisturbanceStartTime!,
                      )}
                      setSendTime={setSendStartTime}
                    />
                  </OptionBox>
                  <OptionBox>
                    <span>종료 시간</span>
                    <AlarmDropDown
                      setSelectValue={setEndTime}
                      selectValue={endTime}
                      currentStep={getTime(
                        alertsList?.data?.alertSetting?.noDisturbanceEndTime!,
                      )}
                      setSendTime={setSendEndTime}
                    />
                  </OptionBox>
                </>
              )}
            {memberType === 'COMPANY' &&
              alertChecked.alertNoDisturbanceTime === true &&
              (alertChecked?.alertKakao === true ||
                alertChecked?.alertApp === true ||
                alertChecked?.alertEmail === true) && (
                <>
                  <OptionBox>
                    <span>시작 시간</span>
                    <AlarmDropDown
                      setSelectValue={setStartTime}
                      selectValue={startTime}
                      currentStep={getTime(
                        alertsList?.data?.alertSetting?.noDisturbanceStartTime!,
                      )}
                      setSendTime={setSendStartTime}
                    />
                  </OptionBox>
                  <OptionBox>
                    <span>종료 시간</span>
                    <AlarmDropDown
                      setSelectValue={setEndTime}
                      selectValue={endTime}
                      currentStep={getTime(
                        alertsList?.data?.alertSetting?.noDisturbanceEndTime!,
                      )}
                      setSendTime={setSendEndTime}
                    />
                  </OptionBox>
                </>
              )}
            {memberType === 'USER' && (
              <CheckBox>
                <span>이벤트 및 혜택 알림</span>
                <CustomSwitch
                  name="event"
                  onChange={(e) => {
                    if (userAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false
                      ? false
                      : alertChecked.alertEvent
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </CheckBox>
            )}
            {memberType === 'COMPANY' && (
              <CheckBox>
                <span>이벤트 및 혜택 알림</span>
                <CustomSwitch
                  name="event"
                  onChange={(e) => {
                    if (companyAllOff === false) {
                      handleAlertChange(e);
                    }
                  }}
                  checked={
                    alertChecked?.alertKakao === false &&
                    alertChecked?.alertApp === false &&
                    alertChecked?.alertEmail === false
                      ? false
                      : alertChecked.alertEvent
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </CheckBox>
            )}
          </EventForm>
        </Wrapper>
      )}
    </>
  );
};

export default AlarmSetting;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const AlamForm = styled.form`
  padding-left: 15pt;
  padding-right: 5pt;
  padding-top: 18pt;
`;
const AlamLabel = styled.label`
  padding-left: 15pt;
  padding-right: 5pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
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

  &:not(:first-of-type) {
    padding-top: 21pt;
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
  width: 100%;
  height: 3pt;
  background: #f3f4f7;
  margin: 30pt 0;
`;
const FunctionLabel = styled.label`
  padding-left: 15pt;
  padding-right: 5pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const FuntionForm = styled.form`
  padding-left: 15pt;
  padding-right: 5pt;
  padding-top: 18pt;
`;
const EventForm = styled.form`
  padding-left: 15pt;
  padding-right: 5pt;
`;
const OptionBox = styled(Box)`
  padding-top: 15pt;
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

const Line2 = styled.div`
  width: 100%;
  height: 3pt;
  background-color: #f3f4f7;
  margin: 30pt 0;
`;
