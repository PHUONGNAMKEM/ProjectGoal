import { Button, ColorPicker, Flex, Modal, notification, Popconfirm } from "antd";
import { useEffect, useState } from "react";

import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
import { Bomb, Pencil, X } from "lucide-react";
import { GoalLabel } from "../../../../types/GoalLabel";
import { TaskType } from "../../../../types/TaskType";
import { GoalType } from "../../../../types/GoalType";
import { deleteTypeofGoalAPI, updateTypeofGoalAPI } from "../../../../services/api.me.service";

interface TypeofGoalUpdateProps {
    isModalTypeofGoalUpdateOpen: boolean;
    setIsModalTypeofGoalUpdateOpen: (open: boolean) => void;
    typeofGoalData?: GoalLabel[];
    loadGoal: () => void;

    task?: TaskType | null;
    loadTask?: () => void;
    goal: GoalType;
}

const TypeofGoalUpdate = ({ isModalTypeofGoalUpdateOpen, setIsModalTypeofGoalUpdateOpen, task, typeofGoalData, goal, loadGoal }: TypeofGoalUpdateProps) => {

    const [nameType, setNameType] = useState<string | undefined>("");
    const [theme, setTheme] = useState<string | undefined>("");
    const [idTypeGoal, setIdTypeGoal] = useState<number>(0);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const resetAndCloseModalView = () => {
        setIsModalTypeofGoalUpdateOpen(false);
    };

    const resetAndCloseModalUpdate = () => {
        setIsModalUpdateOpen(false);
        loadGoal();
    };

    useEffect(() => {
        if (task) {
            setNameType(task?.title);
        }
    }, [task]);


    const handleUpdateTypeofGoal = async () => {
        if (!nameType || !nameType.trim()) {
            notification.error({
                message: "Missing Title",
                description: "Please fill in your Name Type",
            });
            return;
        };
        if (!theme || !theme.trim()) {
            notification.error({
                message: "Missing Title",
                description: "Please fill in your Name Type",
            });
            return;
        };

        try {
            const res = await updateTypeofGoalAPI(
                nameType,
                theme,
                idTypeGoal
            );

            if (res?.data) {
                resetAndCloseModalUpdate();
            }
        } catch (error: any) {
            notification.error({
                message: "Update TypeofGoal Failed",
                description: error?.response?.data?.message || "Unknown error",
            });
        }
    }

    const handleSetDataTypeofGoal = async (nameTypeVar: string, themeVar: string, idTypeGoal: number) => {
        setIsModalUpdateOpen(true);
        setNameType(nameTypeVar);
        setTheme(themeVar);
        setIdTypeGoal(idTypeGoal);
    }

    const handleDeleteTypeofGoal = async (idTypeGoal: number) => {
        try {
            const res = await deleteTypeofGoalAPI(idTypeGoal);

            if (res?.data) {
                resetAndCloseModalUpdate();
            }
        } catch (error: any) {
            notification.error({
                message: "Delete TypeofGoal Failed",
                description: error?.response?.data?.message || "Unknown error",
            });
        }
    }

    return (
        <>
            <Modal
                title={goal.title}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalTypeofGoalUpdateOpen}
                // onOk={() => resetAndCloseModalView()}
                onCancel={() => resetAndCloseModalView()}
                maskClosable={false}
                okText={"OK"}
                footer={[
                    <Button key="ok" type="primary" onClick={() => resetAndCloseModalView()}>
                        Ok
                    </Button>
                ]}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        {typeofGoalData!.map(type => {
                            return (
                                <Flex justify="space-between" gap={12} className="mb-1">
                                    <div
                                        onClick={() => setIsModalTypeofGoalUpdateOpen(true)}
                                        key={type.idTypeGoal}
                                        className="
                                        px-2 py-0.5 text-sm rounded border flex-1 
                                        [color:var(--primary)]
                                        [border-color:color-mix(in_oklch,var(--primary)_75%,white)]
                                        [background-color:color-mix(in_oklch,var(--primary)_12%,white)]
                                    "
                                        style={
                                            {
                                                '--primary': type?.theme || '#1677ff',
                                                fontWeight: 400,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <div className="flex justify-between">
                                            {
                                                type?.nameType
                                            }
                                            <X size={20} color="#737373" className="cursor-pointer"
                                                onClick={() => handleDeleteTypeofGoal(type?.idTypeGoal)}
                                            />
                                        </div>
                                    </div>

                                    <Pencil size={20} color="#737373" className="cursor-pointer"
                                        onClick={() => handleSetDataTypeofGoal(type?.nameType, type?.theme, type?.idTypeGoal)}
                                    />

                                </Flex>
                            );
                        })}
                    </div>
                </div>
            </Modal>

            <Modal
                title="Update Type"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUpdateOpen}
                onOk={() => handleUpdateTypeofGoal()}
                onCancel={() => resetAndCloseModalUpdate()}
                maskClosable={false}
                okText={"UPDATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Name Type</span>
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            value={nameType}
                            onChange={(e) => setNameType(e.target.value)}
                        // key={isModalTaskUpdateOpen.toString()}
                        >
                        </TextArea>
                    </div>
                    <div>
                        <span>Theme</span>
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        // key={isModalTaskUpdateOpen.toString()}
                        >
                        </TextArea>

                        <ColorPicker value={theme}
                            size="small"
                            onChange={(color) => {
                                const hex = color.toHexString();
                                setTheme(hex);
                            }}
                        />
                    </div>


                    <div>
                        <Popconfirm
                            title="Delete task"
                            description="Are you sure to delete this Task?"
                            okText="Yes"
                            cancelText="No"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                        // onConfirm={() => handleDeleteTask()}
                        >
                            <Button
                                danger
                                type="primary"
                                icon={<Bomb />}
                                iconPosition="end">
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default TypeofGoalUpdate;