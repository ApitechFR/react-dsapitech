"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@apitech/dsapitech-chart/MultiLineChart/multiline-chart.common";
import "@apitech/dsapitech-chart/MultiLineChart/multiline-chart.css";
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
            // https://github.com/GouvernementFR/dsapitech-chart/blob/v1.0.0/src/components/MultiLineChart.vue#L74
            "multiline-chart": IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}

export type MultiLineChartBaseProps = MultiChartProps & ChartLineProps;

export type MultiLineChartProps = MultiLineChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/charts-multilinechart> */
export const MultiLineChart = chartWrapper(
    (props: MultiLineChartBaseProps) => <multiline-chart {...stringifyObjectValue(props)} />,
    "multiline-chart"
);
MultiLineChart.displayName = symToStr({ MultiLineChart });

export default MultiLineChart;
