import { useState } from "react";
import { Alert } from "@apitech/react-dsapitech/Alert";
import { SideMenu } from "@apitech/react-dsapitech/SideMenu";
import { Tabs } from "@apitech/react-dsapitech/Tabs";
import { Table } from "@apitech/react-dsapitech/Table";
import { fr } from "@apitech/react-dsapitech";
import { useIsDark } from "@apitech/react-dsapitech/useIsDark";
import { useStyles } from "tss-react/dsapitech";

export default function App() {
    const { isDark, setIsDark } = useIsDark();

    return (
        <>
            <Alert
                closable
                severity="success"
                title="Success: This is the title"
                description="This is the description"
            />
            <ControlledTabs />

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

            <SideMenuExample />
            <TableExample />
        </>
    );
}

function ControlledTabs() {

    const [selectedTabId, setSelectedTabId] = useState("tab1");

    const { css } = useStyles();

    return (
        <Tabs
            className={css({
                "margin": fr.spacing("10v"),
            })}
            selectedTabId={selectedTabId}
            tabs={[
                { "tabId": "tab1", "label": "Tab 1", "iconId": "fr-icon-add-line" },
                { "tabId": "tab2", "label": "Tab 2", "iconId": "fr-icon-ball-pen-fill" },
                { "tabId": "tab3", "label": "Tab 3" },
            ]}
            onTabChange={setSelectedTabId}
        >
            <p>Content of {selectedTabId}</p>
        </Tabs>
    );

}

function SideMenuExample() {

    const { css } = useStyles();

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
    ];

    return (
        <SideMenu
            items={sideMenuItems}
            title="Titre de rubrique"
            burgerMenuButtonText="Dans cette rubrique"
            className={css({
                "margin": fr.spacing("10v"),
            })}
        />
    );

}

function TableExample() {
    const { css } = useStyles();

    return (
        <Table
            caption = "Titre du tableau"
            colorVariant = "green-emeraude"
            className={css({ "margin": fr.spacing("10v") })}
            headers = {["Titre", "Titre", "Titre", "Titre", "Titre"]}
            data = {[
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
            ]}
        />
    );
}

