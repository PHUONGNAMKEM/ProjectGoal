import { Card } from "antd";
import Meta from "antd/es/card/Meta";


const Task = () => {
    return (
        <>
            <Card
                hoverable
                style={{ width: 240, boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                cover={<img alt="example" src="https://images.unsplash.com/photo-1635215277614-5bea1b092836?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnVqaXxlbnwwfHwwfHx8MA%3D%3D" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
        </>
    );
}

export default Task;