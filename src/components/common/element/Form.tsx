import { FormHTMLAttributes } from "react";
import classes from "./Form.module.scss";

interface FormType {
  children: React.ReactNode;
  action?: string;
  method?: "POST" | "GET";
  width?: string;
}

const Form = ({ children, action, method, width }: FormType) => {
  return (
    <form className={classes.form} {...{ action, method }} style={{ width }}>
      {children}
    </form>
  );
};

export default Form;
