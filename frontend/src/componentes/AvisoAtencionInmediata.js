export default function AvisoAtencionInmediata({
  estadoSalud,
  alActivarFiltroUrgencias
}) {
  const conexionActiva = Boolean(estadoSalud?.baseDatos?.conectado);

  return (
    <div className="barra-orientacion-prudente" role="region" aria-label="Aviso de atencion de urgencias y estado del prototipo">
      <div className="contenedor-principal barra-orientacion-contenido">
        <p className="barra-orientacion-texto">
          <strong>Orientacion ante urgencias:</strong> Esta plataforma es informativa y no evalua situaciones clinicas. Si usted o alguien cercano requiere atencion humana inmediata, acuda al servicio de urgencias mas cercano o consulte los canales oficiales de emergencia de su municipio.
        </p>
        <div className="barra-orientacion-acciones">
          <button
            type="button"
            className="boton-enlace-urgencia"
            onClick={alActivarFiltroUrgencias}
          >
            Ver protocolo de urgencias
          </button>
          <span
            className={`indicador-conexion ${conexionActiva ? "indicador-activo" : "indicador-inactivo"}`}
            aria-live="polite"
          >
            {conexionActiva
              ? `Servicio activo (${estadoSalud.baseDatos.recursosVerificados} rutas sinteticas verificadas)`
              : "Verificando conexion con API Express"}
          </span>
        </div>
      </div>
    </div>
  );
}
