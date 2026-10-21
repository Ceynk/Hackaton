const configuracionNext = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/:ruta*",
        destination: "http://localhost:4000/api/:ruta*"
      }
    ];
  }
};

export default configuracionNext;
