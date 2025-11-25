export enum ProjectStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
  BLOCKED = "blocked",
}

export enum SystemType {
  ORION_PRO = "Orion PRO",
  ORION_TN = "Orion TN",
  ORION_REG = "Orion REG",
}

export enum HealthScore {
  OK = "ok",
  WARNING = "warning",
  CRITICAL = "critical",
}

export enum UserRole {
  ADMIN = "admin",
  ANALYST = "analyst",
  VIEWER = "viewer",
}

export interface Stage {
  status: ProjectStatus;
  responsible: string;
  startDate?: Date;
  endDate?: Date;
  observations?: string;
}

export interface InfraStage extends Stage {
  blockingReason?: string;
}

export interface AdherenceStage extends Stage {
  hasProductGap: boolean;
  devTicket?: string;
  devEstimatedDate?: Date;
}

export interface EnvironmentStage extends Stage {
  realDate?: Date;
  osVersion?: string;
  approvedByInfra: boolean;
}

export interface ConversionStage extends Stage {
  sourceSystem?: "Siplan" | "Control-M" | "Argon" | "Alkasoft" | "other";
}

export interface ImplementationStage extends Stage {
  remoteInstallDate?: Date;
  trainingStartDate?: Date;
  trainingEndDate?: Date;
  switchType?: "weekend" | "business-day";
}

export interface PostStage extends Stage {}

export interface TimelineEvent {
  id: string;
  type: "auto" | "comment";
  author: string;
  message: string;
  timestamp: Date;
  metadata?: {
    field?: string;
    oldValue?: any;
    newValue?: any;
  };
}

export interface Project {
  id: string;
  clientName: string;
  ticketNumber: string;
  systemType: SystemType;
  projectLeader: string;
  createdAt: Date;
  updatedAt: Date;
  lastUpdateBy: string;
  nextFollowUpDate?: Date;
  
  healthScore?: HealthScore;
  daysSinceUpdate?: number;

  stages: {
    infra: InfraStage;
    adherence: AdherenceStage;
    environment: EnvironmentStage;
    conversion: ConversionStage;
    implementation: ImplementationStage;
    post: PostStage;
  };

  timeline: TimelineEvent[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}
