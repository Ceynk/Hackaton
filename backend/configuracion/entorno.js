const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const urlBaseDatos = process.env.DATABASE_URL;

const configuracionEntorno = {
  puertoBackend: Number(process.env.PORT || process.env.PUERTO_BACKEND) || 4000,
  origenPermitidoCors:
    process.env.ORIGEN_PERMITIDO_CORS ||
    "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001",
  modoBaseDatos: process.env.MODO_BASE_DATOS || "auto",
  baseDatos: urlBaseDatos
    ? {
        connectionString: urlBaseDatos,
        ssl:
          process.env.PGSSLMODE === "disable"
            ? false
            : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      }
    : {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE || "mente_sana_joven",
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "",
        ssl:
          process.env.PGSSLMODE === "require" || process.env.PGSSLMODE === "true"
            ? { rejectUnauthorized: false }
            : false,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000
      }
};

module.exports = configuracionEntorno;
