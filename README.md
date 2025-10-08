# @fellesdatakatalog/ui

Library of React components for FDK frontend apps.

## How to use

```bash
yarn add @fellesdatakatalog/ui
```

```scss
// In your app stylesheet
@import '@fellesdatakatalog/ui/dist/styles.css';
```

```jsx
import { HelpText } from '@fellesdatakatalog/ui';

<HelpText>This is my helptext</HelpText>
```

Otherwise run this repo locally and have a look at the embedded Storybook for additional component documentation and usage examples.

```bash
yarn storybook
```

## Contributing

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >=20.11.1
- [yarn](https://yarnpkg.com/getting-started/install) >=4.9.4

### Running locally

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/fdk-ui.git --recurse-submodules
cd fdk-ui
corepack enable
yarn install
yarn storybook
```

Go to http://localhost:6006 (should open automatically)