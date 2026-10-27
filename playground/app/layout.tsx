import type { Metadata } from 'next';
import { JetBrains_Mono, Noto_Sans_KR } from 'next/font/google';
import type { ReactNode } from 'react';
import { ToastProvider } from '../../lib/index.js';
import './globals.css';

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
			<ToastProvider>{children}</ToastProvider>
		</body>
	</html>
);

export default RootLayout;
