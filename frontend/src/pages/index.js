import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import {
  obtenerEstadoSalud,
  obtenerCategorias,
  obtenerRecursos,
  obtenerDetalleRecurso,
  obtenerContenidosBienestar,
  validarTerminoBusquedaCliente
} from "../servicios/clienteApi";
import AvisoAtencionInmediata from "../componentes/AvisoAtencionInmediata";
import EncabezadoNavegacion from "../componentes/EncabezadoNavegacion";
import SeccionHero from "../componentes/SeccionHero";
import SeccionProposito from "../componentes/SeccionProposito";
import SeccionBienestar from "../componentes/SeccionBienestar";
import DirectorioRutasApoyo from "../componentes/DirectorioRutasApoyo";
import ModalDetalleRecurso from "../componentes/ModalDetalleRecurso";
import SeccionPreguntasFrecuentes from "../componentes/SeccionPreguntasFrecuentes";
import SeccionTransparencia from "../componentes/SeccionTransparencia";
import PiePagina from "../componentes/PiePagina";

const FILTROS_INICIALES = {
  categoria: "",
  modalidad: "",
  tipoServicio: "",
  busqueda: "",
  soloAtencionInmediata: false
};

export default function PaginaPrincipal() {
  const [estadoSalud, setEstadoSalud] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [modalidadesDisponibles, setModalidadesDisponibles] = useState([]);
  const [tiposServicioDisponibles, setTiposServicioDisponibles] = useState([]);

  const [recursos, setRecursos] = useState([]);
  const [avisoUsoResponsable, setAvisoUsoResponsable] = useState("");
  const [filtrosActivos, setFiltrosActivos] = useState(FILTROS_INICIALES);
  const [textoBusquedaTemporal, setTextoBusquedaTemporal] = useState("");
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [cargandoRecursos, setCargandoRecursos] = useState(true);
  const [errorRecursos, setErrorRecursos] = useState("");

  const [contenidosBienestar, setContenidosBienestar] = useState([]);
  const [ejesDisponibles, setEjesDisponibles] = useState([]);
  const [ejeSeleccionado, setEjeSeleccionado] = useState("");
  const [cargandoContenidos, setCargandoContenidos] = useState(true);
  const [errorContenidos, setErrorContenidos] = useState("");

  const [recursoDetalle, setRecursoDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [errorDetalle, setErrorDetalle] = useState("");

  const cargarRecursosConFiltros = useCallback(async (filtrosConsulta) => {
    setCargandoRecursos(true);
    setErrorRecursos("");
    try {
      const respuestaRecursos = await obtenerRecursos(filtrosConsulta);
      setRecursos(respuestaRecursos.recursos || []);
      setAvisoUsoResponsable(respuestaRecursos.avisoUsoResponsable || "");
    } catch (errorCapturado) {
      setErrorRecursos(errorCapturado.message);
      setRecursos([]);
    } finally {
      setCargandoRecursos(false);
    }
  }, []);

  const cargarContenidosPorEje = useCallback(async (ejeFiltro) => {
    setCargandoContenidos(true);
    setErrorContenidos("");
    try {
      const respuestaContenidos = await obtenerContenidosBienestar(ejeFiltro);
      setContenidosBienestar(respuestaContenidos.contenidos || []);
      if (Array.isArray(respuestaContenidos.ejesTematicosDisponibles)) {
        setEjesDisponibles(respuestaContenidos.ejesTematicosDisponibles);
      }
    } catch (errorCapturado) {
      setErrorContenidos(errorCapturado.message);
      setContenidosBienestar([]);
    } finally {
      setCargandoContenidos(false);
    }
  }, []);

  const cargarDatosIniciales = useCallback(async () => {
    try {
      const [respuestaSalud, respuestaCategorias] =
        await Promise.all([
          obtenerEstadoSalud(),
          obtenerCategorias()
        ]);

      setEstadoSalud(respuestaSalud);
      setCategorias(respuestaCategorias.categorias || []);
      setModalidadesDisponibles(
        respuestaCategorias.filtrosDisponibles?.modalidades || []
      );
      setTiposServicioDisponibles(
        respuestaCategorias.filtrosDisponibles?.tiposServicio || []
      );
    } catch (errorInicial) {
      setEstadoSalud(null);
    }
  }, []);

  useEffect(() => {
    cargarDatosIniciales();
    cargarContenidosPorEje("");
  }, [cargarDatosIniciales, cargarContenidosPorEje]);

  useEffect(() => {
    cargarRecursosConFiltros(filtrosActivos);
  }, [filtrosActivos, cargarRecursosConFiltros]);

  function manejarCambioCampoFiltro(nombreCampo, nuevoValor) {
    setErrorBusqueda("");
    setFiltrosActivos((estadoAnterior) => ({
      ...estadoAnterior,
      [nombreCampo]: nuevoValor
    }));
  }

  function manejarCambioTextoBusqueda(nuevoTexto) {
    setTextoBusquedaTemporal(nuevoTexto);
    if (errorBusqueda) {
      setErrorBusqueda("");
    }
  }

  function manejarEjecucionBusqueda() {
    const validacion = validarTerminoBusquedaCliente(textoBusquedaTemporal);
    if (!validacion.esValido) {
      setErrorBusqueda(validacion.mensajeError);
      return;
    }

    setErrorBusqueda("");
    setFiltrosActivos((estadoAnterior) => ({
      ...estadoAnterior,
      busqueda: validacion.terminoNormalizado
    }));
  }

  function manejarLimpiezaFiltros() {
    setTextoBusquedaTemporal("");
    setErrorBusqueda("");
    setFiltrosActivos(FILTROS_INICIALES);
  }

  function manejarActivacionFiltroUrgencias() {
    setTextoBusquedaTemporal("");
    setErrorBusqueda("");
    setFiltrosActivos({
      ...FILTROS_INICIALES,
      soloAtencionInmediata: true
    });

    const seccionDirectorio = document.getElementById("directorio");
    if (seccionDirectorio) {
      seccionDirectorio.scrollIntoView({ behavior: "smooth" });
    }
  }

  function manejarCambioEjeBienestar(nuevoEje) {
    setEjeSeleccionado(nuevoEje);
    cargarContenidosPorEje(nuevoEje);
  }

  async function manejarSeleccionRecurso(identificadorRecurso) {
    setCargandoDetalle(true);
    setErrorDetalle("");
    setRecursoDetalle(null);

    try {
      const respuestaDetalle = await obtenerDetalleRecurso(identificadorRecurso);
      setRecursoDetalle(respuestaDetalle.recurso);
    } catch (errorCapturado) {
      setErrorDetalle(errorCapturado.message);
    } finally {
      setCargandoDetalle(false);
    }
  }

  function manejarCierreModal() {
    setRecursoDetalle(null);
    setCargandoDetalle(false);
    setErrorDetalle("");
  }

  function manejarReintentoDirectorio() {
    cargarDatosIniciales();
    cargarRecursosConFiltros(filtrosActivos);
  }

  const totalRutasVerificadas =
    estadoSalud?.baseDatos?.recursosVerificados || recursos.length || 6;

  return (
    <>
      <Head>
        <title>Mente Sana Joven | Bienestar Emocional y Rutas de Apoyo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AvisoAtencionInmediata
        estadoSalud={estadoSalud}
        alActivarFiltroUrgencias={manejarActivacionFiltroUrgencias}
      />

      <EncabezadoNavegacion />

      <main id="contenido-principal">
        <SeccionHero
          totalRutasVerificadas={totalRutasVerificadas}
          alIrADirectorio={() => {}}
        />

        <SeccionProposito />

        <SeccionBienestar
          contenidos={contenidosBienestar}
          ejesDisponibles={ejesDisponibles}
          ejeSeleccionado={ejeSeleccionado}
          alCambiarEje={manejarCambioEjeBienestar}
          cargandoContenidos={cargandoContenidos}
          errorContenidos={errorContenidos}
        />

        <DirectorioRutasApoyo
          categorias={categorias}
          modalidadesDisponibles={modalidadesDisponibles}
          tiposServicioDisponibles={tiposServicioDisponibles}
          recursos={recursos}
          filtrosActivos={filtrosActivos}
          textoBusquedaTemporal={textoBusquedaTemporal}
          errorBusqueda={errorBusqueda}
          cargandoRecursos={cargandoRecursos}
          errorRecursos={errorRecursos}
          avisoUsoResponsable={avisoUsoResponsable}
          alCambiarCampoFiltro={manejarCambioCampoFiltro}
          alCambiarTextoBusqueda={manejarCambioTextoBusqueda}
          alEjecutarBusqueda={manejarEjecucionBusqueda}
          alLimpiarFiltros={manejarLimpiezaFiltros}
          alSeleccionarRecurso={manejarSeleccionRecurso}
          alReintentarCarga={manejarReintentoDirectorio}
        />

        <SeccionPreguntasFrecuentes />

        <SeccionTransparencia />
      </main>

      <ModalDetalleRecurso
        recursoDetalle={recursoDetalle}
        cargandoDetalle={cargandoDetalle}
        errorDetalle={errorDetalle}
        alCerrarModal={manejarCierreModal}
      />

      <PiePagina />
    </>
  );
}
