## How to use ?

### 1 - Install package

```bash
npm i @apitechfr/react-dsapitech
```

### 2 - Add scripts in project's header

```html
  <link rel="manifest" href="./node_modules/@apitechfr/react-dsapitech/favicon/manifest.webmanifest"
    crossorigin="use-credentials" />

  <link rel="stylesheet" href="./node_modules/@apitechfr/react-dsapitech/main.css" />
  <link rel="stylesheet"href="https://cdn.jsdelivr.net/gh/ApitechFR/dsapitech@77c40d7564ca30ec873e97b408e749f3357bd896/dsapitech.css">
```

### 3 - Import and call the components you need

```js
import { Button } from "@apitechfr/react-dsapitech/Button";
//...
<Button>I'm a great button !</Button>
```

## Modifications spécifiques DSApitech

### Hooks

Les hooks utiles pour les exigeances Apitech sont créés dans le fichier `dsapitech_hooks`.

- useFrTheme : Obtenir le theme en cours
  
  ```js
  import { Button } from "@apitechfr/react-dsapitech/Button";
  //...
  const theme = useFrTheme(); // "light" ou "dark"
  ```
  

### Header

Dans le Header, les propriétés ```mainLogoURL``` et ```mainLogoURLDark``` ont été ajoutées, pour préciser les urls des logos souhaités pour le mode light et dark. Par défaut, c'est le logo Apitech qui est choisi.

### Footer

Comme dans le header, les propriétés `mainLogoURL` et `mainLogoURLDark` ont été ajoutées, pour préciser les urls des logos souhaités pour le mode light et dark. Par défaut, c'est le logo Apitech qui est choisi.
