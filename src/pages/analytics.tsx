import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import { useEffect, useState } from "react";
import { GoalType } from "../types/GoalType";
import { GoalLabel } from "../types/GoalLabel";
import { fetchGoalAPI, getTypeofGoalAPI } from "../services/api.me.service";
import ButtonAddNewGoal from "../components/layout/buttonAddNewGoal/buttonAddNewGoal";
import { Link } from "react-router-dom";

const Analytics = () => {
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
            <h1>Analytics Page</h1>
            <Timeline
                mode="alternate"
                items={[
                    {
                        children: <><p>Create a new Goal</p> <ButtonAddNewGoal goalData={goalData} loadGoal={loadGoal} /></>,
                    },
                    {
                        children: <>
                            {/* <Link to={`/goal/${goalData[0].idGoal}/tasks/`} className="goal-card-title"
                            style={{
                                fontSize: "20px",
                                lineHeight: "24px",
                                fontWeight: "500",
                                marginBottom: "6px",
                                color: "rgba(70, 69, 60, 1)",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>{goalData.title}</Link> */}

                            <p>Create your first list of a task</p>
                        </>,
                        color: 'green',
                    },
                    {
                        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                        children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                    },
                    {
                        color: 'red',
                        children: 'Network problems being solved 2015-09-01',
                    },
                    {
                        children: 'Create a services site 2015-09-01',
                    },
                    {
                        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                        children: 'Technical testing 2015-09-01',
                    },
                ]}
            />
        </>
    );
}

export default Analytics;
