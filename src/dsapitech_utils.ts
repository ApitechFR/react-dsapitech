// fonction qui modifie le theme en cours
export function setTheme(theme: "light" | "dark") {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
}   
