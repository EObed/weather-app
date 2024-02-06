import { useState } from "react";
import "./App.css";
import { IoMdMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Lottie from "lottie-react";
import weatheranimation from "./assets/weather-animation.json"
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();


function App() {
  //toggling the navBar
  const [toggleNavBar, setToggleNavBar] = useState(false);

  //this hook is used to hold the input value
  const [inputVal, setInputVal] = useState("")

  //this hook will hold the value from the api response
  const [apiResponse , setApiResponse] = useState({})

  //this function is called when the button is pressed 
  const buttonClicked = () => {
    fetch(`${apiObj.url}weather?q=${inputVal}&units=metric&APPID=${apiObj.key}`)
    .then((response)=> response.json())
    .then((result)=> setApiResponse(result))

    setInputVal("")
  } 

  console.log(apiResponse)

  const apiObj = {
    key: "61281bed79b1fd0e3cc3e68c55a16bf4",
    url: "https://api.openweathermap.org/data/2.5/"
  } 

  
  // const lottieOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: weatheranimation,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }}


  return (
    <div>
      <Lottie animationData={weatheranimation} className="absolute top-0 left-0 w-full h-full z-[-5]" />
      <div className="w-full h-full flex flex-col z-[9]">
      
        <div className="headerBar w-full p-1 flex justify-between align-center ">
          <div>Logo</div>
          <div className="text-xl font-bold">Weather App</div>
          <div><button onClick={()=>setToggleNavBar(!toggleNavBar)}><IoMdMenu /></button></div>
        </div>

        <div className="mainBody w-full h-full flex flex-col p-1">
        {toggleNavBar && (
          <div data-aos="fade-left"  data-aos-duration="2000" className="navBar absolute right-0 top-0 z-10 text-white bg-slate-500 w-full h-full flex flex-col items-center mt-2 p-1">
            <div className="topBar w-full flex justify-between">
              <div><button onClick={()=>setToggleNavBar(!toggleNavBar)}><RxCross2 /></button></div>
              <div>Recent searches</div>
              <div></div>
            </div>
            <div className="pt-2">
              The saved items appear here
            </div>
          </div>
        )}
          <div className="desc w-full flex flex-col items-center justify-center pt-5">
            <div>Welcome to the weather app</div>
            <div>Get weather updates for your location on the go</div>
          </div>
          <div className="pt-5 w-full flex justify-center items-center">
            <FaSearch className="text-slate-500"/>
            <input onChange={(e)=> setInputVal(e.target.value)} className="inputBox border p-1 rounded" placeholder="Search city..." type="text" name="cityName" id="cityName"  />
            <button onClick={buttonClicked} className="p-1 ml-1 rounded text-white bg-blue-900 hover:bg-blue-600">Go!</button>
          </div>
          {apiResponse && apiResponse.main && (
          <div className="w-full flex flex-col mt-2">
            <p>City: {apiResponse.name}</p>
            <p>Temperature: {apiResponse.main.temp}</p>
            <p>Humidity: {apiResponse.main.humidity}</p>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
