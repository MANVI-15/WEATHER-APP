const request=require('request');


const forecast=(latitude,longitude,callback)=>{
const url=`http://api.weatherstack.com/current?access_key=406563a7393ac9f69618c9a37468b6e7&query=${latitude},${longitude}`;

request({url,json: true},(error,{body})=>
{
    
    if(error)
    {
        callback("Unable to connect to the weather service",undefined);
    }
    else if(body.error)
    {
         callback("No matching result found",undefined);
    }
    else
    {
        callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out.There is a ${body.current.precip*100}% chance of rain`)
    } 
});
}

module.exports=forecast;
