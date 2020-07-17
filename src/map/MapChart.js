import React , { Component } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const Geo = require('../data/Geo');

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const locationsUrl = 
  "http://172.22.0.1:8081/getGeoLocations"


class MapChart extends Component {


    constructor(props){

        super(props);
        this.toggleHoverMouseEnter = this.toggleHoverMouseEnter.bind(this);
        this.toggleHoverMouseLeave = this.toggleHoverMouseLeave.bind(this);
        this.state = { markers : [] }
    }

    componentDidMount(){

        Geo.getLocations(locationsUrl).then((result) => {

          let markers = []    

          for(let i = 0; i < result.cityResponse.length ; i++){

             
             markers.push( {city :result.cityResponse[i].city.names.en , 
                            location: { longitude: result.cityResponse[i].location.longitude , latitude: result.cityResponse[i].location.latitude} ,
                            showName: false});
             
             }

           this.setState({markers : [ ...new Set(markers) ]});

        }).catch((reason) => {

            alert('error loading locations: ' + reason);
        })    
    }

    toggleHoverMouseEnter( event , index) {
      
      event.preventDefault();

      let markers = this.state.markers;
      markers[index].showName = true;
      this.setState({ markers: markers });
    }

    toggleHoverMouseLeave( event , index) {
      
      event.preventDefault();

      let markers = this.state.markers;
      markers[index].showName = false;
      this.setState({ markers: markers });

    }


    render(){

        return (
            <ComposableMap >
              <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies
                    .map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        stroke="#D6D6DA"
                      />
                    ))
                }
              </Geographies>
              {this.state.markers.map(( mapper, index ) => (
                <Marker key={index} onMouseEnter={ (e) => this.toggleHoverMouseEnter(e, index)} 
                        onMouseLeave={ (e) => this.toggleHoverMouseLeave(e, index)} 
                        coordinates={ [ mapper.location.longitude , mapper.location.latitude] }>
   
                    <circle r={4} fill="#F53" />

                  <text
                    textAnchor="middle"
                    y={20}
                    style={{ fontFamily: "system-ui", fill: "#5D5A6D" , fontWeight: 'bold' , zIndex: 999}}
                  >
                    {mapper.showName ? mapper.city : ""}
                  </text>
                </Marker>
              ))}
              
              </ZoomableGroup>
            </ComposableMap>
          );
        }

}

export default MapChart;
