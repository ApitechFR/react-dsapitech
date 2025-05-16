import * as React from "react";
import { fr } from "../dist";
import { Header } from "../dist/Header";
import { Footer } from "../dist/Footer";
import { headerFooterDisplayItem } from "../dist/Display";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { "Display": Story },
    "description": `
A button that opens a dialog to enable the user to select light or dark mode.  

- [See DSApitech documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametre-d-affichage),
- [See source code](https://github.com/ApitechFR/react-dsapitech/blob/main/src/Display/Display.tsx)

Optionally, you can also use \`import { useIsDark } from "@apitech/react-dsapitech"\` to manually monitor and controls 
the theme state.

## Usage example 

\`\`\`tsx
import { Header } from "@apitech/react-dsapitech/Header";
import { Footer } from "@apitech/react-dsapitech/Footer";
import { headerFooterDisplayItem } from "@apitech/react-dsapitech/Display";

function App(){

    return (
        <>
            <Header
                // other Header props...
                quickAccessItems={[
                    // other quick access items...
                    headerFooterDisplayItem
                ]}
            >
            {/* ... your app ...*/}
            <Footer
                // other Footer props...
                bottomItems={[
                    // other other bottom items...
                    headerFooterDisplayItem
                ]}
            />
        <>
    );

}
\`\`\`
`,
    "disabledProps": ["darkMode", "containerWidth"]
});

export default meta;

const brandTop = (
    <>
        INTITULE
        <br />
        OFFICIEL
    </>
);

const homeLinkProps = {
    "href": "#",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
};

function Story() {
    return (
        <>
            <Header
                brandTop={brandTop}
                serviceTitle="Nom du site / service"
                homeLinkProps={homeLinkProps}
                quickAccessItems={[headerFooterDisplayItem]}
            />
            <Footer
                className={fr.cx("fr-mt-5v")}
                brandTop={brandTop}
                homeLinkProps={homeLinkProps}
                accessibility="fully compliant"
                bottomItems={[headerFooterDisplayItem]}
            />
        </>
    );
}

export const Default = getStory({});
