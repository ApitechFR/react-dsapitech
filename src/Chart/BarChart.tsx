"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@apitech/dsapitech-chart/BarChart/bar-chart.common";
import "@apitech/dsapitech-chart/BarChart/bar-chart.css";
import {
    chartWrapper,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue,
    MultiChartProps,
    ChartLineProps,
    IntrinsicGraphLineType
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsapitech-chart/blob/v1.0.0/src/components/BarChart.vue#L79
            "bar-chart": {
                horizontal?: string;
                stacked?: string;
            } & IntrinsicGraphType &
                IntrinsicGraphLineType;
        }
    }
}

export type BarChartBaseProps = {
    horizontal?: boolean;
    stacked?: boolean;
} & MultiChartProps &
    ChartLineProps;

export type BarChartProps = BarChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/charts-barchart> */
export const BarChart = chartWrapper((props: BarChartBaseProps) => {
    return <bar-chart {...stringifyObjectValue(props)} />;
}, "bar-chart");
BarChart.displayName = symToStr({ BarChart });

export default BarChart;

// Just so that the icon is included: "fr-icon-arrow-go-back-fill"
