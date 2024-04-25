import classes from "./Layout.module.scss";

interface LayoutType {
  children: React.ReactNode;
  row?: boolean;
  gap?: boolean;
  rowGap?: boolean;
  colGap?: boolean;
}

const Layout = ({
  children,
  row,
  gap,
  rowGap,
  colGap,
}: Readonly<LayoutType>) => {
  const classNames = [classes.layout];
  if (row) classNames.push(classes.row);
  if (gap) classNames.push(classes.gap);
  if (rowGap) classNames.push(classes.rowGap);
  if (colGap) classNames.push(classes.colGap);

  return <div className={classNames.join(" ")}>{children}</div>;
};

export default Layout;
