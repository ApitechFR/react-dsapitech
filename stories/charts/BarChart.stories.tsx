import { BarChart, type BarChartProps } from "../../dist/Chart/BarChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<BarChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { BarChart },
    "description": `
- [See DSApitech documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants-beta/graphiques-charts/)
- [See source code](https://github.com/ApitechFR/react-dsapitech/blob/main/src/Chart/BarChart.tsx)  

To use this component you need to add \`@apitech/dsapitech-chart\` to your dependencies.  

Note for Next users: Chart components are not SSR compatible. You need to import them dynamically with [\`next/dynamic\`](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic).  
You can find an example [here](https://github.com/ApitechFR/react-dsapitech/blob/bc2c2be290b09684711c53176b7a379cebed08a8/test/integration/next-appdir/app/dsapitech-chart/page.tsx#L8-L9).  

`,
    "argTypes": {
        "x": {
            "description": "Array of value for the x axis"
        },
        "y": {
            "description": "Array of value for the y axis"
        },
        "name": { "description": "Array of name", control: "object" },
        "color": { "description": "Array of color", control: "object" },
        "horizontal": {
            "control": { "type": "boolean" }
        },
        "stacked": {
            "control": { "type": "boolean" }
        },
        "hline": { "description": "Array of horizontal lines to add", control: "object" },
        "hlinename": { "description": "Name of the horizontal lines", control: "object" },
        "vline": { "description": "Array of vertical lines to add", control: "object" },
        "vlinename": { "description": "Name of the vertical lines", control: "object" },
        "vlinecolor": { "description": "Color of the horizontal lines", control: "object" },
        "hlinecolor": { "description": "Color of the vertical lines", control: "object" }
    },
    "disabledProps": ["lang"],
    isChartComponent: true
});

export default meta;

export const Default = getStory({
    "x": [
        ["A", "B"],
        ["A", "B"]
    ],
    "y": [
        [100, 50],
        [20, 10]
    ]
});
