import { DatePicker, GetProp, Image, Input, Modal, notification, Radio, Upload, UploadFile, } from "antd";
import { useEffect, useState } from "react";
import './goalUpdate.scss';
import { GoalType } from "../../../types/GoalType";
import dayjs, { Dayjs } from "dayjs";
import { updateGoalAPI } from "../../../services/api.me.service";
import RichEditor2 from "../../richTextEditor/RichEditor2";
import { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";

interface GoalUpdateProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    goal: GoalType;
    loadGoal: () => void;
}

const GoalUpdate = ({ isModalOpen, setIsModalOpen, goal, loadGoal }: GoalUpdateProps) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("Something description for Goal");
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(3, "day"));
    const [isPublic, setIsPublic] = useState<boolean | null>(null);

    const handleChangePublic = (e: any) => {
        setIsPublic(e.target.value);
        console.log("Đã chọn: ", e.target.value ? "Public" : "No Public");
    };


    useEffect(() => {
        if (goal) {
            setTitle(goal.title || "");
            // Phải truyền vào HTML, ko được truyền vào plaintext thuần, sẽ bị bỏ qua và ko hiển thị content
            const desc = goal.description ?? '';
            const isHtml = /<[a-z][\s\S]*>/i.test(desc);
            setDescription(isHtml ? desc : `<p>${desc}</p>`);
            setEndDate(goal.endDate ? dayjs(goal.endDate) : dayjs().add(3, "day"));
            setIsPublic(goal.isPublic ?? null);
            setDisplayImage(goal.background ? `${import.meta.env.VITE_BACKEND_URL}/images/backgroundGoal/${goal.background}` : `${import.meta.env.VITE_BACKEND_URL}/images/backgroundGoal/background_default.jpg`);
        }
    }, [isModalOpen, goal])

    const handleUpdateGoal = async () => {
        if (!title || !description || !endDate) {
            notification.error({
                message: "Missing fields",
                description: "Please fill in all required fields.",
            });
            return;
        }

        try {
            // const plainTextDescription = description.replace(/<[^>]+>/g, '');
            const res = await updateGoalAPI(
                goal.idGoal,
                title,
                description,
                // plainTextDescription,
                endDate.format('YYYY/MM/DD'),
                isPublic,
                fileNameBackground
            );

            if (res?.data) {
                notification.success({
                    message: "Update created successfully",
                });
                resetAndCloseModal();
            }
        } catch (error: any) {
            notification.error({
                message: "Update Goal Failed",
                description: error?.response?.data?.message || "Unknown error",
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        setEndDate(dayjs().add(3, "day"));
        setIsPublic(false);
        loadGoal();
    };

    const [fileNameBackground, setFileNameBackground] = useState<RcFile | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [displayImage, setDisplayImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChangeFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setFileNameBackground(newFileList[0].originFileObj as RcFile);
        console.log(">>> check fileNameBackground: ", fileNameBackground);
        console.log(">>> check newFileList[0]: ", newFileList[0]);
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div className="user-form" style={{ margin: "10px 0", }}>
            <Modal
                title="Update Goal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleUpdateGoal()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"UPDATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Title</span>
                        <Input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div>
                        <span>Description</span>
                        {/* <TextArea
                            placeholder="Describe for your Stunning Goal"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </TextArea> */}

                        <RichEditor2
                            value={description}
                            onChange={(value) => {
                                setDescription(value)
                            }}
                            key={isModalOpen.toString()}
                        />
                    </div>
                    <div>
                        <span>End Date</span>
                        <DatePicker value={endDate} onChange={(date) => setEndDate(date)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <div style={{ width: "100%" }}>
                            <Radio.Group onChange={handleChangePublic} value={isPublic}>
                                <Radio value={true}>Public</Radio>
                                <Radio value={false}>No Public</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <div>
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                            src={displayImage}
                        />
                    </div>
                    <div>
                        <Upload
                            listType="picture-card"
                            // fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChangeFile}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default GoalUpdate;