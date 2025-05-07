import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getCurriculumAPI } from "@/services/api";


const CurriculumTable = () => {
    const [data, setData] = useState<Curriculum[]>([]);

    useEffect(() => {
        fetchCurriculum();
    }, []);

    const fetchCurriculum = async () => {
        try {
            const res = await getCurriculumAPI();
            if (res.data) {
                setData(Array.isArray(res.data) ? res.data : [res.data]);
            }
        } catch (error) {
            console.error("Lỗi khi tải lộ trình học:", error);
        }
    };

    const columns: ColumnsType<Curriculum> = [
        {
            title: "Tên lộ trình",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Chuyên ngành",
            dataIndex: ["major", "name"],
            key: "major",
        },
        {
            title: "Khóa học",
            key: "course",
            render: (_, record) => `${record.course.startYear} - ${record.course.endYear}`,
        },
        {
            title: "Số môn học",
            key: "subjectsCount",
            render: (_, record) => record.subjects.length,
        },
    ];

    const expandedRowRender = (record: Curriculum) => {
        const grouped = record.subjects.reduce<Record<string, CurriculumSubject[]>>((acc, curr) => {
            const key = curr.semester.name;
            if (!acc[key]) acc[key] = [];
            acc[key].push(curr);
            return acc;
        }, {});

        return (
            <>
                {Object.entries(grouped).map(([semesterName, subjects]) => (
                    <div key={semesterName} style={{ marginBottom: 16 }}>
                        <strong>{semesterName}</strong>
                        <Table<CurriculumSubject>
                            rowKey={(item) => `${item.subject.code}-${item.orderInSemester}`}
                            columns={[
                                {
                                    title: "Mã môn",
                                    dataIndex: ["subject", "code"],
                                    key: "code",
                                },
                                {
                                    title: "Tên môn",
                                    dataIndex: ["subject", "name"],
                                    key: "name",
                                },
                                {
                                    title: "Tự chọn?",
                                    dataIndex: "isElective",
                                    key: "isElective",
                                    render: (val: boolean) =>
                                        val ? <Tag color="blue">Tự chọn</Tag> : <Tag color="green">Bắt buộc</Tag>,
                                },
                                {
                                    title: "Thứ tự",
                                    dataIndex: "orderInSemester",
                                    key: "order",
                                },
                            ]}
                            dataSource={subjects}
                            pagination={false}
                            size="small"
                        />
                    </div>
                ))}
            </>
        );
    };

    return (
        <Table<Curriculum>
            rowKey="id"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
        />
    );
};

export default CurriculumTable;
