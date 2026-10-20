CREATE TABLE IF NOT EXISTS categorias_apoyo (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(60) NOT NULL UNIQUE,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT NOT NULL,
    orden_visual INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS recursos_apoyo (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL REFERENCES categorias_apoyo(id) ON DELETE RESTRICT,
    codigo_recurso VARCHAR(80) NOT NULL UNIQUE,
    nombre_servicio VARCHAR(180) NOT NULL,
    institucion_responsable VARCHAR(180) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo_servicio VARCHAR(100) NOT NULL,
    modalidad_atencion VARCHAR(40) NOT NULL CHECK (modalidad_atencion IN ('Presencial', 'Telefonica', 'Virtual', 'Mixta')),
    poblacion_atendida VARCHAR(180) NOT NULL,
    territorio_cobertura VARCHAR(140) NOT NULL,
    medio_contacto VARCHAR(180) NOT NULL,
    horario_atencion VARCHAR(140) NOT NULL,
    condiciones_acceso TEXT NOT NULL,
    url_oficial VARCHAR(300),
    fuente_verificacion VARCHAR(250) NOT NULL,
    fecha_consulta DATE,
    estado_verificacion VARCHAR(40) NOT NULL DEFAULT 'pendiente_verificacion' CHECK (estado_verificacion IN ('verificado_entorno_controlado', 'pendiente_verificacion', 'suspendido')),
    es_dato_ficticio BOOLEAN NOT NULL DEFAULT TRUE,
    es_atencion_inmediata BOOLEAN NOT NULL DEFAULT FALSE,
    nota_transparencia TEXT NOT NULL,
    fecha_registro TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_verificacion_completa CHECK (
        estado_verificacion <> 'verificado_entorno_controlado'
        OR (fecha_consulta IS NOT NULL AND url_oficial IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS idx_recursos_categoria_id ON recursos_apoyo(categoria_id);
CREATE INDEX IF NOT EXISTS idx_recursos_estado_verificacion ON recursos_apoyo(estado_verificacion);
CREATE INDEX IF NOT EXISTS idx_recursos_modalidad_atencion ON recursos_apoyo(modalidad_atencion);

CREATE TABLE IF NOT EXISTS contenidos_bienestar (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(80) NOT NULL UNIQUE,
    titulo VARCHAR(180) NOT NULL,
    eje_tematico VARCHAR(100) NOT NULL,
    resumen TEXT NOT NULL,
    recomendaciones_practicas TEXT NOT NULL,
    senales_buscar_apoyo TEXT NOT NULL,
    limitacion_alcance TEXT NOT NULL,
    fuente_referencia VARCHAR(250) NOT NULL,
    es_dato_ficticio BOOLEAN NOT NULL DEFAULT TRUE,
    orden_visual INTEGER NOT NULL DEFAULT 1
);
