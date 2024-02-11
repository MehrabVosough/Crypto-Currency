import { useEffect, useState } from "react";
import { SearchCoin } from "../services/GetCoinList";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
	const [text, setText] = useState("");
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		setCoins([]);
		if (!text) {
			setIsLoading(false);
			return;
		}

		const searchBox = async () => {
			try {
				const res = await fetch(SearchCoin(text), {
					signal: controller.signal,
				});
				const json = await res.json();
				// console.log(json);
				if (json.coins) {
					setCoins(json.coins);
					setIsLoading(false);
				} else {
					alert(json.status.error_message);
				}
			} catch (error) {
				if (error.name !== "AbortError") {
					alert(error.message);
				}
			}
		};
		setIsLoading(true);
		searchBox();

		return () => {
			controller.abort();
		};
	}, [text]);
	return (
		<div className={styles.searchBox}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<select value={currency} onChange={(e) => setCurrency(e.target.value)}>
				<option value="usd">USD</option>
				<option value="eur">EUR</option>
				<option value="jpy">JPY</option>
			</select>
			{text && (
				<div className={styles.searchResult}>
					{isLoading && (
						<RotatingLines
							width="50px"
							height="50px"
							strokeWidth="2"
							strokeColor="#3874ff"
						/>
					)}
					<ul>
						{coins.map((coin) => (
							<li key={coin.id}>
								<img src={coin.thumb} alt={coin.name} />
								<p>{coin.name}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Search;
