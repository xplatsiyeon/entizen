"use client";

import classes from "./Popup.module.scss";

import { Fragment, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import classNames from "classnames";
import _ from "lodash";

import { useAtomValue, useSetAtom } from "jotai";
import { popupAtom, removePopupAtom } from "@/atom/popup";

import Button from "../element/Button";
import { AiTwotoneCloseSquare } from "react-icons/ai";

const PopupComponent: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const popupList = useAtomValue(popupAtom);
  const { popups } = popupList;
  const removePopup = useSetAtom(removePopupAtom);
  const searchParams = useSearchParams();

  // 브라우저 백, 다음 버튼 시 팝업 닫기
  useEffect(() => {
    // url query parameter에서 popup 배열로 가져오기
    const params = searchParams.getAll("popup");
    // 현재 열려있는 popup id 배열로 가져오기
    const openPopupIds = popups.map((i) => i.id);
    // param에 없는대 열려잇는 popup id 확인 (1개)
    const filterId = openPopupIds.filter(
      (p) => !params || !params.includes(p.toString())
    )[0];
    // 해당되는 id가 있다면 팝업 닫기
    filterId !== undefined && removePopup(filterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 팝업 추가 삭제
  useEffect(() => {
    // 기존 url query 가져와서 popup 부분만 삭제
    const parsed = queryString.parse(location.search);
    delete parsed.popup;
    const stringified = queryString.stringify(parsed);
    // popup 열린 갯수 확인하여 문자열 변환
    const popupQueries = popups.map((p) => p.id).join("&popup=");
    // url에 적용
    router.push(
      `${pathname}?${stringified}${
        stringified && popupQueries ? "&popup=" : popupQueries && "popup="
      }${popupQueries}`
    );
  }, [popups, pathname, router]);

  const closeHandler = (id: number) => {
    removePopup(id);
  };

  const handleConfirm = (id: number) => {
    const popup = popups.find((p) => p.id === id);
    if (popup && popup.accept) {
      popup.accept(popup.data);
    }
    closeHandler(id);
  };

  return popups.map((popup, index) => (
    <section
      key={popup.id}
      className={classNames(classes.modal, {
        [classes.active]: index === popups.length - 1,
      })}
    >
      <div className={classes.popup}>
        {popup.title && <div className={classes.title}>{popup.title}</div>}
        <div className={classes.contents}>{popup.content}</div>
        <div className={classes.btn}>
          {popup.type === "confirm" && (
            <Fragment>
              <Button type="cancel" onClick={() => closeHandler(popup.id)}>
                취소
              </Button>
              <Button type="confirm" onClick={() => handleConfirm(popup.id)}>
                {popup.type === "confirm" ? "확인" : "저장"}
              </Button>
            </Fragment>
          )}
          {popup.type === "error" && (
            <Button type="error" onClick={() => closeHandler(popup.id)}>
              닫기
            </Button>
          )}
          {popup.type === "info" && (
            <Button type="confirm" onClick={() => closeHandler(popup.id)}>
              확인
            </Button>
          )}
        </div>
      </div>
      <AiTwotoneCloseSquare
        className={classes.closeButton}
        onClick={() => closeHandler(popup.id)}
        size={50}
        color="#ffffff"
      />
    </section>
  ));
};

export default PopupComponent;
