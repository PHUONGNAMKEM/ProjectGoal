import { Button, Input, InputNumber, message, Modal, notification, Select, Space } from "antd"
import { useState } from "react";
import { createBookAPI, handleUploadFile, updateBookThumbnailAPI } from "../../services/api.service";

const BookForm = (props) => {

    const { handleClickBtn, dataDetail, loadBook, isModalOpen, setIsModalOpen } = props;

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

            // event.target.value = null; // nhớ reset lại thẻ input sau khi xử lý xong để tránh trường hợp đẩy 2 file trùng nhau cùng lúc
        }
    }

    const handleUpdateBookThumbnail = async () => {
        if (!thumbnail) {
            notification.error({
                message: "Error upload file",
                description: "Please upload image for this book!"
            })
            return;
        }

        // 1: upload file
        const resUpload = await handleUploadFile(thumbnail, "book")
        // if (resUpload.data) {

        //     // const newAvatar = resUpload.data.fileUploaded;

        //     // const resUpdateThumbnail = await updateBookThumbnailAPI(
        //     //     dataDetail._id,
        //     //     newAvatar, mainText, author, price, quantity, category
        //     // );

        //     // if (resUpdateThumbnail.data) {
        //     //     notification.success({
        //     //         message: "Success",
        //     //         description: "Book updated successfully!"
        //     //     });
        //     //     resetAndCloseModal();
        //     // } else {
        //     //     notification.error({
        //     //         message: "Update failed",
        //     //         description: JSON.stringify(resUpdateThumbnail.message)
        //     //     });
        //     // }
        // }
        // else {
        //     notification.error({
        //         message: "Error upload file",
        //         // description: JSON.stringify(resUpload.message)
        //         description: "Please upload image for this book!"
        //     })
        // }
        // 2. call api create book

        const newThumbnail = resUpload.data.fileUploaded;

        const resCreate = await createBookAPI(mainText, author, price, quantity, category, newThumbnail);
        if (resCreate.data) {
            // console.log("check resCreate: ", resCreate)
            message.success("Create book")
        }
        resetAndCloseModal()
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
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
        <div className="user-form" style={{ margin: "10px 0", }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">Create Book</Button>
            </div>

            <Modal
                title="Create Book"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                // onOk={() => handleClickBtn()}
                onOk={() => handleUpdateBookThumbnail()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
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
            </Modal>
        </div>
    )
}

export default BookForm;