import React, { useState, useRef } from "react";
import { CallOut } from "../../dist/CallOut";
import { colorDecisionAndCorrespondingOptions } from "../../dist/fr/generatedFromCss/colorDecisionAndCorrespondingOptions";
import type { ColorDecisionAndCorrespondingOption } from "../../scripts/build/cssToTs/colorDecisionAndCorrespondingOptions";
import { fr } from "../../dist/fr";
import { createUseDebounce } from "powerhooks/useDebounce";
import { Fzf } from "fzf";
import { MuiDsapitechThemeProvider } from "../../dist/mui";
import { Search } from "./Search";
import { useConst } from "powerhooks/useConst";
import { Evt } from "evt";
import { useStyles } from "tss-react";
import type { Props as SearchProps } from "./Search";
import { useEffectOnValueChange } from "powerhooks/useEffectOnValueChange";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ColorDecisionCard } from "./ColorDecisionCard";

const { useDebounce } = createUseDebounce({ "delay": 400 });

export function ColorHelper() {
    const [search, setSearch] = useState("");

    const [
        filteredColorDecisionAndCorrespondingOption,
        setFilteredColorDecisionAndCorrespondingOption
    ] = useState<readonly ColorDecisionAndCorrespondingOption[]>(
        colorDecisionAndCorrespondingOptions
    );

    const [context, setContext] = useState<SearchProps["context"]>(undefined);
    const [color, setColor] = useState<SearchProps["color"]>(undefined);
    const [usage, setUsage] = useState<SearchProps["usage"]>(undefined);

    const updateFilter = () =>
        setFilteredColorDecisionAndCorrespondingOption(
            filterColorDecisionAndCorrespondingOption({
                search
            })({
                context,
                color,
                usage
            })
        );

    useDebounce(() => updateFilter(), [search]);

    useEffectOnValueChange(() => {
        updateFilter();
    }, [context, color, usage]);

    const { css } = useStyles();

    const evtSearchAction = useConst(() => Evt.create<"scroll to">());

    const [filteredContextes, setFilteredContextes] = useState(contextes);

    useEffectOnValueChange(() => {
        const f = filterColorDecisionAndCorrespondingOption({ search });

        setFilteredContextes(
            contextes.filter(context => f({ context, color, usage }).length !== 0)
        );
    }, [search, context, color, usage]);

    const [filteredColors, setFilteredColors] = useState(colors);

    useEffectOnValueChange(() => {
        const f = filterColorDecisionAndCorrespondingOption({ search });

        setFilteredColors(colors.filter(color => f({ context, color, usage }).length !== 0));
    }, [search, context, color, usage]);

    const [filteredUsage, setFilteredUsages] = useState(usages);

    useEffectOnValueChange(() => {
        const f = filterColorDecisionAndCorrespondingOption({ search });

        setFilteredUsages(usages.filter(usage => f({ context, color, usage }).length !== 0));
    }, [search, context, color, usage]);

    return (
        <MuiDsapitechThemeProvider>
            <div>
                <CallOut
                    className={css({ "marginBottom": 0 })}
                    title="Color Helper tool"
                    iconId="ri-palette-line"
                    buttonProps={{
                        "onClick": () => evtSearchAction.post("scroll to"),
                        "children": "Start searching"
                    }}
                >
                    This tool help you find the perfect DSApitech color decision for your usecase.
                    <br />
                    <br />
                    Use se search filters to the DSApitech compliant color decision that best fit your
                    needs.
                </CallOut>
                <Search
                    evtAction={evtSearchAction}
                    onSearchChange={search => setSearch(search)}
                    search={search}
                    contextes={filteredContextes}
                    context={context}
                    onContextChange={setContext}
                    colors={filteredColors}
                    color={color}
                    onColorChange={setColor}
                    usages={filteredUsage}
                    usage={usage}
                    onUsageChange={setUsage}
                />
                <h3 style={{ "marginTop": fr.spacing("6v") }}>
                    {search === ""
                        ? `${filteredColorDecisionAndCorrespondingOption.length} color decisions`
                        : `Found ${filteredColorDecisionAndCorrespondingOption.length} decisions matching your query`}
                </h3>
                {filteredColorDecisionAndCorrespondingOption.length === 0 ? null : (
                    <RowVirtualizerDynamicWindow
                        colorDecisionAndCorrespondingOptions={
                            filteredColorDecisionAndCorrespondingOption
                        }
                    />
                )}
                {/*
                {filteredColorDecisionAndCorrespondingOption.map(
                    (colorDecisionAndCorrespondingOption, i) => (
                        <ColorDecisionCard
                            {...colorDecisionAndCorrespondingOption}
                            key={i}
                            className={css({ "marginTop": fr.spacing("4v") })}
                        />
                    )
                )}
                    */}
            </div>
        </MuiDsapitechThemeProvider>
    );
}

const colors = Array.from(
    new Set(
        colorDecisionAndCorrespondingOptions.map(
            ({ parsedColorDecisionName }) => parsedColorDecisionName.colorName
        )
    )
);

const contextes = Array.from(
    new Set(
        colorDecisionAndCorrespondingOptions.map(
            ({ parsedColorDecisionName }) => parsedColorDecisionName.context
        )
    )
);

const usages = Array.from(
    new Set(
        colorDecisionAndCorrespondingOptions.map(
            ({ parsedColorDecisionName }) => parsedColorDecisionName.usage
        )
    )
);

function RowVirtualizerDynamicWindow(props: {
    colorDecisionAndCorrespondingOptions: readonly ColorDecisionAndCorrespondingOption[];
}) {
    const { colorDecisionAndCorrespondingOptions } = props;

    const parentRef = useRef<HTMLDivElement>(null);

    const parentOffsetRef = useRef(0);

    React.useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, []);

    const virtualizer = useWindowVirtualizer({
        "count": colorDecisionAndCorrespondingOptions.length,
        "estimateSize": () => 45,
        "scrollMargin": parentOffsetRef.current
    });
    const items = virtualizer.getVirtualItems();

    const { css } = useStyles();

    return (
        <div ref={parentRef}>
            <div
                style={{
                    "height": virtualizer.getTotalSize(),
                    "width": "100%",
                    "position": "relative"
                }}
            >
                <div
                    style={{
                        "position": "absolute",
                        "top": 0,
                        "left": 0,
                        "width": "100%",
                        "transform": `translateY(${
                            items[0].start - virtualizer.options.scrollMargin
                        }px)`
                    }}
                >
                    {items.map(virtualRow => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                        >
                            <ColorDecisionCard
                                {...colorDecisionAndCorrespondingOptions[virtualRow.index]}
                                className={css({ "marginTop": fr.spacing("4v") })}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const { filterColorDecisionAndCorrespondingOption } = (() => {
    const fzf = new Fzf<readonly ColorDecisionAndCorrespondingOption[]>(
        colorDecisionAndCorrespondingOptions,
        {
            "selector": ({
                colorDecisionName,
                themePath,
                colorOption: { colorOptionName, themePath: optionThemePath, color }
            }) =>
                `${colorDecisionName} ${["theme", "decisions", ...themePath].join(
                    "."
                )} ${colorOptionName} ${["theme", "options", ...optionThemePath].join(".")} ${
                    typeof color === "string" ? color : `${color.light} ${color.dark}`
                }`
        }
    );

    function filterColorDecisionAndCorrespondingOption(params: { search: string }) {
        const { search } = params;

        const filteredColorDecisionAndCorrespondingOptions = fzf
            .find(search)
            .map(
                ({ item: colorDecisionAndCorrespondingOption }) =>
                    colorDecisionAndCorrespondingOption
            );

        return (params: {
            context: SearchProps["context"] | undefined;
            color: SearchProps["color"] | undefined;
            usage: SearchProps["usage"] | undefined;
        }) => {
            const { context, color, usage } = params;

            return filteredColorDecisionAndCorrespondingOptions
                .filter(({ parsedColorDecisionName }) =>
                    context === undefined ? true : parsedColorDecisionName.context === context
                )
                .filter(({ parsedColorDecisionName }) =>
                    color === undefined ? true : parsedColorDecisionName.colorName === color
                )
                .filter(({ parsedColorDecisionName }) =>
                    usage === undefined ? true : parsedColorDecisionName.usage === usage
                );
        };
    }

    return { filterColorDecisionAndCorrespondingOption };
})();
