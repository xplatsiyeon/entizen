import { BounceLoader } from "react-spinners";
import classes from "./AreaSpinner.module.scss";

interface AreaSpinnerType {
  readonly children: React.ReactNode;
  readonly isLoading?: boolean;
}

const AreaSpinner = ({ children, isLoading }: AreaSpinnerType) => {
  return (
    <div className={isLoading ? classes.isLoading : ""}>
      {isLoading && (
        <div className={classes.spinner}>
          <BounceLoader color="#36d7b7" size={25} />
        </div>
      )}
      {children}
    </div>
  );
};

export default AreaSpinner;
