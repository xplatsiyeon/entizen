import styled from '@emotion/styled';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import { mypageAlertsEn } from 'assets/alerts';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import colors from 'styles/colors';
import { Alerts, AlertsResponse } from 'types/alerts';

type Props = {
  type: string;
  num?: number;
  now?: string;
};

const SubMenuBar = ({ type, num, now }: Props) => {
  const router = useRouter();
  let linkName: string[];
  let linkUrl: string[];

  // 알림 읽은 여부 확인
  const { data } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'alerts',
    () => isTokenGetApi('/v1/alerts/unread-points'),
    {
      select(res) {
        return res.data;
      },
    },
  );
  // 알림 읽음 여부 변경
  const { mutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {},
    onError: () => {},
  });

  console.log('🔥 data : ', data);

  switch (type) {
    case 'guide':
      linkName = [
        '플랫폼 가이드',
        '구독 가이드',
        '충전기 가이드',
        '보조금 가이드',
        '요금정보',
      ];
      linkUrl = [
        `guide/platform`,
        `guide/subscribe`,
        'guide/charger',
        'guide/subsidy',
        'guide/rateInfo',
      ];
      break;
    case 'mypage':
      linkName = ['내 견적서', '내 프로젝트', 'A/S', '내 충전소'];
      break;
    default:
      return <></>;
  }

  const handleLink = (idx: number) => {
    const user = sessionStorage.getItem('USER_ID');
    if (!user) {
      router.push('/signin');
    } else {
      if (type === 'guide') {
        router.push(`/${linkUrl[idx]}`);
      } else if (type === 'mypage' && idx === 0) {
        router.push('/mypage');
      } else {
        router.push({
          pathname: '/mypage',
          query: { id: idx },
        });
      }
    }
  };

  const onClickLink = (idx: number) => {
    handleLink(idx);
  };

  return (
    <Wrap>
      {linkName.map((i, idx) => {
        return (
          <StyledLink
            key={idx}
            className={num === idx && type === now ? 'on' : undefined}
            onClick={() => onClickLink(idx)}
          >
            <Text>
              {i}
              {type === 'mypage' && mypageAlertsEn[idx] ? <BellOnText /> : ''}
            </Text>
          </StyledLink>
        );
      })}
    </Wrap>
  );
};

export default SubMenuBar;

const Wrap = styled.ul`
  width: 900pt;
  height: 44.5pt;
  margin: 0 auto;
`;
const StyledLink = styled.li`
  margin-right: 24pt;
  padding: 15pt 0;
  display: inline-block;
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 13.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  &.on {
    box-sizing: border-box;
    font-weight: 700;
    color: #5a2dc9;
  }
  &:after {
    content: '';
    display: none;
    width: 140%;
    height: 3pt;
    background-color: #5a2dc9;
    position: absolute;
    bottom: -2pt;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 6pt;
  }
  &.on:after {
    display: block;
  }
`;
const Text = styled.span`
  position: relative;
`;

const BellOnText = styled.div`
  background-color: #5221cb;
  width: 4.5pt;
  height: 4.5pt;
  border-radius: 50%;
  position: absolute;
  top: -4.5pt;
  right: -4.5pt;
`;
