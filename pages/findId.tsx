import styled from '@emotion/styled';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

type Props = {};

const findId = (props: Props) => {
  const findAccountTypeList: string[] = ['아이디 찾기', '비밀번호 찾기'];
  return (
    <React.Fragment>
      <Container
        disableGutters
        sx={{ width: '100%', overflow: 'scroll !important' }}
      >
        <Container
          disableGutters
          sx={{
            width: '100%',
            paddingTop: '9pt',
            paddingBottom: '9pt',
            paddingLeft: '15pt',
            paddingRight: '15pt',
          }}
        >
          <BackBtn src="/images/back-btn.svg" />
        </Container>
        <Container
          disableGutters
          sx={{
            width: '100%',
            paddingLeft: '9pt',
            paddingRight: '9pt',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: '6pt',
            }}
          >
            {findAccountTypeList.map((loginType, index) => (
              <Box key={index} sx={{ marginRight: '24pt' }}>
                <Typography
                  variant="h6"
                  key={index}
                  onClick={() => {
                    // setSelectedLoginType(index);
                  }}
                  sx={{
                    fontWeight: '700',
                    fontSize: '12pt',
                    lineHeight: '15pt',
                    padding: '6pt',
                    letterSpacing: '-0.02em',
                    // color: selectedLoginType == index ? '#5A2DC9' : '#CACCD1',
                  }}
                >
                  {loginType}
                </Typography>
                <Box
                  sx={{
                    width: '3pt',
                    height: '3pt',
                    // background: selectedLoginType == index ? '#5A2DC9' : '#fff',
                    margin: '6pt auto 0 auto',
                    borderRadius: '100%',
                  }}
                ></Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
};

const BackBtn = styled.img`
  margin: auto 0;
`;

export default findId;
