import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Enhanced custom marker with professional government styling
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3C14.477 3 10 7.477 10 13C10 19.5 20 37 20 37C20 37 30 19.5 30 13C30 7.477 25.523 3 20 3Z" fill="#C19A6B" stroke="#8B6F47" stroke-width="3"/>
      <circle cx="20" cy="13" r="5" fill="#FFFFFF" stroke="#6B5B47" stroke-width="2"/>
      <circle cx="20" cy="13" r="2" fill="#D4A574"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const ContactMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Barangay coordinates
  const position = [14.821869263386215, 121.06262502359284];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const mapInfo = {
    address: "Kaypian Barangay Hall, R3C7+M2Q, SJDM, 3023 Bulacan",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    weekend: "Saturday: 8:00 AM - 12NN",
    phone: "+63 (02) 8123-4567",
    emergency: "911 or 117",
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(mapInfo.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy address");
    }
  };

  return (
    <div className="space-y-8" id="office-location">
      {/* Enhanced Header */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-4">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <span className="text-sm font-semibold text-primary">
            Official Location
          </span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Visit Our Office
        </h2>
        <p className="text-beige-700 text-lg font-medium">
          Find us on the map and plan your visit to our government facility
        </p>
      </div>

      {/* Enhanced Map Container */}
      <div className="bg-white/90 backdrop-blur-sm border-2 border-beige-400/40 rounded-3xl overflow-hidden shadow-2xl">
        {/* Map */}
        <div className="h-96 bg-beige-100/50 relative">
          {isLoaded ? (
            <MapContainer
              center={position}
              zoom={16}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <h3 className="font-bold text-lg text-foreground">
                        Kaypian Barangay Hall
                      </h3>
                    </div>
                    <p className="text-beige-700 font-medium mb-3">
                      {mapInfo.address}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-beige-600">
                          Hours:
                        </span>
                        <span className="text-foreground font-semibold">
                          {mapInfo.hours}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-beige-600">
                          Weekend:
                        </span>
                        <span className="text-foreground font-semibold">
                          {mapInfo.weekend}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-beige-600">
                          Phone:
                        </span>
                        <span className="text-foreground font-semibold">
                          {mapInfo.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-beige-700 font-medium text-lg">
                  Loading interactive map...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Map Info Panel */}
        <div className="p-8 bg-gradient-to-br from-beige-50 to-white border-t-2 border-beige-300">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Address & Directions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-xl text-foreground">
                  Address & Navigation
                </h4>
              </div>
              <p className="text-beige-800 font-medium text-lg mb-6">
                {mapInfo.address}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-primary hover:bg-beige-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Get Directions
                </a>
                <button
                  onClick={handleCopyAddress}
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-beige-100 border-2 border-beige-400 hover:border-beige-500 text-beige-800 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      copySuccess
                        ? "text-success scale-110"
                        : "group-hover:scale-110"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {copySuccess ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    )}
                  </svg>
                  {copySuccess ? "Copied!" : "Copy Address"}
                </button>
              </div>
            </div>

            {/* Enhanced Quick Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-400/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-xl text-foreground">
                  Visitor Information
                </h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-beige-300">
                  <span className="text-beige-700 font-medium">
                    Office Hours:
                  </span>
                  <span className="text-foreground font-bold">
                    Mon-Fri 8AM-5PM
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-beige-300">
                  <span className="text-beige-700 font-medium">Weekend:</span>
                  <span className="text-foreground font-bold">Sat 9AM-3PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-beige-300">
                  <span className="text-beige-700 font-medium">Phone:</span>
                  <span className="text-foreground font-bold">
                    {mapInfo.phone}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-error/10 rounded-lg border border-error/30">
                  <span className="text-error font-medium">Emergency:</span>
                  <span className="text-error font-bold">
                    {mapInfo.emergency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Transportation Info using global.css colors */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-4a2 2 0 00-2-2H8z"
                />
              </svg>
            </div>
            <h5 className="font-bold text-lg text-foreground">
              Public Transport
            </h5>
          </div>
          <p className="text-beige-700 font-medium">
            Accessible via jeepney routes, city buses, and nearby MRT stations
            with covered walkways
          </p>
        </div>

        <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h5 className="font-bold text-lg text-foreground">Free Parking</h5>
          </div>
          <p className="text-beige-700 font-medium">
            Dedicated parking spaces available for government service visitors -
            no fees required
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
