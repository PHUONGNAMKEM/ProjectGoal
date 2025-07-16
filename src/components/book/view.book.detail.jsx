import { Button, Drawer } from "antd"
import { useState } from "react";

const BookDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
    const [selectedFile, setSelectedFile] = useState(null) // một state để lưu trữ info of file
    const [preview, setPreview] = useState(null) // một state để lưu trữ url lại


    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <>
            <Drawer
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                open={isDetailOpen}
                onClose={() => {
                    setDataDetail(null);
                    setIsDetailOpen(false);
                }}
            >
                {dataDetail ?
                    <div>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Id: {dataDetail._id}
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Title: {dataDetail.mainText}
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Author: {dataDetail.author}
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Category: {dataDetail.category}
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Price: {dataDetail.price}
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Quantity: {dataDetail.quantity}
                        </p>
                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                            Sold: {dataDetail.sold}
                        </p>

                        <p style={{ marginBottom: "20px", fontSize: "16px" }}>Thumbnail:</p>
                        <div style={{ marginTop: "10px", width: "150px", height: "100px", border: "1px solid #ccc" }}>
                            <img
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
                            />
                        </div>

                        {/* {preview &&
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
                            </>} */}

                        {/* <div style={{ margin: "10px 0" }}>
                            <label htmlFor="bookUpload" style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "6px 14px",
                                background: "#1677ff",
                                fontSize: "14px",
                                borderRadius: "5px",
                                color: "#fff",
                                cursor: "pointer"
                            }}>Upload</label>
                            <input type="file" id="bookUpload" hidden
                                onChange={(event) => handleOnchangeFile(event)}
                            />
                        </div> */}
                    </div>
                    : <p>Nothing</p>}
            </Drawer>
        </>
    )
}

export default BookDetail;