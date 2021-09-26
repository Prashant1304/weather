import './App.css';
import Hourly from "./componts/hourly"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {API_KEY} from './componts/config'
import Geo from "./componts/geoLocation"
var weatherImage = ["https://cdn.cultofmac.com/wp-content/uploads/2018/08/weather.4f658fc3b16541d992d119f6bd24e4b3-780x585.jpg","https://chrismartinphotography.files.wordpress.com/2014/04/night-snow-c2a9-christopher-martin-437078.jpg","https://images.unsplash.com/photo-1516490981167-dc990a242afe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGxpZ2h0bmluZ3xlbnwwfHwwfHw%3D&w=1000&q=80","https://prod-discovery.edx-cdn.org/media/course/image/1bab9c85-a855-4abb-a326-9cbec5781c4c-f04010033293.small.jpg"]
export default function App() {
    
    const [data, setData] = useState([]);
    const [weatherImages, setWeatherImages] = useState([]);
    const [multiData, setMultisData] = useState([]);
    const [value, setValue] = useState("");
    const [locations, setLocations] = useState([]);
    const [screen1, setScreen1] = useState("screen1")
    const [screen2, setScreen2] = useState("screen2")
    const [screen3, setScreen3] = useState("screen3")
    const [randomNum, setrandomNum] = useState("")
    let date = new Date()
    console.log(date.getHours()+":"+date.getMinutes())

    const [locationData, setLocationData] = useState("");
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationData}&appid=${API_KEY} `;
    
    useEffect(() => {
        axios(apiUrl).then((response) => {
        setData(response.data);
        console.log(response.data,"url1")
        console.log(locationData)
        }).catch(() => {
            setData({});
        })

    }, [apiUrl]);
    

    function  handleInput(e) {
        let target = e.target.value
        setValue(target)
    }
    
    function handleButton() {
        let random = Math.floor(Math.random() * (29 - 25 + 1) + 25)  
        setrandomNum(random)
        setLocations([value, ...locations]);
        setValue("")
        setLocationData(value)
        setMultisData([...multiData,data])
        setScreen1("")
        let wImageRandom = Math.floor(Math.random()*3)
        setWeatherImages([weatherImage[wImageRandom],...weatherImages])
        console.log(wImageRandom)
    }
    
    function handleLocationButton(e) {
        
        let target = e.target.value
        setLocationData(target)
        setScreen1("screen2")
    }

    function kelvinToFarenheit(k)  {

        return (k - 273.15).toFixed(0);
    };

    function meterToKiloMeter(k) {
        return (k / 1000)
    }

    function handleBack() {
        setScreen1("screen1")
    }
    

    function handleSearchbox() {
        setScreen1("screen3")
    }

      
  return (
    <div className="App">
        
        <div className = "positioning" >
            
            <div>
                <div classNam = "header" >
                    {screen1 === screen3 &&
                    <div className = "sub-header" >
                        <div>
                       </div>

                        <div className = "search-main">
                       <div className = "search-submain">
                            <input className = "search-input" type="text" onChange={handleInput}  value={value} />
                        </div>
                        <div>
                            <button className = "search-button" onClick={handleButton} >ADD</button>
                        </div>
                        </div>
                    </div>}

                </div>
            </div>
            {screen1!==screen2 &&
            <div>
                <div>
                    <Geo/>
                </div>
                {weatherImages.map(x => <div>
                    <div className = "screen-img-padd">
                        <img className = "scr1-weather-image"  src = {weatherImages} ></img>
                    </div>
                </div>)}
                <div className = "screen-loc-main" >
                    {locations.map((location) =>
                        <div className = "screen-loc-container" >
                            <div className = "padding-sub-cont">
                                <div style = {{paddingLeft:"4px"}}>{date.getHours()+":"+date.getMinutes()}</div>
                                <div><button className = "screen-loc-byn" onClick = {handleLocationButton} value={location}  > {location}  </button> </div>
                            </div>
                            <div className = "screen-temp">
                            {randomNum}&#176;
                            </div>
                        </div>
                    )}
                </div>

                
                    
                <div className = "screen1-fooder">
                    <div className = "c-f" > &#176;C/&#176;F </div>
                    <div >
                        <img className="w-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/The_Weather_Channel_logo_1996-2005.svg/2560px-The_Weather_Channel_logo_1996-2005.svg.png"></img>
                    </div>
                    <div onClick = {handleSearchbox}> &#128269; </div>
                </div>
            </div>}

            <div>
                {screen1==screen2 &&
                <div className = "center" >
                    <div className = "scr-back-div">
                    <button className = "scr-back-btn" onClick = {handleBack}><a className = "scr-bac-logo"> &#xab; </a> Back</button>
                    </div>
                    <div className = "top" >
                        {data.city ? (
                            <div className = "sub-top">                            
                                <div className = "top-name">
                                    {data.city.name}
                                </div>
                        
                                <div>
                                    {data.list[0].weather[0].description}
                                </div>
                                <div className = "top-temp">
                                    {kelvinToFarenheit  (data.list[0].main.temp)}&#176;
                                </div>
                        
                                <div>
                                    H: {kelvinToFarenheit  (data.list[0].main.temp_max)}&#176;  L: {kelvinToFarenheit  (data.list[0].main.temp_min)}&#176;
                                </div>
                            </div>
                        ):(
                            <div>
                                
                            </div>
                        ) }
                    </div>

                        <div className = "div-line"></div>

                    <div>
                        <Hourly/>
                    </div>

                        <div className = "div-line"></div>

                    <div>
                        {data.city ? (
                            <div>
                                <div className = "weakly-forcast">
                                    <div>Sun</div>
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`}></img>
                                    60%
                                    </div>
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>
                                </div>
                        
                                <div className = "weakly-forcast">
                                    <div>Mon</div>
                                        <div className = "weakly-image-div">
                                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`}></img>
                                        70%
                                        </div>
                                        <div className = "weakly-temp">
                                            <div>
                                                { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                            </div>

                                            <div>
                                                {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                            </div>
                                        </div>    
                                </div>
                        
                                <div className = "weakly-forcast">
                                    <div>Tue</div>
                        
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`}></img>
                                    90%
                                    </div>
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                        
                                    </div>
                                </div>
                        
                                <div className = "weakly-forcast">
                                    <div>Wed</div>
                        
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`}></img>
                                    90%
                                    </div>
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>       
                                </div>
                        
                                <div className = "weakly-forcast">
                                    <div>Thu</div>
                        
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`}></img>
                                    90% 
                                    </div>  
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>  
                        
                                </div >
                        
                                <div className = "weakly-forcast">
                                    <div>Fri</div>
                        
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[5].weather[0].icon}.png`}></img>
                                    60%
                                    </div>
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>
                                        
                                </div>
                                <div className = "weakly-forcast">
                                    <div>Sat</div>
                        
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[6].weather[0].icon}.png`}></img>
                                    70% 
                                    </div>  
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>  
                        
                                </div>
                        
                                <div className = "weakly-forcast">
                                    <div>Sun</div>
                        
                                    <div className = "weakly-image-div">
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`}></img>
                                    70%
                                    </div>
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>
                                        
                                </div>
                        
                                <div className = "weakly-forcast">
                                    <div>Mon</div>
                        
                                    <div className = "weakly-image-div" >
                                    <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data.list[8].weather[0].icon}.png`}></img>
                                    70%
                                    </div>
                        
                                    <div className = "weakly-temp">
                                        <div>
                                            { kelvinToFarenheit  ( data.list[0].main.temp_max)}
                                        </div>

                                        <div>
                                            {kelvinToFarenheit  (data.list[0].main.temp_min)}
                                        </div>
                                    </div>
                                        
                                </div>
                            </div>
                        ):(
                            <div>
                            </div>
                        )}
                    </div>
                    <div className = "div-line"></div>
                </div>}
            </div>
      </div>
    </div>
  );
}