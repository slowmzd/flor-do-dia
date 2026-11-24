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
  useParams,
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
import { useShop, price, wa, Chat, Photo } from "../store/Shop";
import { Modal } from "../components/Modal";
import { Cards } from "../pages/Catalog";
export function Qty({ q, set }: { q: number; set: (n: number) => void }) {
  return (
    <div className="qty">
      <button
        aria-label="Diminuir quantidade"
        disabled={q <= 1}
        onClick={() => set(q - 1)}
      >
        <Minus />
      </button>
      <span>{q}</span>
      <button aria-label="Aumentar quantidade" onClick={() => set(q + 1)}>
        <Plus />
      </button>
    </div>
  );
}
export function Detail({ p }: { p: Product }) {
  let { add } = useShop(),
    [q, Q] = useState(1),
    [msg, M] = useState(""),
    [zoom, Z] = useState(false);
  return (
    <div className="detail">
      <button
        className="detailimg"
        aria-label="Ampliar fotografia"
        onClick={() => Z(true)}
      >
        <Photo p={p} />
      </button>
      <div>
        <div className="eyebrow">{p.cat}</div>
        <h2>{p.name}</h2>
        <p>{p.desc}</p>
        <strong>{price(p)}</strong>
        <label>
          Quantidade
          <Qty q={q} set={Q} />
        </label>
        <label>
          Mensagem personalizada
          <textarea
            value={msg}
            onChange={(e) => M(e.target.value)}
            placeholder="Escreva sua dedicatória"
          />
        </label>
        <button className="btn full" onClick={() => add(p, q, msg)}>
          Adicionar à sacola <ShoppingBag size={17} />
        </button>
        <a
          className="textlink"
          href={wa(
            "Olá, Flor do Dia! Gostaria de consultar " +
              q +
              " × " +
              p.name +
              ". Mensagem: " +
              msg,
          )}
          target="_blank"
        >
          Comprar pelo WhatsApp <Chat />
        </a>
        <p className="note">Entrega ou retirada em Caçapava. {b.deadline}</p>
      </div>
      {zoom && (
        <Modal title={p.name} close={() => Z(false)}>
          <Photo p={p} />
        </Modal>
      )}
    </div>
  );
}
export function ProductPage() {
  const { id } = useParams();
  const p = products.find((product) => product.id === id);
  return p ? (
    <main className="wrap inner">
      <Link className="textlink" to="/catalogo">
        Voltar ao catálogo
      </Link>
      <Detail key={p.id} p={p} />
      <h2>Para acompanhar</h2>
      <Cards list={products.filter((x) => x !== p).slice(0, 4)} />
    </main>
  ) : (
    <Missing />
  );
}
export function Missing() {
  return (
    <main className="wrap inner">
      <h1>Página não encontrada</h1>
      <Link className="btn" to="/catalogo">
        Explorar catálogo
      </Link>
    </main>
  );
}
