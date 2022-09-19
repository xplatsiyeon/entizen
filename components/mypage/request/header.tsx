import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';

interface Props {
  title: string;
  cancel?: string;
  handleOnClick?: () => void;
}

const MypageHeader = ({ title, cancel, handleOnClick }: Props) => {
  const route = useRouter();

  return (
    <Header>
      <div className="back-img" onClick={() => route.back()}>
        <Image src={BackImg} alt="btn" />
      </div>
      <span className="text">{title}</span>
      <div className="cancel" onClick={handleOnClick}>
        {cancel}
      </div>
    </Header>
  );
};

export default MypageHeader;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${colors.lightWhite};

  padding: 9pt 15pt;
  .back-img {
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
  .cancel {
    position: absolute;
    font-weight: 500;
    font-size: 12pt;
    right: 15pt;
    line-height: 18pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
`;
