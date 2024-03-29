import React, { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRequest } from "ahooks";
import { Button, Tag, Divider, Space, Popconfirm, message, Modal } from "antd";
import {
	CopyOutlined,
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	LineChartOutlined,
	StarOutlined,
} from "@ant-design/icons";
import styles from "./QuestionCard.module.scss";
import { duplicateQuestionService, updateQuestionService } from "../services/question";

type PropsType = {
	_id: string;
	title: string;
	isPublished: boolean;
	isStar: boolean;
	createdAt: string;
	answerCount: number;
};
const { confirm } = Modal;
const QuestionCard: FC<PropsType> = (props: PropsType) => {
	const { _id, title, isPublished, isStar, createdAt, answerCount } = props;
	const nav = useNavigate();
	const [isStarState, setIsStarState] = useState(isStar);
	const { loading, run: handlerStarChange } = useRequest(
		async () => {
			await updateQuestionService(_id, { isStar: !isStarState });
		},
		{
			manual: true,
			onSuccess() {
				setIsStarState(!isStarState); // 更新state
				message.success("更新成功");
			},
		}
	);
	const { loading: duplicateLoding, run: duplicate } = useRequest(
		async () => {
			const data = await duplicateQuestionService(_id);
			return data;
		},
		{
			manual: true,
			onSuccess(result) {
				message.success("复制成功");
				nav(`/question/edit/${result.id}`);
			},
		}
	);

	const cancel = () => {
		message.error("Click on No");
	};
	const [isDeletedState, setIsDeletedState] = useState(false);
	const { loading: deleteLoading, run: deleteQuestion } = useRequest(
		async () => {
			const data = await updateQuestionService(_id, { isDeleted: true });
			return data;
		},
		{
			manual: true,
			onSuccess() {
				message.success("删除成功");
				setIsDeletedState(true);
			},
		}
	);

	const del = () => {
		confirm({
			title: "确定删除问卷?",
			icon: <ExclamationCircleOutlined />,
			onOk: deleteQuestion,
			content: "是否删除",
			okText: "确认",
			cancelText: "取消",
		});
	};
	// 已经删除的卡片，不再渲染
	if (isDeletedState) return null;
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<Space>
							{isStarState && <StarOutlined style={{ color: "red" }} />}
							{title}
						</Space>
					</Link>
				</div>
				<div className={styles.right}>
					<Space>
						{isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
						<span>答卷:{answerCount}</span>
						<span>{createdAt}</span>
					</Space>
				</div>
			</div>
			<Divider />
			<div className={styles["button-container"]}>
				<div className={styles.left}>
					<Space>
						<Button type="text" onClick={() => nav(`/question/edit/${_id}`)} icon={<EditOutlined />} size="small">
							编辑问卷
						</Button>
						<Button
							type="text"
							onClick={() => nav(`/question/stat/${_id}`)}
							icon={<LineChartOutlined />}
							size="small"
							disabled={!isPublished}
						>
							问卷统计
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						<Button type="text" icon={<StarOutlined />} size="small" onClick={handlerStarChange} disabled={loading}>
							{isStarState ? "取消标星" : "标星"}
						</Button>
						<Popconfirm
							title="复制"
							description="Are you sure to duplicate the questionnaire"
							onConfirm={duplicate}
							onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoding}>
								复制
							</Button>
						</Popconfirm>
						<Button type="text" icon={<DeleteOutlined />} size="small" onClick={del} disabled={deleteLoading}>
							删除
						</Button>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
