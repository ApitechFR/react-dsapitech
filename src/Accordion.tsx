"use client";

import React, {
    forwardRef,
    memo,
    useState,
    useEffect,
    type ReactNode,
    type CSSProperties
} from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type AccordionProps = AccordionProps.Controlled | AccordionProps.Uncontrolled;

export namespace AccordionProps {
    export type Common = {
        className?: string;
        id?: string;
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
        label: ReactNode;
        classes?: Partial<Record<"root" | "accordion" | "title" | "collapse", string>>;
        style?: CSSProperties;
        children: NonNullable<ReactNode>;
    };

    export type Uncontrolled = Common & {
        defaultExpanded?: boolean;
        expanded?: never;
        onExpandedChange?: (
            expanded: boolean,
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
    };

    export type Controlled = Common & {
        defaultExpanded?: never;
        expanded: boolean;
        onExpandedChange: (
            expanded: boolean,
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
    };
}

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/components-accordion>  */
export const Accordion = memo(
    forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
        const {
            className,
            id: id_props,
            titleAs: HtmlTitleTag = "h3",
            label,
            classes = {},
            style,
            children,
            expanded: expanded_props,
            defaultExpanded = false,
            onExpandedChange,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-accordion",
            "explicitlyProvidedId": id_props
        });

        const collapseElementId = `${id}-collapse`;

        const [isExpanded, setIsExpanded] = useState(expanded_props ?? defaultExpanded);

        useEffect(() => {
            if (expanded_props === undefined) {
                return;
            }

            setIsExpanded(expanded_props);
        }, [expanded_props]);

        const onExtendButtonClick = useConstCallback(
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                const isExpended_newValue = !isExpanded;

                onExpandedChange?.(isExpended_newValue, event);

                if (expanded_props === undefined) {
                    setIsExpanded(isExpended_newValue);
                }
            }
        );

        return (
            <section
                className={cx(fr.cx("fr-accordion"), className)}
                style={style}
                ref={ref}
                {...rest}
            >
                <HtmlTitleTag className={cx(fr.cx("fr-accordion__title"), classes.title)}>
                    <button
                        className={fr.cx("fr-accordion__btn")}
                        aria-expanded={isExpanded}
                        aria-controls={collapseElementId}
                        onClick={onExtendButtonClick}
                        type="button"
                        id={`${id}__toggle-btn`}
                    >
                        {label}
                    </button>
                </HtmlTitleTag>
                <div className={cx(fr.cx("fr-collapse"), classes.collapse)} id={collapseElementId}>
                    {children}
                </div>
            </section>
        );
    })
);

Accordion.displayName = symToStr({ Accordion });

export default Accordion;
