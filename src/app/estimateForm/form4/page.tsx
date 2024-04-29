"use client";

import { useRouter } from "next/navigation";

import WebHeaderC from "../../../components/brought/newHeader/BeforeHeaderC";
import WebHeaderD from "../../../components/brought/newHeader/BeforeHeaderD";
// import WebFooter from 'componentsWeb/WebFooter';
import { Box } from "@mui/system";
import {
  RadioButtonCheckedSharp,
  RadioButtonUncheckedSharp,
} from "@mui/icons-material";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Button,
  useTheme,
  Theme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../form.module.css";
import classNames from "classnames";
import MobileModal from "../termsDetail";
import CommonBackdrop from "../../commonBackdrop";
import TagManager from "react-gtm-module";
import useFetch from "@/util/hook/useFetch";
import { dataCheck } from "../func";

declare global {
  interface Window {
    daum: any;
  }
}
interface IAddr {
  address: string;
  zonecode: string;
}

const EstimateForm4 = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width:899.25pt)",
  });
  const size = isMobile ? "medium" : "small";
  const theme = useTheme();
  const [fetchData, isLoading] = useFetch();

  function getStyles(theme: Theme) {
    return {
      fontWeight: isMobile
        ? theme.typography.htmlFontSize
        : theme.typography.fontWeightMedium,
    };
  }

  // const onClickAddr = () => {
  //   new window.daum.Postcode({
  //     oncomplete: function (data: IAddr) {
  //       (document.getElementById('addressInput') as HTMLInputElement).value =
  //         data.address;
  //       document.getElementById('addressDetailInput')?.focus();

  //       setForm({ ...form, address: data.address });
  //     },
  //   }).open();
  // };

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
    place?: string | undefined;
    placeEtc?: string | undefined;
    // address?: string | undefined;
    // addressDetail?: string | undefined;
    phone?: string | undefined;
    isAgree?: boolean | undefined;
  }>({});

  // validation
  const validateForm = (formData: any) => {
    if (
      formData?.importantFactor &&
      formData?.place &&
      // formData?.address &&
      // formData?.addressDetail &&
      formData?.phone &&
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
      name === "isAgree" ? event.target.checked : event.target.value;
    const formData = { ...form, [name]: value };
    if (name === "place" && value !== "step_etc") {
      formData.placeEtc = "";
    }
    setForm(formData);

    validateForm(formData);
  };

  const [backdropOpen, setBackdropOpen] = React.useState(false);
  // const onClickSubmit = () => {
  //   if (isComplete) {
  //     console.log("isComplete");

  //     setBackdropOpen(true);

  //     setTimeout(() => {
  //       setBackdropOpen(false);
  //       const sendData = {
  //         selection: "개인용도",
  //         importantFactor: form.importantFactor,
  //         place: form.place,
  //         placeEtc: form.placeEtc,
  //         // address: form.address,
  //         // addressDetail: form.addressDetail,
  //         phone: form.phone,
  //         isAgree: form.isAgree,
  //         utm_source: sessionStorage.getItem("utm_source"),
  //         utm_medium: sessionStorage.getItem("utm_medium"),
  //         utm_campaign: sessionStorage.getItem("utm_campaign"),
  //         utm_content: sessionStorage.getItem("utm_content"),
  //         utm_term: sessionStorage.getItem("utm_term"),
  //       };

  //       sessionStorage.setItem(
  //         "importantFactor",
  //         form.importantFactor as string,
  //       );
  //       sessionStorage.setItem("place", form.place as string);
  //       sessionStorage.setItem("placeEtc", form.placeEtc as string);
  //       // sessionStorage.setItem('address', form.address as string);
  //       // sessionStorage.setItem('addressDetail', form.addressDetail as string);
  //       sessionStorage.setItem("phone", form.phone as string);
  //       sessionStorage.setItem("phone_number", form.phone as string);

  //       axios.post("/zapier/submit-private", { data: sendData }).then(() => {});

  //       //GA4 이벤트 전송
  //       const tagManagerArgs = {
  //         dataLayer: {
  //           event: "lead_submit",
  //         },
  //       };
  //       TagManager.dataLayer(tagManagerArgs);
  //       router.push("/myEstimate");
  //     }, 3000);
  //   }
  // };

  const onClickSubmit = () => {
    const data = dataCheck(form, isComplete, "개인용도");

    if (data && data !== null) {
      setBackdropOpen(true);

      setTimeout(() => {
        setBackdropOpen(false);
        fetchData(
          "/zapier/submit-private",
          { ...data },
          {
            callback: (result) => {
              if (result.code !== 200) {
                // 실패시 반응 아직 미정
                console.log(result.code, "result.code");
              } else {
                // 성공시 GA4 이벤트 전송및 페이지 전환
                const tagManagerArgs = {
                  dataLayer: {
                    event: "lead_submit",
                  },
                };
                TagManager.dataLayer(tagManagerArgs);
                router.push("/myEstimate");
              }
            },
          },
        );
      }, 3000);
    } else {
      alert("error");
    }
  };

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
      {isMobile ? <WebHeaderC /> : <WebHeaderD />}
      <section className={styles.sec_01}>
        <div className={styles.container}>
          <div className={styles.title}>
            {isMobile ? (
              <p>
                문항에 답하고 한 눈에 비교할 수 <br />
                있는 맞춤 견적서를 받아보세요
              </p>
            ) : (
              <p>
                문항에 답하고 한 눈에 비교할 수 있는
                <br />
                맞춤 견적서를 받아보세요
              </p>
            )}
          </div>
          <div className={styles.form_container}>
            <Box
              component="form"
              noValidate
              onSubmit={() => {
                console.log("submit!");
              }}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2} columns={1}>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>가장 중요하게 보는 요소</label>
                  <Select
                    size={size}
                    id="importantFactorSelect"
                    name="importantFactor"
                    displayEmpty
                    className={styles.input_box}
                    value={form?.importantFactor ?? ""}
                    placeholder="클릭하여 선택하세요."
                    onChange={handleChange}
                  >
                    <MenuItem
                      className={styles.option}
                      value="설치비용"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      설치비용
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="유지보수(A/S)"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      유지보수(A/S)
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="업체 시공 횟수"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      업체 시공 횟수
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="기능"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      기능
                    </MenuItem>
                    <MenuItem
                      className={styles.option}
                      value="디자인"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      디자인
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>설치 희망 장소</label>
                  <Select
                    size={size}
                    id="placeSelect"
                    name="place"
                    className={styles.input_box}
                    defaultValue=""
                    value={form?.place ?? ""}
                    placeholder="클릭하여 선택하세요."
                    onChange={handleChange}
                  >
                    <MenuItem
                      value="주택"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      주택
                    </MenuItem>
                    <MenuItem
                      value="빌라"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      빌라
                    </MenuItem>
                    <MenuItem
                      value="카페"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      카페
                    </MenuItem>
                    <MenuItem
                      value="식당"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      식당
                    </MenuItem>
                    <MenuItem
                      value="공장"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      공장
                    </MenuItem>
                    <MenuItem
                      value="step_etc"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      기타 (직접입력)
                    </MenuItem>
                  </Select>
                  {form?.place === "step_etc" && (
                    <TextField
                      id="placeEtcInput"
                      size={size}
                      placeholder="텍스트를 입력하세요."
                      className={styles.input_box}
                      variant="outlined"
                      name="placeEtc"
                      value={form?.placeEtc ?? ""}
                      onChange={handleChange}
                    />
                  )}
                </Grid>

                {/* 상세 주소 입력란 */}
                {/* <Grid item className={styles.item} xs={12} sm={6}>
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
                </Grid> */}
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>연락 가능한 휴대폰 번호</label>
                  <TextField
                    id="phoneInput"
                    className={styles.input_box}
                    size={size}
                    placeholder="연락처를 입력해 주세요"
                    variant="outlined"
                    name="phone"
                    value={form?.phone ?? ""}
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
                        <span className={styles.required_check}>[필수]</span>{" "}
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
                  </div>
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  {!isMobile && (
                    <Button
                      className={classNames(
                        styles.submit_btn,
                        isComplete && styles.active,
                      )}
                      variant="contained"
                      color="primary"
                      onClick={onClickSubmit}
                    >
                      내 맞춤 견적서 확인하기
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </div>
          {isMobile && (
            <Button
              className={classNames(
                styles.submit_btn,
                isComplete && styles.active,
              )}
              variant="contained"
              color="primary"
              onClick={onClickSubmit}
            >
              내 맞춤 견적서 확인하기
            </Button>
          )}
        </div>
        <CommonBackdrop open={backdropOpen} />
        <MobileModal open={modalOpen} onClose={handleCloseModal} />
      </section>
      <section className={styles.sec_02}></section>
    </div>
  );
};

export default EstimateForm4;
