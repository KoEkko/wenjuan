import React, { FC, useState } from "react";
import { getQuestionStatListService } from "../../../services/stat";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { Pagination, Spin, Table, Typography } from "antd";
import { STAT_PAGE_SIZE } from "../../../constant";
type PropsType = {
	selectedComponentdId: string;
	setSelectedComponentId: (id: string) => void;
	setSelectedCompoentType: (type: string) => void;
};
const { Title } = Typography;
const PageStat: FC<PropsType> = (props: PropsType) => {
	const { selectedComponentdId, setSelectedCompoentType, setSelectedComponentId } = props;
	const { id = "" } = useParams();
	const [total, setTotal] = useState(0);
	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
	const { loading } = useRequest(
		async () => {
			const res = getQuestionStatListService(id, { page, pageSize });
			return res;
		},
		{
			refreshDeps: [id, page, pageSize],
			onSuccess(res) {
				const { total, list = [] } = res;
				setTotal(total);
				setList(list);
			},
		}
	);
	const { componentList } = useGetComponentInfo();
	const columns = componentList.map((c) => {
		const { fe_id, props, title, type } = c;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const colTitle = props!.title || title;
		return {
			title: (
				<div
					style={{ cursor: "pointer" }}
					onClick={() => {
						setSelectedCompoentType(type);
						setSelectedComponentId(fe_id);
					}}
				>
					<span style={{ color: fe_id === selectedComponentdId ? "#1890ff" : "inherit" }}>{colTitle}</span>
				</div>
			),
			dataIndex: fe_id,
		};
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
	const TableElem = (
		<>
			<Table columns={columns} dataSource={dataSource} pagination={false} />
			<div style={{ textAlign: "center", marginTop: "18px" }}>
				<Pagination
					total={total}
					current={page}
					pageSize={pageSize}
					onChange={(page) => setPage(page)}
					onShowSizeChange={(page, pageSize) => {
						setPage(page);
						setPageSize(pageSize);
					}}
				/>
			</div>
		</>
	);
	return (
		<div>
			<Title level={3}>答卷数量: {!loading && total}</Title>
			{loading && (
				<div style={{ textAlign: "center" }}>
					<Spin />
				</div>
			)}
			{!loading && TableElem}
		</div>
	);
};

export default PageStat;
