import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {API_KEY} from './componts/config'
export default function App() {
    
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [bool, setBool] = useState(false);

    const [locationData, setLocationData] = useState("");
    const date = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = date.getDay()
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationData}&appid=${API_KEY}`;

    useEffect(() => {
        axios(apiUrl).then((response) => {
        setData(response.data);
        console.log(response.data)
        console.log(locationData)
        }).catch(() => {
            setData({});
        })
    }, [apiUrl]);
  

    function  handleInput(e) {
        let target = e.target.value
        setValue(target)
        console.log(target)
    }
    
    function handleButton() {
        setLocationData(value )
        setBool(true)
    }

    function kelvinToFarenheit  (k)  {
        return (k - 273.15).toFixed(2);
    };

    function meterToKiloMeter (k) {
        return (k / 1000)
    }
  
  
  return (
    <div className="App">
        <div className="img-main">
        <img className="img" src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" ></img>
        </div>
        <div className = "positioning" >
            <div classNam = "header" >

                <div className = "sub-header" >
                    <div>
                        <p> Please enter city name </p>
                   </div>

                   <div>
                        <input type="text" onChange={handleInput}  value={value} />
                    </div>
                    <div>
                        <button onClick={handleButton} >Search</button>
                    </div>
                </div>

            </div>

            <div className = "center" >
                {bool&&
                <div>
                    {data.main ? (
                        <div>

                                <div className = "C-eather">
                                    <div>
                                        <p>Current Weather</p>
                                    </div>

                                    <div>
                                        {days[day]}  {date.getDate()}
                                    </div>
                                </div>
                                <div className = "temp" >
                                    <div>
                                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}></img>
                                    </div>

                                    <div className = "temp-celcious">
                                        {kelvinToFarenheit(data.main.temp)}&#176;C
                                    </div>
                                </div>

                            <div className = "description" >
                                <div className = "sub-description">

                                    <div>
                                        {data.weather[0].description}
                                    </div>

                                    <div>
                                        feels like:  {kelvinToFarenheit(data.main.feels_like)}&#176;C
                                    </div>

                                    <div>
                                        Humidity: <a> {data.main.humidity}% </a> 
                                    </div>
                                </div>

                                <div className = "sub-description">
                                    <div>
                                        Wind:    W {data.wind.speed}km/h 
                                    </div>

                                    <div>
                                        pressure: {data.main.pressure} mbar
                                    </div>

                                    <div>
                                        visibility:  {meterToKiloMeter( data.visibility)} km
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div>
                            
                        </div>
                    ) }
                </div>}

            </div>
      <div>
        {/* {data.coord.lat} */}
      </div>
      </div>
    </div>
  );
}