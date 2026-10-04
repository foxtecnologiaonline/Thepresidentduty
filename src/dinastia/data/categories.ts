import type { EventCategory, EventCategoryMeta } from "../types";

export const CATEGORY_META: Record<EventCategory, EventCategoryMeta> = {
  fiscal: { key: "fiscal", label: "Fiscal", icon: "💰", color: "#c98500" },
  militar: { key: "militar", label: "Militar", icon: "⚔️", color: "#8a8f98" },
  religiao: { key: "religiao", label: "Religião", icon: "✝️", color: "#9085e9" },
  nobreza: { key: "nobreza", label: "Nobreza", icon: "🛡️", color: "#e66767" },
  colheita: { key: "colheita", label: "Colheita", icon: "🌾", color: "#199e70" },
  diplomacia: { key: "diplomacia", label: "Diplomacia", icon: "🏳️", color: "#40c4d0" },
  corte: { key: "corte", label: "Corte", icon: "👑", color: "#d95926" },
  povo: { key: "povo", label: "Povo", icon: "✊", color: "#e07fc0" },
};
