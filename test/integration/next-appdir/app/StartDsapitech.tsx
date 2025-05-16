"use client";

import { startReactDsapitech } from "@apitech/react-dsapitech/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import { addAlertTranslations } from "@apitech/react-dsapitech/Alert";
import Link from "next/link";

declare module "@apitech/react-dsapitech/next-appdir" {
    interface RegisterLink { 
        Link: typeof Link;
    }
}

startReactDsapitech({ 
	defaultColorScheme, 
	Link,
    "doCheckNonce": true
});

export function StartDsapitech(){
	return null;
}

addAlertTranslations({
    "lang": "fr",
    "messages": {
        "hide message": "Masquer le message (modifié)",
    }
});
