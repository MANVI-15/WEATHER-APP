const request=require('request');

const geocode=(address,callback)=>
{
const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5nZWwtMTUiLCJhIjoiY2twamo3ZGx0MzVidzJwbGx2OGRrdTViZSJ9.ptHVtGmjzBDoXpSMbeQz4A`

request({url,json:true},(error,{body})=>
{
    if(error)
    {
       callback("Unable to connect to internet");   
    }    
    else if(body.features.length===0)
    {
        callback("Unable to find location.Try another search.");
    }
    else
    {

      var latitude=body.features[0].center[1];
      var longitude=body.features[0].center[0];
      var place=body.features[0].place_name;
      callback(undefined,{
      latitude,
      longitude,
      location:place
    })
    }
    
 })
};


module.exports=geocode;

 