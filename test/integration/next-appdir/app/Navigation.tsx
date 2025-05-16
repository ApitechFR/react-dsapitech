"use client";

import { MainNavigation } from "@apitech/react-dsapitech/MainNavigation";
import { useSelectedLayoutSegment } from "next/navigation";

export function Navigation() {
    const segment = useSelectedLayoutSegment();

    return (
        <MainNavigation
            items={[
                {
                    "text": "Home",
                    "linkProps": {
                        "href": "/"
                    },
                    "isActive": segment === null
                },
                {
                    "text": "Mui playground",
                    "linkProps": {
                        "href": "/mui"
                    },
                    "isActive": segment === "mui"
                },
                {
                    "text": "DSApitech Chart",
                    "linkProps": {
                        "href": "/dsapitech-chart"
                    },
                    "isActive": segment === "dsapitech-chart"
                },
                {
                    "text": "External link",
                    "linkProps": {
                        "href": "https://example.com"
                    }
                }
            ]}
        />
    );
}
