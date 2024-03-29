import React, { FC, useMemo } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { STAT_COLORS } from "../../../constant";
import { QuestionRadioStatPropsType } from "./interface";

function format(n: number) {
	return (n * 100).toFixed(2);
}
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
	const sum = useMemo(() => {
		let s = 0;
		stat.forEach((i) => (s += i.count));
		return s;
	}, [stat]);
	return (
		<div style={{ width: "400px", height: "400px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						dataKey="count"
						data={stat}
						cx="50%"
						cy="50%"
						outerRadius={50}
						label={(i) => `${i.name}:${format(i.count / sum)}%`}
					>
						{stat.map((i, index) => {
							return <Cell key={index} fill={STAT_COLORS[index]}></Cell>;
						})}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
export default StatComponent;
