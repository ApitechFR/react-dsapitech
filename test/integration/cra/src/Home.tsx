import { useState } from "react";
import { Alert } from "@apitech/react-dsapitech/Alert";
import { fr } from "@apitech/react-dsapitech";
import { useIsDark } from "@apitech/react-dsapitech/useIsDark";
import { SideMenu } from "@apitech/react-dsapitech/SideMenu";
import { Table } from "@apitech/react-dsapitech/Table";
import { routes } from "./router";
import { Button } from "@apitech/react-dsapitech/Button";
import { MyDialog, type DialogParams, type DialogResponse } from "./MyDialog";

const sideMenuItems = [
    {
        text: "Niveau 1",
        items: [
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            }
        ]
    },
    {
        isActive: true,
        text: "Entrée menu active",
        items: [
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                isActive: true,
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
        ]
    },
    {
        text: "Accès direct",
        linkProps: { href: "#" }
    },
    {
        text: "Accès direct",
        linkProps: { href: "#" }
    },
    {
        text: "Niveau 1 (with link)",
        linkProps: routes.home().link,
        items: [
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            }
        ]
    },
];

export function Home() {
    const { isDark, setIsDark } = useIsDark();

    const [myDialogActions] = useState<{
        open?: (params: DialogParams) => Promise<DialogResponse>
    }>({});

    return (
        <>
            <Alert
                closable
                severity="success"
                title="Success: This is the title"
                description="This is the description"
            />

            <button className={fr.cx("fr-btn", "fr-icon-checkbox-circle-line", "fr-btn--icon-left")}>
                Label bouton MD
            </button>
            <span className="fr-icon-ancient-gate-fill" aria-hidden="true"></span>
            <i className="fr-icon-ancient-gate-fill" aria-hidden="true" />

            <button className={fr.cx("fr-btn", "ri-24-hours-fill", "fr-btn--icon-left")}>
                Download
            </button>

            <h1>Color Scheme: {isDark ? "dark" : "light"}</h1>
            <button onClick={() => setIsDark(true)}>Set color scheme to dark</button>
            <button onClick={() => setIsDark(false)}>Set color scheme to light</button>
            <button onClick={() => setIsDark("system")}>Set color scheme to system</button>

            <SideMenu
                items={sideMenuItems}
                title="Titre de rubrique"
                burgerMenuButtonText="Dans cette rubrique"
            />
            <TableExample />
            <Button
                type="button"
                onClick={async () => {

                    const response = await myDialogActions.open!({
                        title: "Ma question",
                        body: "Voulez-vous continuer ?",
                    });

                    alert(`Continuer: ${response.doProceed ? "oui" : "non"}`);

                }}
            >
                Open Dialog 
            </Button>
            <MyDialog actions={myDialogActions} />
        </>
    );
}

function TableExample() {
    return (
        <Table
            caption="Titre du tableau"
            colorVariant="green-emeraude"
            headers={["Titre", "Titre", "Titre", "Titre", "Titre"]}
            data={[
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
            ]}
        />
    );
}

