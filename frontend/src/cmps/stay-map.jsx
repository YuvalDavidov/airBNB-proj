
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { GoLocation } from "react-icons/go";
import { IconContext } from "react-icons";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function StayMap({ stayLoc }) {
    // console.log(stayLoc);
    const [coordinates, serCoordinates] = useState({ lat: stayLoc.lat, lng: stayLoc.lng })

    const zoom = 11


    const handleClick = (x) => {
        console.log(x);
    }


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '400px', width: 'auto', margin: 'auto', marginBottom: '50px' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyDi7GMy6lxgjHiG_Uiom82iOxAwhazf7Ro" }}
                // defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}

            >

                <AnyReactComponent
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    text={<IconContext.Provider
                        value={{ className: "my-icons" }}>
                        <GoLocation />
                    </IconContext.Provider>}
                />

            </GoogleMapReact>

        </div>
    );
}
