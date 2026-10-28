import { useMenu } from './features/useMenu'
import { ProductPhoto } from './widgets/ProductPhoto'
import { benefits } from './entities/benefits'
import { steps } from './entities/steps'
import { tech } from './entities/tech'
import { faqs } from './entities/faqs'
import { type IconName } from './shared/types'

// Re-export Icon from shared
export { IconName }

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/>',
    camera: '<path d="M4 7h3l1.4-2h7.2L17 7h3v12H4Z"/><circle cx="12" cy="13" r="3.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c2-5 6-8 12-11"/>',
    spark: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/>',
    sensor: '<path d="M12 3v6M8.5 5a8 8 0 1 0 7 0"/><path d="M9 14a3 3 0 0 0 6 0"/>',
    voice: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
    mask: '<path d="M3 8c3-2 15-2 18 0l-1 8c-.3 2-2 3-4 3h-1.5L12 15l-2.5 4H8c-2 0-3.7-1-4-3L3 8Z"/><path d="M4 9h7v5H5M20 9h-7v5h6"/>',
    waves: '<path d="M3 8c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 13c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 18c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',
    archive: '<path d="M4 7h16v13H4ZM3 4h18v3H3Z"/><path d="M9 11h6"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g dangerouslySetInnerHTML={{ __html: paths[name] }} />
    </svg>
  )
}

function Logo({ dark = false }: { dark?: boolean }) {
  const logoColor = dark ? '#ffffff' : '#08BFD2'
  return (
    <a
      className={`logo ${dark ? 'logo-dark' : ''}`}
      href="#inicio"
      aria-label="BlueSight - inicio"
    >
      <span className="logo-mark" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 512 320" fill="#08BFD2" stroke="currentColor">
          <g>
            <path d="M24 151 C68 116 116 76 165 49 C222 18 274 15 329 42 C382 68 425 112 486 150 C498 158 494 171 479 172 C421 176 383 161 343 132 C306 106 282 89 256 89 C223 89 195 110 160 133 C118 160 78 183 42 187 C18 190 7 168 24 151 Z"/>
            <path d="M34 207 C81 211 117 198 154 177 C165 171 174 176 176 190 C183 237 216 269 256 269 C292 269 327 249 364 224 C406 195 442 181 480 185 C495 187 498 198 486 208 C434 248 389 281 336 301 C280 322 225 316 173 292 C126 271 83 240 29 222 C14 217 18 205 34 207 Z"/>
            <circle cx="256" cy="178" r="53"/>
          </g>
        </svg>
      </span>
      <span>BlueSight</span>
    </a>
  )
}

const PhotoAssets = {
  hero:
    'https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?auto=format&fit=crop&w=1800&q=88',
  diver:
    'https://images.unsplash.com/photo-1682687982468-4584ff11f88a?auto=format&fit=crop&w=1400&q=85',
  reef:
    'https://images.unsplash.com/photo-1682686581663-179efad3cd2f?auto=format&fit=crop&w=1200&q=85',
  fish:
    'https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=1200&q=85',
  camera:
    'https://images.unsplash.com/photo-1682687982141-0143020ed57a?auto=format&fit=crop&w=1200&q=85',
}

const Benefits = benefits
const Steps = steps
const Tech = tech
const Faqs = faqs

export default function App() {
  const { menuOpen, toggleMenu, closeMenu } = useMenu()

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="nav-wrap">
          <Logo />
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            id="main-nav"
            className={menuOpen ? 'open' : ''}
            aria-label="Navegação principal"
          >
            <a href="#produto" onClick={closeMenu}>O produto</a>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#beneficios" onClick={closeMenu}>Benefícios</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
          </nav>
          <a className="nav-cta" href="#oferta">Conheça o BlueSight</a>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className="hero" id="inicio">
          <img src={PhotoAssets.hero} alt="" className="hero-photo" />
          <div className="hero-overlay" />
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="eyebrow"><span/> Uma nova forma de explorar</p>
              <h1>Explore o oceano.<br/><em>Conheça cada vida.</em></h1>
              <p className="hero-lead">
                Óculos inteligentes que identificam a vida marinha, registram suas descobertas e exibem informações em tempo real.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#oferta">
                  Descubra o BlueSight
                </a>
                <a className="text-link" href="#como-funciona">
                  <Icon name="play" size={22} /> Veja como funciona</a>
              </div>
            </div>
            <div className="hud-card" role="group" aria-label="Exemplo conceitual da interface na lente">
              <div className="hud-top">
                <span>IDENTIFICAÇÃO ATIVA</span>
                <b>● REC</b>
              </div>
              <div className="hud-target">
                <img
                  src="/images/tartaruga-verde-foto.png"
                  alt="Fotografia de uma tartaruga-verde nadando em um recife"
                />
                <span className="corner c1" />
                <span className="corner c2" />
                <span className="corner c3" />
                <span className="corner c4" />
                <div className="hud-species">
                  <p>ESPÉCIE DETECTADA</p>
                  <strong>Tartaruga-verde</strong>
                  <i>Chelonia mydas · 96%</i>
                </div>
              </div>
              <div className="hud-stats">
                <div>
                  <small>PROFUNDIDADE</small>
                  <b>12,4 m</b>
                </div>
                <div>
                  <small>TEMPERATURA</small>
                  <b>26,7 °C</b>
                </div>
              </div>
            </div>
          </div>
          <a href="#proposta" className="scroll-cue" aria-label="EXPLORE — ir para a próxima seção">
            <span/> EXPLORE
          </a>
        </section>

        <section className="intro light-section" id="proposta">
          <div className="container intro-grid">
            <div>
              <p className="section-kicker">SOBRE O BLUESIGHT</p>
              <h2>Mais do que enxergar.<br/>É explorar de verdade.</h2>
            </div>
            <div className="intro-copy">
              <p>
                O BlueSight transforma seu mergulho em uma experiência interativa, aproximando você da vida marinha com inteligência artificial, realidade aumentada e registro audiovisual.
              </p>
              <a href="#recursos">Conheça os recursos</a>
            </div>
          </div>
          <div className="container stats-row">
            <div>
              <strong>360°</strong>
              <span>de experiência<br/>integrada</span>
            </div>
            <div>
              <strong>IA</strong>
              <span>identificação<br/>assistida</span>
            </div>
            <div>
              <strong>4K</strong>
              <span>registro<br/>audiovisual</span>
            </div>
            <div>
              <strong>AR</strong>
              <span>informações<br/>na lente</span>
            </div>
          </div>
        </section>

        <section className="benefits dark-section" id="beneficios">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker cyan">POR QUE BLUESIGHT</p>
              <h2>Seu mergulho, <em>mais completo.</em></h2>
              <p>Descubra, registre e aprenda em cada exploração.</p>
            </div>
            <div className="benefit-grid">
              {Benefits.map(([icon, title, text], index) => (
                <article className="benefit-card" key={title}>
                  <span className="card-number">0{index + 1}</span>
                  <div className="icon-box">
                    <Icon name={icon} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how light-section" id="como-funciona">
          <div className="container how-grid">
            <div className="sticky-copy">
              <p className="section-kicker">COMO FUNCIONA</p>
              <h2>Sua próxima descoberta está a <em>um mergulho de distância.</em></h2>
              <div className="how-photo">
                <img src={PhotoAssets.diver} alt="Mergulhador explorando um recife de corais" />
                <div className="photo-badge">
                  <Icon name="waves" /> Tecnologia que mergulha com você
                </div>
              </div>
            </div>
            <ol className="steps">
              {Steps.map(([number, title, text]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="technology dark-section" id="recursos">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker cyan">RECURSOS</p>
                <h2>Tecnologia que acompanha <em>seu mergulho.</em></h2>
              </div>
              <p>
                Recursos integrados para transformar observação em conhecimento e cada encontro em uma memória.
              </p>
            </div>
            <div className="tech-grid">
              {Tech.map(([icon, title, text], i) => (
                <article
                  className={`tech-card tech-${i + 1}`}
                  key={title}
                >
                  <Icon name={icon} size={30} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span>0{i + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="product" id="produto">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">DESIGN DO PRODUTO</p>
              <h2>Projetado para quem quer <em>descobrir mais.</em></h2>
            </div>
            <div className="product-layout">
              <ProductPhoto />
              <div className="product-topics" role="group" aria-label="Recursos do produto">
                <article>
                  <b>01</b>
                  <div>
                    <h3>Display integrado à lente</h3>
                    <small>Dados visíveis em tempo real durante toda a exploração.</small>
                  </div>
                </article>
                <article>
                  <b>02</b>
                  <div>
                    <h3>Câmera integrada</h3>
                    <small>Fotos e vídeos em alta resolução sem interromper o mergulho.</small>
                  </div>
                </article>
                <article>
                  <b>03</b>
                  <div>
                    <h3>Sensores ambientais</h3>
                    <small>Leitura de profundidade e temperatura da água.</small>
                  </div>
                </article>
                <article>
                  <b>04</b>
                  <div>
                    <h3>Interface inteligente</h3>
                    <small>Informações essenciais organizadas de forma clara e acessível.</small>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="memories dark-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker cyan">SUAS DESCOBERTAS</p>
                <h2>Cada encontro merece <em>ser lembrado.</em></h2>
              </div>
              <p>
                Capture imagens, registre vídeos e reúna informações para revisitar suas experiências.
              </p>
            </div>
            <div className="gallery">
              <figure className="gallery-main">
                <img
                  src={PhotoAssets.reef}
                  alt="Mergulhador sobre um recife colorido"
                />
                <figcaption>
                  <Icon name="camera" /> FOTOS <b>01</b>
                </figcaption>
              </figure>
              <figure>
                <img src={PhotoAssets.camera} alt="Mergulhadora registrando a vida marinha" />
                <figcaption>
                  <Icon name="play" /> VÍDEOS <b>02</b>
                </figcaption>
              </figure>
              <figure>
                <img src={PhotoAssets.fish} alt="Vida marinha em águas tropicais" />
                <figcaption>
                  <Icon name="archive" /> REGISTROS <b>03</b>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="difference light-section">
          <div className="container difference-grid">
            <div>
              <p className="section-kicker">UMA EXPERIÊNCIA INTEGRADA</p>
              <h2>Sua exploração conectada à <em>descoberta.</em></h2>
              <p className="large-copy">
                O BlueSight reúne identificação assistida por IA, informações visuais, registro audiovisual e dados ambientais em um só equipamento.
              </p>
            </div>
            <div className="difference-list">
              <div>
                <Icon name="eye" />
                <div>
                  <h3>Informações durante o mergulho</h3>
                  <small>Aprenda enquanto explora</small>
                </div>
              </div>
              <div>
                <Icon name="camera" />
                <div>
                  <h3>Registro audiovisual integrado</h3>
                  <small>Guarde sem interromper a jornada</small>
                </div>
              </div>
              <div>
                <Icon name="spark" />
                <div>
                  <h3>Recursos inteligentes</h3>
                  <small>Tecnologia a serviço da descoberta</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker cyan">POSSIBILIDADES</p>
              <h2>Imagine o seu <em>próximo mergulho.</em></h2>
            </div>
            <div className="quote-grid">
              <blockquote>
                <span>“</span>
                <p>
                  Poder registrar minhas descobertas sem interromper a exploração mudaria a forma como vivencio cada mergulho.
                </p>
                <footer>
                  <b>Mergulhador recreativo</b>
                  <small>PERFIL ILUSTRATIVO</small>
                </footer>
              </blockquote>
              <blockquote>
                <span>“</span>
                <p>
                  Ter informações sobre a vida marinha ao alcance dos olhos tornaria cada encontro uma oportunidade de aprendizado.
                </p>
                <footer>
                  <b>Entusiasta da vida marinha</b>
                  <small>PERFIL ILUSTRATIVO</small>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="offer" id="oferta">
          <div className="container offer-card">
            <div className="offer-copy">
              <p className="section-kicker cyan">CONCEITO BLUESIGHT</p>
              <h2>Prepare-se para uma nova forma de mergulhar.</h2>
              <p>
                Conheça o BlueSight e descubra como a tecnologia pode ampliar sua experiência de exploração subaquática.
              </p>
              <div className="price">
                <small>A PARTIR DE</small>
                <strong>R$ 4.999<sup>,99</sup></strong>
              </div>
              <button className="button primary" type="button" aria-describedby="nota-conceito">Compre agora</button>
              <small className="concept-note" id="nota-conceito">
                Produto conceitual. Condições comerciais ilustrativas.
              </small>
            </div>
            <div className="offer-visual">
              <ProductPhoto compact />
              <div className="offer-ring" />
            </div>
          </div>
        </section>

        <section className="faq light-section" id="faq">
          <div className="container faq-grid">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Perguntas<br/>frequentes.</h2>
              <p>
                Ainda tem dúvidas? Reunimos as principais informações sobre o conceito BlueSight.
              </p>
            </div>
            <div className="accordion">
              {Faqs.map(([question, answer], i) => (
                <details key={question} open={i === 0}>
                  <summary>
                    <span>0{i + 1}</span>{question}<b>+</b>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="container footer-top">
          <Logo />
          <p>
            Explore o oceano.<br/>
            Conheça cada vida.
          </p>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
        <div className="container footer-bottom">
          <p>
            BlueSight é um conceito de produto. Imagens, funcionalidades e condições
            comerciais são ilustrativas e podem sofrer alterações.
          </p>
          <span>© 2026 BLUESIGHT</span>
        </div>
      </footer>
    </>
  )
}