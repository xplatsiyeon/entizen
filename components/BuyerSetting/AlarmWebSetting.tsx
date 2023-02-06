import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPostApi, isTokenPutApi } from 'api';
import AlarmDropDown, { DropDownTime } from './AlarmDropDown';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  leftTabNumber: number;
};

export type NewAlert = {
  alertApp?: boolean;
  alertKakao?: boolean;
  alertEmail?: boolean;
  alertQuotationRequest?: boolean;
  alertProject?: boolean;
  alertAfterSalesService?: boolean;
  alertChatting?: boolean;
  alertChargingStation?: boolean;
  alertEvent?: boolean;
  alertSubsidy?: boolean;
  alertNoDisturbanceTime?: boolean;
};

// type: EMAIL, APP, KAKAO

export type AlertsResponse = {
  isSuccess: boolean;
  data: {
    alertSetting: {
      alertSettingIdx: number;
      alertApp: boolean;
      alertKakao: boolean;
      alertEmail: boolean;
      alertQuotationRequest: boolean;
      alertProject: boolean;
      alertAfterSalesService: boolean;
      alertChatting: boolean;
      alertChargingStation: boolean;
      alertEvent: boolean;
      alertSubsidy: boolean;
      alertNoDisturbanceTime: boolean;
      noDisturbanceStartTime: string;
      noDisturbanceEndTime: string;
    };
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

  // 알람 PUT
  const { mutate: putMutate, isLoading: putLoading } = useMutation(
    isTokenPutApi,
    {
      onSuccess: () => {
        console.log('알람 수정 성공');
        alertsListRefetch();
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
  const [sendEndTime, setSendEndTime] = useState<string>('10:00');
  const [startTime, setStartTime] = useState<string>('');
  const [sendStartTime, setSendStartTime] = useState<string>('10:00');

  // 드랍다운 박스
  const [selectValue, setSelectValue] = useState('');
  // 알람 idx
  const [alertSettingIdx, setAlertSettingIdx] = useState(0);

  // 유저인지 회사인지
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

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

  // useEffect(() => {
  //   setStartTime()
  //   setEndTime()
  // }, [alertsList]);

  useEffect(() => {
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

  return (
    <Wrapper>
      <Header>
        <span className="text">알림 설정</span>
      </Header>

      <FlexWrap>
        <AlamLabel>알림</AlamLabel>
        <PaddingBox>
          {memberType === 'COMPANY' && (
            <AlamForm>
              <CheckBox>
                <span className="text">이메일</span>
                <CustomSwitch
                  name="alertEmail"
                  // onChange={handleChange}
                  // checked={kakaoChecked.kakao}
                  onChange={handleAlertChange}
                  checked={alertChecked.alertEmail}
                />
              </CheckBox>
            </AlamForm>
          )}
          <AlamForm>
            <CheckBox>
              <span className="text">카카오톡</span>
              <CustomSwitch
                name="alertKakao"
                // onChange={handleMailChange}
                // checked={mailChecked.email}
                onChange={handleAlertChange}
                checked={alertChecked.alertKakao}
              />
            </CheckBox>
          </AlamForm>
        </PaddingBox>
      </FlexWrap>
      <Line2 />
      <FlexWrap>
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false &&
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false &&
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false && alertChecked?.alertEmail
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false &&
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
                    ? false
                    : alertChecked.alertSubsidy
                }
              />
            </CheckBox>
          )}
        </FuntionForm>
      </FlexWrap>
      <Line2 />
      <FlexWrap>
        <FunctionLabel></FunctionLabel>
        <FuntionForm>
          {memberType === 'USER' && (
            <CheckBox>
              <span>방해금지시간 설정</span>
              <CustomSwitch
                name="alertNoDisturbanceTime"
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false &&
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
            alertChecked?.alertKakao === true && (
              <OptionContainer>
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
              </OptionContainer>
            )}
          {memberType === 'COMPANY' &&
            alertChecked.alertNoDisturbanceTime === true &&
            alertChecked?.alertKakao === true &&
            alertChecked?.alertEmail === true && (
              <OptionContainer>
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
              </OptionContainer>
            )}
          {memberType === 'USER' && (
            <CheckBox>
              <span>이벤트 및 혜택 알림</span>
              <CustomSwitch
                name="alertEvent"
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false
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
                name="alertEvent"
                onChange={handleAlertChange}
                checked={
                  alertChecked?.alertKakao === false &&
                  alertChecked?.alertEmail === false
                    ? false
                    : alertChecked.alertEvent
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </CheckBox>
          )}
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

const Line2 = styled.div`
  width: 100%;
  height: 3pt;
  background-color: #f3f4f7;
`;
