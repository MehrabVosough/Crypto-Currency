import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { GetCoinList } from "../services/GetCoinList";

function HomePage() {
	const [coin, setCoine] = useState([]);
    const [isLoading,setIsLoading] = useState(true)

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(GetCoinList());
			const json = await res.json();
			setCoine(json);
            setIsLoading(false)
		};
		getData();
	}, []);

	return <TableCoin coin={coin} isLoading={isLoading} />;
}

export default HomePage;
