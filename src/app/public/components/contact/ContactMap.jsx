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

// Custom marker icon using your color scheme
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C11.0295 2 7 6.0295 7 11C7 16.5 16 30 16 30C16 30 25 16.5 25 11C25 6.0295 20.9705 2 16 2Z" fill="#D4A574" stroke="#8B6F47" stroke-width="2"/>
      <circle cx="16" cy="11" r="4" fill="#FFFFFF"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ContactMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Barangay coordinates
  const position = [14.821869263386215, 121.06262502359284];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const mapInfo = {
    address: "Barangay Hall, Main Street, Quezon City, Metro Manila",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    weekend: "Saturday: 9:00 AM - 3:00 PM",
    phone: "+63 (02) 8123-4567",
    emergency: "911 or 117",
  };

  return (
    <div className="space-y-6" id="office-location">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Visit Our Office
        </h2>
        <p className="text-muted-foreground text-lg">
          Find us on the map and plan your visit
        </p>
      </div>

      {/* Map Container */}
      <div className="card-glass rounded-2xl overflow-hidden">
        {/* Map */}
        <div className="h-80 bg-muted/20 relative">
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
                  <div className="p-2">
                    <h3 className="font-semibold text-foreground mb-2">
                      Barangay Hall
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {mapInfo.address}
                    </p>
                    <div className="space-y-1 text-xs">
                      <p>
                        <strong>Hours:</strong> {mapInfo.hours}
                      </p>
                      <p>
                        <strong>Weekend:</strong> {mapInfo.weekend}
                      </p>
                      <p>
                        <strong>Phone:</strong> {mapInfo.phone}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {/* Map Info Panel */}
        <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-beige-300/30">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Address & Directions */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
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
                Address & Directions
              </h4>
              <p className="text-muted-foreground mb-3">{mapInfo.address}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                  onClick={() => {
                    navigator.clipboard.writeText(mapInfo.address);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Address
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Visitor Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Office Hours:</span>
                  <span className="text-foreground font-medium">
                    Mon-Fri 8AM-5PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weekend:</span>
                  <span className="text-foreground font-medium">
                    Sat 9AM-3PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground font-medium">
                    {mapInfo.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency:</span>
                  <span className="text-destructive font-medium">
                    {mapInfo.emergency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            <h5 className="font-semibold text-blue-900">Public Transport</h5>
          </div>
          <p className="text-sm text-blue-700">
            Accessible via jeepney, bus, and MRT stations nearby
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            <h5 className="font-semibold text-green-900">Parking Available</h5>
          </div>
          <p className="text-sm text-green-700">
            Free parking spaces available for visitors
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h5 className="font-semibold text-orange-900">Security</h5>
          </div>
          <p className="text-sm text-orange-700">
            24/7 security and visitor registration required
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
