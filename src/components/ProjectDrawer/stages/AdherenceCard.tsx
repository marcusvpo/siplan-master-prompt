import { Project, ProjectStatus } from "@/types/project";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Save, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface AdherenceCardProps {
  project: Project;
}

export const AdherenceCard = ({ project }: AdherenceCardProps) => {
  const stage = project.stages.adherence;
  const [hasGap, setHasGap] = useState(stage.hasProductGap);

  const handleSave = () => {
    toast.success("Alterações salvas!");
  };

  return (
    <AccordionItem value="adherence">
      <Card className={cn("overflow-hidden", hasGap && "border-l-4 border-l-warning")}>
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <CheckSquare className="h-5 w-5 text-primary" />
            <span className="font-semibold">Análise de Aderência</span>
            <span className="text-xs text-muted-foreground">
              {stage.status === ProjectStatus.DONE && "✓ Finalizado"}
              {stage.status === ProjectStatus.IN_PROGRESS && "→ Em Andamento"}
              {stage.status === ProjectStatus.BLOCKED && "⚠ Impedimento"}
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
                    <SelectItem value="blocked">Impedimento</SelectItem>
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
                    <SelectItem value="user-alex">Alex Silva</SelectItem>
                    <SelectItem value="user-joao">João Infra</SelectItem>
                    <SelectItem value="user-maria">Maria Conversão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="product-gap" className="cursor-pointer">
                Pendência de Produto?
              </Label>
              <Switch
                id="product-gap"
                checked={hasGap}
                onCheckedChange={setHasGap}
              />
            </div>

            {hasGap && (
              <div className="space-y-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                <div>
                  <Label>Ticket Dev</Label>
                  <Input placeholder="DEV-1234" defaultValue={stage.devTicket} />
                </div>
                <div>
                  <Label>Prazo Estimado Dev</Label>
                  <Input type="date" />
                </div>
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
