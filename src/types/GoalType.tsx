import { GoalLabel } from "./GoalLabel";

export interface GoalType {
    idGoal: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    progress: number;
    isPublic: boolean;
    background: string;
    createdAt: string;
    updatedAt: string;
    idUser: number;
    typeofGoals: GoalLabel[];
}
