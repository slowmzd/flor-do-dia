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
export function Modal({
  title,
  children,
  close,
  drawer = false,
}: {
  title: string;
  children: React.ReactNode;
  close: () => void;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    d.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      d.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={drawer ? "drawer" : "modal"}
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <section>
        <div className="modalhead">
          <h2>{title}</h2>
          <button aria-label="Fechar" onClick={close}>
            <X />
          </button>
        </div>
        {children}
      </section>
    </dialog>
  );
}
