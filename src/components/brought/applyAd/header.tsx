import headerStyles from "./header.module.scss";

export const SuggestionHeader = () => {
  return (
    <div className={headerStyles.suggestionHeader}>
      <div className={headerStyles.headerInner}>
        <a className={headerStyles.headerLogo} href="#"></a>
      </div>
    </div>
  );
};
