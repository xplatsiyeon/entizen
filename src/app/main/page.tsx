"use client";

import Button from "@/components/common/element/Button";
import { useRouter } from "next/navigation";

const Main = () => {
  const router = useRouter();

  const onClickEstimateBtn = () => {
    router.push("/estimate");
    sessionStorage.removeItem("estimateData");
  };
  return (
    <div>
      <Button type="confirm" onClick={onClickEstimateBtn}>
        2개 업체 비교 견적 받기 (1/2)
      </Button>
    </div>
  );
};

export default Main;
