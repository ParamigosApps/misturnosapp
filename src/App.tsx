import { ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useEffect, useMemo, useState } from 'react'
import './App.css'

type GalleryImage = {
  id: string
  title: string
  description: string
  imageUrl: string
  layout?: 'wide' | 'standard' | 'tall'
}

type BrandSettings = {
  logoUrl: string
  brandName: string
  tagline: string
}

const STORAGE_KEY = 'misturnosapp-gallery'
const BRAND_STORAGE_KEY = 'misturnosapp-brand'
const LOGO_ASSET_VERSION = '2026-03-26'
const FAVICON_URL = `/img/favicon.png?v=${LOGO_ASSET_VERSION}`
const DEFAULT_LOGO_URL = `/img/favicon.png?v=${LOGO_ASSET_VERSION}`
const BRAND_DISPLAY_NAME = 'misturnosApp'
const OLD_BRAND_TAGLINE = 'Sistema de turnos listo para vender como experiencia digital profesional'
const NEW_BRAND_TAGLINE = 'Sistema de agendas inteligente para Centros de Esteticas.'

const defaultGallery: GalleryImage[] = []

const siteGallery: GalleryImage[] = [
  {
    id: 'home',
    title: 'Inicio del sistema',
    description: 'Vista principal con acceso rapido a turnos y acciones clave.',
    imageUrl: '/img/home.jpg',
    layout: 'wide',
  },
  {
    id: 'agenda-1',
    title: 'Categorias y servicios',
    description: 'Organización de categorias para encontrar y reservar tus turnos rapidamente.',
    imageUrl: '/img/categorias.jpg',
    layout: 'standard',
  },
  {
    id: 'agenda-2',
    title: 'Agenda detallada',
    description: 'Detalle de los servicios, profesionales, costos, duración, items seleccionables, tipo de confirmación, ect.',
    imageUrl: '/img/agenda%202.jpg',
    layout: 'standard',
  },
  {
    id: 'agenda-3',
    title: 'Agenda por bloques',
    description: 'Vista detallada del servicio a reservar.',
    imageUrl: '/img/agenda%203.jpg',
    layout: 'tall',
  },
  {
    id: 'panel-derecho-1',
    title: 'Sección ubicación',
    description: 'Detalle de la ubicación del servicio.',
    imageUrl: '/img/panel%20derecho%201.jpg',
    layout: 'tall',
  },
  {
    id: 'panel-derecho-2',
    title: 'Seccion redes sociales',
    description: 'Redes sociales al alcance.',
    imageUrl: '/img/panel%20derecho%202.jpg',
    layout: 'tall',
  },
  {
    id: 'panel-derecho-3',
    title: 'Sección de Profesionales',
    description: 'Añade profesionales sin ningun costo.',
    imageUrl: '/img/panel%20derecho%203.jpg',
    layout: 'tall',
  },
  {
    id: 'resenas',
    title: 'Reseñas',
    description: 'Mostrá en tu web las reseñas reales de Google y en tiempo real.',
    imageUrl: '/img/resenas.jpg',
    layout: 'wide',
  },
]

const adminScreens: GalleryImage[] = [
  {
    id: 'admin-clientes-1',
    title: 'Admin clientes',
    description: 'Gestion de clientes, datos principales e historial.',
    imageUrl: '/img/admin%20clientes%201.jpg',
    layout: 'standard',
  },
  {
    id: 'admin-configuraciones',
    title: 'Admin configuraciones',
    description: 'Ajustes generales del sistema, realiza ajustes a preferencia.',
    imageUrl: '/img/admin%20configuraciones.jpg',
    layout: 'standard',
  },
  {
    id: 'admin-servicios',
    title: 'Crea servicios totalmente personalizados',
    description: 'Configuración de servicios, horarios, fechas, duraciones, precios, profesionales, items añadibles y muchisimo más.',
    imageUrl: '/img/admin%20servicios.jpg',
    layout: 'standard',
  },
  {
    id: 'admin-turnos-1',
    title: 'Admin sección turnos',
    description: 'Vista de control para gestion de turnos. ',
    imageUrl: '/img/admin%20turnos%201.jpg',
    layout: 'standard',
  },
  {
    id: 'admin-turnos-2',
    title: 'Admin sección turnos',
    description: 'Seguimiento de estados y acciones de turnos. Aproba, rechaza, reprograma, marca pagos, marca asistencias, cancelaciones, ect.',
    imageUrl: '/img/admin%20turnos%202.jpg',
    layout: 'standard',
  },
]

const defaultBrand: BrandSettings = {
  logoUrl: DEFAULT_LOGO_URL,
  brandName: BRAND_DISPLAY_NAME,
  tagline: NEW_BRAND_TAGLINE,
}

const heroBenefits = [
  {
    title: 'Sin costo mensual',
    description: 'Se cobra un pequeño recargo al cliente al momento de reservar.',
  },
  {
    title: 'Agenda adaptable',
    description: 'Gran diversidad de variables para que se puedas adaptarlo a tus necesidades.',
  },
    {
    title: 'Confirmación inmediata o con aprobación manual',
    description: 'Cada agenda permite configurar su propio proceso de confirmación.',
  },
  {
    title: 'Menos ausencias',
    description: 'Recordatorios de turnos por WhatsApp para reducir ausencias.',
  },

    {
    title: 'Sin limitaciones',
    description: 'Añade profesionales y servicios sin limites.',
  },
  {
    title: 'Panel simple',
    description: 'Visual y facil de usar para tu equipo, incluso sin experiencia tecnica.',
  },

]

function readStoredGallery(): GalleryImage[] {
  if (typeof window === 'undefined') return defaultGallery

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultGallery

  try {
    const parsed = JSON.parse(raw) as GalleryImage[]
    if (!Array.isArray(parsed)) return defaultGallery
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
    const normalizedLogoUrl =
      parsed.logoUrl?.trim() &&
      parsed.logoUrl.trim() !== '/logo.png' &&
      parsed.logoUrl.trim() !== '/img/favicon.png'
        ? parsed.logoUrl.trim()
        : DEFAULT_LOGO_URL
    const rawBrandName = parsed.brandName?.trim() || defaultBrand.brandName
    const normalizedBrandName = /^misturnosapp$/i.test(rawBrandName) ? BRAND_DISPLAY_NAME : rawBrandName

    const rawTagline = parsed.tagline?.trim() || defaultBrand.tagline
    const normalizedTagline = rawTagline === OLD_BRAND_TAGLINE ? NEW_BRAND_TAGLINE : rawTagline

    return {
      logoUrl: normalizedLogoUrl,
      brandName: normalizedBrandName,
      tagline: normalizedTagline,
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

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (favicon) favicon.href = FAVICON_URL
  }, [])

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
  const hasCustomGallery = gallery.length > 0
  const [featureAspectRatios, setFeatureAspectRatios] = useState<Record<string, number>>({})
  const homeFeature = siteGallery.find((item) => item.id === 'home')
  const agendaFeatures = siteGallery.filter((item) => item.id.startsWith('agenda-'))
  const panelFeatures = siteGallery.filter((item) => item.id.startsWith('panel-derecho-'))
  const otherFeatures = siteGallery.filter(
    (item) => item.id !== 'home' && !item.id.startsWith('agenda-') && !item.id.startsWith('panel-derecho-'),
  )
  const adminTurnosScreens = adminScreens.filter((item) => item.id.startsWith('admin-turnos-'))
  const adminMainScreens = adminScreens.filter((item) => !item.id.startsWith('admin-turnos-'))

  const onFeatureImageLoad = (id: string) => (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    if (!naturalWidth || !naturalHeight) return

    const aspectRatio = naturalWidth / naturalHeight

    setFeatureAspectRatios((current) => {
      const previous = current[id]
      if (previous && Math.abs(previous - aspectRatio) < 0.01) return current
      return { ...current, [id]: aspectRatio }
    })
  }

  const getFeatureLayoutClass = (id: string) => {
    const ratio = featureAspectRatios[id]
    if (!ratio) return 'feature-item--standard'
    if (ratio >= 1.3) return 'feature-item--wide'
    if (ratio <= 0.85) return 'feature-item--tall'
    return 'feature-item--standard'
  }

  return (
    <main className="landing-shell">
      <header className="topbar" id="inicio">
        <div className="brand-row">
          <div className="brand-logo-box">
            {brand.logoUrl ? (
              <img
                className="brand-logo-image"
                src={brand.logoUrl}
                alt={brand.brandName}
                onError={(event) => {
                  if (event.currentTarget.src.includes('/img/favicon.png')) return
                  event.currentTarget.src = DEFAULT_LOGO_URL
                }}
              />
            ) : (
              <span className="brand-logo-placeholder">Logo</span>
            )}
          </div>

          <div className="brand-copy">
            <strong>{brand.brandName}</strong>
            <span>{brand.tagline}</span>
          </div>
        </div>
      </header>

      <section className="hero hero--compact">
        <p className="eyebrow">Presentacion</p>
        <h1>Agenda profesional diseñada para centros de estetica</h1>
        <p className="hero-text">
          Nos ocupamos de la parte tecnica para que puedas enfocarte en tu negocio. Te ayudamos a mostrar tu disponibilidad, gestionar tus turnos reducciendo considerablemente la cantidad de mensajes por responder, todo con una experiencia simple y directa para tus clientes.
        </p>
        <div className="hero-benefits">
          {heroBenefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`benefit-item ${index === 0 ? 'benefit-item--featured' : ''} ${heroBenefits.length % 2 === 1 && index === heroBenefits.length - 1 ? 'benefit-item--full' : ''}`}
            >
              <span className="benefit-badge">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="benefit-title">{benefit.title.toUpperCase()}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <a className="primary-action" href="https://wa.me/541130580879" target="_blank" rel="noreferrer">
            Contacto por WhatsApp
          </a>
        </div>
        <p className="hero-caption">Respuesta directa por WhatsApp para mostrarte una demo personalizada.</p>
      </section>

      <section className="gallery-section" id="como-funciona">
        <div className="section-title-row">
          <p className="eyebrow">Layout de pantallas</p>
          <h2>Todas las imagenes del sistema</h2>
          {hasCustomGallery ? <p className="gallery-note">Imagenes cargadas en admin: {gallery.length}</p> : null}
        </div>

        <div className="feature-sections">
          {homeFeature ? (
            <article key={homeFeature.id} className="feature-item feature-item--home feature-item--wide">
              <div className="feature-image-box">
                <img src={homeFeature.imageUrl} alt={homeFeature.title} onLoad={onFeatureImageLoad(homeFeature.id)} />
              </div>
              <div className="feature-copy">
                <span className="feature-index">01</span>
                <h3>{homeFeature.title}</h3>
                <p>{homeFeature.description}</p>
              </div>
            </article>
          ) : null}

          {agendaFeatures.length > 0 ? (
            <section className="agenda-group">
              <div className="agenda-group-header">
                <span className="feature-index">02</span>
                <h3>Pantallas de agenda</h3>
              </div>
              <div className="agenda-group-grid">
                {agendaFeatures.map((item) => (
                  <article key={item.id} className={`agenda-card ${getFeatureLayoutClass(item.id)}`}>
                    <div className="feature-image-box">
                      <img src={item.imageUrl} alt={item.title} onLoad={onFeatureImageLoad(item.id)} />
                    </div>
                    <div className="feature-copy">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {panelFeatures.length > 0 ? (
            <section className="panel-group">
              <div className="panel-group-header">
                <span className="feature-index">03</span>
                <h3>Panel derecho</h3>
              </div>
              <div className="panel-group-grid">
                {panelFeatures.map((item) => (
                  <article key={item.id} className={`panel-card ${getFeatureLayoutClass(item.id)}`}>
                    <div className="feature-image-box">
                      <img src={item.imageUrl} alt={item.title} onLoad={onFeatureImageLoad(item.id)} />
                    </div>
                    <div className="feature-copy">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {otherFeatures.map((item, index) => (
            <article
              key={item.id}
              className={`feature-item ${getFeatureLayoutClass(item.id)} ${index % 2 === 1 ? 'feature-item--reverse' : ''} ${item.id === 'resenas' ? 'feature-item--resenas' : ''}`}
            >
              <div className="feature-image-box">
                <img src={item.imageUrl} alt={item.title} onLoad={onFeatureImageLoad(item.id)} />
              </div>
              <div className="feature-copy">
                <span className="feature-index">{String(index + 4).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="imagenes-admin">
        <div className="section-title-row">
          <p className="eyebrow">Sección Admin</p>
          <h2>Pantallas de administración</h2>
        </div>

        <div className="gallery-grid">
          {adminMainScreens.map((item, index) => (
            <article key={item.id} className={`gallery-card gallery-card--${item.layout ?? 'standard'}`}>
              <img src={item.imageUrl} alt={item.title} />
              <div className="gallery-copy">
                <span className="step-tag">Admin {String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}

          {adminTurnosScreens.length > 0 ? (
            <article className="gallery-card gallery-card--wide admin-turnos-card">
              <div className="admin-turnos-grid">
                {adminTurnosScreens.map((item) => (
                  <div key={item.id} className="admin-turnos-image-wrap">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                ))}
              </div>
              <div className="gallery-copy">
                <span className="step-tag">Admin {String(adminMainScreens.length + 1).padStart(2, '0')}</span>
                <h3>Admin sección turnos</h3>
                <p>
                  Vista unificada de turnos con control operativo: aproba, rechaza, reprograma, marca pagos y gestiona
                  asistencias/cancelaciones desde una misma sección.
                </p>
              </div>
            </article>
          ) : null}
        </div>
      </section>


      <section className="contact-section" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow">Proximo paso</p>
          <h2>¿Te interesa implementarlo en tu centro?</h2>
          <p>
            Tenelo listo en solo unos días.
          </p>
          <div className="contact-points">
            <span>Puesta en marcha guiada</span>
            <span>Sin costo mensuales</span>
          </div>
        </div>
        <div className="contact-cta-card">
          <strong>Comunicate con nosotros</strong>
          <p>Despeja tus dudas por WhatsApp.</p>
          <div className="contact-actions">
            <a className="primary-action" href="https://wa.me/541130580879" target="_blank" rel="noreferrer">
              Hablar por WhatsApp
            </a>
            <a className="secondary-action" href="mailto:ivangabrielruiz1@gmail.com">
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
    if (!imageUrl.trim()) return

    setGallery((current) => [
      {
        id: crypto.randomUUID(),
        title: title.trim() || 'Nueva pantalla',
        description: description.trim() || 'Paso del sistema',
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
    const normalizedLogoUrl =
      logoUrl.trim() && logoUrl.trim() !== '/logo.png' && logoUrl.trim() !== '/img/favicon.png'
        ? logoUrl.trim()
        : DEFAULT_LOGO_URL

    setBrand({
      logoUrl: normalizedLogoUrl,
      brandName: brandName.trim() || defaultBrand.brandName,
      tagline: tagline.trim() || defaultBrand.tagline,
    })
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <h1>Panel simple</h1>
        <div className="admin-actions">
          <a className="secondary-action" href="/">
            Volver a la landing
          </a>
          <button className="secondary-action admin-button" type="button" onClick={resetGallery}>
            Limpiar imagenes
          </button>
        </div>
      </header>

      <section className="admin-grid">
        <form className="admin-card" onSubmit={onSubmit}>
          <h2>Subir imagen del sistema</h2>

          <label>
            <span>Titulo</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>

          <label>
            <span>Descripcion</span>
            <textarea
              rows={3}
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
              <img src={imageUrl} alt="Vista previa" />
            </div>
          ) : null}

          <button className="primary-action admin-button" type="submit">
            Guardar imagen
          </button>
        </form>

        <section className="admin-card">
          <h2>Marca</h2>

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
            <input value={logoUrl} onChange={(event) => setLogoUrl(event.target.value)} placeholder="https://..." />
          </label>

          <label>
            <span>O subir logo</span>
            <input type="file" accept="image/*" onChange={onLogoFileChange} />
          </label>

          <button className="primary-action admin-button" type="button" onClick={saveBrand}>
            Guardar marca
          </button>
        </section>
      </section>

      <section className="admin-gallery">
        <h2>Imagenes cargadas ({gallery.length})</h2>
        <div className="admin-gallery-list">
          {gallery.map((item) => (
            <article key={item.id} className="admin-gallery-item">
              <img src={item.imageUrl} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <button className="danger-button" type="button" onClick={() => removeImage(item.id)}>
                Eliminar
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
