import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { GetCoinList } from "../services/GetCoinList";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage() {
	const [coin, setCoine] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [currency, setCurrency] = useState("usd");

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
			try {
				const res = await fetch(GetCoinList(page, currency));
				const json = await res.json();
				setCoine(json);
				setIsLoading(false);
			} catch (error) {
				alert(error);
			}
		};
		getData();
	}, [page, currency]);

	return (
		<div>
			<Search currency={currency} setCurrency={setCurrency} />
			<TableCoin coin={coin} isLoading={isLoading} currency={currency} />
			<Pagination page={page} setPage={setPage} />
		</div>
	);
}

export default HomePage;
