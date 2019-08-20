$(document).ready(function() {
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
  $.getJSON(api, function(data) {
    let celsius = Math.ceil(data.main.temp);
    let fahrenheit = Math.ceil(celsius * (9 / 5) + 32);

    class WeatherApp extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          weather: data.weather[0].description,
          temp: celsius,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          windspeed: data.wind.speed,
          type: "C",
          changeText: "Change to Fahrenheit"
        };
        //bind functions here
        this.convert = this.convert.bind(this);
      }

      convert() {
        if (this.state.temp === celsius) {
          this.setState({
            temp: fahrenheit,
            type: "F",
            changeText: "Change to Celsius",
            tempMin: Math.ceil(data.main.temp_min * (9 / 5) + 32),
            tempMax: Math.ceil(data.main.temp_max * (9 / 5) + 32)
          });
        } else {
          this.setState({
            temp: celsius,
            type: "C",
            changeText: "Change to Fahrenheit",
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max
          });
        }
      }

      render() {
        return (
          <div id="weather-display">
            <h1 id="intro">Welcome to my React Weather App API!</h1>
            <h1 id="weather"> Weather: {this.state.weather} </h1>
            <div id="temp">
              Temperature: {this.state.temp} {this.state.type}
            </div>
            <div id="temp-min">
              Low: {this.state.tempMin} {this.state.type}
            </div>
            <div id="temp-max">
              High: {this.state.tempMax} {this.state.type}
            </div>
            <div id="pressure">Pressure: {this.state.pressure} mbar</div>
            <div id="humidity">Humidity: {this.state.humidity}%</div>
            <div id="sea-level">Windspeed: {this.state.windspeed} km/h</div>
            <button id="change" onClick={this.convert}>
              {this.state.changeText}
            </button>
          </div>
        );
      }
    }

    ReactDOM.render(<WeatherApp />, document.getElementById("app"));
  });
});
