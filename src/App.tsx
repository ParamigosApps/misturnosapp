import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react'
import './App.css'

type GalleryImage = {
  id: string
  title: string
  description: string
  imageUrl: string
}

type BrandSettings = {
  logoUrl: string
  brandName: string
  tagline: string
}

const STORAGE_KEY = 'misturnosapp-gallery'
const BRAND_STORAGE_KEY = 'misturnosapp-brand'

const defaultGallery: GalleryImage[] = [
  {
    id: 'default-1',
    title: 'Home de reservas',
    description: 'Muestra servicios, profesionales, horarios y reseñas integradas.',
    imageUrl:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'default-2',
    title: 'Panel administrativo',
    description: 'Gestiona turnos, clientes, pagos, señas y configuracion del negocio.',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
]

const defaultBrand: BrandSettings = {
  logoUrl: '/logo.png',
  brandName: 'Turnos online para esteticas',
  tagline: 'Turnos online, señas y gestion profesional para centros de estetica que quieren crecer.',
}

const highlights = [
  'Sin costo extra por agregar profesionales, gabinetes o nuevos servicios',
  'Costo fijo del sistema en 0 y cobro por uso en cada turno con sena',
  'Mercado Pago integrado para cobrar señas y agilizar reservas',
  'Descuentos por pago en efectivo para incentivar ese medio de cobro',
  'Si el servicio es automatizado, el cliente reserva, paga y confirma solo',
]

const metrics = [
  { value: '$0', label: 'costo fijo por sumar servicios, gabinetes o profesionales' },
  { value: '24/7', label: 'reservas disponibles incluso fuera de horario' },
  { value: 'Automatico', label: 'confirmacion inmediata cuando el servicio lo permite' },
]

const featureGroups = [
  {
    title: 'Reservas y experiencia del cliente',
    items: [
      'Reserva de turnos online 24/7',
      'Buscador de servicios por nombre o categoria',
      'Seleccion de profesional dentro de cada servicio',
      'Visualizacion de precios, duracion y detalles antes de reservar',
      'Disponibilidad armada segun gabinete y horario del servicio',
      'Reservas manuales o coordinadas por WhatsApp',
      'Perfil de usuario y panel de Mis turnos',
      'Reprogramacion y cancelacion de turnos',
      'Aviso en cada reserva y confirmacion de estados',
    ],
  },
  {
    title: 'Pagos, señas y automatizacion',
    items: [
      'Gestion de señas y pagos online',
      'Integracion con Mercado Pago',
      'Descuentos por pago en efectivo para incentivar ese metodo',
      'Confirmacion de pagos y estados de reserva',
      'Servicios automatizados con confirmacion inmediata',
      'Recordatorios automaticos de turnos por WhatsApp',
      'Integracion con WhatsApp para atencion rapida',
      'Permite confirmar turnos antes de atender',
      'Reduce ausencias con reservas mas claras y compromiso previo',
    ],
  },
  {
    title: 'Operacion del negocio',
    items: [
      'Panel administrativo para servicios',
      'Panel administrativo para clientes',
      'Panel administrativo para turnos y reservas',
      'Gestion de gabinetes o espacios de atencion',
      'Configuracion general del negocio',
      'Panel para liquidaciones',
      'Agenda exclusiva para profesionales',
      'Configuracion de agendas en base a gabinetes y horarios por servicio',
      'Mapa, horarios, profesionales y reseñas integradas en la home',
    ],
  },
]

const businessBenefits = [
  'No se cobra adicional por sumar profesionales, gabinetes ni servicios.',
  'El costo fijo del sistema es 0 y se paga por cada turno que efectivamente lleva sena.',
  'Automatiza la toma de turnos sin depender de mensajes manuales.',
  'Permite que el cliente vea la agenda, elija, pague con Mercado Pago y confirme solo.',
  'Permite ofrecer descuentos por pago en efectivo para fomentar ese metodo cuando te conviene.',
  'Reduce ausencias con reservas mas claras, señas previas y recordatorios.',
  'Mejora la organizacion de agenda, profesionales, gabinetes y espacios.',
  'Arma agendas reales segun el gabinete disponible y el horario de cada servicio.',
  'Centraliza clientes, servicios, pagos y reservas en un solo lugar.',
  'Da una imagen mas profesional, moderna y lista para vender.',
]

const clientBenefits = [
  'Reservan en pocos pasos desde el celular.',
  'Si el servicio esta automatizado, el turno se confirma sin esperar respuesta.',
  'Ven precios, duracion y opciones antes de elegir.',
  'Pueden aprovechar descuentos si eligen pagar en efectivo.',
  'Tienen claridad sobre pagos, señas y saldo pendiente.',
  'Acceden a sus turnos, cambios y datos cuando quieren.',
  'Encuentran rapido ubicacion, horarios y contacto.',
  'Viven una experiencia mas comoda, rapida y confiable.',
]

const steps = [
  {
    title: 'Mostras una imagen profesional',
    description:
      'Tu centro puede verse ordenado, moderno y confiable desde el primer click.',
  },
  {
    title: 'Tus clientes reservan sin friccion',
    description:
      'Eligen servicio, profesional, horario y sena en una experiencia simple y clara.',
  },
  {
    title: 'Tu equipo trabaja con mas orden',
    description:
      'El sistema organiza agenda, gabinetes, pagos y recordatorios para que vendas mejor.',
  },
]

const audiences = [
  'Centros de estetica, unas, cejas, pestanas y beauty studios',
  'Depilacion definitiva, cosmetologia y tratamientos faciales o corporales',
  'Negocios con agenda por profesional, gabinete, cabina o espacio de atencion',
]

const sectionIndex = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#beneficios-negocio', label: 'Negocio' },
  { href: '#beneficios-clientes', label: 'Clientes' },
  { href: '#como-funciona', label: 'Como se vende' },
  { href: '#contacto', label: 'Contacto' },
]

function readStoredGallery(): GalleryImage[] {
  if (typeof window === 'undefined') return defaultGallery

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultGallery

  try {
    const parsed = JSON.parse(raw) as GalleryImage[]
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultGallery
    return parsed
  } catch {
    return defaultGallery
  }
}

function readStoredBrand(): BrandSettings {
  if (typeof window === 'undefined') return defaultBrand

  const raw = window.localStorage.getItem(BRAND_STORAGE_KEY)
  if (!raw) return defaultBrand

  try {
    const parsed = JSON.parse(raw) as Partial<BrandSettings>
    return {
      logoUrl: parsed.logoUrl?.trim() || defaultBrand.logoUrl,
      brandName: parsed.brandName?.trim() || defaultBrand.brandName,
      tagline: parsed.tagline?.trim() || defaultBrand.tagline,
    }
  } catch {
    return defaultBrand
  }
}

function App() {
  const isAdmin = useMemo(() => window.location.pathname === '/admin', [])
  const [gallery, setGallery] = useState<GalleryImage[]>(() => readStoredGallery())
  const [brand, setBrand] = useState<BrandSettings>(() => readStoredBrand())

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery))
  }, [gallery])

  useEffect(() => {
    window.localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(brand))
  }, [brand])

  if (isAdmin) {
    return (
      <AdminPanel
        gallery={gallery}
        setGallery={setGallery}
        brand={brand}
        setBrand={setBrand}
      />
    )
  }

  return <LandingPage gallery={gallery} brand={brand} />
}

function LandingPage({
  gallery,
  brand,
}: {
  gallery: GalleryImage[]
  brand: BrandSettings
}) {
  const featuredImage = gallery[0]

  return (
    <main className="landing-shell">
      <section className="brand-banner">
        <div className="brand-lockup">
          <div className="brand-logo-box">
            {brand.logoUrl ? (
              <img className="brand-logo-image" src={brand.logoUrl} alt={brand.brandName} />
            ) : (
              <span className="brand-logo-placeholder">Logo</span>
            )}
          </div>

          <div className="brand-copy">
            <span className="brand-kicker">Software para centros de estetica</span>
            <span>{brand.tagline}</span>
          </div>
        </div>
      </section>

      <nav className="section-index" aria-label="Indice de secciones">
        {sectionIndex.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow">Sistema de turnos para centros de estetica</div>
          <h1>Haz que tu centro se vea mas profesional y optimiza tu agenda.</h1>
          <p className="hero-text">
            Fue creado para resolver los problemas de organizacion en esteticas
            que quieren ordenar su agenda, cobrar señas, mostrar mejor sus
            servicios y dar una experiencia moderna desde el celular. Si el
            servicio esta marcado como automatizado, el cliente ve la agenda,
            elige turno, paga con Mercado Pago y la reserva se confirma sin
            necesidad de intervenir. Tambien podes ofrecer descuentos por pago
            en efectivo para fomentar ese metodo y hacerlo mas atractivo para
            tus clientes.
          </p>

          <div className="hero-actions">
            <a className="primary-action" href="#contacto">
              Quiero llevarlo a mi centro
            </a>
            <a className="secondary-action" href="#funciones">
              Ver todo lo que incluye
            </a>
          </div>

          <ul className="hero-highlights" aria-label="Beneficios principales">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-card">
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <p>centrobelleza.misturnosapp.com.ar</p>
          </div>

          <div className="hero-card-content">
            <div className="brand-chip">Centro Bella Studio</div>

            {featuredImage ? (
              <article className="hero-image-card">
                <img src={featuredImage.imageUrl} alt={featuredImage.title} />
                <div className="hero-image-copy">
                  <span className="panel-label">Vista destacada</span>
                  <strong>{featuredImage.title}</strong>
                  <p>{featuredImage.description}</p>
                </div>
              </article>
            ) : null}

            <div className="schedule-panel">
              <div>
                <span className="panel-label">Proximo turno</span>
                <strong>Hoy, 17:30 hs</strong>
                <p>Lash lifting + pago por Mercado Pago + confirmacion automatica</p>
              </div>
              <div className="status-pill">Sena pagada</div>
            </div>

            <div className="availability-grid">
              <article>
                <span>Servicios</span>
                <strong>32 activos</strong>
              </article>
              <article>
                <span>Profesionales</span>
                <strong>5 agendas</strong>
              </article>
              <article>
                <span>Confirmacion</span>
                <strong>Automatica</strong>
              </article>
            </div>

            <div className="insight-card">
              <span className="panel-label">Pensado para esteticas</span>
              <strong>Mas orden, mejor imagen y menos tiempo coordinando</strong>
              <p>
                Tu centro puede mostrar servicios, profesionales, precios, señas
                y horarios de forma clara. Si el servicio es automatizado, el
                cliente paga con Mercado Pago y queda confirmado al instante.
                Tambien podes impulsar pagos en efectivo con descuentos visibles
                para fomentar ese metodo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-section" aria-label="Indicadores de valor">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="content-section" id="funciones">
        <div className="section-heading">
          <span className="section-kicker">Todo lo que incluye</span>
          <h2>Todo lo que una estetica necesita para vender y atender mejor</h2>
          <p className="section-text">
            Desde la reserva hasta la confirmacion del pago, el sistema acompana
            todo el recorrido del cliente y toda la operacion interna del centro.
          </p>
        </div>

        <div className="feature-groups">
          {featureGroups.map((group) => (
            <article key={group.title} className="feature-group-card">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="beneficios-negocio">
        <div className="section-heading">
          <span className="section-kicker">Beneficios para el negocio</span>
          <h2>Una herramienta pensada para vender mas y ordenar el dia a dia del centro</h2>
        </div>

        <div className="benefit-grid">
          {businessBenefits.map((benefit) => (
            <article key={benefit} className="benefit-card">
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="beneficios-clientes">
        <div className="section-heading">
          <span className="section-kicker">Beneficios para tus clientes</span>
          <h2>Una experiencia simple, prolija y confiable para reservar sin friccion</h2>
        </div>

        <div className="benefit-grid client-grid">
          {clientBenefits.map((benefit) => (
            <article key={benefit} className="benefit-card">
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="como-funciona">
        <div className="section-heading">
          <span className="section-kicker">Como transforma tu operacion</span>
          <h2>Del desorden por mensajes a una agenda profesional que acompana tu crecimiento</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <article key={step.title} className="step-card">
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section audience-section">
        <div className="section-heading narrow">
          <span className="section-kicker">Ideal para</span>
          <h2>Espacios de belleza que quieren una experiencia mas premium y mas control interno</h2>
        </div>

        <div className="audience-list">
          {audiences.map((audience) => (
            <article key={audience} className="audience-card">
              <p>{audience}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section" id="contacto">
        <div className="cta-copy">
          <span className="section-kicker">Lista para crecer</span>
          <h2>Lleva tu estetica a una experiencia mas ordenada, moderna y profesional.</h2>
          <ul className="cta-points">
            {/*
            Mostra tu marca en{' '}
            <strong>nombredetumarca.misturnosapp.com.ar</strong> y ofrece una
            experiencia profesional con turnos online, señas, recordatorios por
            WhatsApp y agenda organizada por gabinete. Si el servicio esta en
            modo automatico, el cliente elige un horario disponible, paga con
            Mercado Pago y el turno se confirma sin intervencion manual. Tambien
            podes ofrecer descuentos por pago en efectivo para fomentar ese
            metodo y hacerlo mas conveniente para tu cliente.
            */}
            <li>
              Mostra tu marca en <strong>nombredetumarca.misturnosapp.com.ar</strong> y
              ofrece una experiencia profesional desde el primer click.
            </li>
            <li>
              Organiza turnos online, senas, recordatorios por WhatsApp y agenda
              por gabinete en un solo lugar.
            </li>
            <li>
              Si el servicio esta en modo automatico, el cliente elige horario,
              paga con Mercado Pago y el turno se confirma sin intervencion manual.
            </li>
            <li>
              Tambien podes ofrecer descuentos por pago en efectivo para fomentar
              ese metodo y volverlo mas atractivo para tu cliente.
            </li>
          </ul>
        </div>

        <div className="contact-card">
          <div className="contact-intro">
            <span className="contact-badge">Contacto directo</span>
            <h3>Comunicate y conoce como adaptarlo a tu centro</h3>
          </div>

          <div className="contact-row">
            <span className="contact-label">WhatsApp</span>
            <a
              className="contact-link"
              href="https://wa.me/541130580879"
              target="_blank"
              rel="noreferrer"
            >
              Ivan Ruiz - 11 3058-0879
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">Email</span>
            <a className="contact-link" href="mailto:ivangabrielruiz1@gmail.com">
              ivangabrielruiz1@gmail.com
            </a>
          </div>

          <div className="cta-stack">
            <a
              className="primary-action cta-action"
              href="https://wa.me/541130580879"
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
            <a className="secondary-action cta-action" href="mailto:ivangabrielruiz1@gmail.com">
              Enviar email
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function AdminPanel({
  gallery,
  setGallery,
  brand,
  setBrand,
}: {
  gallery: GalleryImage[]
  setGallery: Dispatch<SetStateAction<GalleryImage[]>>
  brand: BrandSettings
  setBrand: Dispatch<SetStateAction<BrandSettings>>
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [logoUrl, setLogoUrl] = useState(brand.logoUrl)
  const [brandName, setBrandName] = useState(brand.brandName)
  const [tagline, setTagline] = useState(brand.tagline)

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const onLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim() || !description.trim() || !imageUrl.trim()) return

    setGallery((current) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      },
      ...current,
    ])

    setTitle('')
    setDescription('')
    setImageUrl('')
  }

  const removeImage = (id: string) => {
    setGallery((current) => current.filter((item) => item.id !== id))
  }

  const resetGallery = () => {
    setGallery(defaultGallery)
  }

  const saveBrand = () => {
    setBrand({
      logoUrl: logoUrl.trim(),
      brandName: brandName.trim() || defaultBrand.brandName,
      tagline: tagline.trim() || defaultBrand.tagline,
    })
  }

  const resetBrand = () => {
    setBrand(defaultBrand)
    setLogoUrl(defaultBrand.logoUrl)
    setBrandName(defaultBrand.brandName)
    setTagline(defaultBrand.tagline)
  }

  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <div>
          <div className="eyebrow">Panel interno</div>
          <h1>Administra las imagenes reales que aparecen en la landing</h1>
          <p className="hero-text">
            Carga screenshots desde tu computadora o pega una URL. Todo se guarda
            en este navegador y se muestra automaticamente en la seccion de
            imagenes de la web.
          </p>
        </div>

        <div className="admin-actions">
          <a className="secondary-action" href="/">
            Volver a la landing
          </a>
          <button className="primary-action admin-button" type="button" onClick={resetGallery}>
            Restaurar ejemplos
          </button>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-form-stack">
          <section className="admin-form-card">
            <h2>Marca y logo</h2>

            <label>
              <span>Nombre visible</span>
              <input value={brandName} onChange={(event) => setBrandName(event.target.value)} />
            </label>

            <label>
              <span>Bajada corta</span>
              <textarea
                rows={3}
                value={tagline}
                onChange={(event) => setTagline(event.target.value)}
              />
            </label>

            <label>
              <span>URL del logo</span>
              <input
                value={logoUrl}
                onChange={(event) => setLogoUrl(event.target.value)}
                placeholder="https://..."
              />
            </label>

            <label>
              <span>O subir logo</span>
              <input type="file" accept="image/*" onChange={onLogoFileChange} />
            </label>

            <div className="admin-brand-preview">
              <div className="brand-logo-box">
                {logoUrl ? (
                  <img className="brand-logo-image" src={logoUrl} alt={brandName || 'Logo'} />
                ) : (
                  <span className="brand-logo-placeholder">Logo</span>
                )}
              </div>
              <div className="brand-copy">
                <span className="brand-kicker">Software para centros de estetica</span>
                <strong>{brandName || defaultBrand.brandName}</strong>
                <span>{tagline || defaultBrand.tagline}</span>
              </div>
            </div>

            <div className="admin-inline-actions">
              <button className="primary-action admin-button" type="button" onClick={saveBrand}>
                Guardar marca
              </button>
              <button className="secondary-action admin-button" type="button" onClick={resetBrand}>
                Restaurar marca
              </button>
            </div>
          </section>

          <form className="admin-form-card" onSubmit={onSubmit}>
            <h2>Nueva imagen</h2>

            <label>
              <span>Titulo</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>

            <label>
              <span>Descripcion</span>
              <textarea
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>

            <label>
              <span>URL de imagen</span>
              <input
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://..."
              />
            </label>

            <label>
              <span>O subir archivo</span>
              <input type="file" accept="image/*" onChange={onFileChange} />
            </label>

            {imageUrl ? (
              <div className="admin-preview">
                <img src={imageUrl} alt="Vista previa de captura" />
              </div>
            ) : null}

            <button className="primary-action admin-button" type="submit">
              Guardar imagen
            </button>
          </form>
        </div>

        <section className="admin-gallery-card">
          <div className="admin-gallery-header">
            <h2>Imagenes cargadas</h2>
            <p>{gallery.length} imagenes activas en la landing</p>
          </div>

          <div className="admin-gallery-list">
            {gallery.map((item) => (
              <article key={item.id} className="admin-gallery-item">
                <img src={item.imageUrl} alt={item.title} />
                <div className="admin-gallery-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => removeImage(item.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
