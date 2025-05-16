import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createNextDsapitechIntegrationApi } from "@apitech/react-dsapitech/next-pagesdir";
import { headerFooterDisplayItem } from "@apitech/react-dsapitech/Display";
import { Header } from "@apitech/react-dsapitech/Header";
import { Footer } from "@apitech/react-dsapitech/Footer";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";
import { useStyles } from "tss-react/dsapitech";
import { fr } from "@apitech/react-dsapitech";
import Link from "next/link";

declare module "@apitech/react-dsapitech/next-pagesdir" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

const {
    withDsapitech,
    dsapitechDocumentApi
} = createNextDsapitechIntegrationApi({
    "defaultColorScheme": "system",
    Link,
    "preloadFonts": [
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
    ]
});

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
    "key": "css"
});

export { dsapitechDocumentApi, augmentDocumentWithEmotionCache };

function App({ Component, pageProps }: AppProps) {

    const { css } = useStyles();

    const router = useRouter()

    return (
        <>
            <div
                style={{
                    "minHeight": "100vh",
                    "display": "flex",
                    "flexDirection": "column"
                }}
            >
                <Header
                    brandTop={
                        <>INTITULE<br />OFFICIEL</>
                    }
                    serviceTitle="Nom du site / service"
                    homeLinkProps={{ 
                        "href": "/", 
                        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" 
                    }}
                    navigation={[
                        {
                            "text": "Home",
                            "linkProps": {
                                "href": "/"
                            },
                            "isActive": router.asPath === "/"
                        },
                        {
                            "text": "Mui playground",
                            "linkProps": {
                                "href": "/mui"
                            },
                            "isActive": router.asPath === "/mui"
                        },
                        {
                            "text": "External link",
                            "linkProps": {
                                "href": "https://example.com"
                            }
                        }
                    ]}
                    quickAccessItems={[
                        headerFooterDisplayItem,
                        {
                            iconId: "ri-mail-line",
                            linkProps: {
                                href: `mailto:${"joseph.garrone@code.gouv.fr"}`,
                            },
                            text: "Nous contacter",
                        }
                    ]}
                />
                <div className={css({
                    "flex": 1,
                    "margin": "auto",
                    "maxWidth": 1000,
                    ...fr.spacing("padding", {
                        "topBottom": "10v"
                    })
                })}>
                    <Component {...pageProps} />
                </div>
                <Footer
                    accessibility="fully compliant"
                    contentDescription={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu fugiat nulla pariatur. 
                    `}
                    bottomItems={[headerFooterDisplayItem]}
                />
            </div>
        </>
    );
}

export default withAppEmotionCache(withDsapitech(App));
