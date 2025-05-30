
import React, { useEffect } from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs";
import { useDarkMode } from "storybook-dark-mode";
import { darkTheme, lightTheme } from "./customTheme";
import "../dist/dsapitech/utility/icons/icons.min.css";
import "../dist/dsapitech/dsapitech.css";
import { useIsDark } from "../dist/useIsDark";
import { startReactDsapitech } from "../dist/spa";
import { fr } from "../dist/fr";
import { MuiDsapitechThemeProvider } from "../dist/mui";

startReactDsapitech({
    "defaultColorScheme": "system",
    "useLang": () => "fr"
});

export const DocsContainer = ({ children, context }) => {
    const isStorybookUiDark = useDarkMode();
    const { setIsDark } = useIsDark();

    useEffect(
        ()=> {
            setIsDark(isStorybookUiDark);
        },
        [isStorybookUiDark]
    );

    const backgroundColor = fr.colors.decisions.background.default.grey.default;

    return (
        <>
            <style>{`
                body {
                    padding: 0 !important;
                    background-color: ${backgroundColor};
                }

                .docs-story {
                    background-color: ${backgroundColor};
                }
                [id^=story--] .container {
                    border: 1px dashed #e8e8e8;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(3) {
                    visibility: collapse;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(2) p {
                    font-size: 13px;
                }

            `}</style>
            <BaseContainer
                context={{
                    ...context,
                    "storyById": id => {
                        const storyContext = context.storyById(id);
                        return {
                            ...storyContext,
                            "parameters": {
                                ...storyContext?.parameters,
                                "docs": {
                                    ...storyContext?.parameters?.docs,
                                    "theme": isStorybookUiDark ? darkTheme : lightTheme
                                }
                            }
                        };
                    }
                }}
            >
                <MuiDsapitechThemeProvider>
                    {children}
                </MuiDsapitechThemeProvider>
            </BaseContainer>
        </>
    );
};
