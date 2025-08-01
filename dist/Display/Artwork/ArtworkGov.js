import React from "react";
import { fr } from "../../fr";
import ArtworkLightSvg from "../../dsfr/artwork/light.svg";
import ArtworkDarkSvg from "../../dsfr/artwork/dark.svg";
import ArtworkSystemSvg from "../../dsfr/artwork/system.svg";
import { getAssetUrl } from "../../tools/getAssetUrl";
export function ArtworkGov(props) {
    const { theme, className } = props;
    return (React.createElement("svg", { className: className, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", 
        //className={fr.cx("fr-artwork")}
        width: "80px", height: "80px", viewBox: "0 0 80 80" }, ["artwork-decorative", "artwork-minor", "artwork-major"].map(label => (React.createElement("use", { key: label, className: fr.cx(`fr-${label}`), xlinkHref: `${getAssetUrl((() => {
            switch (theme) {
                case "dark":
                    return ArtworkDarkSvg;
                case "light":
                    return ArtworkLightSvg;
                case "system":
                    return ArtworkSystemSvg;
            }
        })())}#${label}` })))));
}
//# sourceMappingURL=ArtworkGov.js.map