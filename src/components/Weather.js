import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [realTimeData, setRealTimeData] = useState(1);
  const [timezone, setTimezone] = useState(1);

  const [realTimeCondition, setRealTimeCondition] = useState("");

  const [futureDataDay0Date, setFutureDataDay0Date] = useState("");
  const [futureDataDay1Date, setFutureDataDay1Date] = useState("");
  const [futureDataDay2Date, setFutureDataDay2Date] = useState("");
  const [futureDataDay0, setFutureDataDay0] = useState("");
  const [futureDataDay0Condition, setFutureDataDay0Condition] = useState("");
  const [futureDataDay1, setFutureDataDay1] = useState("");
  const [futureDataDay1Condition, setFutureDataDay1Condition] = useState("");
  const [futureDataDay2, setFutureDataDay2] = useState("");
  const [futureDataDay2Condition, setFutureDataDay2Condition] = useState("");

  // Get Weather Data

  let latitude = 0, longitude = 0;

  const getFutureData = async (lat, long) => {

    setIsLoading(true);

    lat = lat.toString();
    long = long.toString();
  
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8505c9ce07msh2397bcfad35ce0ap1a997ajsn8564acd48860",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`,
        options
      );
      const data = await response.json();
      console.log(latitude, longitude);
      console.log(data);
      setIsLoading(false);
      console.log(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude}%2C${longitude}&days=3`);
      setRealTimeCondition(data.current.condition.text);
      setRealTimeData(data.current);
      setTimezone(data.location);
      setFutureDataDay0Date(data.forecast.forecastday[0].date);
      setFutureDataDay1Date(data.forecast.forecastday[1].date);
      setFutureDataDay2Date(data.forecast.forecastday[2].date);
      setFutureDataDay0(data.forecast.forecastday[0].day);
      setFutureDataDay0Condition(data.forecast.forecastday[0].day.condition.text);
      setFutureDataDay1(data.forecast.forecastday[1].day);
      setFutureDataDay1Condition(data.forecast.forecastday[1].day.condition.text);
      setFutureDataDay2(data.forecast.forecastday[2].day);
      setFutureDataDay2Condition(data.forecast.forecastday[2].day.condition.text);
    } catch (error) {
      console.error(error);
    }
  };

  // Get Location Access
  
  const getLocData = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log(latitude, longitude);
          resolve();
        });
      } else {
        alert("Geolocation is not supported by this browser.");
        reject();
      }
    });
  };
  
  const getData = async () => {
    try {
      await getLocData();
      await getFutureData(latitude, longitude);
      // code to run after both functions complete their processing fully
    } catch (error) {
      // handle error
    }
  };
  
  
  return (
    <>
      <section className="bg-gray-100">
        <div className="pt-28 w-full">
          <h2 class="mb-2 mt-0 text-4xl text-center font-medium leading-tight">
            Weather Forecast
          </h2>
        </div>

        <div className="flex justify-center w-full my-16">
          <button
            className="px-6 rounded-full py-2 text-white bg-green-700"
            onClick={async (e) => {
              e.preventDefault();
                try {
                  await getLocData();
                  await getFutureData(latitude, longitude);
                } catch (error) {
                  alert("Something Went Wrong");
                }
            }}
          >
            {(isLoading)?<Spinner/>:"Give Location Access"}
          </button>
        </div>

        {/* <!-- component --> */}
        <section class="container px-4 mx-auto overflow-hidden">
          <h4 class="mb-2 mt-0 text-center text-2xl font-medium leading-tight">
            Location Info
          </h4>
          <div class="flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Country
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Location
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Region
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Local Time
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Timezone
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      <tr>
                        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {timezone.country}
                        </td>
                        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {timezone.name}
                        </td>
                        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {timezone.region}
                        </td>
                        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {timezone.localtime}
                        </td>
                        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {timezone.tz_id}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 flex">
          <div className="w-1/4">
            <section class="container px-4 mx-auto overflow-hidden">
              <h4 class="mb-2 mt-0 text-center text-2xl font-medium leading-tight">
                Real Time Info
              </h4>
              <div class="flex flex-col">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Property
                            </th>

                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Time
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.last_updated}
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Condition
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeCondition}
                            </td>
                          </tr>
                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Temperature
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.temp_c} °C
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Feels Like
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.feelslike_c} °C
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Humidity
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.humidity} %
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Precipitation
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.precip_mm} mm
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              UV
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.uv}
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Wind Degree
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.wind_degree}°
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Wind Direction
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.wind_dir}
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Wind Speed
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.wind_kph} km/h
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Visibility
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.vis_km} km
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Gust Speed
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.gust_kph} km/h
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Cloud
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.cloud}
                            </td>
                          </tr>

                          <tr>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              Is Day
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {realTimeData.is_day ? "Yes" : "No"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="w-3/4 flex">
            <div className="w-1/3">
              <section class="container px-4 mx-auto overflow-hidden">
                <h4 class="mb-2 mt-0 text-center text-2xl font-medium leading-tight">
                  Day-1
                </h4>
                <div class="flex flex-col">
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Property
                              </th>

                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Date
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0Date}
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Condition
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0Condition}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Average Humidity
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.avghumidity} %
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Average Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.avgtemp_c} °C
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Max Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.maxtemp_c} °C
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Min Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.mintemp_c} °C
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Max Wind Speed
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.maxwind_kph} km/h
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Chance of Rain
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.daily_chance_of_rain}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Will it Rain
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.daily_will_it_rain
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Chance of Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.daily_chance_of_snow}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Will it Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.daily_will_it_snow
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Total Precipitation
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.totalprecip_mm} mm
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Total Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.totalsnow_cm} cm
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                UV
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay0.uv}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-1/3">
              <section class="container px-4 mx-auto overflow-hidden">
                <h4 class="mb-2 mt-0 text-center text-2xl font-medium leading-tight">
                  Day-2
                </h4>
                <div class="flex flex-col">
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Property
                              </th>

                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Date
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1Date}
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Condition
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1Condition}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Average Humidity
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.avghumidity} %
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Average Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.avgtemp_c} °C
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Max Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.maxtemp_c} °C
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Min Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.mintemp_c} °C
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Max Wind Speed
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.maxwind_kph} km/h
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Chance of Rain
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.daily_chance_of_rain}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Will it Rain
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.daily_will_it_rain
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Chance of Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.daily_chance_of_snow}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Will it Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.daily_will_it_snow
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Total Precipitation
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.totalprecip_mm} mm
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Total Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.totalsnow_cm} cm
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                UV
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay1.uv}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-1/3">
              <section class="container px-4 mx-auto overflow-hidden">
                <h4 class="mb-2 mt-0 text-center text-2xl font-medium leading-tight">
                  Day-3
                </h4>
                <div class="flex flex-col">
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Property
                              </th>

                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Date
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2Date}
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Condition
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2Condition}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Average Humidity
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.avghumidity} %
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Average Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.avgtemp_c} °C
                              </td>
                            </tr>
                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Max Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.maxtemp_c} °C
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Min Temperature
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.mintemp_c} °C
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Max Wind Speed
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.maxwind_kph} km/h
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Chance of Rain
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.daily_chance_of_rain}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Will it Rain
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.daily_will_it_rain
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Chance of Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.daily_chance_of_snow}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Will it Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.daily_will_it_snow
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Total Precipitation
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.totalprecip_mm} mm
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                Total Snow
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.totalsnow_cm} cm
                              </td>
                            </tr>

                            <tr>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                UV
                              </td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {futureDataDay2.uv}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Weather;
