import { Project } from "@/types/project";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Rocket } from "lucide-react";
import { toast } from "sonner";

interface ImplementationCardProps {
  project: Project;
}

export const ImplementationCard = ({ project }: ImplementationCardProps) => {
  const stage = project.stages.implementation;

  const handleSave = () => {
    toast.success("Alterações salvas!");
  };

  return (
    <AccordionItem value="implementation">
      <Card>
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-semibold">Implantação (Instalação e Treinamento)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-4">
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
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data de Instalação Remota</Label>
                <Input type="date" />
              </div>

              <div>
                <Label>Tipo de Virada</Label>
                <Select defaultValue={stage.switchType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekend">Fim de Semana</SelectItem>
                    <SelectItem value="business-day">Dia Útil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Início do Treinamento</Label>
                <Input type="date" />
              </div>

              <div>
                <Label>Término do Treinamento</Label>
                <Input type="date" />
              </div>
            </div>

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
