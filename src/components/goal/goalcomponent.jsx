import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, MinusCircleOutlined, SettingOutlined, SyncOutlined } from "@ant-design/icons";
import { Avatar, Card, ColorPicker, Flex, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";


const Goal = () => {

    const [colorHex, setColorHex] = useState('#1677ff');
    const [bookMark, setBookMark] = useState(false);

    const handleToggle = () => {
        setBookMark(prev => !prev);
    }

    return (
        <div className="goal-card" style={{ width: "15rem", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ccc", padding: "10px", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="goal-card-content">
                <div className="goal-card-content-top" style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 className="goal-card-title" style={{ fontSize: "20px", fontWeight: "500", marginBottom: "6px" }}>Goal Title</h3>
                    {!bookMark ? (
                        <HiOutlineBookmark style={{ fontSize: 30, color: "rgb(169, 168, 168)" }} onClick={() => {
                            handleToggle()
                        }} />
                    )
                        :
                        (
                            <HiOutlineBookmark
                                onClick={() => handleToggle()}
                                style={{ fontSize: 30, color: "orange", fill: "orange", cursor: 'pointer' }}
                            />
                        )
                    }
                </div>
                <p style={{ color: "#aab6c7" }}>Something is a content, it will describe the detail of goal</p>
                <div className="gap10" style={{ height: "10px" }}></div>
                {/* <Flex gap="4px 0" wrap style={{ marginBottom: "14px" }}>
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        success
                    </Tag>
                    <Tag icon={<SyncOutlined spin />} color="processing">
                        processing
                    </Tag>
                    <Tag icon={<CloseCircleOutlined />} color="error">
                        error
                    </Tag>
                    <Tag icon={<ExclamationCircleOutlined />} color="warning">
                        processing
                    </Tag>
                </Flex> */}
                <Flex gap="4px 0" wrap style={{ marginBottom: "14px" }}>
                    {/* <Tag color="magenta">magenta</Tag> */}
                    <Tag color="red">red</Tag>
                    {/* <Tag color="volcano">volcano</Tag> */}
                    {/* <Tag color="orange">orange</Tag> */}
                    <Tag color="gold">gold</Tag>
                    {/* <Tag color="lime">lime</Tag> */}
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    {/* <Tag color="geekblue">geekblue</Tag> */}
                    <Tag color="purple">purple</Tag>
                </Flex>

            </div>
            <div className="goal-card-bottom" style={{
                borderTop: "1px solid #ccc",
                width: "calc(100% + 20px)",
                marginLeft: "-10px",
                height: "2rem",
                padding: "10px 10px 0 10px",
                // position: "absolute", 
                // bottom: "26%", 
                // left: 0
                display: "flex",
                justifyContent: "space-between"
            }}>
                <ColorPicker value={colorHex}
                    size="small"
                    onChange={(color) => {
                        const hex = color.toHexString();
                        setColorHex(hex);
                    }}
                />
                <div> <p style={{ color: colorHex }}>2 days left</p></div>
            </div>
        </div>
        // <Card
        //     style={{ width: 300 }}
        //     // cover={
        //     //     <img
        //     //         alt="example"
        //     //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //     //     />
        //     // }
        //     actions={[
        //         <SettingOutlined key="setting" />,
        //         // <EditOutlined key="edit" />,
        //         // <EllipsisOutlined key="ellipsis" />,
        //     ]}
        // >
        //     <Meta
        //         avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        //         title="Card title"
        //         description="This is the description"
        //     />
        // </Card>
    )
}

export default Goal;