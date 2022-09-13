import styled from '@emotion/styled';
import Header from 'components/header';
import colors from 'styles/colors';
import Btn from 'components/button';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';

const findPassword = () => {
  const [pwInput, setPwInput] = useState<string>('');
  const [pwShow, setPwShow] = useState<boolean>(false);
  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkPw, setCheckPw] = useState<string>('');
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);

  useEffect(() => {
    let num = password.search(/[0-9]/g);
    let eng = password.search(/[a-z]/gi);
    let spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password) {
      if (password.length < 10 || password.length > 20) setCheckedPw(false);
      else if (password.search(/₩s/) != -1) setCheckedPw(false);
      else if (
        (num < 0 && eng < 0) ||
        (eng < 0 && spe < 0) ||
        (spe < 0 && num < 0)
      )
        setCheckedPw(false);
      else setCheckedPw(true);
    }
    if (checkPassword) {
      if (password !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    console.log(password, checkPassword);
  }, [password, checkPassword]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'pw') {
      setPwInput(e.target.value);
    }
    if (e.target.name === 'checkPw') {
      setCheckPw(e.target.value);
    }

    if (pwInput.length > 10 && checkPw === pwInput) {
      setBtnActive(!btnActive);
    }
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };
  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CancelRoundedIcon
          sx={{ color: '#E2E5ED', width: '10.5pt', marginRight: '9pt' }}
        />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
          }}
          variant="subtitle1"
          onClick={() => setPwShow(!pwShow)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };
  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? iconAdorment : {};

  return (
    <Wrapper>
      <Header />
      <Text>새 비밀번호를 설정해주세요</Text>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '45pt',
          width: '100%',
        }}
      >
        <Input
          placeholder="비밀번호 입력"
          onChange={handleIdChange}
          type={pwShow ? 'text' : 'password'}
          value={pwInput}
          name="pw"
          hiddenLabel
          InputProps={iconAdornment}
          onFocus={(e) => setPwSelected(true)}
          onBlur={(e) => setPwSelected(false)}
        />
        {!checkedPw && pwInput.length > 4 ? (
          <Box>
            <Typography
              sx={{
                color: '#F75015',
                fontSize: '9pt',
              }}
            >
              영문,숫자,특수문자 조합 10자 이상
            </Typography>
          </Box>
        ) : (
          <></>
        )}
        <Input
          placeholder="비밀번호 재입력"
          onChange={handleIdChange}
          type={pwShow ? 'text' : 'password'}
          value={checkPw}
          name="checkPw"
          InputProps={secondIconAdornment}
          onFocus={(e) => setCheckPwSelected(true)}
          onBlur={(e) => setCheckPwSelected(false)}
        />
        {!checkSamePw && checkPw.length > 4 ? (
          <Box>
            <Typography
              sx={{
                color: '#F75015',
                fontSize: '9pt',
              }}
            >
              비밀번호를 확인해주세요
            </Typography>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Btn
        isClick={
          checkPw.length > 10 && pwInput.length > 10 && pwInput === checkPw
            ? true
            : false
        }
        marginTop="33.75"
        text={'확인'}
      />
    </Wrapper>
  );
};

export default findPassword;

const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Text = styled.p`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;

const Input = styled(TextField)`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  & input {
    padding: 13.5pt 0 13.5pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
  }

  & .MuiInputBase-root {
    padding-right: 9pt;
  }

  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
`;

// const InputBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   margin-top: 45pt;
// `;
