import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import colors from 'styles/colors';
import Link from 'next/link';

type Props = {
  type: string;
  num?: number;
  now?: string;
};

const GuideLink = ({ type, num, now }: Props) => {
  //나중에 이름 수정.
  const router = useRouter();
  let linkName: string[];
  let linkUrl: string[];

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
        `/guide/1-1`,
        `/guide/1-4`,
        '/guide/1-5',
        '/guide/1-2-4',
        '/guide/1-3',
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

  return (
    <Wrap>
      {linkName.map((i, idx) => {
        return (
          <StyledLink
            key={idx}
            className={num === idx && type === now ? 'on' : undefined}
            onClick={() => handleLink(idx)}
          >
            {i}
          </StyledLink>
        );
      })}
    </Wrap>
  );
};

export default GuideLink;

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
  &:hover {
    border-bottom: 3pt solid #5a2dc9;
    box-sizing: border-box;
  }
  &.on {
    border-bottom: 3pt solid #5a2dc9;
    box-sizing: border-box;
  }
`;
