
import { Button, Col, notification, Row } from "antd";
import Goal from "../components/goal/goalComponent/goalComponent";
import { useContext, useEffect, useState } from "react";
import { createGoalAPI, fetchGoalAPI, getAllTypeofGoal, getTypeofGoalByIdAPI } from "../services/api.me.service";
import { GoalType } from "../types/GoalType";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import GoalAdd from "../components/goal/goalAdd/goalAdd";
import { GoalLabel } from "../types/GoalLabel";
import ButtonAddNewGoal from "../components/layout/buttonAddNewGoal/buttonAddNewGoal";
import { AuthContext } from "../components/context/auth.context";


const GoalPage = () => {

    const [goalData, setGoalData] = useState<GoalType[]>([]);
    // const [typeofGoalData, setTypeofGoalData] = useState<GoalLabel[]>([]);

    const loadGoal = async () => {
        const res = await fetchGoalAPI();
        if (res.data) {
            setGoalData(res.data);
        }
        console.log(">>> check goal", res)
    }

    // const loadTypeofGoal = async () => {
    //     const res = await getAllTypeofGoal();
    //     if (res.data) {
    //         setTypeofGoalData(res.data);
    //         console.log("Type of goal in: ", typeofGoalData);
    //     }
    // }

    useEffect(() => {
        loadGoal();
        // loadTypeofGoal();
    }, [])

    console.log(">>> check goal data: ", goalData);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div></div>
                <div>
                    <ButtonAddNewGoal goalData={goalData} loadGoal={loadGoal} />
                </div>
            </div>
            <Row gutter={[16, 16]}>
                {goalData.map((goal) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={goal.idGoal}>
                        <Goal goalData={goal} loadGoal={loadGoal} typeofGoalData={goal.typeofGoals} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default GoalPage;