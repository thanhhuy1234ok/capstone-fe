
import { ModalForm, ProForm, ProFormDateRangePicker, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, Form, message, notification, Row } from "antd";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import { DebounceSelect } from "@/components/share/debouce.select";
import { callUpdateSemester, createSemesterAPI, getCoursesAPI } from "@/services/api";



interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: any) => void;
    dataUpdate?: ISemester | null;
}


const ModalSemester = (props: IProps) => {
    const { openModal, setOpenModal, refreshTable, dataUpdate, setDataUpdate } = props;
    const [cohort, setCohort] = useState<IOptionSelect[]>([])
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...dataUpdate,
            contractTime: [dataUpdate?.startDate, dataUpdate?.endDate],
            isMainSemester: form.getFieldsValue().isMainSemester ? form.getFieldsValue().isMainSemester : 'true',
        });
        // if (dataUpdate?.id) {
        //     if (dataUpdate?.cohort) {
        //         setCohort([
        //             {
        //                 label: `${dataUpdate.cohort?.startYear} - ${dataUpdate.cohort?.endYear}`,
        //                 value: dataUpdate.cohort.id as number,
        //                 key: dataUpdate.cohort?.id as string,
        //             }
        //         ])
        //     }
        // }
    }, [dataUpdate]);

    async function fetchCohortList(): Promise<IOptionSelect[]> {
        const res = await getCoursesAPI(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: `${item.startYear} - ${item.endYear}`,
                    value: item.id as number
                }
            })
            return temp;
        } else return [];
    }


    const submitSemester = async (valuesForm: any) => {
        const { name,
            contractTime,
            maxCredits, course, order } = valuesForm;
        let isMainSemester = valuesForm.isMainSemester === 'true'
        const courseId = course?.value || undefined;

        const semester = {
            name,
            startDate: contractTime[0],
            endDate: contractTime[1],
            isMainSemester,
            maxCredits,
            course: courseId,
            order
        }
        if (dataUpdate?.id) {
            let id = dataUpdate.id
            //update
            const res = await callUpdateSemester(+id, semester);
            if (res.data) {
                message.success("Cập nhật kỳ học thành công");
                handleReset();
                refreshTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const res = await createSemesterAPI(semester);
            if (res.data) {
                message.success("Thêm mới kỳ học thành công");
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
        setCohort([])
    };

    return (
        <>
            <ModalForm
                form={form}
                title={<>{dataUpdate?.id ? "Cập nhật kỳ học" : "Tạo mới kỳ học"}</>}
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
                onFinish={submitSemester}
                initialValues={dataUpdate?.id ? dataUpdate : {}}


            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDateRangePicker
                            name="contractTime"
                            label="Start Date -> End Date"
                            disabled={dataUpdate?.id ? true : false}
                            placeholder={['Start Date', 'End Date']}
                            width={"lg"}
                        />
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24}>
                        <ProFormSelect
                            label="Loại học kỳ"
                            name="isMainSemester"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Chọn kỳ học"
                            options={[
                                { label: 'Kỳ học chính', value: 'true' }, // Chuỗi 'true'
                                { label: 'Kỳ học hè', value: 'false' },  // Chuỗi 'false'
                            ]}
                        />
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <ProFormDigit
                            label="Giới hạn tín chỉ"
                            name="maxCredits"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập giới hạn tín chỉ"
                            min={15}  // Giá trị tối thiểu, có thể thay đổi theo yêu cầu
                            max={21} // Giá trị tối đa, có thể thay đổi theo yêu cầu
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="course"
                            label="Năm nhập học"
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={cohort}
                                value={cohort}
                                placeholder="Chọn năm nhập học"
                                fetchOptions={fetchCohortList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setCohort(newValue as IOptionSelect[]);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>

                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalSemester