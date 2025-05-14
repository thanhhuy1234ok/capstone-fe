import { createRoleAPI, createSupplierAPI, updateRolesAPI } from "@/services/api";
import { ModalForm, ProCard, ProFormSwitch, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Col, Form, message, notification, Row } from "antd";
import { isMobile } from "react-device-detect";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IRole | null) => void;
    dataUpdate: ISupplier | null;
}

const ModalSupplier = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, setDataUpdate, dataUpdate } = props;

    const [form] = Form.useForm();


    const submitSupplier = async (valuesForm: any) => {
        const { name, email,phone,note,address} = valuesForm
        const data = { name, email, phone, note, address }
        if (dataUpdate?.id) {
           
            const res = await updateRolesAPI(data)
            if (res.data) {
                message.success("Cập nhật nhà cung cấp thành công");
                handleReset();
                refreshTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            const res = await createSupplierAPI(data);
            if (res.data) {
                message.success("Thêm mới nhà cung cấp thành công");
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
    const handleReset = () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenModal(false);
    }
    return (
        <>
            <ModalForm
                title={<>{dataUpdate?.id ? "Cập nhật nhà cung cấp" : "Tạo mới nhà cung cấp"}</>}
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
                onFinish={submitSupplier}
                initialValues={dataUpdate?.id ? dataUpdate : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên nhà cung cấp"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập tên nhà cung cấp"
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập điạ chỉ"
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập số điện thoại"
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập Email"
                        />
                    </Col>
                    <Col span={24}>
                        <ProFormTextArea
                            label="Mô tả"
                            name="note"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập mô tả"
                        />
                    </Col>

                </Row>
            </ModalForm >
        </>
    )
}

export default ModalSupplier