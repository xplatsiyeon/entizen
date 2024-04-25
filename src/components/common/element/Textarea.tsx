import classes from "./Textarea.module.scss";
import { FaStarOfLife } from "react-icons/fa";

interface TextareaType {
  title?: string;
  require?: boolean;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: any) => void;
  maxLength?: number;
  rows?: number;
  cols?: number;
}

const TextArea = ({
  title,
  require,
  name,
  value,
  placeholder,
  onChange,
  maxLength = 100,
  rows = 5,
  cols,
}: TextareaType) => {
  return (
    <div className={classes.textarea}>
      {title && (
        <label htmlFor={name}>
          {require && <FaStarOfLife color="red" size={8} />}
          {title}
        </label>
      )}
      <textarea
        rows={rows}
        maxLength={maxLength}
        cols={cols}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
