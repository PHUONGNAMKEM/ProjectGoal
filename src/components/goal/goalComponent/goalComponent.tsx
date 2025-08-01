import { Button, ColorPicker, Dropdown, Flex, MenuProps, notification, Popconfirm, Progress, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import './goalComponent.scss';
import { Link } from "react-router-dom";
import { GoalType } from "../../../types/GoalType";
import dayjs from "dayjs";
import { DashOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";
import { deleteGoalAPI } from "../../../services/api.me.service";
import CreateBookUncontrolled from "../../book/create.book.form.uncontrolled";
import GoalUpdate from "../goalUpdate/goalUpdate";
import TextArea from "antd/es/input/TextArea";

interface GoalProps {
    goalData: GoalType;
    loadGoal: () => void;
}

const Goal = ({ goalData, loadGoal }: GoalProps) => {

    const [colorHex, setColorHex] = useState('#1677ff');
    const [bookMark, setBookMark] = useState(false);

    console.log(">>> check goalData", goalData);

    const goalId = 1;

    const handleToggle = () => {
        setBookMark(prev => !prev);
    }

    const end = dayjs(goalData.endDate);
    const now = dayjs();
    const remainingDays = end.diff(now, "day");

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Options',
            icon: <SettingOutlined />,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Popconfirm
                title="Delete the goal"
                description="Are you sure to delete this goal?"
                okText="Yes"
                cancelText="No"
                onConfirm={
                    () => handleDeleteGoal(goalData.idGoal)
                }
            >
                Delete
            </Popconfirm>,
        },
        {
            key: '3',
            label: <p
                onClick={() => {
                    setSelectedGoal(goalData);
                    setIsUpdateOpen(true);
                }}
            >
                Update
            </p>
        },
        {
            key: '4',
            label: 'Detail',
        },
    ];

    const handleDeleteGoal = async (id: number) => {
        const res = await deleteGoalAPI(id);
        if (res.data) {
            notification.success(
                {
                    message: "Delete A New Goal",
                    description: "Delete successfully",
                    duration: 3,
                    showProgress: true,
                }
            )
            loadGoal();
        }
        else {
            notification.error(
                {
                    message: "Error Delete A New Goal Failed",
                    description: JSON.stringify(res.data.message),
                    duration: 3,
                    showProgress: true,
                }
            )
        }
    }

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null);

    useEffect(() => {

    }, [goalData])

    return (
        <div className="goal-card" style={{ ['--color-hex' as string]: colorHex, }}>
            <div className="goal-card-content">
                <div className="goal-card-content-top" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to={`/goal/${goalId}`} className="goal-card-title" style={{ fontSize: "20px", fontWeight: "500", marginBottom: "6px", color: "rgba(70, 69, 60, 1)" }}>{goalData.title}</Link>
                    <Dropdown menu={{ items }} placement="topRight">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <DashOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <TextArea
                    autoSize={{ maxRows: 2 }}
                    readOnly
                    spellCheck={false}
                    style={{
                        color: "#aab6c7",
                        border: "none",
                        padding: 0,
                        margin: 0,
                        outline: 'none',
                        boxShadow: 'none',
                        caretColor: 'transparent'
                    }}
                    value={goalData.description}
                />
                <div className="gap10" style={{ height: "10px" }}></div>

                <Flex gap="4px 0" wrap style={{ marginBottom: "14px" }}>
                    <Tag color="red">red</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="purple">purple</Tag>
                </Flex>

                {/* <p>IN PROGRESS</p> */}
                {/* <Flex align="center" gap="small">
                    <Progress
                        type="circle"
                        trailColor="#e6f4ff"
                        percent={90}
                        strokeWidth={20}
                        size={14}
                        format={(number) => `Time left${number}%`}
                    />
                    <span>Time left</span>
                </Flex> */}
                <Flex gap="4px 0" wrap style={{ marginBottom: "14px" }}>
                    <Progress percent={goalData.progress} percentPosition={{ align: 'start', type: 'outer' }} />
                </Flex>
            </div>
            <div className="goal-card-bottom" style={{
                borderTop: "1px solid #ccc",
                width: "calc(100% + 20px)",
                marginLeft: "-10px",
                height: "2rem",
                padding: "10px 10px 0 10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div className="goal-card-bottom-left" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                    {!bookMark ? (
                        <HiOutlineBookmark style={{ fontSize: 30, color: "rgb(169, 168, 168)" }} onClick={() => {
                            handleToggle()
                        }} />
                    )
                        :
                        (
                            <HiOutlineBookmark
                                onClick={() => handleToggle()}
                                style={{ fontSize: 30, color: "rgba(246, 210, 7, 1)", fill: "orange", cursor: 'pointer' }}
                            />

                        )
                    }
                    <ColorPicker value={colorHex}
                        size="small"
                        onChange={(color) => {
                            const hex = color.toHexString();
                            setColorHex(hex);
                        }}
                    />
                </div>

                <div> <p style={{ color: "rgba(70, 69, 60, 1)", fontWeight: "500" }}>
                    {remainingDays > 0
                        ? `${remainingDays} days left`
                        : remainingDays === 0
                            ? "Deadline in Today, coming soon!"
                            : "Deadline passed"}
                </p></div>
            </div>
            {
                selectedGoal && (
                    <GoalUpdate
                        isModalOpen={isUpdateOpen}
                        setIsModalOpen={setIsUpdateOpen}
                        goal={selectedGoal}
                        loadGoal={loadGoal}
                    />
                )
            }
        </div>


    )
}

export default Goal;