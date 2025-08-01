import React, { type ReactNode, type CSSProperties, type ComponentProps } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import type { RegisteredLinkProps } from "./link";
type DataAttribute = Record<`data-${string}`, string | boolean | null | undefined>;
export type TagProps = TagProps.Common & (TagProps.WithIcon | TagProps.WithoutIcon) & (TagProps.AsAnchor | TagProps.AsButton | TagProps.AsParagraph | TagProps.AsSpan);
export declare namespace TagProps {
    type HTMLElement = HTMLButtonElement | HTMLAnchorElement | HTMLParagraphElement | HTMLSpanElement;
    type Common = {
        id?: string;
        className?: string;
        /** Default: false */
        small?: boolean;
        style?: CSSProperties;
        title?: string;
        children: ReactNode;
        as?: "p" | "span" | "button" | "a";
    };
    type WithIcon = {
        /** Function of the button, to provide if the label isn't explicit */
        iconId: FrIconClassName | RiIconClassName;
    };
    type WithoutIcon = {
        iconId?: never;
    };
    type AsAnchor = {
        as?: "a";
        linkProps: RegisteredLinkProps;
        onClick?: never;
        nativeButtonProps?: never;
        /** @deprecated Tag is now `<p>` by default. Use `nativeParagraphProps` instead. */
        nativeSpanProps?: never;
        nativeParagraphProps?: never;
        dismissible?: never;
        pressed?: never;
    };
    type AsButton = {
        as?: "button";
        linkProps?: never;
        /** @deprecated Tag is now `<p>` by default. Use `nativeParagraphProps` instead. */
        nativeSpanProps?: never;
        nativeParagraphProps?: never;
        /** Default: false */
        dismissible?: boolean;
        pressed?: boolean;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        nativeButtonProps?: ComponentProps<"button"> & DataAttribute;
    };
    type AsParagraph = {
        as?: "p";
        linkProps?: never;
        onClick?: never;
        dismissible?: never;
        pressed?: never;
        nativeButtonProps?: never;
        /** @deprecated Tag is now `<p>` by default. Use `nativeParagraphProps` instead. */
        nativeSpanProps?: ComponentProps<"span"> & DataAttribute;
        nativeParagraphProps?: ComponentProps<"p"> & DataAttribute;
    };
    type AsSpan = {
        as: "span";
        linkProps?: never;
        onClick?: never;
        dismissible?: never;
        pressed?: never;
        nativeButtonProps?: never;
        nativeSpanProps?: ComponentProps<"span"> & DataAttribute;
        nativeParagraphProps?: never;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tag> */
export declare const Tag: React.MemoExoticComponent<React.ForwardRefExoticComponent<TagProps.Common & (TagProps.WithIcon | TagProps.WithoutIcon) & ((TagProps.AsAnchor & React.RefAttributes<HTMLAnchorElement>) | (TagProps.AsButton & React.RefAttributes<HTMLButtonElement>) | (TagProps.AsParagraph & React.RefAttributes<HTMLParagraphElement>) | (TagProps.AsSpan & React.RefAttributes<HTMLSpanElement>))>>;
export default Tag;
