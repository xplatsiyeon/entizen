import classes from "./Main.module.scss";

const Main = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className={classes.main}>{children}</main>;
};

export default Main;
