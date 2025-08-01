import type { ReactNode } from "react";
export type FinalityConsent<Finality extends string> = {
    readonly [K in Finality as K extends `${infer _P}.${infer _C}` ? never : K]: boolean;
} & {
    readonly [K in Finality as K extends `${infer P}.${infer _C}` ? P : never]: Readonly<Record<K extends `${infer _P}.${infer C}` ? C : never, boolean>> & {
        readonly isFullConsent: boolean;
    };
} & {
    readonly isFullConsent: boolean;
};
export type ExtractFinalityFromFinalityDescription<FinalityDescription extends Record<string, {
    title: ReactNode;
    subFinalities?: Record<string, ReactNode>;
}>> = {
    [K in keyof FinalityDescription]: K extends string ? FinalityDescription[K] extends {
        subFinalities: Record<string, any>;
    } ? `${K}.${ExtractFinalityFromFinalityDescription.SubFinalities<FinalityDescription[K]>}` : K : never;
}[keyof FinalityDescription];
export declare namespace ExtractFinalityFromFinalityDescription {
    type SubFinalities<T> = T extends {
        subFinalities: infer U;
    } ? U extends Record<string, any> ? keyof U : never : never;
}
