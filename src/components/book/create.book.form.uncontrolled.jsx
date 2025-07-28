import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Select } from "antd";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUncontrolled = (props) => {


    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState();
    const { setUser } = useContext(AuthContext);

    const { loadBook, isModalOpen, setIsModalOpen } = props;

    const [thumbnail, setThumbnail] = useState(null) // một state để lưu trữ info of file
    const [preview, setPreview] = useState(null) // luu tru url
    const onFinish = async (value) => {
        if (!thumbnail) {
            f
            notification.error({
                message: "Error upload file",
                description: "Please upload image for this book!"
            })
            return;
        }

        // 1: upload file
        const resUpload = await handleUploadFile(thumbnail, "book")
        // if (resUpload.data) {
        //     console.log();
        // }
        // else {
        //     notification.error({
        //         message: "Error upload file",
        //         description: "Please upload image for this book!"
        //     })
        // }

        // 2. call api create book
        const newThumbnail = resUpload.data.fileUploaded;

        const resCreate = await createBookAPI(value.mainText, value.author, value.price, value.quantity, value.category, newThumbnail);
        if (resCreate.data) {
            message.success("Create book")
        }
        resetAndCloseModal()
    }

    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setThumbnail(null)
            setPreview(null)
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setThumbnail(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const resetAndCloseModal = () => {
        form.resetFields();
        setIsModalOpen(false);
        setThumbnail(null);
        setPreview(null);
        loadBook();
    };

    return (<>
        <div className="user-form" style={{ margin: "10px 0", }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">Create Book</Button>
            </div>

            <Modal
                title="Create Book Uncontrolled"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ margin: "10px" }}
                >
                    <Form.Item
                        label="Title"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your author!'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!'
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            addonAfter="đ"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your quantity!'
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your category!'
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Select category"
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>

                    <div>
                        <p>Thumbnail:</p>
                        {preview &&
                            <>
                                <div style={{ marginTop: "10px", width: "150px", height: "100px", marginBottom: "15px", border: "1px solid #ccc" }}>
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                        src={preview}
                                    />
                                </div>
                            </>
                        }
                        <div style={{ display: "inline-block" }}>
                            <label htmlFor="btnUpload" style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "6px 14px",
                                background: "#ffa82e",
                                fontSize: "14px",
                                borderRadius: "5px",
                                color: "rgba(0, 0, 0, 0.88)",
                                cursor: "pointer"
                            }}>Upload Avatar</label>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="btnUpload"
                                hidden
                                onChange={handleOnchangeFile}
                                onClick={(event) => {
                                    event.target.value = null;
                                }}
                            />
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    </>

    )
}

export default CreateBookUncontrolled;