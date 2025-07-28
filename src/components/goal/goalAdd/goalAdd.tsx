import { Button, ColorPicker, DatePicker, Dropdown, Flex, Input, InputNumber, MenuProps, Modal, notification, Popconfirm, Progress, Radio, Select, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import './goalAdd.scss';
import { Link } from "react-router-dom";
import { GoalType } from "../../../types/GoalType";
import dayjs, { Dayjs, extend } from "dayjs";
import { DashOutlined, SettingOutlined } from "@ant-design/icons";
import { createGoalAPI, deleteGoalAPI } from "../../../services/api.me.service";
import TextArea from "antd/es/input/TextArea";

// interface GoalProps {
//     goalData: GoalType;
//     loadGoal: () => void;
// }
interface GoalAddProps {
    goalData: GoalType[];
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    loadGoal: () => void;
}

const GoalAdd = ({ goalData, isModalOpen, setIsModalOpen, loadGoal }: GoalAddProps) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(); //dayjs().add(3, "day") nếu muốn set mặc định 3 ngày sau start date
    const [isPublic, setIsPublic] = useState<boolean | null>(null);

    const handleChange = (e: any) => {
        setIsPublic(e.target.value);
        console.log("Đã chọn: ", e.target.value ? "Public" : "No Public");
    };

    useEffect(() => {

    }, [goalData])

    const handleCreateGoal = async () => {
        if (!title || !description || !startDate || !endDate) {
            notification.error({
                message: "Missing fields",
                description: "Please fill in all required fields.",
            });
            return;
        }

        try {
            const res = await createGoalAPI(
                title,
                description,
                startDate.toISOString(),
                endDate.toISOString(),
                isPublic
            );

            if (res?.data) {
                notification.success({
                    message: "Goal created successfully",
                });
                resetAndCloseModal();
            }
        } catch (error: any) {
            notification.error({
                message: "Create Goal Failed",
                description: error?.response?.data?.message || "Unknown error",
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        setStartDate(dayjs());
        setEndDate(dayjs().add(3, "day"));
        setIsPublic(false);
        loadGoal();
    };

    return (
        <div className="user-form" style={{ margin: "10px 0", }}>
            <Modal
                title="Create Goal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleCreateGoal()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Title</span>
                        <Input
                            placeholder="Enter Title of your Goal"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div>
                        <span>Description</span>
                        <TextArea
                            placeholder="Describe for your Stunning Goal"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Start Date</span>
                        <DatePicker value={startDate} onChange={(date) => setStartDate(date)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <span>End Date</span>
                        <DatePicker value={endDate} onChange={(date) => setEndDate(date)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <div style={{ width: "100%" }}>
                            <Radio.Group onChange={handleChange} value={isPublic}>
                                <Radio value={true}>Public</Radio>
                                <Radio value={false}>No Public</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default GoalAdd;