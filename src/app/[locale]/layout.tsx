import { bodyClass, htmlClass, MuiProvider } from '@/layout/theme';
import { Footer } from '@/layout/footer/footer';
import { Navbar } from '@/layout/navbar/navbar';
import { CommonParams, MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import i18nConfig from '@/i18n/i18nConfig';
import { Analytics } from '@/analytics';
import { Metadata } from 'next';
import { jsonLd } from '@/jsonLd';

const URLSite = 'https://devfest2027.gdgnantes.com';

export async function generateMetadata({
  params,
}: CommonParams): Promise<Metadata> {
  const t = await getTranslation(params);
  return {
    title: 'Devfest Nantes',
    description: t('site.description'),
    authors: [
      {
        name: 'GDG Nantes',
        url: 'https://gdgnantes.com',
      },
    ],
    metadataBase: new URL(URLSite),
    alternates: {
      canonical: URLSite,
      languages: {
        en: '/en',
        fr: '/',
      },
    },
    twitter: {
      site: '@devfestnantes',
    },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout: MyComponent = async ({ children, params }) => {
  const _params = await params;
  const locale = _params?.locale || i18nConfig.defaultLocale;

  return (
    <html lang={locale} className={htmlClass}>
      <body className={bodyClass}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <MuiProvider>
          <Navbar params={params} />
          <main>{children}</main>
          <Footer params={params} />
        </MuiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
