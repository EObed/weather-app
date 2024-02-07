import { useState } from "react";
import "./App.css";
import { FaSearch,  FaWind } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaTemperatureHalf } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Lottie from "lottie-react";
import weatheranimation from "./assets/weather-animation.json";
import sunAnimation from "./assets/sunAnimation.json";
import { MdOutlineVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function App() {
  //this hook toggles the state that displays the weather information
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);

  //toggling the navBar
  const [toggleNavBar, setToggleNavBar] = useState(false);

  //this hook is used to hold the input value
  const [inputVal, setInputVal] = useState("");

  //this hook will hold the value from the api response
  const [apiResponse, setApiResponse] = useState({});

  //this function is called when the button is pressed
  const buttonClicked = () => {
    setShowWeatherInfo(!showWeatherInfo);
    fetch(`${apiObj.url}weather?q=${inputVal}&units=metric&APPID=${apiObj.key}`)
      .then((response) => response.json())
      .then((result) => setApiResponse(result));

    setInputVal("");
  };

  //This handles what happens when the Ok button is clicked
  const handleOkClick = () => {
    setApiResponse({});
    setShowWeatherInfo(!showWeatherInfo);
  };

  // console.log(apiResponse)

  const apiObj = {
    key: "61281bed79b1fd0e3cc3e68c55a16bf4",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  //gets date and formats it so time and timezone are not displayed
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var dateWithoutTime = date.toDateString();

  return (
    <div>
      <Lottie
        animationData={weatheranimation}
        speed={0.5}
        className="absolute top-0 left-0 w-full h-full z-[-5] bg-blue-300"
      />
      <div className="w-full h-full flex flex-col z-[9] font-bold">
        <div className="headerBar  w-full p-1 flex justify-between align-center ">
          <div>Logo</div>
          <div className="text-xl font-bold">Weather App</div>
          <div>
            <button onClick={() => setToggleNavBar(!toggleNavBar)}>
            <BsThreeDotsVertical />
            </button>
          </div>
        </div>

        <div className="mainBody w-full h-full flex flex-col p-1">
          {toggleNavBar && (
            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="navBar absolute top-0 z-10 text-white bg-slate-500 w-full h-full flex flex-col items-center mt-2 p-1"
            >
              <div className="topBar w-full flex justify-between">
                <div>
                  <button onClick={() => setToggleNavBar(!toggleNavBar)}>
                    <RxCross2 />
                  </button>
                </div>
                <div>Guide</div>
                <div></div>
              </div>
              <div className="pt-2">Visbility:</div>
              <div>
                <div> &lt;1000m: Very poor </div>
                <div>1000m-2000m: Poor</div>
                <div>2000m-5000m: Moderate</div>
                <div>5000m-10000m: Fair</div>
                <div>10000m-20000m: Good</div>
                <div>&gt;20000m: Excellent</div>
              </div>
            </div>
          )}
          <div className="desc w-full flex flex-col items-center justify-center pt-5">
            <div>Welcome to the weather app</div>
            <div>Get weather updates for your location on the go</div>
          </div>
          <div className="pt-5 w-full flex justify-center items-center">
            <FaSearch className="text-slate-500" />
            <input
              onChange={(e) => setInputVal(e.target.value)}
              className="inputBox border p-1 rounded"
              placeholder="Search city..."
              type="text"
              name="cityName"
              id="cityName"
            />
            <button
              onClick={buttonClicked}
              className="p-1 ml-1 rounded text-white bg-blue-900 hover:bg-blue-600"
            >
              Go!
            </button>
          </div>
          {showWeatherInfo &&
            apiResponse &&
            apiResponse.main &&
            apiResponse.weather &&
            apiResponse.visibility &&
            apiResponse.wind && (
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="w-full h-auto flex flex-col items-center mt-2 absolute top-5 text-white bg-blue-600 left-0"
              >
                <div className="pt-1 font-[500] text-lg">{dateWithoutTime}</div>
                <div className="pt-2 pb-1 text-2xl font-extrabold">
                  {" "}
                  {apiResponse.name}
                </div>
                <div className="weatherLottie pt-1 pb-1">
                  <Lottie animationData={sunAnimation} />
                </div>
                <div className="pt-2 text-lg font-[400]">
                  {apiResponse.weather[0].main}
                </div>
                <div className="pt-1 pb-1 w-auto flex items-center justify-center text-xl font-bold">
                  <div className="text-slate-400">
                    <FaTemperatureHalf />
                  </div>
                  {apiResponse.main.temp}°C
                </div>
                <div className="weatherItemsbox p-1 pl-2 pr-2 flex">
                  <div className=" w-[33%] flex flex-col items-center justify-center">
                  <div className="h-auto">Humidity</div> <div className="text-white h-auto"><WiHumidity size={30}/></div> <div className="h-auto">{apiResponse.main.humidity} %</div>
                  </div>
                  <div className=" w-[33%] flex flex-col items-center justify-center">
                    <div className="h-auto">Visibility</div> <div className="text-white h-auto"><MdOutlineVisibility size={30}/></div> <div className="h-auto">{apiResponse.visibility} m</div>
                  </div>
                  <div className=" w-[33%]  flex flex-col items-center justify-center">
                  <div className="h-auto">Wind speed:</div>  <div className="text-white h-auto"><FaWind  size={30}/></div> <div>{apiResponse.wind.speed} m/s</div>
                  </div>
                </div>
                <div className="okButton w-full flex items-center pt-1 justify-center">
                  <button
                    onClick={handleOkClick}
                    className="rounded w-auto p-1 text-white bg-blue-900 hover:bg-blue-700"
                  >
                    Ok 👍
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
