import { useProjectStore } from "@/stores/projectStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimelinePanel } from "./TimelinePanel";
import { StageCards } from "./StageCards";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProjectDrawer = () => {
  const { selectedProject, setSelectedProject } = useProjectStore();

  if (!selectedProject) return null;

  return (
    <Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
      <SheetContent side="right" className="w-full sm:max-w-[85vw] p-0">
        <div className="flex h-full">
          <div className="flex-[7] border-r">
            <SheetHeader className="sticky top-0 z-10 bg-card border-b px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <SheetTitle className="text-xl">{selectedProject.clientName}</SheetTitle>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span>{selectedProject.systemType}</span>
                    <span>•</span>
                    <span className="font-mono">#{selectedProject.ticketNumber}</span>
                    <span>•</span>
                    <span>Líder: Bruno Fernandes</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-6">
                <StageCards project={selectedProject} />
              </div>
            </ScrollArea>
          </div>

          <div className="flex-[3]">
            <TimelinePanel project={selectedProject} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
