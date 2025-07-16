import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import BookForm from "./create.book.form.control";
import BookDetail from "./view.book.detail";
import { Link, Navigate } from "react-router-dom";
import CreateBookUncontrolled from "./create.book.form.uncontrolled";
import BookUpdate from "./update.book";
import BookUpdateUncontrolled from "./update.book.uncontrol";
import { deleteBookAPI } from "../../services/api.service";

const BookTable = (props) => {

    const { bookData, loadBook, current, pageSize, total, setCurrent, setPageSize } = props;

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
            title: 'No.',
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <Link to='#'
                        onClick={() => {
                            setDataDetail(record)
                            setIsDetailOpen(true)
                        }}
                    >{record._id}</Link>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, record) => {
                if (text) {
                    // return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(text)
                    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(text)
                }
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete book"
                        description="Are you sure you want to delete this book?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left">
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }

    const handleDeleteBook = async (id) => {
        const resDelete = await deleteBookAPI(id);
        console.log(">>> check bookData: ", bookData)
        if (resDelete.data) {
            notification.success(
                {
                    message: "Delete A New User",
                    description: "Delete successfully",
                    duration: 3,
                    showProgress: true,
                }
            )
            // nếu trang đang đứng chỉ còn 1 user và trang đó kp là trang đầu tiên thì quay về trang trước đó
            if (current > 1 && bookData.length === 1) {
                setCurrent(current - 1);
            } else {
                await loadBook();
            }
        }
        else {
            notification.error(
                {
                    message: "Delete A New User",
                    description: "Delete failed",
                    duration: 3,
                    showProgress: true,
                }
            )
        }
    }

    return (<>
        {/* <BookForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loadBook={loadBook}
        /> */}

        <CreateBookUncontrolled
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loadBook={loadBook}
        />
        <Table
            dataSource={bookData}
            columns={columns}
            rowKey={"_id"}
            pagination={
                {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]} - {range[1]} trên {total} rows</div>) }
                }}

            onChange={onChange}
        />

        <BookDetail
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            dataDetail={dataDetail}
            setDataDetail={setDataDetail}
        />

        {/* <BookUpdate
            isModalUpdateOpen={isModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            loadBook={loadBook}
        /> */}


        <BookUpdateUncontrolled
            isModalUpdateOpen={isModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            loadBook={loadBook}
        />

    </>)



}

export default BookTable;