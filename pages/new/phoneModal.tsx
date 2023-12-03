import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { IconButton, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogProps, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CommonModal = ({ open, onClose }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width:899.25pt)' });
    const [phone, setPhone] = useState('');

    const onChangePhone = (event: any) => {
        setPhone(event.target.value);
    }

    const onClickPhoneConfirm = () => {
        if (phone.length === 0) {
            alert('핸드폰 번호를 입력해주세요.');
            return;
        }
        var regPhone= /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (!regPhone.test(phone)) {
            alert('핸드폰 번호를 올바르게 입력해주세요.');
        }
        sessionStorage.setItem('phone_number', phone);
        onClose();
    };

    const CustomDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiPaper-root': {
            height: isMobile ? '70%' : '300px',
            'margin-top': isMobile && 'auto',
            'border-radius': isMobile ? '2.25rem 2.25rem 0rem 0rem' : '1rem',
            background: '#FFF',
        },
    }));

  return (
    <CustomDialog 
        fullScreen={isMobile} 
        open={open} 
        onClose={onClose} 
        fullWidth 
        maxWidth="xs"
      >
        <DialogTitle></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Title>맞춤 견적서의 본인확인을 위해<br/>연락처를 입력해 주세요.</Title>
          <PhoneInput 
            name="test" 
            placeholder="연락처를 입력해 주세요."
            value={phone} 
            onChange={onChangePhone}
            />
          <ConfirmButton onClick={onClickPhoneConfirm}>확인</ConfirmButton>
        </DialogContent>
      </CustomDialog>
  );
};
const Title = styled('div')`
    color: #222;
    font-family: Spoqa Han Sans Neo;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
    letter-spacing: -0.48px;
    margin-bottom: 36px;

    @media only screen and (min-width: 200px) and (max-width: 480px) {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 36px; /* 150% */
        letter-spacing: -0.48px;
    }
`
const PhoneInput = styled('input')`
    width: 386px;
    height: 48px;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #909FB7;
    margin-bottom: 12px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.28px;
    outline: 1px solid #909FB7;
    border-radius: 4px;
    padding: 12px;
    @media only screen and (min-width: 200px) and (max-width: 480px) {
        width: 350px !important;
        font-style: normal;
        font-weight: 400;
        line-height: 14px; /* 87.5% */
        letter-spacing: -0.32px;
        stroke-width: 1px;
        stroke: #909FB7;
        margin-bottom: 152px !important;
    }
`
const ConfirmButton = styled(Button)`
    width: 386px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--Main1, #5221CB);
    color: #FFF;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 100% */
    letter-spacing: -0.32px;
    @media only screen and (min-width: 200px) and (max-width: 480px) {
        width: 350px;
        height: 56px;
        border-radius: 8px;
    }
`

export default CommonModal;
