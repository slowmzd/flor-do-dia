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
import { business as b } from "./config/business";
import { products, categories, occasions, Product } from "./data/catalog";
import { type Line, useSaved, Shop } from "./store/Shop";
import { Modal } from "./components/Modal";
import { Header } from "./layouts/Header";
import { Home } from "./pages/Home";
import { Footer } from "./layouts/Footer";
import { Catalog } from "./pages/Catalog";
import { Detail, ProductPage, Missing } from "./pages/Detail";
import { Cart } from "./components/Cart";
import { Checkout } from "./pages/Checkout";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-600.css";
import "./styles/site.css";
function App() {
  let [lines, setLines] = useSaved<Line[]>("flordodia:sacola", []),
    [notes, Notes] = useSaved("flordodia:notas", ""),
    [mode, Mode] = useSaved("flordodia:modo", "Entrega"),
    [drawer, setDrawer] = useState(false),
    [quick, Q] = useState<Product | null>(null);
  const add = (p: Product, q: number, msg: string) => {
    setLines((ls) => {
      let i = ls.findIndex((l) => l.id === p.id && l.msg === msg);
      return i < 0
        ? [...ls, { id: p.id, q, msg }]
        : ls.map((l, j) => (i === j ? { ...l, q: l.q + q } : l));
    });
    Q(null);
    setDrawer(true);
  };
  return (
    <Shop.Provider
      value={{
        lines,
        setLines,
        notes,
        Notes,
        mode,
        Mode,
        setDrawer,
        add,
        quick: Q,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="/pedido" element={<Checkout />} />
        <Route
          path="/privacidade"
          element={
            <main className="wrap inner">
              <h1>Política de privacidade</h1>
              <p>
                A sacola, suas mensagens, observações e modalidade de
                recebimento ficam salvas neste navegador. Ao enviar o pedido, os
                dados informados são incluídos na conversa do WhatsApp com a
                Flor do Dia. Você pode apagar os dados locais nas configurações
                do navegador.
              </p>
              <a href={b.whatsapp}>Contato sobre privacidade</a>
            </main>
          }
        />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
      {drawer && <Cart />}
      {quick && (
        <Modal title="Visualização rápida" close={() => Q(null)}>
          <Detail p={quick} />
          <Link
            className="textlink"
            onClick={() => Q(null)}
            to={"/produto/" + quick.id}
          >
            Ver detalhes completos <ArrowRight />
          </Link>
        </Modal>
      )}
    </Shop.Provider>
  );
}
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
