import ButtonComponents from "@/components/share/button";
import DataTable from "@/components/share/data.table";
import { deleteUserAPI, detailRolesAPI, getRolesAPI, getSupplierAPI } from "@/services/api";
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message, notification, Popconfirm, Space, Tag } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import { useRef, useState } from "react";
import ModalSupplier from "./model.supplier";


const TableSupplier = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<ISupplier | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const [currentDataTable, setCurrentDataTable] = useState<ISupplier[]>([]);
console.log(currentDataTable);
    const tableRef = useRef<ActionType>();

    const columns: ProColumns<ISupplier>[] = [
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
            <DataTable<ISupplier>
                actionRef={tableRef}
                headerTitle="Danh sách nhà cung cấp"
                rowKey="id"
                columns={columns}
                dataSource={currentDataTable}
                request={async (params, sort, filter): Promise<any> => {
                    const query = buildQuery(params, sort, filter);
                    const res = await getSupplierAPI(query);
                    if (res.data) {
                        console.log(res.data);
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

            <ModalSupplier
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default TableSupplier