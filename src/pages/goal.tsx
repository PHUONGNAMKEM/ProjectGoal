
import { Button, Col, notification, Row } from "antd";
import Goal from "../components/goal/goalComponent/goalComponent";
import { useEffect, useState } from "react";
import { createGoalAPI, fetchGoalAPI, getTypeofGoalAPI } from "../services/api.me.service";
import { GoalType } from "../types/GoalType";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import GoalAdd from "../components/goal/goalAdd/goalAdd";
import { GoalLabel } from "../types/GoalLabel";


const GoalPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [goalData, setGoalData] = useState<GoalType[]>([]);
    const [typeofGoalData, setTypeofGoalData] = useState<GoalLabel[]>([]);

    const loadGoal = async () => {
        const res = await fetchGoalAPI();
        if (res.data) {
            setGoalData(res.data);
        }
        console.log(">>> check goal", res)
    }

    const loadTypeofGoal = async () => {
        const res = await getTypeofGoalAPI(1);
        if (res.data) {
            setTypeofGoalData(res.data);
            console.log("Type of goal in: ", typeofGoalData);
        }
    }

    useEffect(() => {
        loadGoal();
        loadTypeofGoal();
    }, [])

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div></div>
                <div>
                    <Button onClick={() => setIsModalOpen(true)} type="primary" icon={<PlusCircleOutlined />} iconPosition="end">
                        Add
                    </Button>
                    <GoalAdd
                        goalData={goalData}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        loadGoal={loadGoal}
                    />
                </div>
            </div>
            <Row gutter={[16, 16]}>
                {/* <Col xs={24} sm={12} md={8} lg={6}><Goal goalData={goalData} /></Col> */}
                {goalData.map((goal) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={goal.idGoal}>
                        <Goal goalData={goal} loadGoal={loadGoal} typeofGoalData={typeofGoalData} />
                    </Col>
                ))}

                {/* <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><Goal /></Col> */}
            </Row>
        </>
    )
}

export default GoalPage;