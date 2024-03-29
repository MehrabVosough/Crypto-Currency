import { ThreeCircles } from "react-loader-spinner";

import chartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";

import styles from "./TableCoin.module.css";
import { marketChart } from "../services/GetCoinList";

function TableCoin({ coin, isLoading, currency, setChart }) {
	return (
		<div className={styles.container}>
			{isLoading ? (
				<ThreeCircles color="#3874ff" width="150" height="150" />
			) : (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Coin</th>
							<th>Name</th>
							<th>Price</th>
							<th>24h</th>
							<th>Total valume</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{coin.map((coin) => (
							<TableRow
								coin={coin}
								key={coin.id}
								currency={currency}
								setChart={setChart}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
export default TableCoin;

const TableRow = ({ coin, currency, setChart }) => {
	const {
		id,
		image,
		name,
		current_price,
		symbol,
		total_volume,
		price_change_percentage_24h: price_change,
	} = coin
	const chartHandler = async () => {
		try {
			const res = await fetch(marketChart(id));
			const json = await res.json();
			setChart({...json, coin});
		} catch (error) {
			setChart(null);
		}
	};

	return (
		<tr>
			<td>
				<div className={styles.symbol} onClick={chartHandler}>
					<img src={image} alt={name} />
					<span>{symbol.toUpperCase()}</span>
				</div>
			</td>
			<td>{name}</td>
			<td>
				{currency === "eur" && "€"}
				{currency === "jpy" && "¥"}
				{currency === "usd" && "$"}
				{current_price.toLocaleString()}
			</td>
			<td className={price_change > 0 ? styles.success : styles.error}>
				{price_change.toFixed(2)}%
			</td>
			<td>{total_volume.toLocaleString()}</td>
			<td>
				<img src={price_change > 0 ? chartUp : chartDown} />
			</td>
		</tr>
	);
};
