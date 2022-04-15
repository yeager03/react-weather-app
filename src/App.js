import { useState } from "react";
const api = {
	key: "d7596a46cd62cbc63f75642e208f20ad",
	base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
	const [query, setQuery] = useState(""); // поиск
	const [weather, setWeather] = useState({}); // текующая погода

	const searchSubmit = (e) => {
		if (e.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((response) => {
					// console.log(response)
					return response.json();
				})
				.then((body) => {
					setWeather(body);
					setQuery("");
					console.log("body object -> ", body); // приходит в качестве объекта
				});
		}
	};

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		let day = days[d.getDay()];
		let date = d.getDate();

		let month = months[d.getMonth()]; // month[6]
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	console.log(weather);
	return (
		<div className={typeof weather.main !== "undefined" ? (weather.main.temp > 16 ? "app warm" : "app") : "app"}>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={handleChange}
						value={query}
						onKeyPress={searchSubmit}
					/>
				</div>

				{typeof weather.main !== "undefined" ? (
					<>
						<div className="location-box">
							<div className="location">
								{weather.name} , {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>

						<div className="weather-box">
							<div className="temp">{Math.round(weather.main.temp)}° c</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</>
				) : (
					<>
						<h2 className="not-found">Пока ничего не найдено</h2>
					</>
				)}
			</main>
		</div>
	);
}

export default App;
