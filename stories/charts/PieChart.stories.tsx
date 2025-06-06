import { PieChart, type PieChartProps } from "../../dist/Chart/PieChart";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory<PieChartProps>({
    sectionName: sectionName,
    "wrappedComponent": { PieChart },
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
        "name": { "description": "Array of name" },
        "color": { "description": "Array of color" },
        "fill": { control: "boolean" }
    },
    "disabledProps": ["lang"],
    isChartComponent: true
});

export default meta;

export const Default = getStory({
    x: [1, 2, 3],
    y: [10, 20, 30],
    name: ["Serie 1", "Serie 2", "Serie 3"],
    color: ["blue-france", "green-bourgeon", "blue-ecume"]
});
