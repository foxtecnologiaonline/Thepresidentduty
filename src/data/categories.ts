import type { EventCategory, EventCategoryMeta } from "../types";

export const CATEGORY_META: Record<EventCategory, EventCategoryMeta> = {
  financeiro: { key: "financeiro", label: "Financeiro", icon: "💰", color: "#4f9fd8" },
  seguranca: { key: "seguranca", label: "Segurança & Dados", icon: "🛡️", color: "#e0686f" },
  produtos: { key: "produtos", label: "Produtos", icon: "📱", color: "#f2a65a" },
  pessoas: { key: "pessoas", label: "Pessoas & Cultura", icon: "👥", color: "#c77dff" },
  sustentabilidade: { key: "sustentabilidade", label: "Sustentabilidade", icon: "🌱", color: "#52b788" },
  mercado: { key: "mercado", label: "Mercado", icon: "🌐", color: "#40c4d0" },
  institucional: { key: "institucional", label: "Institucional", icon: "🏛️", color: "#e0b84f" },
  social: { key: "social", label: "Social", icon: "📣", color: "#e07fc0" },
};
