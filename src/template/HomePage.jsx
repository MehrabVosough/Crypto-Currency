import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";

function HomePage() {
	const [coin, setCoine] = useState([]);

	useEffect(() => {
		fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-n1VqNuuaAdpjP8mcoEQE68yc"
		)
			.then((res) => res.json())
			.then((json) => setCoine(json));
	}, []);

	return <TableCoin coin={coin} />;
}

export default HomePage;
