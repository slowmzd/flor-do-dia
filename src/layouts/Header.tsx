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
import { type Line, useShop, Chat, Brand, links } from "../store/Shop";
import { Modal } from "../components/Modal";
export function Header() {
  let { lines, setDrawer } = useShop(),
    loc = useLocation(),
    nav = useNavigate();
  let [scroll, S] = useState(false),
    [panel, P] = useState(""),
    [q, Q] = useState("");
  useEffect(() => {
    const f = () => S(scrollY > 40);
    f();
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    P("");
    const timer = setTimeout(() => {
      if (loc.hash)
        document.getElementById(loc.hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 20);
    return () => clearTimeout(timer);
  }, [loc.pathname, loc.hash]);
  return (
    <>
      <header className={scroll || loc.pathname !== "/" ? "solid" : ""}>
        <Brand />
        <nav>
          {links.map(([n, l]) => (
            <Link
              key={n}
              className={loc.pathname === l && !loc.hash ? "active" : ""}
              to={l}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="icons">
          <button aria-label="Pesquisar" onClick={() => P("search")}>
            <Search />
          </button>
          {b.instagram && (
            <a href={b.instagram} aria-label="Instagram">
              <Instagram />
            </a>
          )}
          <a
            className="headchat"
            href={b.whatsapp}
            target="_blank"
            aria-label="WhatsApp"
          >
            <Chat />
          </a>
          <button
            aria-label="Abrir sacola"
            className="bag"
            onClick={() => setDrawer(true)}
          >
            <ShoppingBag />
            <small>{lines.reduce((s: number, l: Line) => s + l.q, 0)}</small>
          </button>
          <button
            className="menubtn"
            aria-label="Abrir menu"
            onClick={() => P("menu")}
          >
            <Menu />
          </button>
        </div>
      </header>
      {panel && (
        <Modal
          close={() => P("")}
          title={panel === "search" ? "Pesquisar flores" : "Menu"}
        >
          {panel === "search" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                P("");
                nav("/catalogo?q=" + encodeURIComponent(q));
              }}
            >
              <label>
                Nome do produto
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => Q(e.target.value)}
                />
              </label>
              <button className="btn">
                Pesquisar <Search size={16} />
              </button>
            </form>
          ) : (
            links.map(([n, l]) => (
              <Link className="menulink" key={n} to={l} onClick={() => P("")}>
                {n}
                <ChevronRight />
              </Link>
            ))
          )}
        </Modal>
      )}
    </>
  );
}
