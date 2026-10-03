import type { EventCategory, EventCategoryMeta } from "../types";

export const CATEGORY_META: Record<EventCategory, EventCategoryMeta> = {
  orcamento: { key: "orcamento", label: "Orçamento", icon: "💰", color: "#4f9fd8" },
  seguranca: { key: "seguranca", label: "Segurança", icon: "🛡️", color: "#e0686f" },
  saude: { key: "saude", label: "Saúde", icon: "🏥", color: "#f2a65a" },
  educacao: { key: "educacao", label: "Educação", icon: "🎓", color: "#c77dff" },
  mobilidade: { key: "mobilidade", label: "Mobilidade", icon: "🚧", color: "#40c4d0" },
  ambiental: { key: "ambiental", label: "Ambiental", icon: "🌱", color: "#52b788" },
  institucional: { key: "institucional", label: "Institucional", icon: "🏛️", color: "#e0b84f" },
  social: { key: "social", label: "Social", icon: "✊", color: "#e07fc0" },
};
