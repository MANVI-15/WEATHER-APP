console.log("client side is loaded");




var weatherform=document.querySelector('form');
var search=document.querySelector('input');
var message_one=document.querySelector('#message-1');
var message_second=document.querySelector('#message-2');

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault();
    var location=search.value;
    
    message_one.textContent='Loading.....';
   message_second.textContent='';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            
            message_one.textContent=data.error;
               
        }
        else
        {
            message_one.textContent=data.location;
            message_second.textContent=data.forecastdata;
        }
    })
})
    

})