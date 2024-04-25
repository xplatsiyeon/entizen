import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';

const CommonConfirmModal = ({ open, onClose, onConfirm, title = '', content = '', useCancelBtn = true}: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle style={{fontSize: "16px"}}>{title}</DialogTitle>
      <CustomDialogContent>
        {content} 
      </CustomDialogContent>
      <DialogActions style={{ justifyContent: 'center', padding: '0 34px 20px 34px' }}>
        {
            useCancelBtn && (
                <CancelButton onClick={onClose} variant="contained">
                    취소
                </CancelButton>
            )
        }
        <ConfirmButton onClick={onConfirm} variant="contained">
            확인
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};

const CustomDialogContent = styled(DialogContent)`
    color: #222 !important;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px !important;
    letter-spacing: -0.32px;
    word-break: keep-all;
`
const CancelButton = styled(Button)`
    width: 50%;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    background: #E2E5ED;
    color: #595757;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    letter-spacing: -0.32px;
    box-shadow: none;
`
const ConfirmButton = styled(Button)`
    width: 50%;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    background: #5221CB;
    color: #FFF;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.32px;
    box-shadow: none;
`


CommonConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.any,
  useCancelBtn: PropTypes.bool,
};

export default CommonConfirmModal;
