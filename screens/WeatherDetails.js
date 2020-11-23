import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { getCityDataFromAPI, getLocationDataFromAPI, getDailyDataFromAPI } from '../service/service';
import { RowDaily } from '../components/RowDaily';
import { getDateTime } from '../utils/utils';
import dailyForecast from '../data/dailyforecast';

export default ({ route }) => {
  const contactInfo = route.params.contact;
//daily data fro second fetch
  const [dailyData, setDailyData] = useState([]);

  const [error, setErrorLocation] = useState("");

  //first fetch city
  const [lat, setCoordLat] = useState(0);
  const [lon, setCoordLon] = useState(0);
  const [weatherId, setWeatherId] = useState(0);
  const [weatherMain, setWeatherMain] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [mainTemp, setMainTemp] = useState(0);
  const [feelsLike, setMainFeelsLike] = useState(0);
  const [tempMin, setMainTempMin] = useState(0);
  const [tempMax, setMainTempMax] = useState(0);
  const [pressure, setMainPressure] = useState(0);
  const [humidity, setMainHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [clouds, setClouds] = useState(0);
  const [uvi, setUvi] = useState(0);


      //fetch second data, 7 daily weather prediction
  const fetchDailyData = (latitude, longitude) => {
    //service API function
    getDailyDataFromAPI(latitude, longitude).then(res => res.json())
      .then(response => {
        setUvi(response.current.uvi);
        let i;
        for (i = 0; i <= 6; i++) {
          dailyForecast[i].date=getDateTime(response.daily[i].dt).toString();
          dailyForecast[i].description=response.daily[i].weather[0].description;
          dailyForecast[i].image="http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png";
          dailyForecast[i].min=response.daily[i].temp.min;
          dailyForecast[i].max=response.daily[i].temp.max;
        }
        setDailyData(dailyForecast);
      })
  }


    //fetch first data, if here we get geolocation if not we search for city
  const fetchData = () => {
        //case its our location
    if (route.params.contact.id === "here_id") {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          //service API function
          getLocationDataFromAPI(position.coords.latitude, position.coords.longitude).then(res => res.json())
            .then(response => {
              setCoordLat(response.coord.lat);
              setCoordLon(response.coord.lon);
              setMainTemp(response.main.temp);
              setMainFeelsLike(response.main.feels_like);
              setMainTempMin(response.main.temp_min);
              setMainTempMax(response.main.temp_max);
              setMainPressure(response.main.pressure);
              setMainHumidity(response.main.humidity);
              setWeatherIcon(response.weather[0].icon);
              setWeatherId(response.weather[0].id);
              setWeatherMain(response.weather[0].main);
              setWeatherDescription(response.weather[0].description);
              setVisibility(response.visibility);
              setWindSpeed(response.wind.speed);
              setClouds(response.clouds.all);
              fetchDailyData(position.coords.latitude, position.coords.longitude);

            })
          setErrorLocation(null);

        },
        (error) => setErrorLocation(error.message),
        { enableHighAccuracy: true, timeout: 50000 },
      );
    }
    //case its a city
    else {
      //service API function
      getCityDataFromAPI(route.params.contact.name).then(res => res.json())
        .then(response => {
          setCoordLat(response.coord.lat);
          setCoordLon(response.coord.lon);
          setMainTemp(response.main.temp);
          setMainFeelsLike(response.main.feels_like);
          setMainTempMin(response.main.temp_min);
          setMainTempMax(response.main.temp_max);
          setMainPressure(response.main.pressure);
          setMainHumidity(response.main.humidity);
          setWeatherIcon(response.weather[0].icon);
          setWeatherId(response.weather[0].id);
          setWeatherMain(response.weather[0].main);
          setWeatherDescription(response.weather[0].description);
          setVisibility(response.visibility);
          setWindSpeed(response.wind.speed);
          setClouds(response.clouds.all);
          fetchDailyData(response.coord.lat, response.coord.lon);

        })
    }
  };

  //calling it here once so we dont fetch every second
  useEffect(() => {
    fetchData();
  }, []);





  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.inner}>
          <Image
            style={styles.logo}
            source={{
              uri: "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png",
            }}
          />
            <Text>Description: {weatherMain}</Text>
            <Text>Temperature: {mainTemp} ºC</Text>
            <Text>Feels like: {feelsLike} ºC</Text>
            <Text>Max temp: {tempMax} ºC</Text>
            <Text>Min temp: {tempMin} ºC</Text>

        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.inner}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <Text>Pressure: {pressure} hPa</Text>
            <Text>Humidity: {humidity} %</Text>
            <Text>Visibility: {visibility} m</Text>
            <Text>Windspeed: {windSpeed} m/s</Text>
            <Text>Clouds: {clouds} %</Text>
            <Text >UV Index: {uvi}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.boxfull}>
        <View style={styles.inner}>
          <Text style={{ fontWeight: "bold" }}>Daily forecast 7 days</Text>
          <FlatList
            style={{ flex: 1 }}
            data={dailyData}
            renderItem={({ item }) => <RowDaily item={item} />}
            keyExtractor={item => item.date}
          />
        </View>
      </View>
    </View>
  )

};




const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  box: {
    width: "50%",
    height: "50%",
    padding: 5
  },
  boxfull: {
    width: "100%",
    height: "50%",
    padding: 5
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logolong: {
    width: 600,
    height: 100,
  },
  containerItem: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 5
  }
});