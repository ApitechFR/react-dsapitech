// hook à mettre dans un fichier utils/hooks
import { useEffect, useState } from "react";

function useFrTheme() {
    const getTheme = () => document.documentElement.dataset.frTheme ?? "light";
    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        const el = document.documentElement;
        const observer = new MutationObserver((muts) => {
            if (muts.some(m => m.attributeName === "data-fr-theme")) {
                setTheme(getTheme());
            }
        });
        observer.observe(el, { attributes: true, attributeFilter: ["data-fr-theme"] });
        return () => observer.disconnect();
    }, []);

    return theme as "light" | "dark";
}

export { useFrTheme };