import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const BranchMarker = ({ text }) => <div style={{ fontSize: '30px' }}>{text}</div>
const API_KEY = 'AIzaSyAn5fCHB_zAPQfYTZV6VD5mVtH9ENzLCQY'

export function GoogleMap() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 9

    const branches = [
        { id: 1, name: "Tal Aviv", lat: 32.0853, lng: 34.7818 },
        { id: 2, name: "Hadra", lat: 32.458451, lng: 34.893260 },
        { id: 3, name: "Bat Yam", lat: 31.7683, lng: 35.2137 },
    ]
    

    function onMapClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    function onBranchClick(branch) {
        setCoordinates({ lat: branch.lat, lng: branch.lng })
    }

    return (
        <div>
            <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
                {branches.map((branch) => (
                    <button
                        key={branch.id}
                        onClick={() => onBranchClick(branch)}
                        style={{
                            padding: "10px",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {branch.name}
                    </button>
                ))}
            </div>

            <div style={{ marginBlock: "50px", height: "80vh", width: "80%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    center={coordinates}
                    defaultZoom={zoom}
                    onClick={onMapClick}
                >
                    {branches.map((branch) => (
                        <BranchMarker
                            key={branch.id}
                            lat={branch.lat}
                            lng={branch.lng}
                            text="📍"
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    )
}
