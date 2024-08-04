
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { IconContext } from "react-icons";
import { MdLocationOn } from "react-icons/md";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function StayMap({ stayLoc }) {
    const [coordinates, serCoordinates] = useState({ lat: stayLoc.lat, lng: stayLoc.lng })

    const zoom = 11


    const handleClick = (x) => {
    }


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '400px', width: 'auto', margin: 'auto' }}>
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
                        value={{ className: "my-icons-loc" }}>
                        <MdLocationOn />
                    </IconContext.Provider>}
                />

            </GoogleMapReact>

        </div>
    );
}
