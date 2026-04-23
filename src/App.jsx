import "./App.css";

const problemas = [
  {
    problema: "Responder mensajes para agendar los turnos",
    solucion:
      "Tus clientes reservan online con agendas disponibles en tiempo real.",
    resultado: "Menos mensajes para responder.",
  },
  {
    problema: "Errores humanos en la agenda",
    solucion:
      "El sistema bloquea horarios por servicio, profesional o gabinete compartido.",
    resultado: "Agenda ordenada, sin cruces ni doble reserva.",
  },
  {
    problema: "Perder dinero por no cobrar seña",
    solucion:
      "Se cobra la seña por Mercado Pago y automaticamente se agenda el turno.",
    resultado: "Evita la pérdida de ingresos por no cobrar seña.",
  },
  {
    problema: "Ausencias",
    solucion:
      "Confirmaciones de turno por mail y recordatorios por WhatsApp el dia anterior.",
    resultado: "Reduce las ausencias considerablemente.",
  },
  {
    problema: "Problemas para reprogramar turnos",
    solucion:
      "El sistema permite al cliente reprogramar turnos desde el panel de control (Solo con anticipación).",
    resultado: "Reduce tu carga administrativa.",
  },
  {
    problema: "¿Un profesional hace varios servicios?",
    solucion:
      "Ejemplo: Profesional realiza servicios A y B, si un cliente reserva en A, ese mismo horario deja de estar disponible en B.",
    resultado:
      "Evita conflictos de disponibilidad y permite mostrar agenda real de cada profesional.",
  },
];

const solucionesPrincipales = [
  {
    titulo: "Reservas con reglas claras",
    texto:
      "Agenda semanal, fechas puntuales, anticipacion configurable y bloqueos especificos.",
  },
  {
    titulo: "Pagos y confirmaciones",
    texto:
      "Señas por porcentaje o monto fijo, pagos parciales, totales y reembolsos registrados.",
  },
  {
    titulo: "Operacion centralizada",
    texto:
      "Turnos, clientes, historial clinico, asistencia, ausencias y filtros en un solo panel.",
  },
];

const condicionesComerciales = [
  {
    titulo: "Servicio sin costo",
    texto: "Solo se una comisión al cliente al agendar un turno.",
  },
  {
    titulo: "Sin límites",
    texto:
      "Crea cuantos servicios, profesionales, gabinetes y turnos quieras sin pagar mas.",
  },
  {
    titulo: "Prueba sin compromiso",
    texto: "Probá la plataforma sin ningún riesgo.",
  },
];

const flujo = [
  "El cliente elige servicio, variables y horario.",
  "El sistema valida disponibilidad y gabinete.",
  "El turno se confirma automaticamente al abonar seña.",
  "Desde el panel se administra pagos, asistencia, historial y reprogramaciones.",
];

const detalleTecnico = [
  {
    titulo: "Agenda",
    items: [
      "Horarios diferentes por dia",
      "Varias franjas en el mismo dia",
      "Dias no laborables",
      "Bloqueos puntuales",
      "Agendas por semanas, meses o fechas especificas",
    ],
  },
  {
    titulo: "Servicios",
    items: [
      "Variables de seleccion unica o multiple",
      "Packs o turnos individuales",
      "Gabinetes compartidos",
      "Descuentos por pago en efectivo",
      "Señas fijas o porcentuales",
    ],
  },
  {
    titulo: "Panel",
    items: [
      "Confirmar, rechazar, agendar o reprogramar turnos",
      "Registrar pagos parciales, totales y señas",
      "Registrar asistencias o ausencias",
      "Historial completo de cada cliente",
      "Filtrar turnos por dia, servicio, gabinete o profesional",
      "Controlar servicios, variables, packs y agendas especiales",
    ],
  },
  {
    titulo: "Comunicación",
    items: [
      "Mail al cliente para confirmar su turno",
      "Recibe mails cuando solicitan o confirman un turno.",
      "Envío rápido de WhatsApp a clientes desde el panel",
      "Recordatorio por WhatsApp el dia anterior al turno",
      "Reseñas reales de Google",
    ],
  },
];

function App() {
  return (
    <main className="site-shell">
      <header className="site-nav">
        <a className="brand-mark" href="#inicio" aria-label="Ir al inicio">
          <img
            src="/img/misturnosapp-logo-transparent.png"
            alt="MiTurnos App"
          />
        </a>
      </header>

      <section className="hero-section" id="inicio">
        <p className="section-kicker">Agenda de turnos</p>
        <h1>¿Seguis agendando turnos por WhatsApp?</h1>
        <p className="hero-lead">
          Reducí los mensajes que recibís y dejá que tus clientes reserven
          online sin tu intervención, evitando errores humanos en la agenda.
        </p>
        <div className="commercial-strip" aria-label="Condiciones comerciales">
          {condicionesComerciales.map((item) => (
            <article key={item.titulo}>
              <strong>{item.titulo}</strong>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <a
            className="primary-action demo-hero-button"
            href="https://demo.misturnosapp.com.ar"
            target="_blank"
            rel="noreferrer"
          >
            Ver pagina
          </a>
          <a
            className="whatsapp-action"
            href="https://wa.me/113058087"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16.02 3.2A12.71 12.71 0 0 0 5.1 22.44L3.2 29l6.72-1.76A12.72 12.72 0 1 0 16.02 3.2Zm0 22.96c-1.94 0-3.84-.55-5.48-1.58l-.39-.24-3.99 1.05 1.06-3.89-.25-.4A10.22 10.22 0 1 1 16.02 26.16Zm5.61-7.65c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.69.16-.2.31-.8 1-.98 1.21-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.52-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.69-1.67-.95-2.29-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.57s1.1 2.98 1.26 3.18c.16.2 2.17 3.31 5.25 4.64.73.31 1.3.5 1.75.64.74.23 1.41.2 1.94.12.59-.09 1.82-.74 2.08-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.2-.59-.36Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

      <section className="problem-section" id="soluciones">
        <div className="section-heading">
          <p className="section-kicker">Problemas reales</p>
          <h2>Los problemas que resolvemos</h2>
        </div>

        <div className="problem-grid">
          {problemas.map((item) => (
            <article className="problem-card" key={item.problema}>
              <h3>{item.problema}</h3>
              <p>{item.solucion}</p>
              <strong>{item.resultado}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="solution-section">
        <div className="section-heading">
          <p className="section-kicker">La propuesta</p>
          <h2>Un sistema breve de explicar, completo para operar</h2>
        </div>

        <div className="solution-grid">
          {solucionesPrincipales.map((item) => (
            <article className="solution-card" key={item.titulo}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-section">
        <div className="section-heading">
          <p className="section-kicker">Como funciona</p>
          <h2>Gestión de turnos</h2>
        </div>

        <ol className="flow-list">
          {flujo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="technical-section" id="detalle">
        <div className="section-heading">
          <p className="section-kicker">Detalle tecnico</p>
          <h2>Funciones incluidas, agrupadas por uso</h2>
        </div>

        <div className="technical-grid">
          {detalleTecnico.map((grupo) => (
            <article className="technical-card" key={grupo.titulo}>
              <h3>{grupo.titulo}</h3>
              <ul>
                {grupo.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div>
          <p className="section-kicker">
            Para profesionales, pequeños, medianos y grandes centros de estética
          </p>
          <h2>Diseñada para resolver problemas.</h2>
          <p>
            Esta app fue desarrollada junto al centro de Estética{" "}
            <b>Piel & Cejas</b>, esta pensada para cubrir las necesidades
            promedio de un centro de estética y adaptandose muy bien a pequeñas
            estéticas. Sin costo alguno ofrecemos un sistema de turnos realmente
            profesional y una página web para estar al nivel de cualquier otro
            negocio, sin importar el tamaño del suyo.
          </p>
        </div>
        <a className="primary-action demo-hero-button" href="#inicio">
          Volver arriba
        </a>
      </section>
    </main>
  );
}

export default App;
