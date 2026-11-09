import type { Metadata } from 'next';
import { JetBrains_Mono, Noto_Sans_KR } from 'next/font/google';
import type { ReactNode } from 'react';
import { Nav, ThemeToggle, ToastProvider } from '../../lib/index.js';
import './globals.css';
import { NAV_ITEMS } from './navItems';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto-sans-kr' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
	title: '@sapphire-sh/ui',
};

interface RootLayoutProps {
	children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
	<html lang="ko" className={`${notoSansKr.variable} ${jetbrainsMono.variable}`}>
		<body className="bg-background font-sans text-foreground">
			<ToastProvider>
				<Nav brand="@sapphire-sh/ui" items={NAV_ITEMS} actions={<ThemeToggle />} />
				{children}
			</ToastProvider>
		</body>
	</html>
);

export default RootLayout;
