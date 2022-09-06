import styled from '@emotion/styled';
import colors from '../../styles/colors';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import Header from 'components/header';

export default function findingId1() {
  return (
    <>
      <Header />
      <Box sx={{}}></Box>
      <Container>
        <label>이름</label>
        <TextField />
      </Container>
      <Container>
        <label>휴대폰 인증</label>
        <Box>
          <Button>SKT</Button>
          <Button>KT</Button>
          <Button>LGU+</Button>
          <Button>알뜰폰</Button>
        </Box>
        <TextField />
        <TextField />
      </Container>
      <Button>확인</Button>
    </>
  );
}
