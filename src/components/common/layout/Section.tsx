import classes from "./Section.module.scss";

const Section = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <section className={classes.section}>{children}</section>;
};

export default Section;
