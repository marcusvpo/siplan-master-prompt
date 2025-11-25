import { Project } from "@/types/project";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, RefreshCw, Zap, Clock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ConversionCardProps {
  project: Project;
}

export const ConversionCard = ({ project }: ConversionCardProps) => {
  const stage = project.stages.conversion;
  const [sourceSystem, setSourceSystem] = useState(stage.sourceSystem);

  const handleSave = () => {
    toast.success("Alterações salvas!");
  };

  const isKnownSystem = sourceSystem === "Siplan" || sourceSystem === "Control-M";

  return (
    <AccordionItem value="conversion">
      <Card>
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 text-primary" />
            <span className="font-semibold">Conversão de Dados</span>
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
                    <SelectItem value="in-progress">Análise</SelectItem>
                    <SelectItem value="blocked">Desenvolvendo Conversor</SelectItem>
                    <SelectItem value="done">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sistema de Origem</Label>
                <Select
                  defaultValue={sourceSystem}
                  onValueChange={(value: any) => setSourceSystem(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Siplan">Siplan</SelectItem>
                    <SelectItem value="Control-M">Control-M</SelectItem>
                    <SelectItem value="Argon">Argon</SelectItem>
                    <SelectItem value="Alkasoft">Alkasoft</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isKnownSystem ? (
              <Alert className="bg-success/10 border-success/20">
                <Zap className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Conversão esperada em 2-3 dias (sistema conhecido)
                </AlertDescription>
              </Alert>
            ) : sourceSystem === "other" ? (
              <Alert className="bg-warning/10 border-warning/20">
                <Clock className="h-4 w-4 text-warning" />
                <AlertDescription className="text-warning">
                  Conversão pode levar 1-2 meses (novo sistema, requer desenvolvimento de motor)
                </AlertDescription>
              </Alert>
            ) : null}

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
