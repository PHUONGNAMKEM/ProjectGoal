import { ColorPicker, Dropdown, Flex, MenuProps, notification, Popconfirm, Progress, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import './goalComponent.scss';
import { Link } from "react-router-dom";
import { GoalType } from "../../../types/GoalType";
import dayjs from "dayjs";
import { DashOutlined, SettingOutlined } from "@ant-design/icons";
import { deleteGoalAPI } from "../../../services/api.me.service";
import GoalUpdate from "../goalUpdate/goalUpdate";
import { GoalLabel } from "../../../types/GoalLabel";
import DOMPurify from 'dompurify';
import TypeOfGoal from "../typeofGoal/typeofGoal";
import ButtonAddNewTypeofGoal from "../typeofGoal/typeofGoalAdd/buttonAddNewTypeofGoal";

interface GoalProps {
    goalData: GoalType;
    loadGoal: () => void;
    typeofGoalData: GoalLabel[];
}

const Goal = ({ goalData, loadGoal, typeofGoalData }: GoalProps) => {

    const [colorHex, setColorHex] = useState('#1677ff');
    const [bookMark, setBookMark] = useState(false);

    const handleToggle = () => {
        setBookMark(prev => !prev);
    }
    console.log(">>> check typeofGoalData: ", typeofGoalData);

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

    // Theme of Table: TypeofGoal
    // const typeThemeGoal = typeofGoalData.find(type => type.idGoal === goalData.idGoal);

    useEffect(() => {

    }, [goalData])

    return (
        <div className="goal-card" style={{ ['--color-hex' as string]: colorHex, }}>
            <div className="goal-card-content" style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
            }}>
                <div className="goal-card-content-top h-[48px]" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to={`/goal/${goalData.idGoal}/tasks/`} className="goal-card-title"
                        style={{
                            fontSize: "20px",
                            lineHeight: "24px",
                            fontWeight: "500",
                            color: "rgba(70, 69, 60, 1)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}>{goalData.title}</Link>
                    <Dropdown menu={{ items }} placement="topRight">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <DashOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                {/* <TextArea
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
                /> */}
                <div
                    style={{
                        color: "#aab6c7",
                        padding: 0,
                        margin: 0,
                        outline: 'none',
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: '1.5em',
                        maxHeight: '3em',
                        height: "42px",
                        marginBottom: "8px"
                    }}
                    // dangerouslySetInnerHTML={{ __html: goalData.description }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(goalData.description) }}
                />


                {/* <Flex gap="4px 0" wrap style={{ marginBottom: "6px" }}>
                    <Tag color="red">red</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="purple">purple</Tag>
                </Flex> */}


                {/* <Flex gap="4px 0" wrap style={{ marginBottom: "14px" }}>
                    {typeofGoalData && typeofGoalData.length > 0 ? (
                        typeofGoalData.slice(0, 4).map(type => {
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
                </Flex> */}

                <div className="flex items-center mb-3.5">

                    <TypeOfGoal
                        maxItem={4}
                        typeofGoalData={typeofGoalData}
                        goal={goalData}
                        loadGoal={loadGoal}
                    />

                    <div className="text-xl">
                        <ButtonAddNewTypeofGoal
                            idGoal={goalData.idGoal}
                            goalData={goalData}
                            loadGoal={loadGoal}
                        />
                    </div>
                </div>

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
                        <HiOutlineBookmark style={{ fontSize: 26, color: "rgb(169, 168, 168)" }} onClick={() => {
                            handleToggle()
                        }} />
                    )
                        :
                        (
                            <HiOutlineBookmark
                                onClick={() => handleToggle()}
                                style={{ fontSize: 26, color: "rgba(246, 210, 7, 1)", fill: "orange", cursor: 'pointer' }}
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
                    {
                        goalData.progress === 100 ? <div style={{ display: "flex", alignItems: "center" }}>Goal Done! <img src="/images/firework.png" alt="" style={{ maxWidth: "20px", marginLeft: "4px" }} /> </div> : remainingDays > 0
                            ? `${remainingDays} days left`
                            : remainingDays === 0
                                ? "Deadline is coming soon!"
                                : "Deadline passed"
                    }
                </p></div>
            </div>
            {
                selectedGoal && (
                    <GoalUpdate
                        isModalOpen={isUpdateOpen}
                        setIsModalOpen={setIsUpdateOpen}
                        goal={selectedGoal}
                        loadGoal={loadGoal}
                        typeofGoalData={typeofGoalData}
                    />
                )
            }
        </div >
    )
}

export default Goal;