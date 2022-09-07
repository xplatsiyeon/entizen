import styled from '@emotion/styled';
import colors from 'styles/colors';

interface Props {
  placeholder: string;
  [key: string]: any; // 필요한 props 작성하세요.
}

const Input = ({ placeholder }: Props) => {
  return (
    <>
      <Box type="text" placeholder={placeholder} />
    </>
  );
};
export default Input;

const Box = styled.input`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  /* margin: 9pt 15pt 0 15pt; */
  margin-top: 9pt;
  padding: 13.5pt 0;
  padding-left: 12pt;
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  :hover {
    outline: 2pt solid ${colors.main};
    border-radius: 0;
  }
`;
