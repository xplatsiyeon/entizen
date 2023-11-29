import Image from 'next/image';
import { useRouter } from 'next/router';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { Box } from '@mui/system';
import { RadioButtonCheckedSharp, RadioButtonUncheckedSharp } from '@mui/icons-material';
import { Grid, TextField, Select, MenuItem, Checkbox, Button, CircularProgress, Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './form.module.css'; 
import classNames from 'classnames';
import MobileModal from './termsDetail';
import Common from 'components/guide/common';
import CommonBackdrop from '../commonBackdrop';
import TagManager from 'react-gtm-module'


declare global { interface Window { daum: any; } }
interface IAddr { address: string; zonecode: string; }

const EstimateForm = () => {
    const router = useRouter();
    const mobile = useMediaQuery({
      query: '(max-width:899.25pt)',
    });

    const onClickAddr = () => {
      new window.daum.Postcode({
        oncomplete: function (data: IAddr) {
          (document.getElementById("addressInput") as HTMLInputElement).value =
            data.address;
          document.getElementById("addressDetailInput")?.focus();

          setForm({...form, address: data.address});
        },
      }).open();
    };

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => { setModalOpen(true); };
    const handleCloseModal = () => { setModalOpen(false); };

    // values
    const [isComplete, setIsComplete] = React.useState<boolean>(false);
    const [form, setForm] = React.useState<{
      importantFactor?: string | undefined,
      progress?: string | undefined,
      address?: string | undefined,
      addressDetail?: string | undefined,
      phone?: string | undefined,
      email?: string | undefined,
      isAgree?: boolean | undefined,
    }>({});

    // validation
    const validateForm = (formData: any) => {
      if (formData?.importantFactor 
        && formData?.progress 
        && formData?.address 
        && formData?.addressDetail 
        && formData?.phone 
        && formData?.email 
        && formData?.isAgree
        && formData.isAgree
      ) {
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
    }
    const handleChange = (event: any) => {
      const name = event.target.name as keyof typeof form;
      const value = name === 'isAgree' ? event.target.checked : event.target.value;
      const formData = { ...form, [name]: value };
      setForm(formData);

      validateForm(formData);
    }

    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const onClickSubmit = () => {
      setBackdropOpen(true);

      setTimeout(() => {      
        setBackdropOpen(false);
        //GA4 이벤트 전송
        const tagManagerArgs = {
          dataLayer: {
            event: "lead_submit",
          },
        };
        TagManager.dataLayer(tagManagerArgs);
        router.push('/new/estimateForm/complete');
      }, 3000);
    }

    useEffect(() => {
      //GA4 이벤트 전송
      const tagManagerArgsForm = {
        dataLayer: {
          event: "lead_start",
        },
      };
      TagManager.dataLayer(tagManagerArgsForm);
    }, []);

    return (
      <div id="estimateForm" className={styles.estimateForm}>
        <section className={styles.sec_01}>
          <div className={styles.container}>
            <div className={styles.title}>문항에 답하고 한 눈에 비교할 수 있는<br/>맞춤 견적서를 받아보세요</div>
            <div className={styles.form_container}>
              <Box component="form" noValidate onSubmit={()=>{ console.log('submit!')}} sx={{ mt: 3 }}>
                <Grid container spacing={2} columns={1}>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <label>가장 중요하게 보는 요소</label>
                    <Select
                      size="small"
                      id="importantFactorSelect"
                      name="importantFactor"
                      displayEmpty
                      className={styles.input_box}
                      value={form?.importantFactor}
                      placeholder="클릭하여 선택하세요."
                      onChange={handleChange}
                    >
                      <MenuItem value="option_1">설치비용</MenuItem>
                      <MenuItem value="option_2">충전요금</MenuItem>
                      <MenuItem value="option_3">A/S</MenuItem>
                      <MenuItem value="option_4">디자인</MenuItem>
                      <MenuItem value="option_5">편의성</MenuItem>
                      <MenuItem value="option_6">보증기간</MenuItem>
                      <MenuItem value="option_7">업체 신뢰도</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <label>진행 상황</label>
                    <Select
                      size="small"
                      id="progressSelect"
                      name="progress"
                      className={styles.input_box}
                      value={form?.progress}
                      placeholder="클릭하여 선택하세요."
                      onChange={handleChange}
                    >
                      <MenuItem value="step_1">(1단계) 사전 정보 수집</MenuItem>
                      <MenuItem value="step_2">(2단계) 입주민 의견 및 수요 조사</MenuItem>
                      <MenuItem value="step_3">(3단계) 관리 사무소 또는 입대위 건의</MenuItem>
                      <MenuItem value="step_4">(4단계) 입대위 안건 상정</MenuItem>
                      <MenuItem value="step_5">(5단계) 입대위 안건 승인</MenuItem>
                      <MenuItem value="step_6">(기타) 신축 아파트(사용 승인 전)</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <label>설치 희망 상세 주소</label>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <TextField 
                          id="addressInput" 
                          size="small" 
                          placeholder="주소 검색" 
                          disabled
                          className={classNames(styles.input_box, styles.address)}
                          variant="outlined"
                          name="address"
                          value={form?.address}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={2} className={styles.address_btn_grid}>
                        <Button 
                          className={styles.address_btn}
                          variant="contained" 
                          onClick={onClickAddr}
                        >주소 찾기</Button>
                      </Grid>
                    </Grid>
                    <TextField 
                      id="addressDetailInput" 
                      className={styles.input_box} 
                      size="small"
                      placeholder="상세 주소를 입력해주세요." 
                      variant="outlined"
                      name="addressDetail"
                      value={form?.addressDetail}
                      onChange={handleChange} 
                    />
                  </Grid>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <label>연락 가능한 휴대폰 번호</label>
                    <TextField 
                      id="phoneInput" 
                      className={styles.input_box} 
                      size="small"
                      placeholder="텍스트를 입력하세요."
                      variant="outlined" 
                      name="phone"
                      value={form?.phone}
                      onChange={handleChange} 
                    />
                  </Grid>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <label>이메일 주소</label>
                    <TextField 
                      id="emailInput" 
                      className={styles.input_box}
                      size="small" 
                      placeholder="텍스트를 입력하세요."
                      variant="outlined"
                      name="email"
                      value={form?.email}
                      onChange={handleChange}  
                    />
                  </Grid>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <label>개인정보 동의 안내</label>
                    <div className={styles.terms_container}>
                      <div className={styles.terms_check}>
                        <Checkbox 
                          icon={<RadioButtonUncheckedSharp />} 
                          checkedIcon={<RadioButtonCheckedSharp />} 
                          checked={form?.isAgree || false}
                          name="isAgree"
                          onChange={handleChange}  
                        />
                        <span>[필수] 개인정보 수집 및 이용 안내에 대한 동의</span>
                      </div>
                      <div className={styles.terms_detail}><Button className={styles.terms_detail_btn} variant="text" onClick={handleOpenModal}>약관 상세보기</Button></div>
                    </div>
                  </Grid>
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <Button 
                      className={classNames(styles.submit_btn, isComplete && styles.active)}
                      variant="contained" 
                      color="primary" 
                      onClick={onClickSubmit}
                    >견적서 받기</Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          <CommonBackdrop open={backdropOpen} />
          <MobileModal open={modalOpen} onClose={handleCloseModal} />
        </section>
        <section className={styles.sec_02}></section>
      </div>
    )
}

export default EstimateForm;