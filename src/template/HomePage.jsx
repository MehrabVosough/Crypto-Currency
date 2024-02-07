import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { GetCoinList } from "../services/GetCoinList";
import Pagination from "../modules/Pagination";

function HomePage() {
	const [coin, setCoine] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
			const res = await fetch(GetCoinList(page));
			const json = await res.json();
			setCoine(json);
			setIsLoading(false);
		};
		getData();
	}, [page]);

	return (
		<div>
			<TableCoin coin={coin} isLoading={isLoading} />
			<Pagination page={page} setPage={setPage} />
		</div>
	);
}

export default HomePage;
