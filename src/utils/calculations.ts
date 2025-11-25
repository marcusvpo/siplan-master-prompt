import { Project, ProjectStatus, HealthScore } from "@/types/project";

export function calculateHealthScore(project: Project): HealthScore {
  const now = new Date();
  const lastUpdate = new Date(project.updatedAt);
  
  const daysSince = Math.floor(
    (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const followUpVencido = project.nextFollowUpDate 
    && new Date(project.nextFollowUpDate) < now;

  const hasBlockers =
    project.stages.infra.status === ProjectStatus.BLOCKED ||
    project.stages.adherence.status === ProjectStatus.BLOCKED ||
    project.stages.environment.status === ProjectStatus.BLOCKED;

  if (followUpVencido || daysSince > 5) {
    return HealthScore.CRITICAL;
  }

  if ((daysSince >= 2 && daysSince <= 5) || hasBlockers) {
    return HealthScore.WARNING;
  }

  return HealthScore.OK;
}

export function getDaysSinceUpdate(project: Project): number {
  const now = new Date();
  const lastUpdate = new Date(project.updatedAt);
  return Math.floor(
    (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) {
    return `Há ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`;
  }
  if (diffHours < 24) {
    return `Há ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  }
  return `Há ${diffDays} dia${diffDays !== 1 ? 's' : ''}`;
}
