import React,{useState} from 'react';
const About = () => {
  const [Name,setName]=useState('');
  const [Naame,setNaame]=useState('');
  const [Article,setArticle]=useState('');
  const data=async ()=>{
    try{
    const h= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Name}&appid=159af675c83ced7bd4a91329c4bb8c90`);
    const g=await h.json();
    setArticle(g);}
    catch(error){
      console.log("error",error);
    }
  }
  const city=(e)=>{
    setNaame(e.target.value);
  }
  const diff=()=>{
    setName(Naame);
    data();
  }
  let im = null;
  let des=null;
  let wi=null;
  let des1=null;
  if(Article && Article.weather){
  im = Article.weather[0].icon;
  wi=`http://openweathermap.org/img/wn/${im}.png`;
  des=Article.weather[0].main;
  des1=Article.weather[0].description;
  }
  

  let tempe=0;
  let tempe1=0;
  let tempe2=0;
  let feels=0;
  if(Article && Article.main){
    tempe=Math.round((Article.main.temp)-273);
    tempe1=Math.round((Article.main.temp_min)-273.15);
    tempe2=Math.round((Article.main.temp_max)-273.15);
    feels=Math.round((Article.main.feels_like)-273.15);
  }
  let place=null;
  let country=null;
  if(Article && Article.name && Article.sys){
    place=Article.name;
    country=Article.sys.country;
  }
  let speed=null;
  if(Article && Article.wind){
    speed=Article.wind.speed;
  }
  const check=Article.message ;
   
  const handle=(e)=>{
    const key=e.key;
    if(key === 'Enter'){
      setName(Naame);
      data();
    }
  }
  
  
  return (
    <div className="house">
      <div className="container c">
        <div className="container border-2 rounded my-5 change">
          <div>
        <b><input className="my-3 h-100 border-2 rounded-pill"onKeyDown={handle}value={Naame} onChange={city} type="text"placeholder="Enter place" /></b> 
        
         <button className="border-0 mh-100 gg"style={{width:"0%" ,background:"transparent"}} onClick={diff}> <i className="fa-solid fa-magnifying-glass-location fa-beat"></i></button>
         </div>
         {check === "city not found"?<div>
         <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Enter a valid place!!</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
         </div>:""}
         <div className="border-0"><img className="jal border-0"src={wi} style={{height:"100px",width:"100px"}} /></div>
         <h1 className="display-1 border-3 border-bottom">{tempe}<sup>o</sup>C<h3>Feels Like : {feels}<sup>o</sup>C</h3></h1>
         <h1 className="border-3 border-bottom" >{place} | {country}</h1>
         <h1 className="border-3 border-bottom">{des} | {des1}</h1>
        
         <h2 className="border-3 border-bottom">min : {tempe1}<sup>o</sup>C |  max : {tempe2}<sup>o</sup>C</h2>
         <p className="border-3 border-bottom h3">Wind Speed  :  {speed}km/h</p>


        </div>
      </div>
    </div>
  )
}
export default About;
