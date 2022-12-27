import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { api, getApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import {
  ComUserData,
  ProjectList,
  Quotations,
  UserData,
  CompanyPreQuotationResponse,
  ASListResponse,
  UserChattingListResponse,
  EntizenLibraryResponse,
  AdminTermsListResponse,
  AdminNoticeListResponse,
} from 'types/tableDataType';
import { adminDateFomat, dateFomat, hyphenFn } from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { adminReverseAction } from 'storeAdmin/adminReverseSlice';
import {
  dropDownValueEn,
  dropDownValue,
} from '../componentsAdmin/Adminterms/AdminTermsEditor';

// 공지사항 목데이터
import { ADMINNOTICE } from '../componentsAdmin/AdminNotice/ADMINNOTICE';

import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';
import { CoPresentSharp } from '@mui/icons-material';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  selectedFilter?: number;
  userSearch?: string;
  setAfterSalesServiceIdx?: React.Dispatch<React.SetStateAction<number>>;
  commonBtn: string;
  handleCommon: () => void;
  onClickToggle?: (id: number) => void;
};

type NewSell = {
  name: boolean;
  id: number;
};

const Table = ({
  setIsDetail,
  setDetailId,
  tableType,
  detatilId,
  selectedFilter,
  pickedDate,
  userSearch,
  setAfterSalesServiceIdx,
  commonBtn,
  handleCommon,
  onClickToggle,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  // 오늘 날짜.
  const today = new Date();
  console.log(adminDateFomat(String(today)));

  // 역경매 견적서 보기에 넘겨줄 아이디값
  const dispatch = useDispatch();
  const [preQuotationIdx, setPreQuotationIdx] = useState<number>();

  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  //  유저 데이터
  const { data: userData, refetch: userDataRefetch } = useQuery<UserData>(
    'userInfo',
    () =>
      getApi(
        `/admin/members/users?page=${page}&limit=10&startDate=${
          pickedDate ? pickedDate[0] : '2022-09-05'
        }&endDate=${pickedDate ? pickedDate[1] : today}&searchType=${
          changeSearchType[selectedFilter!]
        }&searchKeyword=${userSearch}`,
      ),
    {
      enabled: false,
      onSuccess: (userData) => {
        if (tableType === 'userData') {
          console.log('userData');
          const temp: any = [];
          userData?.data?.members.forEach((ele, idx) => {
            const arrEle = [
              `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                idx + 1 === 10 ? page * 10 : idx + 1
              }`,
              ele.id,
              ele.name,
              hyphenFn(ele.phone),
              dateFomat(ele.createdAt),
              ele.memberIdx,
            ];
            temp.push(arrEle);
          });
          setDataArr(temp);
          setColumns([
            { name: '번호', width: '5%' },
            { name: '아이디', width: '20%' },
            { name: '이름', width: '10%' },
            { name: '전화번호', width: '10%' },
            ,
            {
              name: '가입날짜',
              width: '30%',
            },
            {
              name: '',
              id: 'userDetail',
              formatter: (cell: string) =>
                _(
                  <button
                    className="detail"
                    onClick={() => {
                      setDetailId(cell?.toString()!);
                      setIsDetail(true);
                    }}
                  >
                    보기
                  </button>,
                ),
            },
          ]);
          setLength(
            userData?.data?.totalCount ? userData?.data?.totalCount : 0,
          );
        }
      },
      onError: (error) => alert('다시 시도해주세요'),
    },
  );
  // 회사 데이터
  const { data: comUserData, refetch: comUserDataRefetch } =
    useQuery<ComUserData>(
      'comUserInfo',
      () =>
        getApi(
          `/admin/members/companies?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}&searchType=${
            changeSearchType[selectedFilter!]
          }&searchKeyword=${userSearch}`,
        ),
      {
        enabled: false,
        onSuccess: (comUserData) => {
          if (tableType === 'comUserData') {
            console.log('comuserData');
            const temp: any = [];
            comUserData?.data?.members.forEach((ele, idx) => {
              const arrEle = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele?.companyMemberAdditionalInfo?.companyName!,
                ele.id,
                ele.name,
                ele?.companyMemberAdditionalInfo?.managerEmail,
                hyphenFn(ele.phone),
                ele?.isAdminJoinApproved,
                dateFomat(ele.createdAt),
                `${ele.deletedAt ? dateFomat(ele.deletedAt) : '-'}`,
                ele.memberIdx,
              ];
              temp.push(arrEle);
            });

            setDataArr(temp);
            setColumns([
              '번호',
              '기업명',
              '아이디',
              '담당자',
              '이메일',
              '전화번호',
              {
                name: '승인',
                formatter: (cell: string) =>
                  _(
                    <select defaultValue={cell}>
                      <option value="true">승인</option>
                      <option value="false">미숭인</option>
                    </select>,
                  ),
              },
              {
                name: '가입날짜',
                width: '15%',
              },
              {
                name: '탈퇴날짜',
                width: '15%',
              },
              {
                name: '',
                id: 'company-userDetail',
                width: '10%',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(
              comUserData?.data?.totalCount ? comUserData.data.totalCount : 0,
            );
            return temp;
          }
        },
      },
    );

  // 간편견적의 가견적 리스트 조회
  const { data: companyPreQuotation, refetch: companyPreQuotationRefetch } =
    useQuery<CompanyPreQuotationResponse>(
      'companyPreQuotation',
      () =>
        getApi(
          `/admin/quotations/quotation-requests/${detatilId}/pre-quotations`,
        ),
      {
        enabled: false,
        onSuccess: (companyPreQuotation) => {
          const totalLength = companyPreQuotation?.data?.preQuotations;

          if (tableType === 'companyPreQuotation') {
            const temp: any = [];
            companyPreQuotation?.data?.preQuotations?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 ? '' : page - 1}${
                  idx + 1 === page * 10 ? 0 : idx + 1
                }`,

                ele.member.companyMemberAdditionalInfo.companyName!,
                ele.member.id,
                ele.member.name,
                hyphenFn(ele.member.phone),
                ele.member.companyMemberAdditionalInfo.managerEmail!,
                dateFomat(ele.createdAt),
                `${
                  ele.finalQuotation?.project?.isCompletedContractStep !==
                    null &&
                  ele.finalQuotation?.project?.isCompletedContractStep ===
                    'COMPLETION'
                    ? '계약완료'
                    : '-'
                }`,
                ele?.preQuotationIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '기업명',
              '아이디',
              '담당자',
              '전화번호',
              '이메일',
              '신청일자',
              '채택여부',

              {
                name: '',
                formatter: (cell: number) =>
                  _(
                    <div>
                      <button className="button">삭제</button>
                      <button
                        className="button"
                        onClick={() => {
                          dispatch(adminReverseAction.setDate(cell));
                          dispatch(adminReverseAction.setIsCompanyDetail(true));
                        }}
                      >
                        보기
                      </button>
                    </div>,
                  ),
              },
            ]);
            setLength(
              totalLength === undefined
                ? 0
                : companyPreQuotation?.data?.preQuotations?.length,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );
  // 견적 리스트 데이터
  const { data: quetationListData, refetch: quetationListRefetch } =
    useQuery<Quotations>(
      'quetationList',
      () =>
        getApi(
          `/admin/quotations/quotation-requests?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}`,
        ),
      {
        enabled: false,
        onSuccess: (quetationListData) => {
          if (tableType === 'quetationListData') {
            const temp: any = [];
            quetationListData?.data.quotationRequests.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.badge!,
                ele?.member?.id!,
                ele.installationAddress!,
                dateFomat(ele.createdAt!),
                ele.quotationRequestIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '진행상태',
              '작성자(아이디)',
              '견적제목',
              '작성날짜',
              {
                name: '',
                id: 'quetationListData',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(
              quetationListData.data.totalCount
                ? quetationListData.data.totalCount
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );
  // 프로젝트 리스트 데이터
  const { data: projectListData, refetch: projectListRefetch } =
    useQuery<ProjectList>(
      'projectList',
      () =>
        getApi(
          `/admin/projects?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}`,
        ),
      {
        enabled: false,
        onSuccess: (projectListData) => {
          if (tableType === 'projectListData') {
            const temp: any = [];
            projectListData?.data?.projects.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.projectNumber!,
                ele.userMember.id!,
                ele.companyMember.id!,
                ele.currentStep!,
                ele.projectName,
                dateFomat(ele.createdAt),
                ele.projectIdx!,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '프로젝트 번호',
              '작성자(아이디)',
              '기업회원(아이디)',
              '진행단계',
              '프로젝트_제목',
              '프로젝트_생성일',
              {
                name: '',
                id: 'projectListData',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(
              projectListData.data.totalCount
                ? projectListData.data.totalCount
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // as 관련 데이터
  // /admin/after-sales-services?page=1&limit=10&startDate=2022-01-01&endDate=2022-12-22&searchKeyword=test6000
  // afterSalesServices
  const { data: asData, refetch: asRefetch } = useQuery<ASListResponse>(
    'asData',
    () =>
      getApi(
        `/admin/after-sales-services?page=${page}&limit=10&startDate=${
          pickedDate ? pickedDate[0] : '2022-10-01'
        }&endDate=${pickedDate ? pickedDate[1] : '2022-12-15'}`,
      ),
    {
      enabled: false,
      onSuccess: (asData) => {
        if (tableType === 'asData') {
          const temp: any = [];
          asData?.data?.afterSalesServices?.forEach((ele, idx) => {
            const eleArr = [
              `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                idx + 1 === 10 ? page * 10 : idx + 1
              }`,
              ele.currentStep,
              ele.project.projectNumber!,
              ele.project.userMember.id!,
              ele.project.companyMember.id,
              dateFomat(ele.createdAt),
              ele.afterSalesServiceIdx,
            ];
            temp.push(eleArr);
          });
          setDataArr(temp);
          setColumns([
            '번호',
            '진행단계',
            '프로젝트번호',
            '작성자(아이디)',
            '기업회원(아이디)',
            'A/S요청일',
            {
              name: '',
              id: 'quetationList-Detail',
              formatter: (cell: string) =>
                _(
                  <button
                    className="detail"
                    onClick={() => {
                      setDetailId(cell);
                      setIsDetail(true);
                      if (setAfterSalesServiceIdx) {
                        setAfterSalesServiceIdx(Number(cell));
                      }
                    }}
                  >
                    보기
                  </button>,
                ),
            },
          ]);
          setLength(asData.data.totalCount ? asData.data.totalCount : 0);
        }
      },
      onError: () => alert('다시 시도해주세요'),
    },
  );

  // 소통하기 UserListapi 들어갈 자리임
  // /admin/chatting/members?page=1&limit=10&startDate=2022-12-19&endDate=2022-12-19

  const { data: userChatting, refetch: userChattingRefetch } =
    useQuery<UserChattingListResponse>(
      'userChatting',
      () =>
        getApi(
          `/admin/chatting/members?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-10-01'
          }&endDate=${pickedDate ? pickedDate[1] : '2022-12-15'}`,
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
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '일반회원(아이디)',
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
                          if (setAfterSalesServiceIdx) {
                            setAfterSalesServiceIdx(Number(cell));
                          }
                        }}
                      >
                        엑셀 다운로드
                      </button>
                      <button
                        className="detail"
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                          setDetailId(cell);
                          setIsDetail(true);
                          if (setAfterSalesServiceIdx) {
                            setAfterSalesServiceIdx(Number(cell));
                          }
                        }}
                      >
                        삭제
                      </button>
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

  // 도서관 리스트 조회
  // /admin/libraries?page=1&limit=10&startDate=2022-12-01&endDate=2022-12-31&searchKeyword=

  const { data: entizenLibrary, refetch: entizenLibraryRefetch } =
    useQuery<EntizenLibraryResponse>(
      'entizenLibrary',
      () =>
        getApi(
          `/admin/libraries?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}`,
        ),
      {
        enabled: false,
        onSuccess: (entizenLibrary) => {
          console.log(entizenLibrary);
          if (tableType === 'entizenLibrary') {
            const temp: any = [];
            entizenLibrary?.data?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.imageUrl,
                ele.title,
                ele.link,
                dateFomat(ele.createdAt),
                ele.libraryIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              {
                name: '이미지',
                width: '10%',
                id: 'entizenLibraryImg',
                formatter: (cell: string) =>
                  _(
                    <LibraryImage>
                      <img
                        src={cell}
                        alt="library"
                        style={{
                          objectFit: 'cover',
                          width: '82px',
                          height: '82px',
                        }}
                      />
                    </LibraryImage>,
                  ),
              },
              {
                name: '제목',
                width: '20%',
                id: 'entizenLibraryTitle',
                formatter: (cell: string) =>
                  _(
                    <TitleBox>
                      <p>{cell}</p>
                    </TitleBox>,
                  ),
              },
              {
                name: '링크',
                width: '20%',
                id: 'entizenLibraryLink',
                formatter: (cell: string) => _(<LinkBox>{cell}</LinkBox>),
              },
              '등록일',
              {
                name: '',
                id: 'entizenLibrary',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(entizenLibrary.data ? entizenLibrary.data.length : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  //파트너 등록 제품
  const partnerProduct = [
    '번호',
    '업체명',
    '제조사명',
    {
      name: '이미지',
      formatter: (cell: string) => _(<img src={cell} alt="image" />),
    },
    { name: '충전모달', width: '10%' },
    { name: '충전방식모달', width: '10%' },
    '체널',
    '담당자',
    { name: '담당자연락처', width: '10%' },
    { name: '등록일', width: '10%' },
    {
      name: '',
      id: 'PP-detail',
      formatter: (cell: string) =>
        _(
          <button
            className="detail"
            onClick={() => {
              setDetailId(cell);
              setIsDetail(true);
            }}
          >
            보기
          </button>,
        ),
    },
  ];

  // 약관 리스트
  // /admin/terms
  const { data: termsList, refetch: termsListRefetch } =
    useQuery<AdminTermsListResponse>(
      'termsList',
      () => getApi(`/admin/terms?${page}&limit=10`),
      {
        enabled: false,
        onSuccess: (termsList) => {
          if (tableType === 'termsList') {
            const temp: any = [];
            termsList?.data?.terms?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                dropDownValue[dropDownValueEn.indexOf(ele.type)],
                dateFomat(ele.createdAt),
                ele.termIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '약관명',
              '등록일',
              {
                name: '',
                id: 'termsListIdx',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(termsList?.data ? termsList?.data?.terms?.length : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // 공지사항 리스트
  const { data: adminNoticeList, refetch: adminNoticeListRefetch } =
    useQuery<AdminNoticeListResponse>(
      'adminNoticeList',
      () => getApi(`/admin/notices`),
      // () => ADMINNOTICE,
      {
        enabled: false,
        onSuccess: (adminNoticeList) => {
          if (tableType === 'adminNoticeList') {
            const temp: any = [];
            ADMINNOTICE?.data?.notices?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ,
                ele.title,
                {
                  name: ele.isVisible,
                  id: ele.noticeIdx,
                },
                dateFomat(ele.createdAt),
                ele.noticeIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '공지사항',
              {
                name: '노출여부',
                id: 'noticeVisible',
                formatter: ({ name, id }: NewSell) =>
                  _(
                    <ToggleContainer>
                      <ToggleBtn
                        onClick={() => {
                          if (onClickToggle) {
                            onClickToggle(id);
                          }
                        }}
                        cell={name}
                      >
                        <Circle cell={name} />
                      </ToggleBtn>
                    </ToggleContainer>,
                  ),
              },
              '등록일',
              {
                name: '',
                id: 'noticeIdx',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(ADMINNOTICE?.data ? ADMINNOTICE?.data?.totalCount : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  useEffect(() => {
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;

      case 'comUserData':
        comUserDataRefetch();
        break;

      case 'quetationListData':
        quetationListRefetch();
        break;

      case 'projectListData':
        projectListRefetch();
        break;

      case 'companyPreQuotation':
        companyPreQuotationRefetch();
        break;

      case 'asData':
        asRefetch();
        break;

      case 'userChatting':
        userChattingRefetch();
        break;

      case 'entizenLibrary':
        entizenLibraryRefetch();
        break;

      case 'termsList':
        termsListRefetch();
        break;

      case 'adminNoticeList':
        adminNoticeListRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, [entizenLibrary]);

  useEffect(() => {
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;
      case 'comUserData':
        comUserDataRefetch();
        break;
      case 'quetationListData':
        quetationListRefetch();
        break;
      case 'projectListData':
        projectListRefetch();
        break;
      case 'companyPreQuotation':
        companyPreQuotationRefetch();
        break;

      case 'asData':
        asRefetch();
        break;

      case 'userChatting':
        userChattingRefetch();
        break;

      case 'entizenLibrary':
        entizenLibraryRefetch();
        break;

      case 'termsList':
        termsListRefetch();
        break;

      case 'adminNoticeList':
        adminNoticeListRefetch();
        break;
    }
  }, [page, pickedDate, userSearch]);

  useEffect(() => {
    console.log('preQuotationIdx------->>> 🔥' + preQuotationIdx);
  }, [preQuotationIdx]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>{' '}
        <Button
          onClick={() => {
            handleCommon();
          }}
        >
          {commonBtn}
        </Button>
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

export default React.memo(Table);

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

const Button = styled.button`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #747780;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 3px 6px;
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

const ToggleBtn = styled.button<{ cell: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${({ cell }) => (cell === true ? '#FFC043' : '#747780')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div<{ cell: boolean }>`
  background-color: white;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  right: ${({ cell }) => (cell === true ? '10%' : '50%')};
  transition: all 0.5s ease-in-out;
  ${({ cell }) =>
    !cell &&
    css`
      transition: all 0.5s ease-in-out;
    `}
`;
