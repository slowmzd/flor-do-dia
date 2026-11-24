import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  Search,
  ShoppingBag,
  Menu,
  X,
  Pause,
  Play,
  Truck,
  HandHeart,
  Diamond,
  Flower2,
  Plus,
  Minus,
  Trash2,
  Eye,
  SlidersHorizontal,
  MessageCircle,
  Camera as Instagram,
  VolumeX,
  Volume2,
} from "lucide-react";
import { business as b } from "../config/business";
import { products, categories, occasions, Product } from "../data/catalog";
import { wa, Chat, available, Photo } from "../store/Shop";
export function Hero() {
  let ref = useRef<HTMLVideoElement>(null),
    reduced = useReducedMotion(),
    [paused, P] = useState(true),
    [mute, M] = useState(true);
  useEffect(() => {
    if (reduced) ref.current?.pause();
    else ref.current?.play().catch(() => {});
  }, [reduced]);
  return (
    <section className="hero">
      <video
        ref={ref}
        poster="/images/hero.jpg"
        autoPlay={!reduced}
        playsInline
        loop
        muted={mute}
        onPlay={() => P(false)}
        onPause={() => P(true)}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="shade" />
      <motion.div
        className="herocopy"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="location">
          <i /> FLORICULTURA EM CAÇAPAVA · SP
        </div>
        <h1>
          Flores que transformam
          <br />
          momentos em <em>memórias.</em>
        </h1>
        <p>
          Surpreenda quem você ama com flores e presentes
          <br className="desktop" /> preparados com carinho para cada ocasião.
        </p>
        <div className="buttons">
          <Link className="btn blush" to="/catalogo">
            Explorar catálogo <ArrowRight size={17} />
          </Link>
          <a
            className="btn outline"
            href={wa("Olá, Flor do Dia! Gostaria de fazer um pedido.")}
            target="_blank"
          >
            <Chat /> Fazer meu pedido
          </a>
        </div>
      </motion.div>
      <div className="herobottom">
        <a href="#categorias">
          <ArrowDown size={15} /> ROLE PARA DESCOBRIR
        </a>
        <div>
          <button
            aria-label={paused ? "Reproduzir vídeo" : "Pausar vídeo"}
            onClick={() =>
              paused
                ? ref.current?.play().catch(() => {})
                : ref.current?.pause()
            }
          >
            {paused ? <Play /> : <Pause />}
          </button>
          <button
            aria-label={mute ? "Ativar áudio" : "Silenciar"}
            onClick={() => M(!mute)}
          >
            {mute ? <VolumeX /> : <Volume2 />}
          </button>
        </div>
      </div>
    </section>
  );
}
export const pics = ["buques", "rosas", "girassois", "cartoes"];
export function Home() {
  return (
    <>
      <Hero />
      <div className="benefits">
        {[
          [HandHeart, "Atendimento personalizado"],
          [Truck, "Entrega e retirada"],
          [Diamond, "Pagamento via Pix"],
          [MessageCircle, "Pedidos pelo WhatsApp"],
        ].map(([Icon, t]: any) => (
          <div key={t}>
            <Icon />
            {t}
          </div>
        ))}
      </div>
      <section className="wrap cats" id="categorias">
        <div className="eyebrow">NOSSAS CATEGORIAS</div>
        <div className="sectionrow">
          <div>
            <h2>
              Encontre o presente <em>perfeito.</em>
            </h2>
            <p>Uma forma especial de demonstrar o que você sente.</p>
          </div>
          <Link className="textlink" to="/catalogo">
            Ver catálogo completo <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="tiles">
          {categories.map((c, i) => (
            <Link to={"/catalogo?categoria=" + c} key={c}>
              <img src={"/images/" + pics[i] + ".jpg"} alt="" loading="lazy" />
              <span>
                {i === 3 ? "Presentes" : c}
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section id="ocasioes" className="occasion">
        <div className="wrap">
          <div className="eyebrow">OCASIÕES ESPECIAIS</div>
          <h2>
            Existe uma flor para cada <em>sentimento.</em>
          </h2>
          <div className="occgrid">
            {occasions.map((o, i) => (
              <Link
                key={o}
                to={"/catalogo?ocasiao=" + o}
                style={{
                  backgroundImage:
                    "linear-gradient(0deg,#24131b99,transparent),url(/images/" +
                    pics[[0, 1, 2, 1, 3, 0][i]] +
                    ".jpg)",
                }}
              >
                {o}
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="campaign">
        <div>
          <h2>
            Todo dia é uma oportunidade de <em>florescer.</em>
          </h2>
          <p>Transforme pequenos gestos em grandes lembranças.</p>
          <Link to="/catalogo" className="btn blush">
            Encontre seu presente <ArrowRight />
          </Link>
        </div>
      </section>
      <section className="wrap">
        <h2>Como funciona</h2>
        <div className="steps">
          {[
            "Escolha suas flores",
            "Personalize seu presente",
            "Faça seu pedido",
          ].map((t, i) => (
            <article key={t}>
              <img
                src={"/images/" + pics[[0, 3, 1][i]] + ".jpg"}
                alt=""
                loading="lazy"
              />
              <small>0{i + 1}</small>
              <h3>{t}</h3>
              <p>
                {
                  [
                    "Explore nosso catálogo e encontre o presente ideal.",
                    "Selecione os produtos, quantidades e escreva uma mensagem especial.",
                    "Envie sua seleção pelo WhatsApp e confirme os detalhes com nossa equipe.",
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
      </section>
      <section id="sobre" className="about">
        <img src="/images/hero.jpg" alt="Um momento de carinho com flores" />
        <div>
          <div className="eyebrow">SOBRE A FLOR DO DIA</div>
          <h2>
            Carinho em cada <em>pétala.</em>
          </h2>
          <p>
            A Flor do Dia acredita que as flores são uma maneira especial de
            expressar sentimentos. Cada presente é uma oportunidade de
            transformar momentos simples em lembranças especiais.
          </p>
          <a href={b.whatsapp} className="textlink">
            Conversar com a floricultura <ArrowUpRight />
          </a>
        </div>
      </section>
      <Gallery />
      <Contact />
    </>
  );
}
export function Gallery() {
  const photos = products.filter((p) => available.has(p.photo));
  if (!photos.length && !b.instagram) return null;
  return (
    <section className="wrap">
      <div className="eyebrow">{b.instagramHandle}</div>
      <h2>Flores que encantam todos os dias.</h2>
      <div className="socialgrid">
        {photos.map((p) => (
          <Link key={p.id} to={"/produto/" + p.id}>
            <Photo p={p} />
          </Link>
        ))}
      </div>
      {b.instagram && (
        <a className="textlink" href={b.instagram}>
          <Instagram /> Acompanhe no Instagram
        </a>
      )}
    </section>
  );
}
export function Contact() {
  return (
    <section id="contato" className="wrap contact">
      <div>
        <div className="eyebrow">CONTATO</div>
        <h2>Fale com a Flor do Dia.</h2>
        <p>
          <MapPin size={16} /> {b.address || "Caçapava-SP"} · {b.phone}
        </p>
        <a className="btn" href={b.whatsapp}>
          <Chat /> Conversar pelo WhatsApp
        </a>
      </div>
      <div>
        <h3>Entrega e retirada</h3>
        <p>
          {b.deadline} Consulte horários de retirada e condições de entrega com
          a equipe.
        </p>
        <p>Aceitamos Pix. A confirmação do pedido depende do pagamento.</p>
        <a className="textlink" href={b.catalog}>
          Catálogo oficial <ArrowUpRight />
        </a>
        {b.instagram && (
          <a className="textlink" href={b.instagram}>
            <Instagram size={16} /> Acessar Instagram
          </a>
        )}
        {b.map && (
          <a className="textlink" href={b.map}>
            <MapPin size={16} /> Como chegar
          </a>
        )}
      </div>
      <iframe
        className="contactmap"
        title="Localização da Floricultura Flor do Dia"
        src={b.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
