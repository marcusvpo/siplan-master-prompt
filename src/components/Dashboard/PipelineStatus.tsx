import { Project, ProjectStatus } from "@/types/project";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PipelineStatusProps {
  project: Project;
}

export const PipelineStatus = ({ project }: PipelineStatusProps) => {
  const stages = [
    { key: "infra", label: "Infra", status: project.stages.infra.status },
    { key: "adherence", label: "Aderência", status: project.stages.adherence.status },
    { key: "environment", label: "Ambiente", status: project.stages.environment.status },
    { key: "conversion", label: "Conversão", status: project.stages.conversion.status },
    { key: "implementation", label: "Implantação", status: project.stages.implementation.status },
    { key: "post", label: "Pós", status: project.stages.post.status },
  ];

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.DONE:
        return "bg-success";
      case ProjectStatus.IN_PROGRESS:
        return "bg-warning";
      case ProjectStatus.BLOCKED:
        return "bg-critical";
      default:
        return "bg-muted";
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.DONE:
        return "Finalizado";
      case ProjectStatus.IN_PROGRESS:
        return "Em Andamento";
      case ProjectStatus.BLOCKED:
        return "Bloqueado";
      default:
        return "Aguardando";
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {stages.map((stage) => (
        <TooltipProvider key={stage.key}>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  getStatusColor(stage.status)
                )}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{stage.label}</p>
              <p className="text-xs">{getStatusLabel(stage.status)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
