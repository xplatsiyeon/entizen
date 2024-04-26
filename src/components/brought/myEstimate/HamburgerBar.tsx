import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { isTokenGetApi } from 'api';
// import { useQuery } from 'react-query';
import { Box } from "@mui/material";
import colors from "../../../../src/app/colors";
import xBtn from "/public/components/xButton/XButton_black.svg";
import Logo from "/public/components/logo/EntizenHeaderLogoSvg.svg";
import whiteRight from "/public/components/arrow/whiteRight20.png";
import { useDispatch } from "react-redux";
import { myEstimateAction } from "../../../storeCompany/myQuotation";
import useProfile from "../../../util/hook/brought/useProfile";
// import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
// import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from "axios";

type Props = {
  menu: { title: string; link: string }[];
  anchor: string;
  toggleDrawer: (
    anchor: string,
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setState: React.Dispatch<
    React.SetStateAction<{
      right: boolean;
    }>
  >;
  state: {
    right: boolean;
  };
};

const HamburgerBar = ({ menu = [], anchor, toggleDrawer }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const userID = JSON.parse(sessionStorage.getItem('USER_ID')!) ?? undefined;
  const userID =
    typeof window !== "undefined" ? sessionStorage.getItem("USER_ID") : null;
  // 알람 조회
  // /v1/alerts/unread-points
  // const { data: historyUnread } = useQuery<AlertsResponse, AxiosError, Alerts>(
  //   'v1/alerts',
  //   () => isTokenGetApi(`/v1/alerts/unread-points`),
  //   {
  //     enabled: userID !== null ? true : false,
  //     select(res) {
  //       return res.data;
  //     },
  //   },
  // );
  const [isLogin, setIsLogin] = useState(false);

  // const moveAlarm = () => {
  //   dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
  //   router.push('/alarm');
  // };

  // 이름 가져오기

  // 작성자 - Bum
  // token 관련 logic과 hook이므로 변경필요성 보임
  // const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  // const { profile: profileData } = useProfile(accessToken);

  useEffect(() => {
    dispatch(myEstimateAction.reset());
    sessionStorage.removeItem("key");
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("USER_ID")) {
      // console.log('login check!');
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);
  return (
    <WholeBox
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListBox>
        <XBtnWrapper>
          <LogoWrapper onClick={() => router.push("/applyAd")}>
            <Image src={Logo} alt="Logo" />
          </LogoWrapper>
          <FaqButton onClick={() => router.push("/faq")}>
            <span>자주 묻는 질문</span>
          </FaqButton>
          <Imagewrap onClick={toggleDrawer(anchor, false)}>
            <Image src={xBtn} alt="xBtn" />
          </Imagewrap>
        </XBtnWrapper>
        {isLogin ? (
          <WhetherLoginComplete onClick={() => router.push("/myEstimate")}>
            <span onClick={() => router.push("/profile/editing")}>
              {/* Bum - 로그인완성 후 풀기 */}
              {/* {`${profileData?.name} 님`} */}
            </span>
            <span
              className="arrow-img"
              onClick={() => router.push("/profile/editing")}
            >
              <Image src={whiteRight} alt="arrow" layout="fill" />
            </span>
          </WhetherLoginComplete>
        ) : (
          <WhetherLogin onClick={() => router.push("/signin")}>
            <span>로그인 해주세요</span>
            <span>
              <Image src={whiteRight} alt="arrow" />
            </span>
          </WhetherLogin>
        )}

        <WhiteArea>
          {menu.map((item, index) => (
            <WhiteAreaMenus
              key={index}
              onClick={() => {
                router.push(item.link);
              }}
            >
              <span>{item.title}</span>
            </WhiteAreaMenus>
          ))}
        </WhiteArea>
      </ListBox>
    </WholeBox>
  );
};

export default HamburgerBar;

const WholeBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  /* height: 100vh; */
`;

const ListBox = styled.div`
  position: relative;
  width: 390px;
  padding-left: 24pt;
  /* padding-right: 24pt; */
  padding-right: 15pt;
  height: 100vh;

  background-color: #ffffff;
`;
const XBtnWrapper = styled.div`
  display: -webkit-box;
  display: flex;
  justify-content: flex-end;
  margin-top: 44.25pt;
`;

const WhetherLogin = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27.75pt;
  & span {
  }
  & span:first-of-type {
    font-family: "Spoqa Han Sans Neo";
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #ffffff;
    margin-right: 6pt;
  }
  & span {
  }
  .label {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  .arrow-img {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;
const WhetherLoginComplete = styled.div`
  display: flex;
  align-items: flex-end;
  /* margin-top: 9.75pt; */
  margin-top: 15.75pt;
  position: relative;
  & span:first-of-type {
    font-family: "Spoqa Han Sans Neo";
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #ffffff;
    margin-right: 6pt;
    display: flex;
    flex-direction: column;
    gap: 6pt;
  }
  .label {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  .arrow-img {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;

const WhiteArea = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 15pt 15pt 0 0;
  padding: 15pt 24pt 34.5pt 25.5pt;
  left: 0;
  top: 134pt;
  background-color: #ffffff;
`;

const WhiteAreaMenus = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12pt;
  padding-bottom: 12pt;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  & span:first-of-type {
    margin-right: 7.5pt;
  }
`;

const Imagewrap = styled.div`
  width: 18pt;
  height: 18pt;
  /* margin-right: 9pt; */
  /* margin-left: 22.5pt; */
  margin-left: 18.75pt;
`;

const FaqButton = styled.div`
  display: flex;
  width: 100px;
  height: 32px;
  padding: 12px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 29px;
  border: 1px solid #e2e5ed;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(137, 163, 201, 0.2);
  color: #4e5055;
  font-family: Spoqa Han Sans Neo;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
`;
const LogoWrapper = styled.div`
  width: 92px;
  height: 40px;
  margin-right: auto;
  display: flex;
`;
