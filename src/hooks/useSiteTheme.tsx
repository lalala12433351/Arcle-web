import { useEffect, useState } from "react";

/** Site theme is driven by `body.bg-dark` (see ThemeDark / ThemeLight / DarkClass). */
export const useSiteTheme = () => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.body.classList.contains("bg-dark") : false
  );

  useEffect(() => {
    const sync = () => setIsDark(document.body.classList.contains("bg-dark"));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};
