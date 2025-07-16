import { Button, Input, Modal, notification, Row, Col, Form, Divider } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {

        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )

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
                    description: JSON.stringify(res.message),
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
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
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

            <Row justify={"center"}>
                <Col xs={24} sm={12} md={12} lg={8} >
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: 'Please enter a valid phone number!',
                            },
                        ]}

                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"} >
                <Col xs={24} sm={12} md={12} lg={8} >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {/* <Button type="primary" htmlType="submit">Register</Button> */}
                        <Button type="primary" onClick={() => form.submit()}>Register</Button>
                        <Button onClick={() => {
                            // form.setFieldValue({
                            //     email: "thaidagpnam@gmail.com",
                            // })
                            // console.log(">>> check form: ", form.getFieldValue());

                            // đây là cách giúp ta render ra email auto bằng cách nhập fullname rồi nhấn nút 
                            const fullNamefollow = form.getFieldValue("fullName");

                            if (fullNamefollow) {
                                const generatedEmail = `${fullNamefollow.replace(/\s+/g, "").toLowerCase()}@gmail.com`;
                                form.setFieldsValue({ email: generatedEmail })
                            }
                            else {
                                notification.warning({
                                    message: "Missing Full Name",
                                    description: "Please enter Full Name before generating email",
                                    duration: 3,
                                });
                            }
                        }}>Generate Email from FullName</Button>
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