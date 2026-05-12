import { useState } from "react";
import "./App.css";

const problemas = [
  {
    problema: "Responder mensajes para agendar los turnos",
    solucion:
      "Tus clientes reservan online con agendas disponibles en tiempo real.",
    resultado: "Más tiempo libre para vos.",
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
      "Se cobra la seña automáticamente por Mercado Pago y automáticamente se agenda el turno.",
    resultado: "Evita la pérdida de ingresos por no cobrar seña.",
  },
  {
    problema: "Ausencias",
    solucion:
      "Confirmaciones de turno por mail y recordatorios por WhatsApp el día anterior.",
    resultado: "Reduce las ausencias considerablemente.",
  },
  {
    problema: "Reprogramaciones de turnos",
    solucion:
      "Tanto el cliente como el profesional pueden reprogramar turnos desde el panel de control con total facilidad.",
    resultado: "Reduce tu carga administrativa.",
  },
  {
    problema:
      "Profesional que ofrece varios servicios con horarios compartidos",
    solucion:
      "Ejemplo: Profesional realiza servicios A y B, si un cliente reserva en A, ese mismo horario deja de estar disponible en B.",
    resultado:
      "Evita conflictos de disponibilidad y permite mostrar agenda real de cada profesional.",
  },
  {
    problema:
      "Usar Excel para organizar turnos, servicios, profesionales y clientes",
    solucion:
      "Vistas de turnos por día, servicio, profesional o gabinete, con filtros y búsquedas rápidas.",
    resultado:
      "Evita errores humanos, ahorra tiempo y permite tener toda la información a mano.",
  },
  {
    problema: "Llevar control de los ingresos generados",
    solucion:
      "Registro de pagos parciales, totales, señas y reembolsos, para cada turno y cliente.",
    resultado:
      "Evitar errores de registro y permite un control preciso de los ingresos.",
  },
];

const solucionesPrincipales = [
  {
    titulo: "Reservas con reglas claras",
    texto:
      "Agenda semanal, fechas puntuales, anticipación configurable y bloqueos específicos.",
  },
  {
    titulo: "Pagos y confirmaciones",
    texto:
      "Señas por porcentaje o monto fijo, pagos parciales, totales y reembolsos registrados.",
  },
  {
    titulo: "Operación centralizada",
    texto:
      "Turnos, clientes, historial clínico, asistencia, ausencias y filtros en un solo panel.",
  },
];

const condicionesComerciales = [
  {
    titulo: "Servicio sin costo",
    texto: "Solo se cobra comisión al cliente cuando agenda un turno.",
  },
  {
    titulo: "Sin límites",
    texto:
      "Crea cuantos servicios, profesionales, gabinetes y turnos quieras sin pagar nada.",
  },
  {
    titulo: "Prueba sin compromiso",
    texto:
      "Probá la plataforma sin ningún riesgo, podés dejar de usarla en cualquier momento.",
  },
];

const flujo = [
  "El cliente elige servicio, variables y horario.",
  "El sistema valida disponibilidad y gabinete.",
  "El turno se confirma automáticamente al abonar seña.",
  "Desde el panel se administra pagos, asistencia, historial y reprogramaciones.",
];

const detalleTecnico = [
  {
    titulo: "Agenda",
    items: [
      "Horarios diferentes por día",
      "Varias franjas en el mismo día",
      "Días no laborables",
      "Bloqueos puntuales",
      "Agendas por semanas, meses o fechas específicas",
    ],
  },
  {
    titulo: "Servicios",
    items: [
      "Variables de selección única o múltiple",
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
      "Filtrar turnos por día, servicio, gabinete o profesional",
      "Controlar servicios, variables, packs y agendas especiales",
    ],
  },
  {
    titulo: "Comunicación",
    items: [
      "Mail al cliente para confirmar su turno",
      "Recibe mails cuando solicitan o confirman un turno.",
      "Envío rápido de WhatsApp a clientes desde el panel",
      "Recordatorio por WhatsApp el día anterior al turno",
      "Reseñas reales de Google",
    ],
  },
];

const condicionesDeUso = [
  {
    titulo: "Modalidad de cobro",
    texto:
      "MisTurnosApp no posee costo fijo mensual. Solo se cobra comisión por turno señado o confirmado mediante la plataforma.",
  },
  {
    titulo: "Confirmación automática",
    texto:
      "En reservas con pago online, la comisión correspondiente se liquida automáticamente al momento de la acreditación del pago.",
  },
  {
    titulo: "Confirmación manual y carga de turnos manual",
    texto:
      "Los turnos aprobados manualmente por el profesional y los cargados por el administrador también generan comisión de servicio. Dichas comisiones se liquidan de forma quincenal.",
  },
  {
    titulo: "Liquidación y pago",
    texto:
      "Las liquidaciones se realizan de forma quincenal: el día 16 se liquida el período del 1 al 15, y el día 1 se liquida el período del 16 al último día del mes anterior. Cada liquidación será enviada con la liquidación correspondiente y deberá abonarse dentro de las 72 horas posteriores a su emisión.",
  },
  {
    titulo: "Uso responsable",
    texto:
      "La aprobación manual de turnos deberá reflejar reservas reales realizadas mediante MisTurnosApp.",
  },
  {
    titulo: "Suspensión por falta de pago",
    texto:
      "La falta de pago de liquidaciones podrá generar suspensión temporal o definitiva del servicio.",
  },
  {
    titulo: "Suspensión por inactividad",
    texto:
      "La inactividad por más de treinta (30) días corridos podrá generar la suspensión temporal del servicio. La reactivación quedará sujeta a revisión.",
  },
  {
    titulo: "Actualizaciones y mejoras",
    texto:
      "MisTurnosApp podrá incorporar nuevas funcionalidades y mejoras sin costo adicional salvo comunicación expresa.",
  },
];

function App() {
  const [termsOpen, setTermsOpen] = useState(false);

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const mensaje = [
      "Hola Iván, quiero dar de alta mi negocio en misturnosapp.",
      "",
      `Nombre: ${data.get("nombre")}`,
      `Negocio: ${data.get("negocio")}`,
      `Subdominio: ${data.get("subdominio")}.misturnosapp.com.ar`,
      `Rubro: ${data.get("rubro")}`,
      `WhatsApp: ${data.get("telefono")}`,
      `Gmail: ${data.get("mail")}`,
      `Ciudad: ${data.get("ciudad")}`,
      `Comentario: ${data.get("comentario") || "Sin comentario"}`,
      "Acepta condiciones de uso: Sí",
    ].join("\n");

    window.open(
      `https://wa.me/5491130580879?text=${encodeURIComponent(mensaje)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleTermsLinkClick = (event) => {
    event.preventDefault();
    setTermsOpen(true);
  };

  return (
    <main className="site-shell">
      <header className="site-nav">
        <a className="brand-mark" href="#inicio" aria-label="Ir al inicio">
          <img
            src="/img/misturnosapp-logo-transparent.png"
            alt="MiTurnos App"
          />
        </a>
        <a className="nav-action" href="#alta">
          Darme de alta
        </a>
      </header>

      <section className="hero-section" id="inicio">
        <p className="section-kicker">Agenda de turnos</p>
        <h1>¿Todavía agendás turnos por WhatsApp?</h1>
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
          <a className="primary-action signup-hero-button" href="#alta">
            Darme de alta
          </a>
          <a
            className="secondary-action demo-hero-button"
            href="https://demo.misturnosapp.com.ar"
            target="_blank"
            rel="noreferrer"
          >
            Ver página
          </a>
          <a
            className="whatsapp-action"
            href="https://wa.me/5491130580879?text=Hola%20Iván,%20me%20interesa%20saber%20más%20sobre%20misturnosapp."
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
          <h2>Algunos de los problemas que resuelve misturnosapp</h2>
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
          <h2>Un sistema muy completo y muy fácil de operar</h2>
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
          <p className="section-kicker">Cómo funciona</p>
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
          <p className="section-kicker">Detalle técnico</p>
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

      <section className="signup-section" id="alta">
        <div className="section-heading">
          <p className="section-kicker">Alta de comercio</p>
          <h2>¿Querés tu propia página web + sistema de turnos?</h2>
          <p>
            Completá el formulario y se abre WhatsApp con la solicitud lista
            para enviar. Nos pondremos en contacto para ayudarte a configurar tu
            página y agenda, y te acompañaremos en el proceso de alta para que
            puedas empezar a recibir reservas online lo antes posible.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <label>
            Nombre y apellido
            <input name="nombre" type="text" autoComplete="name" required />
          </label>

          <label>
            Nombre del negocio
            <input
              name="negocio"
              type="text"
              autoComplete="organization"
              required
            />
          </label>

          <label>
            Subdominio deseado
            <span className="domain-field">
              <input
                name="subdominio"
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                pattern="[a-z0-9-]+"
                placeholder="mi-negocio"
                title="Usá solo minúsculas, números y guiones"
                required
              />
              <span>.misturnosapp.com.ar</span>
            </span>
          </label>

          <label>
            Rubro
            <select name="rubro" required defaultValue="">
              <option value="" disabled>
                Seleccioná una opción
              </option>
              <option>Centro de estética</option>
              <option>Profesional independiente</option>
              <option>Peluquería / barbería</option>
              <option>Consultorio</option>
              <option>Otro</option>
            </select>
          </label>

          <label>
            WhatsApp
            <input
              name="telefono"
              type="tel"
              autoComplete="tel"
              placeholder="Ej: 11 1234 5678"
              required
            />
          </label>

          <label>
            Mail (obligatorio mail de gmail)
            <input name="mail" type="email" autoComplete="email" required />
          </label>

          <label>
            Ciudad
            <input
              name="ciudad"
              type="text"
              autoComplete="address-level2"
              required
            />
          </label>

          <label className="form-full">
            Comentario (opcional)
            <textarea
              name="comentario"
              rows="4"
              placeholder="Algún detalle que consideres importante."
            />
          </label>

          <details
            className="terms-disclosure form-full"
            id="condiciones"
            open={termsOpen}
            onToggle={(event) => setTermsOpen(event.currentTarget.open)}
          >
            <summary>Ver condiciones de uso</summary>
            <ol className="terms-list">
              {condicionesDeUso.map((item) => (
                <li key={item.titulo}>
                  <h3>
                    <span aria-hidden="true" />
                    {item.titulo}
                  </h3>
                  <p>{item.texto}</p>
                </li>
              ))}
            </ol>
          </details>

          <label className="terms-check form-full">
            <input name="aceptaCondiciones" type="checkbox" required />
            <span>
              Acepto las{" "}
              <a href="#condiciones" onClick={handleTermsLinkClick}>
                condiciones de uso de MisTurnosApp
              </a>
              .
            </span>
          </label>

          <button className="primary-action form-full" type="submit">
            Enviar solicitud por WhatsApp
          </button>
        </form>
      </section>

      <section className="closing-section">
        <div>
          <p className="section-kicker">
            Para profesionales, pequeños, medianos y grandes centros de estética
          </p>
          <h2>Diseñada para resolver problemas.</h2>
          <p>
            Esta app fue desarrollada junto al centro de Estética{" "}
            <b>Piel & Cejas</b>. Está pensada para cubrir las necesidades
            promedio de un centro de estética y adaptarse muy bien a pequeñas
            estéticas. Sin costo alguno ofrecemos un sistema de turnos realmente
            profesional y una página web para estar al nivel de cualquier otro
            negocio, sin importar el tamaño del suyo.
          </p>
        </div>
        <a className="primary-action " href="#inicio">
          Volver al inicio
        </a>
      </section>
    </main>
  );
}

export default App;
