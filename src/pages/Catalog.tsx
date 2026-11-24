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
import { useShop, price, Photo } from "../store/Shop";
export function Catalog() {
  const [s, set] = useSearchParams(),
    q = s.get("q") || "",
    c = s.get("categoria") || "",
    o = s.get("ocasiao") || "",
    sort = s.get("ordem") || "";
  const param = (key: string, v: string) => {
    let a = new URLSearchParams(s);
    if (v) a.set(key, v);
    else a.delete(key);
    set(a, { replace: true });
  };
  let list = products.filter(
    (p) =>
      p.name
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .includes(q.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")) &&
      (!c || p.cat === c) &&
      (!o || p.oc.includes(occasions.indexOf(o))),
  );
  if (sort)
    list.sort((a, b) =>
      sort === "preco"
        ? (a.price ?? Infinity) - (b.price ?? Infinity)
        : sort === "az"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
    );
  return (
    <main className="wrap inner">
      <div className="eyebrow">FLOR DO DIA / CATÁLOGO</div>
      <h1>
        Catálogo de <em>flores e presentes.</em>
      </h1>
      <div className="filters">
        <label>
          Pesquisar
          <input
            type="search"
            value={q}
            placeholder="Nome do produto"
            onChange={(e) => param("q", e.target.value)}
          />
        </label>
        {[
          [categories, "categoria", "Categoria", c],
          [occasions, "ocasiao", "Ocasião", o],
        ].map(([arr, k, l, v]: any) => (
          <label key={k}>
            {l}
            <select value={v} onChange={(e) => param(k, e.target.value)}>
              <option value="">Todas</option>
              {arr.map((t: string) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        ))}
        <label>
          Ordenação
          <select value={sort} onChange={(e) => param("ordem", e.target.value)}>
            <option value="">Seleção da loja</option>
            {products.some((p) => p.price !== null) && (
              <option value="preco">Menor preço</option>
            )}
            <option value="az">Nome A–Z</option>
            <option value="za">Nome Z–A</option>
          </select>
        </label>
      </div>
      <div className="results">
        {list.length} produto{list.length !== 1 ? "s" : ""}
        <button onClick={() => set({})}>Limpar filtros</button>
      </div>
      {list.length ? (
        <Cards list={list} />
      ) : (
        <p>
          Nenhum produto encontrado. Experimente outra busca ou limpe os
          filtros.
        </p>
      )}
      <p className="note">
        {b.deadline} Entrega e retirada sob consulta. Aceitamos Pix.
      </p>
    </main>
  );
}
export function Cards({ list }: { list: Product[] }) {
  let { add, quick } = useShop();
  return (
    <div className="cards">
      {list.map((p) => (
        <article key={p.id}>
          <div className="pimage">
            <Link to={"/produto/" + p.id}>
              <Photo p={p} />
            </Link>
            <button
              aria-label={"Visualizar " + p.name}
              onClick={() => quick(p)}
            >
              <Eye size={17} />
            </button>
          </div>
          <small>{p.cat}</small>
          <Link to={"/produto/" + p.id}>
            <h3>{p.name}</h3>
          </Link>
          <p>{p.desc}</p>
          <span>{price(p)}</span>
          <button className="textlink" onClick={() => add(p, 1, "")}>
            Adicionar à sacola <Plus size={15} />
          </button>
        </article>
      ))}
    </div>
  );
}
