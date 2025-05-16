import { isBrowser } from "./tools/isBrowser";
import { assert } from "tsafe/assert";
import type { ColorScheme } from "./useIsDark";
import { startClientSideIsDarkLogic } from "./useIsDark/client";
import { Deferred } from "./tools/Deferred";

type Params = {
    defaultColorScheme: ColorScheme | "system";
    verbose: boolean;
    nextParams:
        | {
              doPersistDarkModePreferenceWithCookie: boolean;
              registerEffectAction: (effect: () => void) => void;
          }
        | undefined;
    doCheckNonce: boolean;
    trustedTypesPolicyName: string;
};

let isStarted = false;

export async function start(params: Params) {
    const { defaultColorScheme, verbose, nextParams, doCheckNonce, trustedTypesPolicyName } =
        params;

    assert(isBrowser);

    if (isStarted) {
        return;
    }

    isStarted = true;

    const registerEffectAction: (action: () => void) => void =
        nextParams === undefined ? action => action() : nextParams.registerEffectAction;

    startClientSideIsDarkLogic({
        "colorSchemeExplicitlyProvidedAsParameter": defaultColorScheme,
        "doPersistDarkModePreferenceWithCookie":
            nextParams === undefined ? false : nextParams.doPersistDarkModePreferenceWithCookie,
        registerEffectAction,
        doCheckNonce,
        trustedTypesPolicyName
    });

    // @ts-expect-error
    window.dsapitech = {
        verbose,
        "mode": "react"
    };

    // @ts-expect-error
    await import("./dsapitech/dsapitech.module");

    dDsapitechLoaded.resolve();

    registerEffectAction(() => {
        // @ts-expect-error
        window.dsapitech.start();
    });
}

const dDsapitechLoaded = new Deferred<void>();

export const prDsapitechLoaded = dDsapitechLoaded.pr;
