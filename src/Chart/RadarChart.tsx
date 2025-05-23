"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@apitech/dsapitech-chart/RadarChart/radar-chart.common";
import "@apitech/dsapitech-chart/RadarChart/radar-chart.css";
import {
    chartWrapper,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue,
    MultiChartProps
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsapitech-chart/blob/v1.0.0/src/components/RadarChart.vue#L57
            "radar-chart": IntrinsicGraphType;
        }
    }
}

export type RadarChartBaseProps = MultiChartProps;

export type RadarChartProps = RadarChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/charts-radarchart> */
export const RadarChart = chartWrapper(
    (props: RadarChartBaseProps) => <radar-chart {...stringifyObjectValue(props)} />,
    "radar-chart"
);
RadarChart.displayName = symToStr({ RadarChart });

export default RadarChart;
