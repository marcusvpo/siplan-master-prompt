import { HealthScore } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthBadgeProps {
  healthScore: HealthScore;
  daysSince: number;
}

export const HealthBadge = ({ healthScore, daysSince }: HealthBadgeProps) => {
  const getHealthConfig = () => {
    switch (healthScore) {
      case HealthScore.CRITICAL:
        return {
          icon: AlertCircle,
          label: "Crítico",
          variant: "critical" as const,
          tooltip: `Sem atualização há ${daysSince} dias`,
        };
      case HealthScore.WARNING:
        return {
          icon: AlertTriangle,
          label: "Atenção",
          variant: "warning" as const,
          tooltip: `Sem atualização há ${daysSince} dias`,
        };
      default:
        return {
          icon: CheckCircle2,
          label: "Em Dia",
          variant: "success" as const,
          tooltip: "Projeto atualizado recentemente",
        };
    }
  };

  const config = getHealthConfig();
  const Icon = config.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant={config.variant} className="gap-1">
            <Icon className="h-3 w-3" />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
