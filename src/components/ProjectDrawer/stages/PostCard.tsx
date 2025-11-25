import { Project } from "@/types/project";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface PostCardProps {
  project: Project;
}

export const PostCard = ({ project }: PostCardProps) => {
  const stage = project.stages.post;

  const handleSave = () => {
    toast.success("Alterações salvas!");
  };

  return (
    <AccordionItem value="post">
      <Card>
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="font-semibold">Pós-Implantação</span>
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
