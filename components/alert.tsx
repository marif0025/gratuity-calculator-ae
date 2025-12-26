import { Info, AlertTriangle, XCircle, Lightbulb, SigmaSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { AlertData } from "@/sanity/requests"
import { PortableTextComponent } from "./portable-text"

export type AlertVariant = "info" | "warning" | "error" | "tip"

interface AlertProps extends AlertData {
  className?: string
}

const variantConfig = {
  info: {
    icon: Info,
    containerClass: "bg-info/10 border-info/20",
    iconClass: "text-info",
    titleClass: "text-info-foreground",
    descriptionClass: "text-info-muted",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "bg-warning/10 border-warning/20",
    iconClass: "text-warning",
    titleClass: "text-warning-foreground",
    descriptionClass: "text-warning-muted",
  },
  error: {
    icon: XCircle,
    containerClass: "bg-error/10 border-error/20",
    iconClass: "text-error",
    titleClass: "text-error-foreground",
    descriptionClass: "text-error-muted",
  },
  tip: {
    icon: Lightbulb,
    containerClass: "bg-success/10 border-success/20",
    iconClass: "text-success",
    titleClass: "text-success-foreground",
    descriptionClass: "text-success-muted",
  },
  formula: {
    icon: SigmaSquare,
    containerClass: "bg-primary/10 border-primary/20",
    iconClass: "text-primary",
    titleClass: "text-primary-foreground",
    descriptionClass: "text-primary-muted",
  },
}

function resolveVariant(type: "info" | "warning" | "error" | "tip" | "formula") {
  return variantConfig[type]
}

export function Alert({ type, title, content, className }: AlertProps) {
  const config = resolveVariant(type)
  const Icon = config.icon

  return (
    <div className={cn("flex gap-4 rounded-xl border p-6 transition-all", config.containerClass, className)}>
      <div className="shrink-0">
        <Icon className={cn("size-6", config.iconClass)} strokeWidth={2} />
      </div>
      <article className={cn("flex-1 [&>p:last-child]:mb-0", config.descriptionClass)}>
        <h3 className={cn("text-lg font-semibold leading-tight mt-0!", config.titleClass)}>{title}</h3>
        <PortableTextComponent content={content} />
      </article>
    </div>
  )
}
