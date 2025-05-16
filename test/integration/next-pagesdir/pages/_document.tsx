import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import { dsapitechDocumentApi, augmentDocumentWithEmotionCache } from "./_app";

const { augmentDocumentForDsapitech, getColorSchemeHtmlAttributes } = dsapitechDocumentApi;

export default function Document(props: DocumentProps) {
    return (
        <Html {...getColorSchemeHtmlAttributes(props)}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

augmentDocumentForDsapitech(Document);

augmentDocumentWithEmotionCache(Document);
