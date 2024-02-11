const BASEURL = "api.coingecko.com/api/v3";
const APIKEY = "CG-n1VqNuuaAdpjP8mcoEQE68yc";

const GetCoinList = (page, currency) =>
	`https://${BASEURL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${APIKEY}`;

const SearchCoin = (query) =>
	`https://${BASEURL}/search?query=${query}&x_cg_demo_api_key=${APIKEY}`;

const marketChart = (coin) =>
	`https://${BASEURL}/coins/${coin}/market_chart?vs_currency=usd&days=7`;

export { GetCoinList, SearchCoin, marketChart };
