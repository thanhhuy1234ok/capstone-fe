import ButtonComponents from "@/components/share/button";
import DataTable from "@/components/share/data.table";
import { deleteUserAPI, detailRolesAPI, getRolesAPI } from "@/services/api";
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, notification, Popconfirm, Space, Tag } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import { useRef, useState } from "react";
import ModalRoles from "./model.roles";


const TableRole = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<IRole | null>(null);
    const [isDeleteRole, setIsDeleteRole] = useState<boolean>(false);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<IRole[]>([]);

    const tableRef = useRef<ActionType>();

    const handleDeleteRole = async (id: number) => {
        setIsDeleteRole(true)
        const res = await detailRolesAPI(id);
        if (res && res.data) {
            message.success('Xóa quyền hạn thành công');
            reloadTable();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsDeleteRole(false)
    }

    const columns: ProColumns<IRole>[] = [
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
            title: 'Tên quyền hạn',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.isActive ? "lime" : "red"} >
                        {entity.isActive ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                </>
            },
            hideInSearch: true,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</>
                )
            },
            hideInSearch: true,
        },
        {

            title: 'Chức năng',
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
                        onClick={async () => {
                            setDataUpdate(entity)
                            setOpenModal(true)
                        }}
                    />
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa quyền hạn"}
                        description={"Bạn có chắc chắn muốn xóa quyền hạn này ?"}
                        onConfirm={() => handleDeleteRole(+entity.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        okButtonProps={{ loading: isDeleteRole }}
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


    const reloadTable = () => {
        tableRef.current?.reload();
    }
    return (
        <>
            <DataTable<IRole>
                actionRef={tableRef}
                headerTitle="Danh sách quyền hạn (Vai Trò)"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort, filter): Promise<any> => {
                    const query = buildQuery(params, sort, filter);
                    const res = await getRolesAPI(query);
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
                search={{
                    labelWidth: 'auto',
                    defaultCollapsed: false,
                    span: 8,
                }}
            />

            <ModalRoles
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default TableRole