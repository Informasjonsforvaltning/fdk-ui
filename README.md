# @fellesdatakatalog/ui

A React UI component library for Felles Datakatalog applications.

## Installation

```bash
npm install @fellesdatakatalog/ui
# or
yarn add @fellesdatakatalog/ui
```

## Usage

```tsx
import { OrgLogo, AppBar } from '@fellesdatakatalog/ui';

function MyApp() {
  return (
    <div>
      <AppBar />
      <OrgLogo orgLogoSrc="/path/to/logo.png" />
    </div>
  );
}
```

## Components

### OrgLogo

A component for displaying organization logos with fallback to a building icon.

```tsx
import { OrgLogo } from '@fellesdatakatalog/ui';

// With logo
<OrgLogo orgLogoSrc="/path/to/logo.png" />

// Without logo (shows building icon)
<OrgLogo />

// With custom className
<OrgLogo className="custom-class" />
```

**Props:**
- `orgLogoSrc?: string | null` - URL of the organization logo
- `className?: string` - Additional CSS classes
- All standard HTML div attributes

### AppBar

Application bar component for navigation and branding.

```tsx
import { AppBar } from '@fellesdatakatalog/ui';

<AppBar />
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
# or
yarn install
```

### Scripts

- `npm run build` / `yarn build` - Build the library
- `npm run test` / `yarn test` - Run tests
- `npm run storybook` / `yarn storybook` - Start Storybook
- `npm run build-storybook` / `yarn build-storybook` - Build Storybook

### Storybook

View all components and their variations in Storybook:

```bash
npm run storybook
# or
yarn storybook
```

## Building for Production

```bash
npm run build
# or
yarn build
```

This will create:
- `dist/shared-ui.es.js` - ES module bundle
- `dist/shared-ui.umd.js` - UMD bundle
- `dist/types/` - TypeScript declarations
- `dist/styles.css` - Compiled CSS

## Publishing

```bash
npm publish
# or
yarn publish
```

## License

MIT