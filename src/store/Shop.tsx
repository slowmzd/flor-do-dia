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
export type Line = { id: string; q: number; msg: string };
export function saved<T>(key: string, value: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? value;
  } catch {
    return value;
  }
}
export function useSaved<T>(key: string, initial: T) {
  const [value, set] = useState<T>(() => saved(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, set] as const;
}
export const Shop = createContext<any>(null);
export const useShop = () => useContext(Shop);
export const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const price = (p: Product) =>
  p.price === null ? "Consulte o valor" : money(p.price);
export function subtotal(lines: Line[]) {
  let total = 0;
  for (const line of lines) {
    const product = products.find((p) => p.id === line.id);
    if (product?.price == null) return "Valor final sob consulta";
    total += product.price * line.q;
  }
  return "Subtotal: " + money(total);
}
export const wa = (message: string) =>
  b.whatsapp + "?text=" + encodeURIComponent(message);
export function Chat({ size = 18 }) {
  return <MessageCircle size={size} />;
}
export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Flor do Dia — início">
      <img src="/images/logo.png" alt="" />
      <span>
        Flor do Dia<small>FLORICULTURA</small>
      </span>
    </Link>
  );
}
export const available = new Set(
  Object.keys(import.meta.glob("/public/images/*.jpg")).map((path) =>
    path.replace("/public", ""),
  ),
);
export function Photo({ p }: { p: Product }) {
  const [failed, set] = useState(false);
  useEffect(() => set(false), [p.id]);
  return failed || !available.has(p.photo) ? (
    <div className="noPhoto">
      <Flower2 />
      <small>Foto sob consulta</small>
    </div>
  ) : (
    <img src={p.photo} alt={p.name} loading="lazy" onError={() => set(true)} />
  );
}
export const links = [
  ["Início", "/"],
  ["Catálogo", "/catalogo"],
  ["Buquês", "/catalogo?categoria=Buquês"],
  ["Ocasiões", "/#ocasioes"],
  ["Presentes", "/catalogo?categoria=Cartões"],
  ["Sobre nós", "/#sobre"],
  ["Contato", "/#contato"],
];
