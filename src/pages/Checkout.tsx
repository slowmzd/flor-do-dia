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
import { type Line, useShop, subtotal, wa, Chat } from "../store/Shop";
export function Checkout() {
  let { lines, notes, Notes, mode, Mode } = useShop();
  if (!lines.length)
    return (
      <main className="inner wrap">
        <h1>Sua sacola está vazia.</h1>
        <Link to="/catalogo">Explorar catálogo</Link>
      </main>
    );
  return (
    <main className="inner wrap checkout">
      <div className="eyebrow">FLOR DO DIA / SACOLA</div>
      <h1>
        Finalize seu <em>pedido.</em>
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let d = new FormData(e.currentTarget);
          window.open(
            wa(
              [
                "Olá, Flor do Dia! Gostaria de solicitar um pedido pelo site.",
                "Cliente: " + d.get("nome"),
                "Produtos selecionados:",
                ...lines.map(
                  (l: Line) =>
                    "• " +
                    l.q +
                    " × " +
                    products.find((p) => p.id === l.id)?.name +
                    (l.msg ? " — Cartão: " + l.msg : ""),
                ),
                "Modalidade: " + mode,
                "Data desejada: " +
                  String(d.get("data")).split("-").reverse().join("/"),
                mode === "Entrega"
                  ? "Destinatário: " +
                    d.get("dest") +
                    "\nEndereço: " +
                    d.get("end")
                  : "",
                "Mensagem personalizada: " + d.get("msg"),
                "Observações: " + notes,
                "Gostaria de confirmar a disponibilidade e os valores.",
              ]
                .filter(Boolean)
                .join("\n"),
            ),
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        <div>
          <label>
            Seu nome
            <input required name="nome" autoComplete="name" />
          </label>
          <label>
            Recebimento
            <select value={mode} onChange={(e) => Mode(e.target.value)}>
              <option>Entrega</option>
              <option>Retirada</option>
            </select>
          </label>
          <label>
            Data desejada
            <input
              required
              type="date"
              name="data"
              min={new Date().toLocaleDateString("en-CA")}
            />
          </label>
          {mode === "Entrega" && (
            <>
              <label>
                Nome do destinatário
                <input required name="dest" />
              </label>
              <label>
                Endereço completo
                <input required name="end" autoComplete="street-address" />
              </label>
            </>
          )}
          <label>
            Mensagem personalizada
            <textarea name="msg" />
          </label>
          <label>
            Observações adicionais
            <textarea value={notes} onChange={(e) => Notes(e.target.value)} />
          </label>
        </div>
        <aside>
          <h3>Resumo do pedido</h3>
          {lines.map((l: Line, i: number) => (
            <p key={i}>
              {l.q} × {products.find((p) => p.id === l.id)?.name}
            </p>
          ))}
          <strong>{subtotal(lines)}</strong>
          <p>
            {b.deadline} Aceitamos Pix. Seu pedido será confirmado pela equipe
            mediante pagamento.
          </p>
          <button className="btn">
            <Chat /> Enviar pedido pelo WhatsApp
          </button>
        </aside>
      </form>
    </main>
  );
}
