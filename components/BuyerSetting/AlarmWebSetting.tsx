import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import { useRouter } from 'next/router';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  leftTabNumber: number;
};

const AlarmWebSetting = ({ tabNumber, setTabNumber, leftTabNumber }: Props) => {
  const router = useRouter();
  // 유저인지 회사인지
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);
  const [checked, setChecked] = useState({
    appPush: false,
    kakao: false,
    easy: false,
    project: false,
    as: false,
    communicate: false,
    charging: false,
    DoNotDisturb: false,
    event: false,
  });
  const [mailChecked, setMailChecked] = useState({
    appPush: false,
    email: false,
    easy: false,
    project: false,
    as: false,
    communicate: false,
    charging: false,
    event: false,
  });

  console.log('checked 어케 나와용 웹', checked);
  console.log('mailChecked 어케 나와용 웹', checked);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if ((event.target.type = 'kakao')) {
  //     setChecked({
  //       ...checked,
  //       [event.target.name]: event.target.checked,
  //     });
  //   } else if ((event.target.type = 'email')) {
  //     setMailChecked({
  //       ...mailChecked,
  //       [event.target.name]: event.target.checked,
  //     });
  //   }
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMailChecked({
      ...mailChecked,
      [event.target.name]: event.target.checked,
    });
  };

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
                <CustomSwitch
                  name="kakao"
                  onChange={handleChange}
                  checked={checked.kakao}
                />
                {memberType === 'COMPANY' && (
                  <CustomSwitch
                    name="email"
                    onChange={handleMailChange}
                    checked={mailChecked.email}
                  />
                )}
              </SwitchWrapper>
            </CheckBox>
          </AlamForm>
          <EventForm>
            <CheckBox>
              <span>방해금지시간 설정</span>
              <CustomSwitch
                name="DoNotDisturb"
                onChange={handleChange}
                checked={checked.DoNotDisturb}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </CheckBox>
            {checked.DoNotDisturb && (
              <OptionContainer>
                <OptionBox>
                  <span>시작 시간</span>
                  <input type="time" className="time" required />
                </OptionBox>
                <OptionBox>
                  <span>종료 시간</span>
                  <label>
                    <input type="time" className="time" required />
                  </label>
                </OptionBox>
              </OptionContainer>
            )}
            <CheckBox>
              <span>이벤트 및 혜택 알림</span>
              <SwitchWrapper memberType={memberType}>
                <CustomSwitch
                  name="event"
                  onChange={handleChange}
                  checked={checked.event}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                {memberType === 'COMPANY' && (
                  <CustomSwitch
                    name="event"
                    onChange={handleMailChange}
                    checked={mailChecked.event}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                )}
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
              <CustomSwitch
                name="easy"
                onChange={handleChange}
                checked={checked.easy}
              />
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="easy"
                  onChange={handleMailChange}
                  checked={mailChecked.easy}
                />
              )}
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">내 프로젝트 알림</span>
            </div>
            <SwitchWrapper memberType={memberType}>
              <CustomSwitch
                name="project"
                onChange={handleChange}
                checked={checked.project}
              />
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="project"
                  onChange={handleMailChange}
                  checked={mailChecked.project}
                />
              )}
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">A/S 알림</span>
            </div>
            <SwitchWrapper memberType={memberType}>
              <CustomSwitch
                name="as"
                onChange={handleChange}
                checked={checked.as}
              />
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="as"
                  onChange={handleMailChange}
                  checked={mailChecked.as}
                />
              )}
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">소통하기 알림</span>
              <div className="remark">신규 메세지 알림</div>
            </div>
            <SwitchWrapper memberType={memberType}>
              <CustomSwitch
                name="charging"
                onChange={handleChange}
                checked={checked.charging}
              />
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="charging"
                  onChange={handleMailChange}
                  checked={mailChecked.charging}
                />
              )}
            </SwitchWrapper>
          </CheckBox>
          <CheckBox>
            <div>
              <span className="text">내 충전소 알림</span>
              <div className="remark">구독종료 미리 알림</div>
            </div>
            <SwitchWrapper memberType={memberType}>
              <CustomSwitch
                name="communicate"
                onChange={handleChange}
                checked={checked.communicate}
              />
              {memberType === 'COMPANY' && (
                <CustomSwitch
                  name="communicate"
                  onChange={handleMailChange}
                  checked={mailChecked.communicate}
                />
              )}
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
    border: 1px solid red;
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
