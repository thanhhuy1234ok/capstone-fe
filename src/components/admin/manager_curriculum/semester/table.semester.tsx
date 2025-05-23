import ButtonComponents from "@/components/share/button";
import DataTable from "@/components/share/data.table";
import { getCoursesAPI, getSemesterAPI } from "@/services/api";
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Badge, Popconfirm, Space, Tag } from "antd";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";
import ModalSemester from "./model.semester";


const TableSemester = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<ISemester | null>(null);
    const [courseOptions, setCourseOptions] = useState<ICourse[]>([]);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<ISemester[]>([]);

    const tableRef = useRef<ActionType>();

    const reloadTable = async () => {
        await tableRef?.current?.reload();
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getCoursesAPI(`current=1&pageSize=100`)

                const uniqueCourses = res.data?.result || [];

                // Lọc trùng niên khóa (nếu cần)
                const uniqueSet = new Set();
                const filtered = uniqueCourses.filter(course => {
                    const key = `${course.startYear}-${course.endYear}`;
                    if (uniqueSet.has(key)) return false;
                    uniqueSet.add(key);
                    return true;
                });

                setCourseOptions(filtered);
            } catch (error) {
                console.error('Lỗi khi lấy khóa học:', error);
            }
        };

        fetchCourses();
    }, []);


    const columns: ProColumns<ISemester>[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (_text, record, _index, _action) => {
                return (
                    <span>
                        {record.id}
                    </span>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Tên học kỳ',
            dataIndex: 'name',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startDate',
        },

        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endDate',
        },
        {
            title: 'Loại kỳ học',
            dataIndex: 'isMainSemester',
            render: (text, record) => (
                record.isMainSemester
                    ? <Tag color="success">Kỳ chính</Tag>
                    : <Tag color="warning">Kỳ hè</Tag>
            ),
            valueEnum: {
                true: { text: 'Kỳ chính', status: 'Success' },
                false: { text: 'Kỳ hè', status: 'Warning' },
            },
            // sorter: true,
        },
        {
            title: 'Khóa học',
            dataIndex: ['course'],
            renderText: (text,record) => 
                (
                <div>{record.course?.startYear} - {record.course?.endYear}</div>
                ),  
            filters: courseOptions.map(c => ({
                text: `${c.startYear} - ${c.endYear}`,
                value: c.id, // dùng id để lọc
            })),
        },
        {

            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500',
                        }}
                        type=""
                        onClick={() => {
                            setOpenModal(true);
                            setDataUpdate(entity);
                        }}
                    />

                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa semester"}
                        description={"Bạn có chắc chắn muốn xóa user này ?"}
                        // onConfirm={() => handleDeleteUser(entity.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer", margin: "0 10px" }}>
                            <DeleteOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#ff4d4f',
                                }}
                            />
                        </span>
                    </Popconfirm>
                </Space>
            ),

        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };
        if (clone.name) clone.name = `${clone.name}`;
        if (filter.course?.[0]) {
            clone.course = filter.course[0]; // ← courseId chọn từ filter
        }
        let temp = queryString.stringify(clone);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name" : "sort=-name";
        }
        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt" : "sort=-createdAt";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt" : "sort=-updatedAt";
        }

        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=id`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    }

    const handleExportData = () => {

    }

    const RenderHeaderTable = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', gap: 15 }}>
                    <ButtonComponents
                        icon={<ExportOutlined />}
                        onClick={() => handleExportData()}
                        title="Export"
                        isVisible={false}
                    />


                    <ButtonComponents
                        icon={<CloudUploadOutlined />}
                        onClick={() => setOpenModalImport(true)}
                        title="Import"
                        isVisible={false}
                    />

                    <ButtonComponents
                        icon={<PlusOutlined />}
                        onClick={() => setOpenModal(true)}
                        title="Thêm mới"
                        isVisible={true}
                    />
                </span>
            </div>
        )
    }




    return (
        <>
            <DataTable<ISemester>
                actionRef={tableRef}
                headerTitle="Danh sách kỳ học"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort, filter): Promise<any> => {
                    const query = buildQuery(params, sort, filter);
                    const res = await getSemesterAPI(query);
                    if (res.data) {
                        setMeta(res.data.meta);
                        setCurrentDataTable(res.data?.result ?? [])
                    }
                    return {
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total
                    }
                }}
                scroll={{ x: true }}
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        showSizeChanger: true,
                        total: meta.total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} dòng</div>) }
                    }
                }
                rowSelection={false}
                toolBarRender={(_action, _rows): any => {
                    return (
                        <RenderHeaderTable />
                    );
                }}
                search={false}
            />

            <ModalSemester
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default TableSemester