# @sapphire-sh/ui

Shared color and font tokens and React components for sapphire-sh Next.js apps.

## Installation

```sh
npm install -S @sapphire-sh/ui
```

## Setup

`src/app/globals.css`:

```css
@import 'tailwindcss';
@import '@sapphire-sh/ui/theme.css';
@source '../../node_modules/@sapphire-sh/ui/lib';
```

The theme reads two font variables that the app fills with `next/font/google`:

- `--font-noto-sans-kr`: `Noto_Sans_KR` loaded with `variable: '--font-noto-sans-kr'`
- `--font-jetbrains-mono`: `JetBrains_Mono` loaded with `variable: '--font-jetbrains-mono'`
