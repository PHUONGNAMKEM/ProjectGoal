import { CircleFadingPlus } from "lucide-react";
import { createTypeofGoalAPI } from "../../../../services/api.me.service";
import { useState } from "react";
import TypeofGoalAdd from "./typeofGoalAdd";
import { GoalType } from "../../../../types/GoalType";


interface ButtonAddNewTypeofGoalProps {
    idGoal: number;
    goalData: GoalType;
    loadGoal: () => void;
}

const ButtonAddNewTypeofGoal = ({ idGoal, goalData, loadGoal }: ButtonAddNewTypeofGoalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <CircleFadingPlus color="#858585" size={"20px"} style={{ marginLeft: "10px", cursor: "pointer" }}

                onClick={() => setIsModalOpen(true)}
            />

            <TypeofGoalAdd
                idGoal={idGoal}
                goalData={goalData}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadGoal={loadGoal}
            />
        </>
    );
}

export default ButtonAddNewTypeofGoal;