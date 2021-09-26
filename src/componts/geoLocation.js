import React, { useEffect, useState } from "react";
import axios from 'axios';
import {API_KEY} from './config'
import Hourly from "./hourly"
import "./geo.css"
    
export default function Geo() {
    const [screen4, setScreen4] = useState("screen4")
    const [screen5, setScreen5] = useState("screen5")
    const [lat,setLat] = useState([])
    const [long,setLong] = useState([])
    const [data2, setdata2] = useState([]);
    useEffect(() => {
        const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`
        
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
        axios(apiUrl2).then((response) => {
            setdata2(response.data);
            console.log(response.data,"url1")
            }).catch(() => {
                setdata2({});
        })
            
        
        console.log("Latitude is:", lat)
        console.log("Longitude is:", long)
        console.log(data2)
        
    }, [lat,long]);
        

    function kelvinToFarenheit(k)  {
        return (k - 273.15).toFixed(0);
    };

    function handleChange() {
        setScreen5("screen4")
    }

    function handleBack() {
        setScreen5("")
    }

return(
    <div>
        {screen4!==screen5 &&
        <div>
                <div>
                    <img className = "geo-location-image" src = "https://prod-discovery.edx-cdn.org/media/course/image/1bab9c85-a855-4abb-a326-9cbec5781c4c-f04010033293.small.jpg"></img>
                </div>
              {data2.city ? (
                  <div className = "geo-position">
                <div className = "screen1-loc-container">
                    <div style = {{paddingLeft:"9px"}}>
                    <div>
                        <button className = "screen1-location" onClick = {handleChange} value={data2.city.name}> {data2.city.name} </button>
                    </div>

                    <div className = "dum-location">
                        My Location
                    </div>
                    </div>
                    <div className = "screen1-temp">
                        { (data2.list[0].main.temp).toFixed(0)}&#176;
                    </div>
                    
                </div>
                </div>
                ):(
                <div></div>
            )}
        </div>}
        {screen4==screen5 &&
        <div className = "center" >
        <div className = "scr-back-div">
        <button className = "scr-back-btn" onClick = {handleBack}><a className = "scr-bac-logo"> &#xab; </a> Back</button>
        </div>
        <div className = "top" >
            {data2.city ? (
                <div className = "sub-top">                            
                    <div className = "top-name">
                        {data2.city.name}
                    </div>
            
                    <div>
                        {data2.list[0].weather[0].description}
                    </div>
                    <div className = "top-temp">
                        {(data2.list[0].main.temp)}&#176;
                    </div>
            
                    <div>
                        H: {(data2.list[0].main.temp_max).toFixed(0)}&#176;  L: { (data2.list[0].main.temp_min)}&#176;
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
            {data2.city ? (
                <div>
                    <div className = "weakly-forcast">
                        <div>Sun</div>
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[0].weather[0].icon}.png`}></img>
                        60%
                        </div>
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                        </div>
                    </div>
            
                    <div className = "weakly-forcast">
                        <div>Mon</div>
                            <div className = "weakly-image-div">
                            <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[1].weather[0].icon}.png`}></img>
                            70%
                            </div>
                            <div className = "weakly-temp">
                                <div>
                                    {   ( data2.list[0].main.temp_max).toFixed(0)}
                                </div>

                                <div>
                                    {  (data2.list[0].main.temp_min)}
                                </div>
                            </div>    
                    </div>
            
                    <div className = "weakly-forcast">
                        <div>Tue</div>
            
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[2].weather[0].icon}.png`}></img>
                        90%
                        </div>
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                            
                        </div>
                    </div>
            
                    <div className = "weakly-forcast">
                        <div>Wed</div>
            
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[3].weather[0].icon}.png`}></img>
                        90%
                        </div>
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                        </div>       
                    </div>
            
                    <div className = "weakly-forcast">
                        <div>Thu</div>
            
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[4].weather[0].icon}.png`}></img>
                        90% 
                        </div>  
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                        </div>  
            
                    </div >
            
                    <div className = "weakly-forcast">
                        <div>Fri</div>
            
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[5].weather[0].icon}.png`}></img>
                        60%
                        </div>
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                        </div>
                            
                    </div>
                    <div className = "weakly-forcast">
                        <div>Sat</div>
            
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[6].weather[0].icon}.png`}></img>
                        70% 
                        </div>  
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                        </div>  
            
                    </div>
            
                    <div className = "weakly-forcast">
                        <div>Sun</div>
            
                        <div className = "weakly-image-div">
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[7].weather[0].icon}.png`}></img>
                        70%
                        </div>
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
                            </div>
                        </div>
                            
                    </div>
            
                    <div className = "weakly-forcast">
                        <div>Mon</div>
            
                        <div className = "weakly-image-div" >
                        <img className = "weakly-image" src={`http://openweathermap.org/img/w/${data2.list[8].weather[0].icon}.png`}></img>
                        70%
                        </div>
            
                        <div className = "weakly-temp">
                            <div>
                                {   ( data2.list[0].main.temp_max).toFixed(0)}
                            </div>

                            <div>
                                {  (data2.list[0].main.temp_min)}
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
)

}