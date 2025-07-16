import { Input, InputNumber, message, Modal, notification, Select } from "antd";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";
import { useEffect, useState } from "react";

const BookUpdate = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props;

    useEffect(() => {
        console.log(">>> check dataUpdate: ", dataUpdate)

        if (dataUpdate) {
            setId(dataUpdate._id)
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            // setThumbnail(dataUpdate.thumbnail);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState(null) // một state để lưu trữ info of file
    const [preview, setPreview] = useState(null) // luu tru url

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

    const handleUpdateBookThumbnail = async () => {
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
        const resCreate = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);

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

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setMainText("");
        setAuthor("");
        setPrice(null);
        setQuantity(null);
        setCategory("");
        setThumbnail(null);
        setPreview(null);
        loadBook();
    };
    return (
        <Modal
            title="Update Book"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => handleUpdateBookThumbnail()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled />
                </div>
                <div>
                    <span>Title</span>
                    <Input
                        value={mainText}
                        onChange={(event) => setMainText(event.target.value)} />
                </div>
                <div>
                    <span>Author</span>
                    <Input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    <span>Price</span>
                    <InputNumber
                        value={price}
                        onChange={(value) => setPrice(value)}
                        style={{ width: '100%' }}
                        addonAfter="đ"
                    />
                </div>
                <div>
                    <span>Quantity</span>
                    <InputNumber
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        style={{ width: '100%' }}
                    />
                </div>
                <div>
                    <div style={{ width: "100%" }}>
                        <span>Category</span>
                        <Select
                            value={category}
                            onChange={(value) => setCategory(value)}
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
                    </div>
                </div>

                <div>
                    <p>Thumbnail:</p>
                    {preview &&
                        <>
                            <div style={{ marginTop: "10px", width: "150px", height: "100px", border: "1px solid #ccc" }}>
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
            </div>
        </Modal>)
}

export default BookUpdate;