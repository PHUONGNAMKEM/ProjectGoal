import { Flex } from "antd";
import { GoalLabel } from "../../../types/GoalLabel";
import { generate } from "@ant-design/colors";
import { CircleFadingPlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonAddNewTypeofGoal from "./buttonAddNewTypeofGoal";

interface TypeOfGoalProps {
    idGoal?: number;
    maxItem?: number;
    typeofGoalData: GoalLabel[];
}

const TypeOfGoal = ({ idGoal, typeofGoalData, maxItem = typeofGoalData.length }: TypeOfGoalProps) => {
    let amountTypeofGoal = typeofGoalData.length;

    return (
        <Flex gap="4px 0" wrap align="center"
            style={{
                marginBottom: "14px",
                height: "56px",
            }}>
            {typeofGoalData && typeofGoalData.length > 0 ? (
                typeofGoalData.slice(0, maxItem).map(type => {

                    const palette = generate(type?.theme || '#0958d9');
                    return (
                        // Way 1
                        // <div className="p-1 text-sm border rounded"
                        //     style={{
                        //         color: palette[5],
                        //         borderColor: palette[3],
                        //         backgroundColor: palette[1],
                        //     }}

                        // Way 2
                        <div
                            key={type.idTypeGoal}
                            className="
                                        px-2 py-0.5 text-sm rounded border
                                        [color:var(--primary)]
                                        [border-color:color-mix(in_oklch,var(--primary)_35%,white)]
                                        [background-color:color-mix(in_oklch,var(--primary)_12%,white)]
                                    "
                            style={
                                {
                                    '--primary': type?.theme || '#1677ff',
                                    fontWeight: 400,
                                } as React.CSSProperties
                            }
                        >
                            {
                                type?.nameType
                            }
                        </div>
                    );
                })
            ) : <div className="p-1 text-sm rounded border text-[#0958d9] border-[#91caff] bg-[#e6f4ff]">No type</div>
            }
            {
                (amountTypeofGoal > maxItem) ?
                    <div className="flex items-center w-6 h-6 p-1 bg-amber-200 rounded-3xl">
                        <span className="text-xs font-medium text-gray-500">{amountTypeofGoal - maxItem}</span>
                        <Plus color="#858585" size={"13px"} style={{}} />
                    </div>
                    :
                    <></>
            }
        </Flex>
    );
}

export default TypeOfGoal;