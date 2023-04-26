import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { isTokenGetApi } from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import colors from 'styles/colors';
import { adminDateFomat } from 'utils/calculatePackage';
import { useMediaQuery } from 'react-responsive';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import { useDispatch } from 'react-redux';

type NoticeResponse = {
  isSuccess: boolean;
  data: {
    createdAt: string;
    noticeIdx: number;
    title: string;
    content: string;
  };
};

type Props = {
  noticesIdx: string | string[];
};

export default function AlarmDetail({ noticesIdx }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });
  // 공지사항 내용 상세 조회
  const {
    data: notice,
    isLoading: noticeIsLoading,
    isError: noticeIsError,
    refetch: noticeIsRefetch,
  } = useQuery<NoticeResponse>(
    'notices/noticeIdx',
    () => isTokenGetApi(`/notices/${router.query.noticesIdx}`),
    {
      enabled: router.isReady,
      onSuccess(data) {
        console.log('🔥 data : ', data);
      },
    },
  );

  return (
    <>
      <Title>{notice?.data?.title}</Title>
      <Date>{adminDateFomat(notice?.data?.createdAt!)}</Date>
      <Line></Line>
      <BodyContainer>
        <p className="contents">{notice?.data?.content}</p>
      </BodyContainer>
      {!mobile && (
        <ListButton
          onClick={() => {
            router.push('/alarm');
            dispatch(alarmNumberSliceAction.setalarmNumberSlice(1));
          }}
        >
          <span>목록으로 돌아가기</span>
        </ListButton>
      )}
    </>
  );
}

const Title = styled.p`
  font-weight: 700;
  font-size: 13.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 25.5pt;
  color: ${colors.main2};
`;
const Date = styled.div`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 9pt;
  color: #caccd1;
`;
const Line = styled.div`
  padding-top: 18pt;
  border-bottom: 1px solid #e2e5ed;
  transform: rotate(0deg);
`;
const BodyContainer = styled(Box)`
  padding: 30pt 15pt 0 15pt;
  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .contents {
    font-weight: 400;
    font-size: 12pt;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    padding-top: 9pt;
    color: ${colors.main2};
  }
`;
const ListButton = styled.div`
  padding: 9pt 15pt;
  background: #5221cb;
  border-radius: 21.75pt;
  margin: 60pt auto 0;
  width: 108pt;
  cursor: pointer;
  & span {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: white;
  }
`;
