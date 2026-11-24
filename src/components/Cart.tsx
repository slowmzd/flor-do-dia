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
import { type Line, useShop, price, subtotal, Photo } from "../store/Shop";
import { Modal } from "../components/Modal";
import { Qty } from "../pages/Detail";
export function Cart() {
  let { lines, setLines, setDrawer, mode, Mode, notes, Notes } = useShop(),
    nav = useNavigate();
  let edit = (i: number, patch: Partial<Line>) =>
    setLines((a: Line[]) =>
      a.map((l, j) => (i === j ? { ...l, ...patch } : l)),
    );
  return (
    <Modal drawer title="Sua sacola" close={() => setDrawer(false)}>
      {!lines.length ? (
        <div className="empty">
          <ShoppingBag />
          <h3>Sua sacola está vazia.</h3>
          <button
            className="btn"
            onClick={() => {
              setDrawer(false);
              nav("/catalogo");
            }}
          >
            Explorar catálogo
          </button>
        </div>
      ) : (
        <>
          {lines.map((l: Line, i: number) => {
            let p = products.find((p) => p.id === l.id)!;
            return (
              <div className="line" key={i}>
                <Photo p={p} />
                <div>
                  <h3>{p.name}</h3>
                  <small>{price(p)}</small>
                  <Qty q={l.q} set={(q) => edit(i, { q })} />
                </div>
                <button
                  aria-label={"Remover " + p.name}
                  onClick={() =>
                    setLines(lines.filter((_: Line, j: number) => j !== i))
                  }
                >
                  <Trash2 size={16} />
                </button>
                <label>
                  Mensagem do cartão
                  <input
                    value={l.msg}
                    onChange={(e) => edit(i, { msg: e.target.value })}
                  />
                </label>
              </div>
            );
          })}
          <label>
            Recebimento
            <select value={mode} onChange={(e) => Mode(e.target.value)}>
              <option>Entrega</option>
              <option>Retirada</option>
            </select>
          </label>
          <label>
            Observações
            <textarea value={notes} onChange={(e) => Notes(e.target.value)} />
          </label>
          <p>
            {subtotal(lines)}. A floricultura confirmará os valores e a
            disponibilidade.
          </p>
          <button
            className="btn full"
            onClick={() => {
              setDrawer(false);
              nav("/pedido");
            }}
          >
            Finalizar pedido <ArrowRight />
          </button>
          <button className="textlink" onClick={() => setDrawer(false)}>
            Continuar comprando
          </button>
        </>
      )}
    </Modal>
  );
}
