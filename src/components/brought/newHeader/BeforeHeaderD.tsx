import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Logos from "public/images/EntizenHeaderWitheLogoSvg.svg";
import LogosLS from "/public/components/logo/EntizenHeaderLogoSvgLS.svg";
import SubMenuBar from "../SubMenuBar";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { selectAction } from 'store/loginTypeSlice';
// import userAddressHooks from 'hooks/userAddressHooks';

type Props = {
  num?: number;
  now?: string;
  sub?: string;
};

const WebHeader = ({ num, now, sub }: Props) => {
  const router = useRouter();
  // const dispatch = useDispatch();
  const userID =
    typeof window !== "undefined" ? sessionStorage.getItem("USER_ID") : null;
  const [linklist, setLinklist] = useState<boolean>(Boolean(sub));
  const [isHovering, setIsHovered] = useState(false);
  // const [keyword, setKeyword, results] = userAddressHooks();

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleLink = (st: string) => {
    if (userID) {
      router.push(`${st}`);
    } else {
      router.push("/signin");
    }
  };

  /**
   * 작성자 - Bum
   * 해당 함수 비사용중이기에 임시 주석
   */
  // const routeSignUp = () => {
  //   dispatch(selectAction.reset());
  //   router.push('/signUp/Terms');
  // };

  useEffect(() => {}, [linklist]);

  return (
    <>
      <Wrapper>
        <MainLink>
          <Inner>
            <Box1>
              <LogoBox>
                <div>
                  <Image
                    src={LogosLS}
                    alt="logo"
                    layout="intrinsic"
                    onClick={() => {
                      router.push("/applyAd");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </LogoBox>
            </Box1>
          </Inner>
        </MainLink>
        {/*========================== 서브 메뉴 ==================================== */}
        {linklist ? (
          <SubMenuBar type={String(sub)} num={num} now={now} />
        ) : null}
      </Wrapper>
    </>
  );
};

export default WebHeader;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  background: transparent;
  border: none;
  box-sizing: border-box;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const MainLink = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 900pt;
  height: 100%;
`;

const Box1 = styled.div`
  display: flex;
  height: 70pt;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 54pt;

  @media (max-width: 899.25pt) {
    margin-left: 20px;
  }
`;
