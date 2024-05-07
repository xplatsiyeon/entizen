"use client";
import {
  dataAtom,
  estimateIsValidAtom,
  setDataAtom,
  setSessionDataAtom,
} from "@/atom/pages/Estimate/estimate";
import Input from "@/components/common/element/Input";
import Select from "@/components/common/element/Select";
import Section from "@/components/common/layout/Section";
import RadioGroup from "@/components/common/element/RadioGroup";
import { useAtomValue, useSetAtom } from "jotai";
import { placeOption, holdingOptions } from "./data";
import { useEffect, useState } from "react";
import CheckBox from "@/components/common/element/CheckBox";
import useFetch from "@/util/hook/useFetch";
import { addPopupAtom } from "@/atom/popup";
import Button from "@/components/common/element/Button";

interface selectValue {
  name: string;
  value: string;
}

const Estimate = () => {
  //ATOM
  const setData = useSetAtom(setDataAtom);
  const addPopup = useSetAtom(addPopupAtom);
  const setSessionData = useSetAtom(setSessionDataAtom);
  const data = useAtomValue(dataAtom);
  const estimateIsValid = useAtomValue(estimateIsValidAtom);
  //ATOM[E]
  const [fetchData, isLoading] = useFetch();

  const [place, setPlace] = useState<selectValue>();
  const placeDataHandler = (e: selectValue) => {
    setPlace(e);
    setData({
      name: "place",
      value: e.value,
    });
  };

  const handleSubmit = () => {
    const sesstionData = JSON.stringify(data);
    // api 연동후 삭제 혹은 주석처리 할것
    sessionStorage.setItem("estimateData", sesstionData);
    fetchData(
      "/api/estimate",
      { ...data },
      {
        callback: (result) => {
          if (result.code !== 200) {
            // 회원가입 실패 에러팝업
            addPopup({
              type: "error",
              title: "오류",
              content: result.msg,
            });
          } else {
            sessionStorage.setItem("estimateData", sesstionData);
          }
        },
      },
    );
  };

  useEffect(() => {
    const sessionData = sessionStorage.getItem("estimateData");
    if (sessionData) {
      const data = JSON.parse(sessionData);
      setSessionData(data);
    } else {
      return;
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Section>
        <article>
          <Input
            title="성함"
            name="name"
            type={"text"}
            value={data.name}
            onChange={(e) =>
              setData({
                name: "name",
                value: e,
              })
            }
            placeholder="이름을 입력해주세요"
          />
        </article>
        <article>
          <Input
            title="연락처"
            name="phone"
            type={"text"}
            value={data.phone}
            onChange={(e) =>
              setData({
                name: "phone",
                value: e,
              })
            }
            placeholder="이름을 입력해주세요"
          />
        </article>
        <article>
          <h1>장소</h1>
          <Select
            select={place}
            options={placeOption}
            onChange={(e) => placeDataHandler(e)}
          />
        </article>
        <article>
          <RadioGroup
            title={"전기차 보유여부"}
            items={holdingOptions}
            isColumn={true}
            defaultValue={"POSSESS"}
            onChange={(e) =>
              setData({
                name: "possess",
                value: e,
              })
            }
          />
        </article>
        <article>
          <Input
            title="전기차 모델명"
            name="modelName"
            type={"text"}
            value={data.modelName}
            onChange={(e) =>
              setData({
                name: "modelName",
                value: e,
              })
            }
            placeholder="이름을 입력해주세요"
          />
        </article>
        <article>
          <CheckBox
            label="마케팅 활동을 위한 개인정보 수집 및 이용에 동의합니다. (견적 제공 활용 후 파기)"
            name="isAgree"
            value={data.isAgree}
            defaultChecked={data.isAgree}
            onChange={(e) =>
              setData({
                name: "isAgree",
                value: e === "isAgree" ? true : false,
              })
            }
          />
        </article>
      </Section>
      <Button
        onClick={handleSubmit}
        isLoading={isLoading}
        active={estimateIsValid}
      >
        제출
      </Button>
    </div>
  );
};

export default Estimate;
