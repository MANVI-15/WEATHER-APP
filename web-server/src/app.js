const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname,'../..'));


const app=express();

//Setup path for public and views for express config
const publicdir_path=path.join(__dirname,'../public');
const viewdir_path=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');


//set up handelbar engine and views folder location
app.set('view engine','hbs');
app.set('views',viewdir_path);

//set up partials path for hbs
hbs.registerPartials(partialspath);


//set up for serving static directory
app.use(express.static(publicdir_path));



app.get('',(req,res)=>{

    res.render('index',{
        title: 'WEATHER APP',
        name: 'Manvi'
    });
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title: 'HELP',
        mssg:'This page is for help',
        name: 'Manvi',
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT ME',
        name: 'Manvi'
    });
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:"You must provide a address"
        })
    }

    var location=req.query.address;
    geocode(location,(error,{latitude,longitude,location}={})=>{

        if(error)
          {
              return res.send({
                  error
              })
          }
           forecast(latitude,longitude,(error,response)=>{
            if(error)
            {
               return res.send({
                   error
               })
            }
          
           res.send({
               forecastdata: response,
               location,
               address: req.query.address
           })
            
        })
        
})
})


app.get('/help/*',(req,res)=>{
       
    res.render('404',{
        title:"404",
        name: "Manvi",
        mssg:"help article not found"
    })
})

app.get('*',(req,res)=>{
       
    res.render('404',{
        title:"404",
        name: "Manvi",
        mssg:"Page not found"
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})