import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function App() {

  const [isLoading ,setIsLoading]=useState(false);

  const [data,setData]=useState([]);

  const [flagData,setFlagData]=useState([]);

  const [parsed,setParsed]=useState([]);


  const [results,setResults]=useState([]);


  function debounced(func)
  {
    let timer;
    return function(...args){
        const context = this;
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(context,args)
        },200);
    }
  }


  let optimized = debounced(handleChange);

  function handleChange(e)
  {

      
        
      let {value }=e.target;

      //console.log(e.target.value);
      console.log(value.length);
      let filtered=flagData.filter((el)=>{
          if(el['country'].includes(value))
            return true;
          else  
            return false;          
      });


      console.log(filtered);
      setResults(filtered);


      if(value.length===0)
        setResults([]);
  }



  useEffect(()=>{


    fetch("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json").then(async (res)=>{
      let data=await res.json();
      setData(data);
    });
    fetch("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-flag.json").then(async (res)=>{
      let data=await res.json();

     data= data.filter((el)=>{
          if(el.flag_base64!==null)
          return true
      })
      setFlagData(data);
    });



      /* let parsed=flagData.map((el,index)=>{
          el['capital']=data[index]['city'];
          return el;
      })

     console.log(parsed);
      setParsed(parsed);
      setIsLoading(false) */
  },[]);

  return (
    <div className="App">
      <div className="navbar">

          <div className="navbar-item">

          </div>

        <div className='container'>
          <div className='search-input'>
              <input className='input' placeholder='search countries' autoFocus={true} onChange={optimized}/>

              {isLoading===true ? <div className="lds-dual-ring"></div> : <p></p>}
          </div>

          {results.length>0? <div className='search-input results-holder'>
              {results.map((el,index)=>{
                return <div key={index} className='result'>
                  <div className='flag'>
                    <img src={`${el.flag_base64}`} className='flag'/>
                  </div>
                  <div className='country'>
                      <h5>{el.country}</h5>                    
                  </div>
                  <div className='capital'>
                    <p>{el.capital}</p>
                  </div>
                </div>
              })}

</div>:null}
          
        </div>
          


          <div className="navbar-item">

          </div>

      </div>
    </div>
  );
}

export default App;
