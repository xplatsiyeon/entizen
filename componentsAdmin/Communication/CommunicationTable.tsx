import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { api, getApi, isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import {
  UserChattingListResponse,
  OneOnOneChatResponse,
} from 'types/tableDataType';
import {
  adminDateFomat,
  dateFomat,
  convertKo,
  adminNoPickDateFomat,
} from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { NewCell } from '../AdminInformationNotify/AdminNotice/AdminNoticeList';
import { userCheckBox, userCheckBoxEn } from './OneOnOneQuestion';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';
import { CoPresentSharp } from '@mui/icons-material';
import { excelDownloadFile } from 'hooks/excelDown';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  setUserType?: React.Dispatch<React.SetStateAction<string>>;
  setMemberIdx?: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  userSearch?: string;
  commonBtn?: string;
  excelUrl?: string;
  hide?: boolean;
  commuCheck?: string;
  userCheck?: string;
  isRefetch?: boolean;
  unRead?: string[];
};

const CommunicationTable = ({
  setIsDetail,
  setDetailId,
  setUserType,
  setMemberIdx,
  tableType,
  detatilId,
  pickedDate,
  userSearch,
  commonBtn,
  excelUrl,
  hide,
  commuCheck,
  userCheck,
  isRefetch,
  unRead,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  // 오늘 날짜.
  const today = new Date();
  // console.log(adminNoPickDateFomat(String(today)));

  // 역경매 견적서 보기에 넘겨줄 아이디값
  const dispatch = useDispatch();

  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */
  // 🎀 소통하기 리스트 조회
  // /admin/chatting/members?page=1&limit=10&startDate=2022-12-19&endDate=2022-12-19
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  const { data: userChatting, refetch: userChattingRefetch } =
    useQuery<UserChattingListResponse>(
      'userChatting',
      () =>
        isTokenAdminGetApi(
          `/admin/chatting/members?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${
            pickedDate ? pickedDate[1] : adminNoPickDateFomat(String(today))
          }`,
        ),
      {
        enabled: false,
        onSuccess: (userChatting) => {
          if (tableType === 'userChatting') {
            const temp: any = [];
            userChatting?.data?.chattingRooms?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.userMember.id,
                ele.companyMember.id,
                dateFomat(ele.chattingRoom.chattingLog.createdAt),
                ele?.chattingRoom?.chattingRoomIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '일반회원(이메일)',
              '기업회원(아이디)',
              '최종 수정일',
              {
                name: '',
                id: 'userChatting',
                formatter: (cell: string) =>
                  _(
                    <>
                      <button
                        className="detail"
                        onClick={() => {
                          setDetailId(cell);
                          setIsDetail(true);
                          excelDownloadFile(excelUrl!, accessToken);
                        }}
                      >
                        엑셀 다운로드
                      </button>
                      {/* <button
                        className="detail"
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                          setDetailId(cell);
                          setIsDetail(true);
                          alert('개발중입니다.');
                        }}
                      >
                        삭제
                      </button> */}
                    </>,
                  ),
              },
            ]);
            setLength(
              userChatting.data.totalCount ? userChatting.data.totalCount : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // 🎀 소통하기  1:1 문의
  // /admin/chatting/consultations?page=1&limit=10&searchId=test&memberType=company

  const { data: userChattingOneOnOne, refetch: userChattingOneOnOneRefetch } =
    useQuery<OneOnOneChatResponse>(
      'userChattingOneOnOne',
      () =>
        isTokenAdminGetApi(
          `/admin/chatting/consultations?page=${page}&limit=10&searchId=${userSearch}&memberType=${userCheck?.toLowerCase()}&consultStatus=${commuCheck}&${
            unRead?.length === 0 ? 'unreadStatus=all' : 'unreadStatus=unread'
          }`,
          //`/admin/chatting/consultations?page=${page}&limit=10&searchId=${userSearch}&memberType=${userCheck?.toLowerCase()}&consultStatus=${commuCheck}`,
        ),
      {
        enabled: false,
        onSuccess: (userChattingOneOnOne) => {
          if (tableType === 'userChattingOneOnOne') {
            const temp: any = [];
            userChattingOneOnOne?.data?.consultations?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                convertKo(userCheckBox, userCheckBoxEn, ele.memberType),
                ele.memberId,
                ele.consultStatus + (ele.isUnread ? '(읽지않음)' : ''),
                ele.unreadCount === 0 ? ' - ' : ele.unreadCount,
                [String(ele.chattingRoomIdx), ele.memberType, ele.memberIdx],
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '구분',
              '아이디',
              '상담 상태',
              '읽지않은 채팅',
              {
                name: '',
                id: 'userChatting',
                formatter: (cell: [string, string, string]) =>
                  _(
                    <button
                      className="detail"
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        setDetailId(cell[0]);
                        setIsDetail(true);
                        if (setUserType) setUserType(cell[1]);
                        if (setMemberIdx) {
                          setMemberIdx(cell[2]);
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(
              userChattingOneOnOne.data
                ? userChattingOneOnOne.data.consultations.length
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  useEffect(() => {
    switch (tableType) {
      case 'userChatting':
        userChattingRefetch();
        break;

      case 'userChattingOneOnOne':
        userChattingOneOnOneRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, []);

  useEffect(() => {
    switch (tableType) {
      case 'userChatting':
        userChattingRefetch();
        break;

      case 'userChattingOneOnOne':
        userChattingOneOnOneRefetch();
        break;
    }
  }, [page, pickedDate, userSearch, userCheck, commuCheck, unRead]);

  useEffect(() => {
    if (isRefetch) {
      userChattingOneOnOneRefetch();
    }
  }, [isRefetch]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>{' '}
        {/* <Button
          onClick={() => {
            handleCommon();
          }}
          hide={hide}
        >
          {commonBtn}
        </Button> */}
      </FlexBox>
      {dataArr.length > 0 && columns.length > 0 ? (
        <Div>
          <Grid
            data={() => {
              //화면의 덜컹거림을 줄이기 위해서 0.1초 기다림( =>setState들로 인한 페이지 전환 다 끝난 후 데이터 삽입).
              return new Promise((resolve) => {
                setTimeout(() => resolve(dataArr), 130);
              });
            }}
            columns={columns}
          />
        </Div>
      ) : (
        <Div></Div>
      )}
      <WrapPage>
        <Pagination
          prev
          next
          size="md"
          total={length ? length : 0}
          limit={10}
          maxButtons={5}
          activePage={page}
          onChangePage={setPage}
        />
      </WrapPage>
    </StyledBody>
  );
};

export default React.memo(CommunicationTable);

const StyledBody = styled.div`
  margin: 32px 0 0;
  min-width: 1200px;
  .hidden {
    visibility: hidden;
  }
  table {
    width: 100%;
    text-align: center;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;

    thead {
      font-weight: 500;
      background: lightgray;
      .gridjs-th-content {
        padding: 8px 0;
      }
    }
    tbody {
      font-weight: 400;

      tr {
        td {
          padding: 8px 0;
          position: relative;
        }
      }
    }
    .gridjs-loading {
      min-width: 1200px;
      height: 490px;
      color: white;
    }

    .detail {
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      text-align: center;
      color: #747780;
      background: #e2e5ed;
      border: 1px solid #747780;
      padding: 3px 19px;
      border-radius: 4px;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const P = styled.p``;

const Button = styled.button<{ hide?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #747780;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 3px 6px;
  display: ${({ hide }) => hide && 'none'};
`;

const WrapPage = styled.div`
  margin: 50px auto;

  .rs-pagination-group {
    justify-content: center;
  }

  .rs-pagination-btn {
    color: lightgrey;
    border: none;
    &.rs-pagination-btn-active {
      color: black;
      &:focus {
        color: black;
      }
    }
  }
`;

const Div = styled.div`
  min-width: 1200px;
  height: 490px;
`;

const BtnGap = styled.div`
  display: flex;
  gap: 10px;
`;

const LibraryImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleBox = styled.div`
  background-color: #fbfcff;
  border: 1px solid #e2e5ed;
  padding: 8px 10px;
  width: 200px;
  height: 82px;
  overflow-y: scroll;
  text-align: center;

  display: flex;
  align-items: center;
`;

const LinkBox = styled.div`
  background-color: #fbfcff;
  border: 1px solid #e2e5ed;
  padding: 8px 10px;
  width: 394px;
  height: 82px;
  overflow-y: scroll;
  text-align: center;
  display: flex;
  align-items: center;
`;

const ToggleContainer = styled.div`
  position: absolute;
  left: 44%;
  top: 30%;
`;

const ToggleBtn = styled.button<{ visible?: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${({ visible }) => (visible ? '#ffc043' : '#747780')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Circle = styled.div<{ visible?: boolean }>`
  background-color: white;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  right: ${({ visible }) => (visible ? '10%' : '55%')};
  transition: all 0.5s ease-in-out;
`;
