import React, { Component } from 'react';
// import LineTo from "react-lineto";

import axios from 'axios';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { mostrarPedidos } from '../../../actions/pedidosAction';



//Map

// const APP_ID_HERE = 'N0fRlxF32W9uEEuH5ZSv';
// const APP_CODE_HERE = '0eDtrgamyvY1fxPeA8m0OQ';
var location = [
  // ["loan 1", 33.890542, 151.274856, "address 1"],
  // ["loan 2", 33.923036, 151.259052, "address 2"],
  // ["loan 3", 34.028249, 151.157507, "address 3"],
  // ["loan 4", 33.80010128657071, 151.28747820854187, "address 4"],
  // ["loan 5", 33.950198, 151.259302, "address 5"]
];

var order_id = [];

class MapaPedidos extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      map: false,
    };
  }
  
  componentDidMount(){
    
    this.props.mostrarPedidos();
  }
  
  componentDidUpdate(){
    
        if (!this.state.map) {

            const pedidos = this.props.pedidos;
            for (var i = 0; i < pedidos.length; i++) {
              location.push(pedidos[i].Adress.LatLong.split(";"));
              order_id.push(pedidos[i].id);
            }
              var platform = new window.H.service.Platform({
                apikey: "SjrlBpFRW1Pv024lspKZ40wpc0KTwDynySLGaLVk_JY"
                // apikey: "AIzaSyDFJfmRt08bR_zjkTBUjzpnibEcMgUvmKs"
              });
              var defaultLayers = platform.createDefaultLayers();

              //Step 2: initialize a map - this map is centered over Europe
              if (location.length === 0) {
                var map = new window.H.Map(
                  document.getElementById("map"),
                  defaultLayers.vector.normal.map, {
                    center: {
                      lat: "-34.5",
                      lng: "-58.6"
                    },
                    zoom: 10,
                    pixelRatio: window.devicePixelRatio || 1
                  }
                );
              } else {
      
                var map = new window.H.Map(
                  document.getElementById("map"),
                  defaultLayers.vector.normal.map,
                  {
                    center: { lat: location[0][0], lng: location[0][1] },
                    zoom: 10,
                    pixelRatio: window.devicePixelRatio || 1
                  }
                );
              }
              // add a resize listener to make sure that the map occupies the whole container
              window.addEventListener("resize", () => map.getViewPort().resize());
      
              //Step 3: make the map interactive
              // MapEvents enables the event system
              // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
              var behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      
              // Create the default UI components
              var ui = window.H.ui.UI.createDefault(map, defaultLayers);
      
              this.addMarkersToMap(map);
              // this.props.mostrarEmpleados();
              this.setState({ map: true });
        }

      // }
    }

    addMarkersToMap(map) {
        var currentPosition = null;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            currentPosition = position.coords;
          });
        } else {
          console.error("Geolocation is not supported by this browser!");
        }
        var marker, i;
        for (i = 0; i < location.length; i++) {

            var lat = location[i][0];
            var long = location[i][1];
            
            var outerElement = document.createElement('div'),
              innerElement = document.createElement('div');

            outerElement.style.userSelect = 'none';
            outerElement.style.webkitUserSelect = 'none';
            outerElement.style.msUserSelect = 'none';
            outerElement.style.mozUserSelect = 'none';
            outerElement.style.cursor = 'default';

            innerElement.style.color = 'black';
            innerElement.style.font = 'bold 14px arial';
            innerElement.style.lineHeight = '14px'

            innerElement.style.paddingTop = '2px';
            innerElement.style.paddingLeft = '4px';
            innerElement.style.width = 'auto';
            innerElement.style.height = 'auto';

            // add negative margin to inner element
            // to move the anchor to center of the div
            innerElement.style.marginTop = '-60px';
            innerElement.style.marginLeft = '-27px';

            outerElement.appendChild(innerElement);

            // Add text to the DOM element
            innerElement.innerHTML = 'Pedido ' + order_id[i];

            function changeOpacity(evt) {
              evt.target.style.opacity = 0.6;
            };

            function changeOpacityToOne(evt) {
              evt.target.style.opacity = 1;
            };

            //create dom icon and add/remove opacity listeners
            var domIcon = new window.H.map.DomIcon(outerElement, {
              // the function is called every time marker enters the viewport
              onAttach: function (clonedElement, domIcon, domMarker) {
                clonedElement.addEventListener('mouseover', changeOpacity);
                clonedElement.addEventListener('mouseout', changeOpacityToOne);
              },
              // the function is called every time marker leaves the viewport
              onDetach: function (clonedElement, domIcon, domMarker) {
                clonedElement.removeEventListener('mouseover', changeOpacity);
                clonedElement.removeEventListener('mouseout', changeOpacityToOne);
              }
            });

            marker = new window.H.map.Marker({lat: lat, lng: long});
            map.addObject(marker);

            var bearsMarker = new window.H.map.DomMarker({
              lat: lat,
              lng: long
            }, {
              icon: domIcon
            });
            map.addObject(bearsMarker);
        }
        var outerElement = document.createElement('div'),
          innerElement = document.createElement('div');

        outerElement.style.userSelect = 'none';
        outerElement.style.webkitUserSelect = 'none';
        outerElement.style.msUserSelect = 'none';
        outerElement.style.mozUserSelect = 'none';
        outerElement.style.cursor = 'default';

        innerElement.style.color = 'black';
        innerElement.style.font = 'bold 14px arial';
        innerElement.style.lineHeight = '14px'

        innerElement.style.paddingTop = '2px';
        innerElement.style.paddingLeft = '4px';
        innerElement.style.width = 'auto';
        innerElement.style.height = 'auto';

        // add negative margin to inner element
        // to move the anchor to center of the div
        innerElement.style.marginTop = '-60px';
        innerElement.style.marginLeft = '-45px';

        outerElement.appendChild(innerElement);

        // Add text to the DOM element
        innerElement.innerHTML = 'Restaurant';

        function changeOpacity(evt) {
          evt.target.style.opacity = 0.6;
        };

        function changeOpacityToOne(evt) {
          evt.target.style.opacity = 1;
        };

        //create dom icon and add/remove opacity listeners
        var domIcon = new window.H.map.DomIcon(outerElement, {
          // the function is called every time marker enters the viewport
          onAttach: function (clonedElement, domIcon, domMarker) {
            clonedElement.addEventListener('mouseover', changeOpacity);
            clonedElement.addEventListener('mouseout', changeOpacityToOne);
          },
          // the function is called every time marker leaves the viewport
          onDetach: function (clonedElement, domIcon, domMarker) {
            clonedElement.removeEventListener('mouseover', changeOpacity);
            clonedElement.removeEventListener('mouseout', changeOpacityToOne);
          }
        });
        if ( currentPosition !== null ) {

          marker = new window.H.map.Marker({
            lat: currentPosition.latitude,
            lng: currentPosition.longitude
          });
          map.addObject(marker);

          var bearsMarker = new window.H.map.DomMarker({
            lat: currentPosition.latitude,
            lng: currentPosition.longitude
          }, {
            icon: domIcon
          });
          map.addObject(bearsMarker);
        } else {
          
          marker = new window.H.map.Marker({
            lat: "-34.5",
            lng: "-58.6" // you can add marker here. set specific lat and long
          });
          map.addObject(marker);

          var bearsMarker = new window.H.map.DomMarker({
            lat: "-34.5",
            lng: "-58.6" //"My position" label
          }, {
            icon: domIcon
          });
          map.addObject(bearsMarker);
        }

    }
    
    render() {

        return (
          <React.Fragment>
              <div
                id="map"
                style={{ width: "95%", height: "450px", background: "grey" }}
              ></div>
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
  pedidos: state.pedidos.pedidos,
});

export default connect(mapStateToProps, {
  mostrarPedidos,
})(MapaPedidos);