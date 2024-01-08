import Image from 'next/image';
import { useRouter } from 'next/router';
import WebHeaderA from 'components/NewHeader/BeforeHeaderA';
import WebHeaderC from 'components/NewHeader/BeforeHeaderC';
import WebHeaderD from 'components/NewHeader/BeforeHeaderD';
import WebHeaderB from 'components/NewHeader/BeforeHeaderB';
import WebFooter from 'componentsWeb/WebFooter';
import { Box } from '@mui/system';
import {
  RadioButtonCheckedSharp,
  RadioButtonUncheckedSharp,
} from '@mui/icons-material';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Button,
  useTheme,
  Theme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './form.module.css';
import classNames from 'classnames';
import MobileModal from './termsDetail';
import CommonBackdrop from '../commonBackdrop';
import TagManager from 'react-gtm-module';
import axios from 'axios';

declare global {
  interface Window {
    daum: any;
  }
}
interface IAddr {
  address: string;
  zonecode: string;
}

const EstimateForm5 = (props: any) => {
  const router = useRouter();

  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const size = isMobile ? 'medium' : 'small';
  const theme = useTheme();

  function getStyles(theme: Theme) {
    return {
      fontWeight: isMobile
        ? theme.typography.htmlFontSize
        : theme.typography.fontWeightMedium,
    };
  }

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        (document.getElementById('addressInput') as HTMLInputElement).value =
          data.address;
        document.getElementById('addressDetailInput')?.focus();

        setForm({ ...form, address: data.address });
      },
    }).open();
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // values
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{
    importantFactor?: string | undefined;
    company?: string | undefined;
    address?: string | undefined;
    addressDetail?: string | undefined;
    phone?: string | undefined;
    isAgree?: boolean | undefined;
  }>({});

  useEffect(() => {
    const { companyName } = router.query;
    setForm((prevState) => ({
      ...prevState,
      company: companyName as string,
    }));
  }, [router.query]);

  // validation
  const validateForm = (formData: any) => {
    if (
      formData?.company &&
      formData?.address &&
      formData?.addressDetail &&
      formData?.isAgree &&
      formData.isAgree
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };
  const handleChange = (event: any) => {
    const name = event.target.name as keyof typeof form;
    const value =
      name === 'isAgree' ? event.target.checked : event.target.value;
    const formData = { ...form, [name]: value };
    setForm(formData);
    validateForm(formData);

    console.log('회사이름', value);
  };

  // const placeholder = JSON.stringify(Object.keys(router.query)[0]).replace(
  //   /\"/gi,
  //   '',
  // );

  // const placeholder = '';

  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const onClickSubmit = () => {
    if (isComplete) {
      console.log('isComplete');

      setBackdropOpen(true);

      setTimeout(() => {
        setBackdropOpen(false);
        const sendData = {
          selection: '개인용도',
          company: form.company,
          address: form.address,
          addressDetail: form.addressDetail,
          isAgree: form.isAgree,
          utm_source: sessionStorage.getItem('utm_source'),
          utm_medium: sessionStorage.getItem('utm_medium'),
          utm_campaign: sessionStorage.getItem('utm_campaign'),
          utm_content: sessionStorage.getItem('utm_content'),
          utm_term: sessionStorage.getItem('utm_term'),
        };

        sessionStorage.setItem('company', form.company as string);
        sessionStorage.setItem('address', form.address as string);
        sessionStorage.setItem('addressDetail', form.addressDetail as string);

        axios.post('/zapier/submit-private', { data: sendData }).then(() => {});

        //GA4 이벤트 전송
        const tagManagerArgs = {
          dataLayer: {
            event: 'lead_submit',
          },
        };
        TagManager.dataLayer(tagManagerArgs);
        router.push('/new/estimateForm/complete2');
      }, 3000);
    }
  };

  useEffect(() => {
    //GA4 이벤트 전송
    const tagManagerArgsForm = {
      dataLayer: {
        event: 'lead_start',
      },
    };
    TagManager.dataLayer(tagManagerArgsForm);
  }, []);

  return (
    <div id="estimateForm" className={styles.estimateForm}>
      {isMobile ? <WebHeaderC /> : <WebHeaderD />}
      <section className={`${styles.sec_01} ${styles.form5_sec_01}`}>
        <div className={styles.container}>
          <div className={styles.title}>
            <p>실사 받을 주소를 입력해주세요</p>
          </div>
          <div className={styles.form_container}>
            <Box
              component="form"
              noValidate
              onSubmit={() => {
                console.log('submit!');
              }}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2} columns={1}>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>업체명</label>
                  <Select
                    size={size}
                    id="companySelect"
                    name="company"
                    displayEmpty={true}
                    // renderValue={(value) =>
                    //   value?.length
                    //     ? Array.isArray(value)
                    //       ? value.join(', ')
                    //       : value
                    //     : `${placeholder}`
                    // }
                    className={styles.input_box}
                    value={form?.company ?? ''}
                    onChange={handleChange}
                  >
                    <MenuItem
                      className={styles.option}
                      value="한국EV충전서비스센터"
                      sx={{
                        color: '#222',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Spoqa Han Sans Neo',
                        fontStyle: 'normal',
                      }}
                    >
                      한국EV충전서비스센터
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="에코플레이"
                      sx={{
                        color: '#222',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Spoqa Han Sans Neo',
                        fontStyle: 'normal',
                      }}
                    >
                      에코플레이
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="캐스트프로"
                      sx={{
                        color: '#222',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Spoqa Han Sans Neo',
                        fontStyle: 'normal',
                      }}
                    >
                      캐스트프로
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="스타코프"
                      sx={{
                        color: '#222',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Spoqa Han Sans Neo',
                        fontStyle: 'normal',
                      }}
                    >
                      스타코프
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>설치 희망 상세 주소</label>
                  <div className={styles.search_address_wrapper}>
                    <TextField
                      id="addressInput"
                      size={size}
                      placeholder="주소 검색"
                      disabled
                      className={classNames(styles.input_box, styles.address)}
                      variant="outlined"
                      name="address"
                      value={form?.address ?? ''}
                      onChange={handleChange}
                    />
                    <Button
                      className={styles.address_btn}
                      variant="contained"
                      onClick={onClickAddr}
                    >
                      주소 찾기
                    </Button>
                  </div>
                  <TextField
                    id="addressDetailInput"
                    className={styles.input_box}
                    size={size}
                    placeholder="상세 주소를 입력해주세요"
                    variant="outlined"
                    name="addressDetail"
                    value={form?.addressDetail ?? ''}
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
                      <span>
                        <span className={styles.required_check}>[필수]</span>{' '}
                        개인정보 수집 및 이용 안내에 대한 동의
                      </span>
                    </div>
                    <div className={styles.terms_detail}>
                      <Button
                        className={styles.terms_detail_btn}
                        variant="text"
                        onClick={handleOpenModal}
                      >
                        약관 상세보기
                      </Button>
                    </div>

                    {isMobile && (
                      <Button
                        className={classNames(
                          styles.form5_btn,
                          styles.submit_btn,
                          isComplete && styles.active,
                        )}
                        variant="contained"
                        color="primary"
                        onClick={onClickSubmit}
                      >
                        이 업체에게 현장실사 받기
                      </Button>
                    )}
                  </div>
                </Grid>
                {!isMobile && (
                  <Grid item className={styles.item} xs={12} sm={6}>
                    <Button
                      className={classNames(
                        styles.submit_btn,
                        isComplete && styles.active,
                      )}
                      variant="contained"
                      color="primary"
                      onClick={onClickSubmit}
                    >
                      이 업체에게 현장실사 받기
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </div>
        </div>
        <CommonBackdrop open={backdropOpen} />
        <MobileModal open={modalOpen} onClose={handleCloseModal} />
      </section>
      <section className={styles.form5_sec_02}></section>
    </div>
  );
};

export default EstimateForm5;
