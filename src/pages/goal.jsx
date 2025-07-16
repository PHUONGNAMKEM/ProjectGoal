import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, MinusCircleOutlined, SettingOutlined, SyncOutlined } from "@ant-design/icons";
import { Avatar, Card, ColorPicker, Flex, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import Goal from "../components/goal/goalcomponent";


const GoalPage = () => {


    return (
        <div style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: "8px" }}>
            <Goal />
            <Goal />
            <Goal />
            <Goal />
            <Goal />
            <Goal />
            <Goal />
            <Goal />
            <Goal />
        </div>
    )
}

export default GoalPage;