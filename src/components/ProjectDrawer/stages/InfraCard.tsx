import { Project, ProjectStatus } from "@/types/project";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Save, Server } from "lucide-react";
import { toast } from "sonner";
import { useProjectStore } from "@/stores/projectStore";

interface InfraCardProps {
  project: Project;
}

export const InfraCard = ({ project }: InfraCardProps) => {
  const { updateProject } = useProjectStore();
  const stage = project.stages.infra;
  const isBlocked = stage.status === ProjectStatus.BLOCKED;

  const handleSave = () => {
    toast.success("Alterações salvas!");
  };

  return (
    <AccordionItem value="infra">
      <Card className={cn("overflow-hidden", isBlocked && "border-l-4 border-l-critical")}>
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-primary" />
            <span className="font-semibold">Análise de Infraestrutura</span>
            <span className="text-xs text-muted-foreground">
              {stage.status === ProjectStatus.DONE && "✓ Finalizado"}
              {stage.status === ProjectStatus.IN_PROGRESS && "→ Em Andamento"}
              {stage.status === ProjectStatus.BLOCKED && "⚠ Bloqueado"}
              {stage.status === ProjectStatus.TODO && "○ Aguardando"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select defaultValue={stage.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Não Iniciado</SelectItem>
                    <SelectItem value="in-progress">Em Andamento</SelectItem>
                    <SelectItem value="done">Finalizado</SelectItem>
                    <SelectItem value="blocked">Reprovado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Responsável</Label>
                <Select defaultValue={stage.responsible}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user-joao">João Infra</SelectItem>
                    <SelectItem value="user-alex">Alex Silva</SelectItem>
                    <SelectItem value="user-maria">Maria Conversão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isBlocked && (
              <div>
                <Label>Motivo do Bloqueio</Label>
                <Select defaultValue={stage.blockingReason}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aguardando Compra de Servidor">
                      Aguardando Compra de Servidor
                    </SelectItem>
                    <SelectItem value="Upgrade SO Necessário">
                      Upgrade SO Necessário
                    </SelectItem>
                    <SelectItem value="Rede Instável">Rede Instável</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Observações</Label>
              <Textarea
                placeholder="Adicione observações..."
                defaultValue={stage.observations}
                rows={3}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};
