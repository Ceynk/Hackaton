import { Html, Head, Main, NextScript } from "next/document";

export default function DocumentoBase() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Mente Sana Joven: plataforma de orientacion informativa sobre bienestar emocional juvenil y directorio de rutas de apoyo institucional verificadas."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
