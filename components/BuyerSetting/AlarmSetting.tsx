import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import { useRouter } from 'next/router';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  leftTabNumber: number;
  nowWidth: number;
};

const AlarmSetting = ({ tabNumber, setTabNumber, leftTabNumber }: Props) => {
  const router = useRouter();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [checked, setChecked] = useState({
    appPush: false,
    email: false,
    kakao: false,
    easy: false,
    project: false,
    as: false,
    communicate: false,
    charging: false,
    DoNotDisturb: false,
    event: false,
  });

  // 유저인지 회사인지
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

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
            <CheckBox>
              <span className="text">앱 푸쉬</span>
              <CustomSwitch
                name="appPush"
                onChange={handleChange}
                checked={checked.appPush}
              />
            </CheckBox>
            {memberType === 'COMPANY' && (
              <CheckBox>
                <span className="text">이메일</span>
                <CustomSwitch
                  name="email"
                  onChange={handleChange}
                  checked={checked.email}
                />
              </CheckBox>
            )}
            <CheckBox>
              <span className="text">카카오톡</span>
              <CustomSwitch
                name="kakao"
                onChange={handleChange}
                checked={checked.kakao}
              />
            </CheckBox>
          </AlamForm>
          <Line />
          <FunctionLabel>기능</FunctionLabel>
          <FuntionForm>
            <CheckBox>
              <div>
                <span className="text">간편견적 알림</span>
                <div className="remark">견적 진행상황 알림</div>
              </div>
              <CustomSwitch
                name="easy"
                onChange={handleChange}
                checked={checked.easy}
              />
            </CheckBox>
            <CheckBox>
              <div>
                <span className="text">내 프로젝트 알림</span>
              </div>
              <CustomSwitch
                name="project"
                onChange={handleChange}
                checked={checked.project}
              />
            </CheckBox>
            <CheckBox>
              <div>
                <span className="text">A/S 알림</span>
              </div>
              <CustomSwitch
                name="as"
                onChange={handleChange}
                checked={checked.as}
              />
            </CheckBox>
            <CheckBox>
              <div>
                <span className="text">소통하기 알림</span>
                <div className="remark">신규 메세지 알림</div>
              </div>
              <CustomSwitch
                name="charging"
                onChange={handleChange}
                checked={checked.charging}
              />
            </CheckBox>
            <CheckBox>
              <div>
                <span className="text">내 충전소 알림</span>
                <div className="remark">구독종료 미리 알림</div>
              </div>
              <CustomSwitch
                name="communicate"
                onChange={handleChange}
                checked={checked.communicate}
              />
            </CheckBox>
          </FuntionForm>
          <Line />
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
              <>
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
              </>
            )}
            <CheckBox>
              <span>이벤트 및 혜택 알림</span>
              <CustomSwitch
                name="event"
                onChange={handleChange}
                checked={checked.event}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </CheckBox>
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
