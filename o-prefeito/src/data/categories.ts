import type { EventCategory, EventCategoryMeta } from "../types";

export const CATEGORY_META: Record<EventCategory, EventCategoryMeta> = {
  orcamento: { key: "orcamento", label: "Orçamento", icon: "💰", color: "#4f9fd8" },
  mobilidade: { key: "mobilidade", label: "Mobilidade", icon: "🚧", color: "#40c4d0" },
  saneamento: { key: "saneamento", label: "Saneamento", icon: "🚰", color: "#52b788" },
  urbanismo: { key: "urbanismo", label: "Urbanismo", icon: "🏗️", color: "#e0b84f" },
  cultura: { key: "cultura", label: "Cultura", icon: "🎭", color: "#c77dff" },
  institucional: { key: "institucional", label: "Institucional", icon: "🏛️", color: "#e0686f" },
  judicial: { key: "judicial", label: "Judicial", icon: "⚖️", color: "#9085e9" },
  social: { key: "social", label: "Social", icon: "✊", color: "#e07fc0" },
};
