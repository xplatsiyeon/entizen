import styled from '@emotion/styled';
import WhyEntizenHorizontal from 'components/Main/WhyEntizenHorizontal';
import MypageHeader from 'components/mypage/request/header';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useQuery as reactQuery } from 'react-query';
import Loader from 'components/Loader';
import Image from 'next/image';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import colors from 'styles/colors';
import { changeDataFn } from 'utils/calculatePackage';
import CheckImg from '/public/images/CheckCircle.svg';
import { isTokenGetApi } from 'api';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';

const FinPage = () => {
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  const type = router.query.id;

  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);

  // 제휴문의 채팅방 보내기
  // 'chatting-list' 타입에러 나는데 이유를 모르겠음,
  const {
    data: chat,
    isLoading: chatLoading,
    error: chatError,
    refetch: chatRefetch,
  } = reactQuery<ChattingListResponse>('chatting-list', () =>
    isTokenGetApi(`/chatting?searchKeyword&filter=all`),
  );

  const chattingRoomIdx =
    chat?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx;

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: routerId!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  console.log(routerId);

  if (projectLoading) {
    return <Loader />;
  }
  if (projectError) {
    console.log('프로젝트 에러 발생');
    console.log(projectError);
  }

  console.log(projectData?.project?.isApprovedByAdmin);
  // const HandleOnClick = () => {
  //   if (type === 'commu') {
  //     const id = projectData?.project.companyMember.memberIdx;
  //     router.push(`/chatting/${id}`);
  //   } else {
  //     router.push('/mypage');
  //   }
  // };

  //  'chatting-list' 타입에러 해결하면 이걸로 onClick링크 이동
  // 여기 조건문이 제대로 작동 안함
  const HandleOnClick = () => {
    if (type === 'commu') {
      const id = projectData?.project.companyMember.memberIdx;
      router.push(`/chatting/${id}`);
    } else if (projectData?.project?.isApprovedByAdmin === false) {
      router.push({
        pathname: `/chatting/chattingRoom`,
        query: {
          chattingRoomIdx: chattingRoomIdx,
          entizen: true,
        },
      });
    } else {
      router.push('/mypage');
    }
  };

  let title: string;
  let date: string;
  let text: string;
  let btnP: string;

  switch (projectData?.project?.isApprovedByAdmin) {
    case false:
      title = '엔티즌에서 프로젝트 확인 후 최종 완료됩니다';
      date = '완료 동의일';
      text = '';
      btnP = '엔티즌과 소통하기';
      break;
    case true:
      title = '축하합니다! \n 충전소 설치가 완료되었습니다!';
      date = '완료일';
      text = "완료 된 프로젝트는 \n'내 충전소’에서 확인이 가능합니다.";
      btnP = '내 충전소 바로가기';
      break;
    default:
      title = '다시시도해주세요';
      date = '';
      text = '';
      btnP = '';
  }
  return (
    <>
      <Body>
        <WebHeader />
        <Inner>
          <MypageHeader
            exitBtn={true}
            handleOnClick={() => router.push('/mypage?id=1')}
          />
          <Wrap>
            <ContainerBox>
              <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
            </ContainerBox>
            <Title>{title}</Title>
            <TextBox>
              <p>{date}</p>
              {!projectData?.project?.isApprovedByAdmin ? (
                <h3>
                  {changeDataFn(
                    projectData?.project?.projectCompletionAgreementDate!,
                  )}
                </h3>
              ) : (
                <h3>
                  {changeDataFn(projectData?.project?.subscribeStartDate!)}
                </h3>
              )}
              <p className="notice">{text}</p>
            </TextBox>
            <Btn onClick={HandleOnClick}>{btnP}</Btn>
          </Wrap>
          <WhyEntizenHorizontal />
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

export default FinPage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 97.5pt auto 90pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const Wrap = styled.div`
  margin: 0 15pt;
  position: relative;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 345pt;
    margin-top: -20pt;
    margin: 0 auto 90pt;
  }
`;

const ContainerBox = styled.div`
  @media (max-width: 899.25pt) {
    margin-top: 94.125pt;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  white-space: pre-wrap;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 30pt;
  text-align: center;
  @media (min-width: 900pt) {
    margin-top: 23.25pt;
  }
`;

const Btn = styled.button`
  box-sizing: border-box;
  background: ${colors.main};
  border-radius: 6pt;
  width: 100%;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 15pt 0;
  margin: 0 0 30pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 3pt;
  padding: 15pt 0;
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
  margin: 90pt 15pt 24pt;
  & > h3 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main};
  }
  & > p {
    white-space: pre-wrap;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: #222222;
  }
  .notice {
    white-space: pre-wrap;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: #747780;
  }
  @media (min-width: 900pt) {
    width: 100%;
    margin: 130.5pt auto 45pt;
  }
`;
