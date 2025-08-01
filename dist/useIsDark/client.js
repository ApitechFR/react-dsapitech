import { useEffect, useReducer } from "react";
import { assert } from "tsafe/assert";
import { isAmong } from "tsafe/isAmong";
import { createStatefulObservable, useRerenderOnChange } from "../tools/StatefulObservable";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { fr } from "../fr";
import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";
const $clientSideIsDark = createStatefulObservable(() => {
    if (typeof process === "object" && process.env.JEST_WORKER_ID !== undefined) {
        return false;
    }
    throw new Error([
        "react-dsfr not initialized.",
        "Refer to the documentation for setup instructions",
        "If it used to work but after an update you're getting this error",
        "it usually means that you have multiple copies of @codegouvfr/react-dsfr in your node_modules",
        "@codegouvfr/react-dsfr is a singleton, try removing your lock file and node_module."
    ].join(" "));
});
const $isAfterFirstEffect = createStatefulObservable(() => false);
export function getIsDarkClientSide() {
    return $isAfterFirstEffect.current ? $clientSideIsDark.current : ssrWasPerformedWithIsDark;
}
function getSystemColorScheme() {
    return typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}
export const useIsDarkClientSide = () => {
    const [isFirstRenderingOfTheComponent, reRender] = useReducer(() => false, true);
    useEffect(() => {
        reRender();
    }, []);
    useRerenderOnChange($clientSideIsDark);
    useRerenderOnChange($isAfterFirstEffect);
    const isDark = isFirstRenderingOfTheComponent || !$isAfterFirstEffect.current
        ? ssrWasPerformedWithIsDark
        : $clientSideIsDark.current;
    const setIsDark = useConstCallback(newIsDarkOrDeduceNewIsDarkFromCurrentIsDark => {
        const data_fr_js_value = document.documentElement.getAttribute("data-fr-js");
        const newColorScheme = (() => {
            switch (typeof newIsDarkOrDeduceNewIsDarkFromCurrentIsDark === "function"
                ? newIsDarkOrDeduceNewIsDarkFromCurrentIsDark(isDark)
                : newIsDarkOrDeduceNewIsDarkFromCurrentIsDark) {
                case "system":
                    return "system";
                case true:
                    return "dark";
                case false:
                    return "light";
            }
        })();
        document.documentElement.setAttribute(data_fr_scheme, newColorScheme);
        if (data_fr_js_value !== "true") {
            //NOTE: DSFR not started yet.
            document.documentElement.setAttribute(data_fr_theme, newColorScheme === "system" ? getSystemColorScheme() : newColorScheme);
            localStorage.setItem("scheme", newColorScheme);
        }
    });
    return {
        isDark,
        setIsDark
    };
};
let ssrWasPerformedWithIsDark;
function getCurrentIsDarkFromHtmlAttribute() {
    const colorSchemeFromHtmlAttribute = document.documentElement.getAttribute(data_fr_theme);
    switch (colorSchemeFromHtmlAttribute) {
        case null:
            return undefined;
        case "light":
            return false;
        case "dark":
            return true;
    }
    assert(false, `Unrecognized ${data_fr_theme} attribute value: ${colorSchemeFromHtmlAttribute}`);
}
export function startClientSideIsDarkLogic(params) {
    const { doPersistDarkModePreferenceWithCookie, registerEffectAction, colorSchemeExplicitlyProvidedAsParameter, doCheckNonce = false, trustedTypesPolicyName } = params;
    reset_persisted_value_if_website_config_changed: {
        const localStorageKey = "scheme-website-config-default";
        const localStorageValue = localStorage.getItem(localStorageKey);
        if (localStorageValue === colorSchemeExplicitlyProvidedAsParameter) {
            break reset_persisted_value_if_website_config_changed;
        }
        localStorage.removeItem("scheme");
        localStorage.setItem(localStorageKey, colorSchemeExplicitlyProvidedAsParameter);
    }
    const { clientSideIsDark, ssrWasPerformedWithIsDark: ssrWasPerformedWithIsDark_ } = (() => {
        var _a, _b;
        const isDarkFromHtmlAttribute = getCurrentIsDarkFromHtmlAttribute();
        if (isDarkFromHtmlAttribute !== undefined) {
            return {
                "clientSideIsDark": isDarkFromHtmlAttribute,
                "ssrWasPerformedWithIsDark": (_a = window.ssrWasPerformedWithIsDark) !== null && _a !== void 0 ? _a : isDarkFromHtmlAttribute
            };
        }
        const isDarkExplicitlyProvidedAsParameter = (() => {
            if (colorSchemeExplicitlyProvidedAsParameter === "system") {
                return undefined;
            }
            switch (colorSchemeExplicitlyProvidedAsParameter) {
                case "dark":
                    return true;
                case "light":
                    return false;
            }
        })();
        const isDarkFromLocalStorage = (() => {
            const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");
            if (colorSchemeReadFromLocalStorage === null) {
                return undefined;
            }
            assert(isAmong(["dark", "light", "system"], colorSchemeReadFromLocalStorage));
            if (colorSchemeReadFromLocalStorage === "system") {
                return undefined;
            }
            switch (colorSchemeReadFromLocalStorage) {
                case "dark":
                    return true;
                case "light":
                    return false;
            }
            assert;
        })();
        const isDarkFromOsPreference = getSystemColorScheme() === "dark";
        return {
            "ssrWasPerformedWithIsDark": isDarkExplicitlyProvidedAsParameter !== null && isDarkExplicitlyProvidedAsParameter !== void 0 ? isDarkExplicitlyProvidedAsParameter : false,
            "clientSideIsDark": (_b = isDarkFromLocalStorage !== null && isDarkFromLocalStorage !== void 0 ? isDarkFromLocalStorage : isDarkExplicitlyProvidedAsParameter) !== null && _b !== void 0 ? _b : isDarkFromOsPreference
        };
    })();
    ssrWasPerformedWithIsDark = ssrWasPerformedWithIsDark_;
    const trustedTypes = window.trustedTypes;
    const sanitizer = typeof trustedTypes !== "undefined"
        ? trustedTypes.createPolicy(trustedTypesPolicyName, { createHTML: (s) => s })
        : {
            createHTML: (s) => s
        };
    $clientSideIsDark.current = clientSideIsDark;
    document.documentElement.setAttribute(data_fr_scheme, (() => {
        const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");
        if (colorSchemeReadFromLocalStorage === null) {
            return colorSchemeExplicitlyProvidedAsParameter;
        }
        assert(isAmong(["dark", "light", "system"], colorSchemeReadFromLocalStorage));
        return colorSchemeReadFromLocalStorage;
    })());
    document.documentElement.setAttribute(data_fr_theme, clientSideIsDark ? "dark" : "light");
    new MutationObserver(() => {
        const isDarkFromHtmlAttribute = getCurrentIsDarkFromHtmlAttribute();
        assert(isDarkFromHtmlAttribute !== undefined);
        $clientSideIsDark.current = isDarkFromHtmlAttribute;
    }).observe(document.documentElement, {
        "attributes": true,
        "attributeFilter": [data_fr_theme]
    });
    {
        const setColorSchemeCookie = (isDark) => {
            if (!doPersistDarkModePreferenceWithCookie) {
                return;
            }
            const colorScheme = isDark ? "dark" : "light";
            let newCookie = `${data_fr_theme}=${colorScheme};path=/;max-age=31536000;SameSite=Strict`;
            set_domain: {
                const { hostname } = window.location;
                //We do not set the domain if we are on localhost or an ip
                if (/(^localhost$)|(^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$)/.test(hostname)) {
                    break set_domain;
                }
                newCookie += `;domain=${hostname}`;
            }
            document.cookie = newCookie;
        };
        setColorSchemeCookie($clientSideIsDark.current);
        $clientSideIsDark.subscribe(setColorSchemeCookie);
    }
    {
        const setRootColorScheme = (isDark) => {
            var _a;
            const nonce = window.ssrNonce;
            if (doCheckNonce && !nonce) {
                return;
            }
            (_a = document.getElementById(rootColorSchemeStyleTagId)) === null || _a === void 0 ? void 0 : _a.remove();
            const element = document.createElement("style");
            element.id = rootColorSchemeStyleTagId;
            if (nonce) {
                element.setAttribute("nonce", nonce);
            }
            element.innerHTML = sanitizer.createHTML(`:root { color-scheme: ${isDark ? "dark" : "light"}; }`);
            document.head.appendChild(element);
        };
        setRootColorScheme($clientSideIsDark.current);
        $clientSideIsDark.subscribe(setRootColorScheme);
    }
    {
        const setThemeColor = (isDark) => {
            var _a;
            const name = "theme-color";
            (_a = document.querySelector(`meta[name=${name}]`)) === null || _a === void 0 ? void 0 : _a.remove();
            const element = document.createElement("meta");
            element.name = name;
            element.content = fr.colors.getHex({
                isDark
            }).decisions.background.default.grey.default;
            document.head.appendChild(element);
        };
        setThemeColor($clientSideIsDark.current);
        $clientSideIsDark.subscribe(setThemeColor);
    }
    registerEffectAction(() => ($isAfterFirstEffect.current = true));
}
//# sourceMappingURL=client.js.map