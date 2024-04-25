import classes from "./Button.module.scss";
import AreaSpinner from "../modal/AreaSpinner";

interface ButtonType {
  readonly children: React.ReactNode;
  readonly btnType?: "submit" | "reset" | "button" | undefined;
  readonly type?: "error" | "confirm" | "cancel";
  readonly active?: boolean;
  readonly onClick?: () => void;
  readonly isLoading?: boolean;
}

const Button = ({
  children,
  btnType = "button",
  type,
  active = true,
  onClick,
  isLoading,
}: ButtonType) => {
  /**
   * 버튼 온클릭 함수
   * 활성화 상태, onClick 함수가 잇는 경우 해당 함수를 호출
   */
  const clickHandler = () => {
    if (!active) return;
    if (onClick) onClick();
  };

  return (
    <button
      type={btnType}
      className={`${classes.button}${
        type === "error"
          ? " " + classes.error
          : type === "confirm"
          ? " " + classes.confirm
          : type === "cancel"
          ? " " + classes.cancel
          : ""
      }${active ? "" : " " + classes.notActive}`}
      onClick={clickHandler}
    >
      <AreaSpinner isLoading={isLoading}>{children}</AreaSpinner>
    </button>
  );
};

export default Button;
