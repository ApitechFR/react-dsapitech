"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@apitech/dsapitech-chart/PieChart/pie-chart.common";
import "@apitech/dsapitech-chart/PieChart/pie-chart.css";
import {
    chartWrapper,
    type ChartProps,
    type IntrinsicGraphType,
    type BaseChartProps,
    stringifyObjectValue,
    type ChartColor
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsapitech-chart/blob/v1.0.0/src/components/PieChart.vue#L59
            "pie-chart": {
                fill?: string;
            } & IntrinsicGraphType;
        }
    }
}

export type PieChartBaseProps = {
    fill?: boolean;
    name?: string[];
    color?: ChartColor[];
} & Omit<ChartProps, "name" | "color">;

export type PieChartProps = PieChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/charts-piechart> */
export const PieChart = chartWrapper(
    (props: PieChartBaseProps) => <pie-chart {...stringifyObjectValue(props)} />,
    "pie-chart"
);
PieChart.displayName = symToStr({ PieChart });

export default PieChart;
