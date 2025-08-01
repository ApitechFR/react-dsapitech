var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, forwardRef, cloneElement } from "react";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "../tools/cx";
import { getLink } from "../link";
import { assert } from "tsafe/assert";
import { MainNavigation } from "../MainNavigation";
import { Display } from "../Display/Display";
import { setBrandTopAndHomeLinkProps } from "../zz_internal/brandTopAndHomeLinkProps";
import { typeGuard } from "tsafe/typeGuard";
import { SearchButton } from "../SearchBar/SearchButton";
import { useTranslation as useSearchBarTranslation } from "../SearchBar/SearchBar";
export const headerMenuModalIdPrefix = "header-menu-modal";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-header> */
export const Header = memo(forwardRef((props, ref) => {
    const { className, id: id_props, brandTop, serviceTitle, serviceTagline, homeLinkProps, navigation = undefined, quickAccessItems = [], operatorLogo, renderSearchInput, clearSearchInputOnSearch = false, allowEmptySearch = false, onSearchButtonClick, classes = {}, style, disableDisplay = false, mainLogoURL } = props, rest = __rest(props, ["className", "id", "brandTop", "serviceTitle", "serviceTagline", "homeLinkProps", "navigation", "quickAccessItems", "operatorLogo", "renderSearchInput", "clearSearchInputOnSearch", "allowEmptySearch", "onSearchButtonClick", "classes", "style", "disableDisplay", "mainLogoURL"]);
    assert();
    const id = id_props !== null && id_props !== void 0 ? id_props : "fr-header";
    const menuModalId = `${headerMenuModalIdPrefix}-${id}`;
    const menuButtonId = `${id}-menu-button`;
    const searchModalId = `${id}-search-modal`;
    const searchInputId = `${id}-search-input`;
    const searchLabelId = `${id}-search-label`;
    const isSearchBarEnabled = renderSearchInput !== undefined || onSearchButtonClick !== undefined;
    setBrandTopAndHomeLinkProps({ brandTop, homeLinkProps });
    const { t } = useTranslation();
    const { t: tSearchBar } = useSearchBarTranslation();
    const { Link } = getLink();
    const getQuickAccessNode = (usecase) => (React.createElement("ul", { className: fr.cx("fr-btns-group") }, quickAccessItems.map((quickAccessItem, i) => (React.createElement("li", { key: i }, (() => {
        const node = !typeGuard(quickAccessItem, quickAccessItem instanceof Object && "text" in quickAccessItem) ? (quickAccessItem) : (React.createElement(HeaderQuickAccessItem, { quickAccessItem: quickAccessItem }));
        if (node === null) {
            return null;
        }
        return cloneElement(node, {
            "id": `${id}-quick-access-item-${i}${(() => {
                switch (usecase) {
                    case "mobile":
                        return "-mobile";
                    case "desktop":
                        return "";
                }
                assert();
            })()}`
        });
    })())))));
    const hasOperatorLink = (operatorLogo === null || operatorLogo === void 0 ? void 0 : operatorLogo.linkProps) !== undefined;
    return (React.createElement(React.Fragment, null,
        !disableDisplay && React.createElement(Display, null),
        React.createElement("header", Object.assign({ role: "banner", id: id, className: cx(fr.cx("fr-header"), classes.root, className), ref: ref, style: style }, rest),
            React.createElement("div", { className: cx(fr.cx("fr-header__body"), classes.body) },
                React.createElement("div", { className: cx(fr.cx("fr-container"), classes.container) },
                    React.createElement("div", { className: cx(fr.cx("fr-header__body-row"), classes.bodyRow) },
                        React.createElement("div", { className: cx(fr.cx("fr-header__brand", !hasOperatorLink && "fr-enlarge-link"), classes.brand) },
                            React.createElement("div", { className: cx(fr.cx("fr-header__brand-top"), classes.brandTop) },
                                (() => {
                                    const children = (React.createElement("img", { className: "fr-header__logo__apitech", src: mainLogoURL ||
                                            "https://www.figma.com/component/b96539974a6ef9813cf63852e113d5ab08fefabc/thumbnail?ver=10532%3A0&fuid=1339886080221657312" }));
                                    return operatorLogo !== undefined ? (children) : (React.createElement(Link, Object.assign({}, homeLinkProps), children));
                                })(),
                                operatorLogo !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-header__operator", hasOperatorLink && "fr-enlarge-link"), classes.operator) }, (() => {
                                    const children = (React.createElement("img", { className: cx(fr.cx("fr-responsive-img"), classes.operator), style: (() => {
                                            switch (operatorLogo.orientation) {
                                                case "vertical":
                                                    return {
                                                        "width": "3.5rem"
                                                    };
                                                case "horizontal":
                                                    return {
                                                        "maxWidth": "9.0625rem"
                                                    };
                                            }
                                        })(), src: operatorLogo.imgUrl, alt: operatorLogo.alt }));
                                    return hasOperatorLink ? (React.createElement(Link, Object.assign({}, operatorLogo.linkProps), children)) : (children);
                                })())),
                                (quickAccessItems.length > 0 ||
                                    navigation !== undefined ||
                                    isSearchBarEnabled) && (React.createElement("div", { className: cx(fr.cx("fr-header__navbar"), classes.navbar) },
                                    isSearchBarEnabled && (React.createElement("button", { id: `${id}-search-button`, className: fr.cx("fr-btn--search", "fr-btn"), "data-fr-opened": false, "aria-controls": searchModalId, title: tSearchBar("label") }, tSearchBar("label"))),
                                    React.createElement("button", { className: fr.cx("fr-btn--menu", "fr-btn"), "data-fr-opened": "false", "aria-controls": menuModalId, "aria-haspopup": "menu", id: menuButtonId, title: t("menu") }, t("menu"))))),
                            serviceTitle !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-header__service", hasOperatorLink && "fr-enlarge-link"), classes.service) },
                                React.createElement(Link, Object.assign({}, homeLinkProps),
                                    React.createElement("p", { className: cx(fr.cx("fr-header__service-title"), classes.serviceTitle) }, serviceTitle)),
                                serviceTagline !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-header__service-tagline"), classes.serviceTagline) }, serviceTagline))))),
                        (quickAccessItems.length > 0 || isSearchBarEnabled) && (React.createElement("div", { className: fr.cx("fr-header__tools") },
                            quickAccessItems.length > 0 && (React.createElement("div", { className: cx(fr.cx("fr-header__tools-links"), classes.toolsLinks) }, getQuickAccessNode("desktop"))),
                            isSearchBarEnabled && (React.createElement("div", { className: fr.cx("fr-header__search", "fr-modal"), id: searchModalId, "aria-labelledby": `${id}-search-bar-button` },
                                React.createElement("div", { className: fr.cx("fr-container", "fr-container-lg--fluid") },
                                    React.createElement("button", { id: `${id}-search-close-button`, className: fr.cx("fr-btn--close", "fr-btn"), "aria-controls": searchModalId, title: t("close") }, t("close")),
                                    React.createElement("div", { className: fr.cx("fr-search-bar"), role: "search" },
                                        React.createElement("label", { className: fr.cx("fr-label"), htmlFor: searchInputId, id: searchLabelId }, tSearchBar("label")),
                                        (renderSearchInput !== null && renderSearchInput !== void 0 ? renderSearchInput : (({ className, id, placeholder, type }) => (React.createElement("input", { className: className, id: id, placeholder: placeholder, type: type }))))({
                                            "className": fr.cx("fr-input"),
                                            "id": searchInputId,
                                            "placeholder": tSearchBar("label"),
                                            "type": "search"
                                        }),
                                        React.createElement(SearchButton, { id: `${id}-search-bar-button`, searchInputId: searchInputId, onClick: onSearchButtonClick, clearInputOnSearch: clearSearchInputOnSearch, allowEmptySearch: allowEmptySearch })))))))))),
            (navigation !== undefined || quickAccessItems.length !== 0) && (React.createElement("div", { className: cx(fr.cx("fr-header__menu", "fr-modal"), classes.menu), id: menuModalId, "aria-labelledby": menuButtonId },
                React.createElement("div", { className: fr.cx("fr-container") },
                    React.createElement("button", { id: `${id}-mobile-overlay-button-close`, className: fr.cx("fr-btn--close", "fr-btn"), "aria-controls": menuModalId, title: t("close") }, t("close")),
                    React.createElement("div", { className: cx(fr.cx("fr-header__menu-links"), classes.menuLinks) }, getQuickAccessNode("mobile")),
                    navigation !== undefined &&
                        (navigation instanceof Array ? (React.createElement(MainNavigation, { id: `${id}-main-navigation`, items: navigation })) : (navigation))))))));
}));
Header.displayName = symToStr({ Header });
export default Header;
export const { useTranslation, addHeaderTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Header }),
    "frMessages": {
        /* spell-checker: disable */
        "menu": "Menu",
        "close": "Fermer"
        /* spell-checker: enable */
    }
});
addHeaderTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});
/** NOTE: If you wrap this component you should forward the id */
export function HeaderQuickAccessItem(props) {
    const { className, quickAccessItem, id } = props;
    const { Link } = getLink();
    return quickAccessItem.linkProps !== undefined ? (React.createElement(Link, Object.assign({}, quickAccessItem.linkProps, { className: cx(fr.cx("fr-btn", quickAccessItem.iconId), quickAccessItem.linkProps.className, className), id: id }), quickAccessItem.text)) : (React.createElement("button", Object.assign({}, quickAccessItem.buttonProps, { className: cx(fr.cx("fr-btn", quickAccessItem.iconId), quickAccessItem.buttonProps.className, className), id: id }), quickAccessItem.text));
}
//# sourceMappingURL=Header.js.map