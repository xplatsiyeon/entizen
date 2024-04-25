import { addPopupAtom } from "@/atom/popup";
import { ResponseType } from "@/const/fetch";
import { useAtom, useSetAtom } from "jotai";
import { useState, useCallback } from "react";

/**
 * API 호출 커스텀 훅
 * 훅 생성: `const [fetchData, isLoading] = useFetch("/api/some", (result: ResponseType) => {console.log(JSON.stringify(result))});`
 * 데이터 호출: `const someHandler = () => fetchData({ key: value });`
 * 로딩 중 처리: `if (isLoading) return <div>Loading...</div>;`
 * @param url /api/some
 * @param callback (result: ResponseType) => {console.log(JSON.stringify(result))}
 * @returns fetchData, isLoading
 */
const useFetch = (): [
  (
    url: string,
    data?: any,
    options?: {
      callback?: (result: ResponseType) => void;
      method?: string;
    }
  ) => void,
  boolean
] => {
  const addPopup = useSetAtom(addPopupAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (
      url: string,
      data: any,
      options?: {
        callback?: (result: ResponseType) => void;
        method?: string;
      }
    ): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: options?.method || "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("데이터 전송 중 오류가 발생했습니다.");
        }

        const result: ResponseType = await response.json();

        if (options?.callback) {
          options.callback(result);
        }
      } catch (err) {
        addPopup({
          type: "error",
          title: "오류",
          content: "데이터 전송 중 오류가 발생했습니다.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addPopup]
  );

  return [fetchData, isLoading];
};

export default useFetch;
