import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import './reset.css';
import Header from '@/components/commons/Header/Header';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  display: 'swap',
});

const baskinRobbins = localFont({
  src: './fonts/baskin_robbins_B.woff',
  variable: '--font-baskin-robbins',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: '최애의 포토',
  description: '포토카드 거래 웹사이트입니다.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${notoSansKR.variable} ${baskinRobbins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
