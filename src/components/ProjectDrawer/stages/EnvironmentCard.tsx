import { Project } from "@/types/project";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Cloud } from "lucide-react";
import { toast } from "sonner";

interface EnvironmentCardProps {
  project: Project;
}

export const EnvironmentCard = ({ project }: EnvironmentCardProps) => {
  const stage = project.stages.environment;

  const handleSave = () => {
    toast.success("Alterações salvas!");
  };

  return (
    <AccordionItem value="environment">
      <Card>
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <Cloud className="h-5 w-5 text-primary" />
            <span className="font-semibold">Criação/Configuração de Ambiente</span>
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
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sistema Operacional</Label>
                <Select defaultValue={stage.osVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Windows 2016">Windows 2016</SelectItem>
                    <SelectItem value="Windows 2019">Windows 2019</SelectItem>
                    <SelectItem value="Windows 2022">Windows 2022</SelectItem>
                    <SelectItem value="Linux">Linux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <Checkbox id="infra-approved" defaultChecked={stage.approvedByInfra} />
              <label
                htmlFor="infra-approved"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aprovado pela Infraestrutura
              </label>
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
