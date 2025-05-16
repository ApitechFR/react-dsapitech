"use client";

import { HeaderQuickAccessItem } from "@apitech/react-dsapitech/Header";

export function ClientHeaderQuickAccessItem() {

    //NOTE: You can use hooks here

    return (
        <HeaderQuickAccessItem
            quickAccessItem={{
                iconId: "ri-layout-4-line",
                buttonProps: {
                    onClick: ()=> {

                        alert("Click on client item");

                    }
                },
                text: "A client side item",

            }}
        />
    );
}