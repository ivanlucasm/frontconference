import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <link rel="icon" type="image/png" href="/favicon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
