import { createSubjectAPI } from "@/services/api";

import { ModalForm,ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText } from "@ant-design/pro-components";
import { Col, Form, message, notification, Row, Select, Space } from "antd";
import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: ISubject | null) => void;
    dataUpdate: ISubject | null;
}
const ModalSubject = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    const submitSubject = async (valuesForm: any) => {
        const { code, name, isElective, credits, teacher, price } = valuesForm;
        const subject = {
            code,
            name,
            isElective: isElective === "true" ? true : false,
            credits: Number(credits),
            teacher: teacher.map((t: IOptionSelect) => t.value),
            price: Number(price),
        };
        console.log(isElective);
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
           
            // const res = await callUpdateSubject(+id, subject);
            // if (res.data) {
            //     message.success("Cập nhật subject thành công");
            //     handleReset();
            //     reloadTable();
            // } else {
            //     notification.error({
            //         message: 'Có lỗi xảy ra',
            //         description: res.message
            //     });
            // }
        } else {
            //create
            const res = await createSubjectAPI(subject);
            if (res.data) {
                message.success("Thêm mới Subject thành công");
                handleReset();
                refreshTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenModal(false);
    }
    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật Subject" : "Tạo mới Subject"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataUpdate?.id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"

                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitSubject}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên môn học"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Tên môn học"
                        />
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormText
                            disabled={dataUpdate?.id ? true : false}
                            label="Mã môn học"
                            name="code"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Mã môn học"

                        />
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24}>
                        <ProFormSwitch
                            label="Trạng thái"
                            name="isElective"
                            checkedChildren="ACTIVE"
                            unCheckedChildren="INACTIVE"
                            initialValue={false}
                            fieldProps={{
                                defaultChecked: true,
                            }}
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số tín chỉ"
                            name="credits"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            min={1}
                            max={6}
                            placeholder="Nhập số tín chỉ"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Giá tiền môn học"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập giá tiền"
                            min={0}
                            fieldProps={{
                                addonAfter: 'VNĐ',
                                formatter: (value) =>
                                    value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '',
                                parser: (value) => value ? parseFloat(value.replace(/VNĐ\s?|(,*)/g, '')) : 0,
                            }}
                        />
                    </Col>

                </Row>
            </ModalForm>
        </>
    )
}

export default ModalSubject