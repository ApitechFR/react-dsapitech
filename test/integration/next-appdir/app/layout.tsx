import { NextAppDirEmotionCacheProvider } from "tss-react/next";
import { DsapitechHead } from "@apitech/react-dsapitech/next-appdir/DsapitechHead";
import { DsapitechProvider } from "@apitech/react-dsapitech/next-appdir/DsapitechProvider";
import { getHtmlAttributes } from "@apitech/react-dsapitech/next-appdir/getHtmlAttributes";
import { StartDsapitech } from "./StartDsapitech";
import { defaultColorScheme } from "./defaultColorScheme";
import MuiDsapitechThemeProvider from "@apitech/react-dsapitech/mui";
import { Header } from "@apitech/react-dsapitech/Header";
import { Footer } from "@apitech/react-dsapitech/Footer";
import { headerFooterDisplayItem, addDisplayTranslations } from "@apitech/react-dsapitech/Display";
import { fr } from "@apitech/react-dsapitech";
import { Navigation } from "./Navigation";
import Link from "next/link";
import {
    ConsentBannerAndConsentManagement,
    FooterConsentManagementItem,
    FooterPersonalDataPolicyItem
} from "./consentManagement";
import { ClientFooterItem } from "../ui/ClientFooterItem";
import { ClientHeaderQuickAccessItem } from "../ui/ClientHeaderQuickAccessItem";
import { headers } from "next/headers";
import { getScriptNonceFromHeader } from "next/dist/server/app-render/get-script-nonce-from-header"; // or use your own implementation
import style from "./main.module.css";
import { cx } from "@apitech/react-dsapitech/tools/cx";
import { Follow } from "./Follow";

export default function RootLayout({ children }: { children: JSX.Element }) {
    const csp = headers().get("Content-Security-Policy");
    let nonce: string | undefined;
    if (csp) {
        nonce = getScriptNonceFromHeader(csp);
    }

    //NOTE: If we had i18n setup we would get lang from the props.
    //See https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/app/%5Blang%5D/layout.tsx
    const lang = "fr";

    return (
        <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
            <head>
                <title>Next 13 AppDir Demo DSApitech setup</title>
                <StartDsapitech />
                <DsapitechHead
                    Link={Link}
                    preloadFonts={[
                        //"Marianne-Light",
                        //"Marianne-Light_Italic",
                        "Marianne-Regular",
                        //"Marianne-Regular_Italic",
                        "Marianne-Medium",
                        //"Marianne-Medium_Italic",
                        "Marianne-Bold"
                        //"Marianne-Bold_Italic",
                        //"Spectral-Regular",
                        //"Spectral-ExtraBold"
                    ]}
                    nonce={nonce}
                />
            </head>
            <body>
                <DsapitechProvider lang={lang}>
                    <ConsentBannerAndConsentManagement />
                    <NextAppDirEmotionCacheProvider
                        options={{ "key": "css", nonce, prepend: true }}
                    >
                        <MuiDsapitechThemeProvider>
                            <Header
                                brandTop={
                                    <>
                                        INTITULE
                                        <br />
                                        OFFICIEL
                                    </>
                                }
                                serviceTitle="Nom du site / service"
                                homeLinkProps={{
                                    "href": "/",
                                    "title":
                                        "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                                }}
                                quickAccessItems={[
                                    headerFooterDisplayItem,
                                    {
                                        iconId: "ri-mail-line",
                                        linkProps: {
                                            href: `mailto:${"joseph.garrone@code.gouv.fr"}`
                                        },
                                        text: "Nous contacter"
                                    },
                                    <ClientHeaderQuickAccessItem
                                        key={"client-header-quick-access-item"}
                                    />
                                ]}
                                navigation={<Navigation />}
                            />
                            <div className={cx(style.container)}>{children}</div>
                            <Follow />
                            <Footer
                                accessibility="fully compliant"
                                contentDescription={`
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. 
                `}
                                bottomItems={[
                                    headerFooterDisplayItem,
                                    <FooterPersonalDataPolicyItem key={"personal-data"} />,
                                    <FooterConsentManagementItem key={"consent-management"} />,
                                    <ClientFooterItem key={"client-footer"} />
                                ]}
                            />
                        </MuiDsapitechThemeProvider>
                    </NextAppDirEmotionCacheProvider>
                </DsapitechProvider>
            </body>
        </html>
    );
}

addDisplayTranslations({
    "lang": "fr",
    "messages": {
        "dark theme": "Thème sombre 🤩"
    }
});
