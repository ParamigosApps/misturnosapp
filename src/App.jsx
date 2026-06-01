import { useState } from "react";
import "./App.css";

const problemas = [
  {
    problema: "Perdés tiempo respondiendo mensajes",
    solucion:
      "Tus clientes ven servicios, precios y horarios disponibles desde el celular. Eligen su turno sin consultarte.",
    resultado: "Ya no agendas turnos por WhatsApp.",
  },
  {
    problema: "Los errores de agenda generan problemas",
    solucion:
      "El sistema muestra disponibilidad real y bloquea los horarios ocupados de cada profesional.",
    resultado: "Mantenés la agenda ordenada y evitás cruces.",
  },
  {
    problema: "Perder dinero por ausencias",
    solucion:
      "Evitá la incomodidad de cobrar señas, el sistema lo hace por vos.",
    resultado: "Reducís ausencias y cuidas tus ingresos.",
  },
  {
    problema: "No sabés con claridad qué se cobró y qué falta cobrar",
    solucion:
      "Consultá cada turno y registrá señas, pagos parciales, pagos totales y reembolsos desde un único panel.",
    resultado:
      "Controlás tus ingresos sin depender de anotaciones o planillas.",
  },
];

const solucionesPrincipales = [
  {
    titulo: "Menos mensajes",
    texto:
      "Tus clientes reservan online según tu disponibilidad real, sin depender de una conversación por WhatsApp.",
  },
  {
    titulo: "Menos ausencias",
    texto:
      "Cobrá señas online y enviá confirmaciones y recordatorios automáticos por mail.",
  },
  {
    titulo: "Más control",
    texto:
      "Consultá turnos, clientes, asistencias, pagos y saldos pendientes desde un solo lugar.",
  },
];

const condicionesComerciales = [
  {
    titulo: "Sin costo para tu negocio",
    texto: "El cliente abona un costo de servicio de $400 al reservar.",
  },
  {
    titulo: "Sin límites",
    texto:
      "Creá cuantos servicios, profesionales, gabinetes y turnos quieras sin pagar extra.",
  },
  {
    titulo: "Prueba sin compromiso",
    texto:
      "Probá la plataforma sin ningún riesgo. No pedimos datos sensibles y podés darte de baja en cualquier momento.",
  },
];

const flujo = [
  "El cliente elige el servicio y un horario disponible.",
  "El sistema valida la disponibilidad y solicita la seña si corresponde.",
  "El cliente abona online y el sistema registra el pago.",
  "El cliente y el negocio reciben la confirmación por mail.",
];

const detalleTecnico = [
  {
    titulo: "Servicios",
    items: [
      "Items adicionales para personalizar el servicio",
      "Ofrece turnos individuales o packs.",
      "Para horarios complicados, ofrece confirmación manual por parte del profesional",
      "Servicios administrados por el negocio o por cada profesional",
      "Descuentos por pago en efectivo",
      "Cobra señas fijas o por porcentaje",
    ],
  },
  {
    titulo: "Panel",
    items: [
      "Resumen diario de turnos, cobros y pendientes",
      "Agenda general por gabinete, servicio o profesional",
      "Agendar turnos manualmente",
      "Confirmar, rechazar, cancelar, restaurar o reprogramar turnos",
      "Registrar señas, pagos parciales, pagos totales y reembolsos",
      "Marcar asistencias o ausencias",
      "Cerrar múltiples turnos y completar pagos en una sola acción",
      "Filtrar por fecha, estado, pago, cliente, servicio o gabinete",
      "Exportar la agenda en planillas CSV",
      "Alertas de turnos sin confirmar y pagos pendientes",
    ],
  },
  {
    titulo: "Clientes",
    items: [
      "Historial completo de turnos y pagos por cliente",
      "Ficha clínica con motivo, observaciones, evolución e indicaciones",
      "Búsqueda por nombre, email o teléfono",
      "Acceso rápido a WhatsApp desde cada perfil",
      "Área personal para consultar próximos turnos, pagos e historial",
      "Cancelación y reprogramación online configurables",
    ],
  },
  {
    titulo: "Cobros",
    items: [
      "Integración con Mercado Pago",
      "Confirmación automática al acreditarse el pago",
      "Cobro online de señas o servicios",
      "Registro manual de pagos parciales, totales y reembolsos",
      "Control de saldos pendientes",
      "Liquidaciones quincenales con historial y exportación PDF",
    ],
  },
  {
    titulo: "Equipo",
    items: [
      "Accesos separados para profesionales, administrativos y dueños",
      "Agenda propia para cada profesional",
      "Gestión de turnos asignados desde el panel profesional",
      "Crear empleados empleados",
      "Exhibir profesionales",
      "Seguimiento clínico desde la agenda del profesional",
    ],
  },
  {
    titulo: "Comunicación",
    items: [
      "Mail automático al cliente al confirmar o reprogramar un turno",
      "Mail al negocio cuando ingresa una solicitud o reserva confirmada",
      "Recordatorio automático por mail el día anterior",
      "Envío rápido de WhatsApp desde el panel",
      "Condiciones de reserva personalizables",
      "Reseñas reales de Google sincronizadas automáticamente",
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
    titulo: "Inactividad del servicio",
    texto:
      "Para garantizar un uso responsable de la plataforma y evitar costos operativos sobre páginas que no se encuentran en funcionamiento, MisTurnosApp podrá suspender temporalmente aquellas páginas que no sean activadas dentro de los diez (10) días corridos posteriores al alta, o que permanezcan inactivas por más de treinta (30) días corridos. La reactivación podrá solicitarse posteriormente y quedará sujeta a revisión.",
  },
  {
    titulo: "Actualizaciones y mejoras",
    texto:
      "MisTurnosApp mantiene el compromiso de seguir mejorando la plataforma, incorporando ajustes, optimizaciones y nuevas funcionalidades cuando sea posible, sin quitar ni reducir los beneficios ya incluidos para los usuarios activos.",
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
        <h1>Dejá de organizar turnos por WhatsApp</h1>
        <p className="hero-lead">
          Tus clientes ven tus servicios, precios, descripciones y horarios
          disponibles. Eligen el turno, abonan la seña y reciben la
          confirmación.
          <br /> <br /> Vos recibís la reserva al instante, reducís consultas
          repetidas y mantenés tu agenda ordenada.
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
          <p className="section-kicker">Menos tareas manuales</p>
          <h2>Una agenda online que trabaja por vos</h2>
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
          <p className="section-kicker">Lo importante</p>
          <h2>Trabajo organizado</h2>
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
          <h2>¿Cómo saca turno el cliente?</h2>
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
          <h2>Funciones incluidas</h2>
        </div>

        <div className="technical-grid">
          {detalleTecnico.map((grupo) => (
            <details className="technical-card" key={grupo.titulo}>
              <summary>
                <h3>{grupo.titulo}</h3>
              </summary>
              <ul>
                {grupo.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="signup-section" id="alta">
        <div className="section-heading">
          <p className="section-kicker">Alta de comercio</p>
          <h2>Solicitar página</h2>
          <p>
            Completá el formulario y envianos un mensaje. Te ayudamos a
            configurar tu página y tu agenda para que empieces a recibir
            reservas online.
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
            Gmail (obligatorio para panel administrativo)
            <input
              name="mail"
              type="email"
              autoComplete="email"
              placeholder="Ej: miemail@gmail.com"
              required
            />
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
            Para profesionales, pequeños, medianos y grandes centros.
          </p>
          <h2>¿Cómo nació MisTurnosApp?</h2>
          <p>
            MisTurnosApp nació escuchando necesidades reales del rubro estética
            y la experiencia de <b>Piel & Cejas</b> con plataformas de turnos.
            Por eso creamos una plataforma profesional, flexible y accesible:
            sin límites de turnos, sin costos extra por sumar servicios o
            profesionales, con página web incluida y sin costos para el negocio.
            Pensada para organizar mejor tu agenda, mejorar la experiencia de
            tus clientes y crecer sin tener gastos adicionales.
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
