import React from 'react';
import Document /* eslint-disable-line @next/next/no-document-import-in-page */, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';
import FooterNavBar from '../components/layout/FooterNavBar';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    html: string;
    head?: (JSX.Element | null)[] | undefined;
    styles?:
      | JSX.Element
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
      | React.ReactFragment
      | undefined;
  }> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/static/favicon.png" />
        </Head>
        <body>
          <Main />
          <div className="nav-footer">
            <FooterNavBar />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
