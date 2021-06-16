import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function Layout(props) {

  const size = useWindowSize();

  const { t } = useTranslation();
  const locale = props.locale;
  const locales = props._nextI18Next.userConfig.i18n.locales;

  const [navHidden, toggleNav] = useState(true);

  return (
    <div>
      <div className="top" style={{
        opacity: 0,
        userSelect: "none",
        pointerEvents: "none"
      }}>
        <div className="top-inner">
          <div className="title-area">
            <h1 className="title">
              <a tabIndex="-1">
                HODI
              </a>
            </h1>
            <button className="toggle" tabIndex="-1">
              ☰
            </button>
          </div>
        </div>
      </div>
      <div className="fixed-region">
        <div className="fixed-container">
          <div className="top">
            <div className="top-inner">
              <div className="title-area">
                <h1 className="title">
                  <Link href={"/"}>
                    <a onClick={() => toggleNav(true)}>
                      HODI
                    </a>
                  </Link>
                </h1>
                <button className="toggle" 
                  aria-hidden={size.width > 600}
                  tabIndex={size.width > 600 ? "-1" : undefined} 
                  onClick={() => toggleNav(!navHidden)}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
          <div className="top second" aria-hidden={navHidden}>
            <div className="top-inner">
            
              <nav className="nav">
                <ul>
                  <li>
                    <Link href="/portfolio">
                      <a onClick={() => toggleNav(true)} tabIndex={size.width < 600 && navHidden ? "-1" : undefined}>{t("portfolio")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a onClick={() => toggleNav(true)} tabIndex={size.width < 600 && navHidden ? "-1" : undefined}>{t("contact")}</a>
                    </Link>
                  </li>
                  {locales.map((l, i) => {
                    // Map all other locales
                    if (l != locale) return (
                      <li key={"locale-"+i}>
                        <Link href="" locale={l}>
                          <a onClick={() => toggleNav(true)} tabIndex={size.width < 600 && navHidden ? "-1" : undefined}>{l.toUpperCase()}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div>
        {props.children}
      </div>
      <div className="gray-area" aria-hidden={navHidden}></div>
    </div>
  )
}

export default Layout;