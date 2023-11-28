import { Fragment, useState } from 'react';
import myEstimateHeaderStyles from './header.module.scss';
import { useMediaQuery } from 'react-responsive';
export const MyEstimateHeader = () => {
  const [state, setState] = useState({
    right: false,
  });
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const userID = sessionStorage.getItem('USER_ID');

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  return (
    <div className={myEstimateHeaderStyles.headerWrap}>
      <div className={myEstimateHeaderStyles.logo}>
        <img
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // layout="fill"
          src={'/images/EntizenHeaderLogoSvg.svg'}
          alt="logo"
        />
      </div>
      <div className={myEstimateHeaderStyles.iconWrap}>
        <div className={myEstimateHeaderStyles.firstIcons}>
          {!userID && <></>}
        </div>
        {mobile && (
          <>
            {(['right'] as const).map((anchor) => (
              <Fragment key={anchor}>
                <div onClick={toggleDrawer(anchor, true)}>
                  <div className={myEstimateHeaderStyles.iconBox}>
                    <img src="/images/list-bar.svg" alt="listIcon"></img>
                  </div>
                </div>
                {/* <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    // PaperProps={{ style: { borderRadius: '20pt 20pt 0 0' } }}
                  >
                    <HamburgerBar
                      anchor={anchor}
                      toggleDrawer={toggleDrawer}
                      setState={setState}
                      state={state}
                    />
                  </Drawer> */}
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
