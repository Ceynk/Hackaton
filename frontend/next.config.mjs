const urlDestinoApi =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

const urlBaseNormalizada = urlDestinoApi.replace(/\/+$/, "").replace(/\/api$/, "");

const configuracionNext = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/:ruta*",
        destination: `${urlBaseNormalizada}/api/:ruta*`
      }
    ];
  }
};

export default configuracionNext;
