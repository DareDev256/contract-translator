import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import type { RiskLevel } from "@/lib/types";

const config = {
  low: {
    icon: ShieldCheck,
    color: "text-green-600 bg-green-100 dark:bg-green-900/30",
    label: "Low Risk",
  },
  medium: {
    icon: Shield,
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    label: "Medium Risk",
  },
  high: {
    icon: ShieldAlert,
    color: "text-red-600 bg-red-100 dark:bg-red-900/30",
    label: "High Risk",
  },
};

export function RiskBadge({
  level,
  size = "sm",
}: {
  level: RiskLevel;
  size?: "sm" | "lg";
}) {
  const { icon: Icon, color, label } = config[level];
  const sizeClass =
    size === "lg" ? "px-4 py-2 text-base gap-2" : "px-2.5 py-1 text-xs gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${color} ${sizeClass}`}
    >
      <Icon className={size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5"} />
      {label}
    </span>
  );
}
