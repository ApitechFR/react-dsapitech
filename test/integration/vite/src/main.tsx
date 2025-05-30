import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { startReactDsapitech } from "@apitech/react-dsapitech/spa";
import { Header } from "@apitech/react-dsapitech/Header";
import { Footer } from "@apitech/react-dsapitech/Footer";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { headerFooterDisplayItem } from "@apitech/react-dsapitech/Display";
import { fr } from "@apitech/react-dsapitech";
import { ConsentBannerAndConsentManagement, FooterConsentManagementItem, FooterPersonalDataPolicyItem } from "./consentManagement";

startReactDsapitech({ "defaultColorScheme": "system", Link });

declare module "@apitech/react-dsapitech/spa" {
    interface RegisterLink {
        Link: typeof Link;
    }
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </React.StrictMode>
);




function Root() {

    const location = useLocation();

    return (
        <>
            <ConsentBannerAndConsentManagement />
            <div style={{ "minHeight": "100vh", "display": "flex", "flexDirection": "column" }}>
                <Header
                    brandTop={<>INTITULE<br />OFFICIEL</>}
                    serviceTitle="Nom du site / service"
                    homeLinkProps={{
                        "to": "/",
                        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                    }}
                    quickAccessItems={[
                        headerFooterDisplayItem,
                        {
                            iconId: "ri-mail-line",
                            linkProps: {
                                to: `mailto:${"joseph.garrone@code.gouv.fr"}`,
                            },
                            text: "Nous contacter",
                        }
                    ]}
                    navigation={[
                        {
                            "text": "Home",
                            "linkProps": {
                                "to": "/"
                            },
                            "isActive": location.pathname === "/"
                        },
                        {
                            "text": "Mui playground",
                            "linkProps": {
                                "to": "/mui"
                            },
                            "isActive": location.pathname === "/mui"
                        },
                        {
                            "text": "External link",
                            "linkProps": {
                                "to": "https://example.fr"
                            },
                            "isActive": false
                        }
                    ]}
                />
                <div style={{
                    "flex": 1,
                    "margin": "auto",
                    "maxWidth": 1000,
                    ...fr.spacing("padding", { "topBottom": "10v" })
                }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mui" element={<Mui />} />
                        <Route path="*" element={<h1>404</h1>} />
                    </Routes>
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
                    bottomItems={[
                        headerFooterDisplayItem,
                        <FooterPersonalDataPolicyItem />,
                        <FooterConsentManagementItem />
                    ]}
                />
            </div>
        </>
    );

}
