`Hello friends 👋,

Would you help us implement [the components](https://www.apitech.fr/elements-d-interface/composants/accordeon)?  
Thank you so much to anyone that would!

To get you started you can check out [the `<Alert />` component](https://components.react-dsapitech.codegouv.studio/?path=/docs/components-alert--default).

-   Here is it's definition from the SIG: [apitech.fr/elements-d-interface/composants/alerte](https://www.apitech.fr/elements-d-interface/composants/alerte) (Pro tip: the real source of truth for DSApitech component is [here](https://main--ds-gouv.netlify.app/example/component/))
-   Here is its implementation [src/Alert.tsx](https://github.com/ApitechFR/react-dsapitech/blob/main/src/Alert.tsx)
-   Here is the file that generates its documentation: [stories/Alert.stories.tsx](https://github.com/ApitechFR/react-dsapitech/blob/main/stories/Alert.stories.tsx)

[Here are the few commands](https://github.com/ApitechFR/react-dsapitech#development) you need to run to set up your dev environment.

_If you want to link your development version into your own project it's possible, just [ask me how](https://github.com/ApitechFR/react-dsapitech/discussions)._

A few things:

-   🙏🏻 Don't be afraid to push even if you aren't 100% happy with your code or [if it's still WIP](https://github.com/ApitechFR/react-dsapitech/blob/1fdcf15cb085c67d37c31badf6ffa4725795ba0f/stories/Accordion.stories.tsx#L6).
-   📣 Let everyone know what component you are working on by [oppening an issue](https://github.com/ApitechFR/react-dsapitech/issues).
-   📚 You can draw inspiration from [`dataesr/react-dsapitech`](https://github.com/dataesr/react-dsapitech/tree/master/src/components/interface) and the implementation of [france connect](https://github.com/france-connect/sources/tree/main/front/libs/dsapitech).
-   🔗 Use the component returned by `getLink()` instead of `<a />`. [Example in the `<Header />` component](https://github.com/ApitechFR/react-dsapitech/blob/bbaf4a81d78de08d6fdcb059a9f4cb8a78ce4d5a/src/Header.tsx#L84-L87). We want to [play nice with all routing libraries](https://react-dsapitech.codegouv.studio/integration-with-routing-libraries).
-   🕹️ When it's relevant, try to enable components to be used either in controlled or uncontrolled mode. [Example with <Tabs />](https://components.react-dsapitech.codegouv.studio/?path=/docs/components-tabs--default).
-   🌎 Avoid hard coding text in JSX, use [the i18n mechanism](https://react-dsapitech.codegouv.studio/i18n) instead. [Here is an example](https://github.com/ApitechFR/react-dsapitech/blob/bbaf4a81d78de08d6fdcb059a9f4cb8a78ce4d5a/src/DarkModeSwitch.tsx#L162-L199). (Don't worry about providing translations other than French.)
-   🍳 If you have to arbitrate between ease of use and customisability I'd encourage you to favor ease of use. People that would need a greater level of customizability can always fall back to making their own wrapper from the reference documentation using [`fr.cx()`](https://react-dsapitech.codegouv.studio/cx).

## PR Reviews

[Here is a video](https://youtu.be/RI6jEPvgKJ4) to show you how I review PRs. Please have a look at it, it's full of valuable information
that will save you and I time.

## Getting TypeScript error in VSCode but the console says everything's right?

Because of how this project is setup TypeScript unaware that files have changed.  
You don't need to restart VSCode, just restart the TypeScript server.

https://user-images.githubusercontent.com/6702424/206942271-0dc9b94a-1c2b-4073-99d7-96f7fe862bc4.mov

Assets imports error in Storybook can be solved by opening the `stories/global.d.ts` file:

https://user-images.githubusercontent.com/6702424/206940923-8d2d1113-8b81-4f61-8c4e-66101c9fe67e.mov

Thank You Very Much ❤️

PS: If you want to contribute to the Doc website. You can edit [the source Markdown](https://github.com/ApitechFR/react-dsapitech/tree/v1_docs) or ask me for access to our GitBook. (We'll migrate to Docusaurus once we have the DSApitech theme for it ready.)

## Linking your local copy of `@apitech/react-dsapitech` in your project

This will enable you to see your react-dsapitech changes in your main project.

```bash
cd ~/github
git clone https://github.com/ORG/YOUR-PROJECT-USING-REACT-DSApitech
cd YOUR-PROJECT-USING-REACT-DSApitech
yarn # or npm install or pnpm install depending of what you are using...

cd ~/github
git clone https://github.com/ApitechFR/react-dsapitech
cd react-dsapitech
yarn
yarn build
yarn link-external YOUR-PROJECT-USING-REACT-DSApitech
npx tsc -w -p src # Leave this running if you want hot reload.
```

## Linking a working version of `@apitech/dsapitech` (For the SIG)

```bash
cd ~/github
git clone http://github.com/gouvernementfr/dsapitech
cd dsapitech
# git checkout my-working-branch
yarn
yarn build --clean
yarn link
cd ~/github/react-dsapitech
yarn
yarn link @apitech/dsapitech
yarn build
```

Now `~/github/react-dsapitech/node_modules/@apitech/dsapitech` links to `~/github/@apitech/dsapitech`.
