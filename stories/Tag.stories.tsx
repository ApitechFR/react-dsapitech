import { Tag, type TagProps } from "../dist/Tag";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert, Equals } from "tsafe/assert";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Tag },
    "description": `
- [See DSApitech documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tag)
- [See source code](https://github.com/ApitechFR/react-dsapitech/blob/main/src/Tag.tsx)`,
    "argTypes": {
        "dismissible": {
            "control": { "type": "boolean" }
        },
        "small": {
            "control": { "type": "boolean" }
        },
        "iconId": {
            "options": (() => {
                const options = ["fr-icon-checkbox-circle-line", "ri-ancient-gate-fill"] as const;
                type AllIconIds = NonNullable<TagProps["iconId"]>;

                assert<
                    Equals<typeof options[number], Extract<AllIconIds, typeof options[number]>>
                >();

                return options;
            })(),
            "control": { "type": "radio" }
        },

        "nativeButtonProps": {
            "description": `Can be used to attach extra props to the underlying native button.  
            Example: \`{ "aria-controls": "fr-modal-1", onMouseEnter: event => {...} }\``,
            "control": { "type": null }
        },
        "children": {
            "description": "The label of the button",
            "control": { "type": "string" }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "children": "Label tag"
});

export const TagAsAnchor = getStory({
    "children": "I'm a link",
    "linkProps": {
        "href": "#"
    }
});

export const TagWithIcon = getStory({
    "children": "Label button",
    "iconId": "fr-icon-checkbox-circle-line"
});

export const TagLinkWithIcon = getStory({
    "children": "Label link",
    "iconId": "fr-icon-checkbox-circle-line",
    "linkProps": {
        "href": "#"
    }
});

export const TagButtonWithIcon = getStory({
    "children": "Label button",
    "iconId": "fr-icon-checkbox-circle-line",
    "nativeButtonProps": {
        onClick: () => console.log("click")
    }
});

export const SmallTag = getStory({
    "children": "Label button",
    "small": true,
    "iconId": "fr-icon-checkbox-circle-line"
});

export const TagDismissible = getStory({
    "children": "Label button",
    "dismissible": true,
    "nativeButtonProps": {
        onClick: () => console.log("click")
    }
});

export const SmallTagDismissible = getStory({
    "children": "Label button",
    "small": true,
    "dismissible": true,
    "nativeButtonProps": {
        onClick: () => console.log("click")
    }
});

export const TagPressed = getStory({
    "children": "Label button",
    "pressed": true,
    "nativeButtonProps": {
        onClick: () => console.log("click")
    }
});
