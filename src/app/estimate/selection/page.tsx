"use client";

import Input from "@/components/common/element/Input";

import Section from "@/components/common/layout/Section";
import RadioGroup from "@/components/common/element/RadioGroup";
import { useAtomValue, useSetAtom } from "jotai";
import { buyOptions } from "./data";

import CheckBox from "@/components/common/element/CheckBox";
import useFetch from "@/util/hook/useFetch";
import { addPopupAtom } from "@/atom/popup";
import Button from "@/components/common/element/Button";
import {
  selectionDataAtom,
  selectionIsValidAtom,
  setDataAtom,
} from "@/atom/pages/Estimate/selection";

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

const Estimate = () => {
  //ATOM
  const setData = useSetAtom(setDataAtom);
  const addPopup = useSetAtom(addPopupAtom);
  const data = useAtomValue(selectionDataAtom);
  const selectionIsValid = useAtomValue(selectionIsValidAtom);
  //ATOM[E]

  const [fetchData, isLoading] = useFetch();

  const onClickAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        (document.getElementById("address") as HTMLInputElement).value =
          data.address;
        document.getElementById("addressDetailt")?.focus();

        setData({ name: "address", value: data.address });
      },
    }).open();
  };

  const handleSubmit = () => {
    fetchData(
      "/api/estimate/selection",
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
            //성공시 세션저장
          }
        },
      },
    );
  };

  return (
    <div>
      <Section>
        <article>
          <RadioGroup
            title={"충전기 옵션"}
            items={buyOptions}
            isColumn={true}
            defaultValue={"BUYANDINSTALL"}
            onChange={(e) =>
              setData({
                name: "option",
                value: e,
              })
            }
          />
        </article>
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
            placeholder="연락처를 입력해주세요"
            validation={"number"}
            maxLength={11}
          />
        </article>
        <article>
          <span>
            <Input
              title="설치희망 상세 주소"
              name="address"
              type={"text"}
              value={data.address}
              onChange={(e) =>
                setData({
                  name: "address",
                  value: e,
                })
              }
              placeholder=""
              isDisabled={true}
            />
            <Button onClick={onClickAddressSearch}>주소찾기</Button>
          </span>
          <Input
            title=""
            name="addressDetail"
            type={"text"}
            value={data.addressDetail}
            onChange={(e) =>
              setData({
                name: "addressDetail",
                value: e,
              })
            }
            placeholder="상세 주소를 입력해주세요."
          />
        </article>

        <article>
          <CheckBox
            label="마케팅 활동을 위한 개인정보 수집 및 이용에 동의합니다. (견적 제공 활용 후 파기)"
            name="isAgree"
            value={data.isAgree}
            onChange={(e) =>
              setData({
                name: "isAgree",
                value: e,
              })
            }
          />
        </article>
      </Section>
      <Button
        onClick={handleSubmit}
        isLoading={isLoading}
        active={selectionIsValid}
      >
        제출
      </Button>
    </div>
  );
};

export default Estimate;
