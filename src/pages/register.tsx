import { Button, Input, notification, Row, Col, Form, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IRegisterFormValues } from "../interface/IRegisterFormValues";
import { registerUserAPI } from "../services/api.me.service";

const RegisterPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values: IRegisterFormValues) => {
        const res = await registerUserAPI(
            values.username,
            values.email,
            values.password,
        )
        console.log(">>> check res", res);

        if (res.data) {
            notification.success(
                {
                    message: "Register New Account",
                    description: "Register a user successfully",
                    duration: 3,
                    showProgress: true,
                }
            )
            navigate("/login")
        }
        else {
            notification.error(
                {
                    message: "Register a user failed",
                    description: JSON.stringify(res.data.message),
                    duration: 3,
                    showProgress: true,
                }
            )
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "10px" }}
        >
            <Row justify={"center"}>
                <Col xs={24} sm={12} md={12} lg={8}>
                    <h2 style={{ margin: "20px 0", textAlign: "center" }}>Register Now</h2>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                        label="FullName"
                        name="username"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} sm={12} md={12} lg={8} >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email address!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} sm={12} md={12} lg={8} >
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
                                message:
                                    'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"} >
                <Col xs={24} sm={12} md={12} lg={8} >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button type="primary" onClick={() => form.submit()}>Register</Button>
                    </div>
                    <Divider />
                </Col>
            </Row>

            <Row justify={"center"} style={{ margin: "20px 0" }}>
                <Col xs={24} sm={12} md={12} lg={8}>
                    <span>Already have an account? <Link to="/login">Sign in here</Link></span>
                </Col>
            </Row>
        </Form>
    );
}

export default RegisterPage;