/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        initMap();
    }
};


function mark(map) {

    var Pos = [[11, 75, 'Anandus Tree 1'], [11, 12, 'Anandus Tree 2'], [11, 76, 'Anandus Tree 3'], [11, 80, 'Anandus Tree 4'], [12, 55, 'Anandus Tree 5'], [13, 44, 'Anandus Tree 6'], [31, 44, 'Anandus Tree 7'], [13, 77, 'Anandus Tree 8'], [11, 90, 'Anandus Tree 9'], [10, 70, 'Anandus Tree 10']];
    var markers = [];
   
    var infowindows = [];


    
    for (i = 0; i < 10; i++) {

        markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(Pos[i][0], Pos[i][1]),
            map: map,
            title: 'samplemarker'
        });
        markers[i].index = i;


        infowindows[i] = new google.maps.InfoWindow({
            content: Pos[i][2],
            maxWidth: 300
        });
        
        google.maps.event.addListener(markers[i], 'click', function () {
            console.log(this.index); // this will give correct index
            console.log(i); //this will always give 10 for you
            infowindows[this.index].open(map, markers[this.index]);
            map.panTo(markers[this.index].getPosition());
        });
    }

  

}



function initMap() {

//    if (localStorage.getItem('userInfo') == null) {
//        alert('notlogged');
//    }

//    else { alert(localStorage.getItem('userInfo')); }



    var watchID = null;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
    });
   

    mark(map);





    var infowindow = new google.maps.InfoWindow();
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    var marker = new google.maps.Marker({ map: map,
        icon: image
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        
        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };


            marker.setPosition(pos);
            infowindow.setContent('<a href="#" onclick="addT(' + pos.lat + ',' + pos.lng + ')">Add My Tree Here</a>');

           
            map.setCenter(pos);
        }, onError, options);





    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
}
function addT(lat, lng) {

    localStorage.setItem('userInfo', 'sss' + lat + ',' + lng);

    alert(lat + ',' + lng);

}







