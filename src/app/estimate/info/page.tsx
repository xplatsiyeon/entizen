"use client";

import Button from "@/components/common/element/Button";
import { useRouter } from "next/navigation";

const EstimateInfo = () => {
  const router = useRouter();

  const onClickEstimateBtn = () => {
    router.push("/estimate/selection");
  };
  return (
    <div>
      <Button type="confirm" onClick={onClickEstimateBtn}>
        2개 업체 비교 견적 받기 (2/2)
      </Button>
    </div>
  );
};

export default EstimateInfo;
