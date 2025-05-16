"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@apitech/dsapitech-chart/BarLineChart/barline-chart.common";
import "@apitech/dsapitech-chart/BarLineChart/barline-chart.css";
import {
    chartWrapper,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue,
    ChartProps,
    ChartLineProps,
    IntrinsicGraphLineType
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsapitech-chart/blob/v1.0.0/src/components/BarLineChart.vue#L75
            "bar-line-chart": {
                ybar: string;
            } & IntrinsicGraphType &
                IntrinsicGraphLineType;
        }
    }
}

export type BarLineChartBaseProps = {
    ybar: number[];
    name?: string;
    nameBar?: string;
    horizontal?: boolean;
    stacked?: boolean;
} & Omit<ChartProps, "name"> &
    ChartLineProps;

export type BarLineChartProps = BarLineChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/charts-barlinechart> */
export const BarLineChart = chartWrapper((props: BarLineChartBaseProps) => {
    return <bar-line-chart {...stringifyObjectValue(props)} />;
}, "bar-line-chart");
BarLineChart.displayName = symToStr({ BarLineChart });

export default BarLineChart;
