const BASEURL = "api.coingecko.com/api/v3";
const APIKEY = "CG-n1VqNuuaAdpjP8mcoEQE68yc";

const GetCoinList = (page) => {
	return `https://${BASEURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${APIKEY}`;
};

export { GetCoinList };
