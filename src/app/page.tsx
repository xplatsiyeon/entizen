"use client";

import Button from "@/components/common/element/Button";
import { useRouter } from "next/navigation";

const Main = () => {
  const router = useRouter();

  const onClickEstimateBtn = () => {
    router.push("/estimate");
    sessionStorage.removeItem("estimateData");
  };

  const onClickAdminBtn = () => {
    router.push("/admin");
  };
  return (
    <div>
      <Button type="confirm" onClick={onClickEstimateBtn}>
        2개 업체 비교 견적 받기 (1/2)
      </Button>
      <div>
        <Button type="confirm" onClick={onClickAdminBtn}>
          admin이동
        </Button>
      </div>
    </div>
  );
};

export default Main;
