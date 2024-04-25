import classes from "./Viewer.module.scss";

const Viewer = ({ html, border }: { html: string; border?: boolean }) => {
  return (
    <div
      className={`ck-content ${classes.custom} ${border && classes.border}`}
      style={{ overflow: "auto" }}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};
export default Viewer;
