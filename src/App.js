import './App.css';
import React,{useState} from 'react';
const api={
  key: "2ef8390aa5d0209f965c65f174396ef1",
  base: "https://api.openweathermap.org/data/2.5/weather"
}

function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});
  const [load,setLoad]=useState(true);
  const search=evt=>{
    if(evt.key==="Enter")
    {
      fetch(`${api.base}?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
      });
      setLoad(false);
    }
  }

  const whatToRender=()=>{
    if(load)
    {
      return (<div className="open-screen">Please enter city to search.</div>)
    }
    else if(typeof weather.main=="undefined")
      return (<div className="error">City not found. Please try again.</div>)

  }
  const backgroundChoose=()=>{
    if(typeof weather.main!="undefined" && weather.main.temp>=20)
    {
        return ("app warm");
    }
    return ("app");
  }

  const dateBuilder=(d)=>{
    let months=["January", "February", "March", "April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className={backgroundChoose()}>
     <main>
       <div className="search-box">
         <input type="text" className="search-bar" onChange={e=>setQuery(e.target.value)} value={query} onKeyPress={search} placeHolder="Search..." />
       </div>
       {typeof weather.main!="undefined"?(<div>
        <div>
         <div className="location-box">
           <div className="location">{weather.name}, {weather.sys.country}</div>
           <div className="date">{dateBuilder(new Date())}</div>

          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
       </div>
       </div>):whatToRender()}
       
     </main>
    </div>
  );
}

export default App;
