import { Button, Form, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const BookUpdateUncontrolled = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props

    const [form] = Form.useForm();

    const [thumbnail, setThumbnail] = useState(null) // một state để lưu trữ info of file
    const [preview, setPreview] = useState(null) // luu tru url


    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                _id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            })

            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const resetAndCloseModal = () => {
        form.resetFields();
        setIsModalUpdateOpen(false);
        setThumbnail(null);
        setPreview(null);
        loadBook();
    }

    const onFinish = async (value) => {

        if (!thumbnail && !preview) {
            notification.error({
                message: "Error upload file",
                description: "Please upload image for this book!"
            })
            return;
        }

        let newThumbnail = "";
        // không có ảnh, nhưng có preview -> không update ảnh
        if (!thumbnail && preview) {
            newThumbnail = dataUpdate.thumbnail;
        }
        else {
            // 1: upload file
            const resUpload = await handleUploadFile(thumbnail, "book")
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: "Please upload image for this book!"
                })
                return;
            }
        }

        // 2. call api create book
        const { _id, mainText, author, price, quantity, category } = value;
        //_id, thumbnail, mainText, author, price, quantity, category
        const resCreate = await updateBookAPI(_id, newThumbnail, mainText, author, price, quantity, category);

        if (resCreate.data) {
            message.success("Update book")
            resetAndCloseModal()
            await loadBook();
        }
        else {
            notification.error({
                message: "Error upload book",
                description: JSON.stringify(resCreate.message)
            })
        }
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

    return (
        <div className="user-form" style={{ margin: "10px 0", }}>
            <Modal
                title="Update Book Uncontrolled"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUpdateOpen}
                onOk={() => form.submit()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"SAVE"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ margin: "10px" }}
                >
                    <Form.Item
                        label="Id"
                        name="_id"
                    >
                        <Input disabled />
                    </Form.Item>
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
    )
}

export default BookUpdateUncontrolled;