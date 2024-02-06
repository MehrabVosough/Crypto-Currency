import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { GetCoinList } from "../services/GetCoinList";

function HomePage() {
	const [coin, setCoine] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(GetCoinList());
			const json = await res.json();
			setCoine(json);
		};
		getData();
	}, []);

	return <TableCoin coin={coin} />;
}

export default HomePage;
