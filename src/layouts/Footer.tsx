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
import { Brand } from "../store/Shop";
export function Footer() {
  return (
    <footer>
      <div>
        <Brand />
        <p>Flores e presentes em Caçapava-SP.</p>
      </div>
      <div>
        <strong>Navegação</strong>
        <Link to="/">Início</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/#sobre">Sobre nós</Link>
      </div>
      <div>
        <strong>Atendimento</strong>
        <a href={b.whatsapp}>{b.phone}</a>
        <a href={b.instagram}>Instagram · {b.instagramHandle}</a>
        <a href={b.map}>{b.address}</a>
      </div>
      <div>
        <strong>Informações</strong>
        <Link to="/#contato">Entrega, retirada e Pix</Link>
        <Link to="/privacidade">Política de privacidade</Link>
      </div>
      <small>© {new Date().getFullYear()} Flor do Dia</small>
    </footer>
  );
}
