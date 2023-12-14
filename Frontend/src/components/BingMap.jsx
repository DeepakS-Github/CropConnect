import React, { useEffect, useRef } from "react";

const BingMap = ({ isModalOpen, setFormData }) => {
  const mapRef = useRef(null);
  const locationInputRef = useRef(null);
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  let map;
  let locationPin;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      `https://www.bing.com/api/maps/mapcontrol?callback=initMap&key=${import.meta.env.VITE_BING_MAP_API_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && !map && isModalOpen) {
      window.initMap();
    }
  }, [isModalOpen, mapRef, map]);

  window.initMap = () => {
    map = new window.Microsoft.Maps.Map(mapRef.current, {
      credentials: import.meta.env.VITE_BING_MAP_API_KEY,
    });

    window.Microsoft.Maps.Events.addHandler(map, "click", handleMapClick);

    window.Microsoft.Maps.loadModule("Microsoft.Maps.Location", () => {
      const getCurrentLocationButton =
        new window.Microsoft.Maps.Location.LocationButton(map, {
          updateMap: false,
          showAccuracyCircle: false,
        });

      window.Microsoft.Maps.Events.addHandler(
        getCurrentLocationButton,
        "click",
        handleGetCurrentLocation
      );
    });
  };

  const handleMapClick = (e) => {
    const point = new window.Microsoft.Maps.Point(e.getX(), e.getY());
    const location = e.target.tryPixelToLocation(point);

    latitudeRef.current.textContent = location.latitude.toFixed(6);
    longitudeRef.current.textContent = location.longitude.toFixed(6);

    setFormData((prevFormData) => ({
      ...prevFormData,
      location: {
        ...prevFormData.location,
        latitude: location.latitude.toFixed(6),
        longitude: location.longitude.toFixed(6),
      },
    }));

    // Remove the previous location pin (if any)
    if (locationPin) {
      map.entities.remove(locationPin);
    }

    // Add a location icon
    locationPin = new window.Microsoft.Maps.Pushpin(location, {
      icon: "https://www.bingmapsportal.com/Content/images/poi_custom.png",
      anchor: new window.Microsoft.Maps.Point(12, 12),
    });

    map.entities.push(locationPin);
  };

  const searchLocation = () => {
    const location = locationInputRef.current.value;

    window.Microsoft.Maps.loadModule("Microsoft.Maps.Search", () => {
      const searchManager = new window.Microsoft.Maps.Search.SearchManager(map);

      searchManager.geocode({
        where: location,
        callback: (results) => {
          if (results && results.results && results.results.length > 0) {
            const firstResult = results.results[0];
            map.setView({ bounds: firstResult.bestView });

            // Remove the previous location pin (if any)
            if (locationPin) {
              map.entities.remove(locationPin);
            }

            // Add a location icon
            locationPin = new window.Microsoft.Maps.Pushpin(
              firstResult.location,
              {
                icon: "https://www.bingmapsportal.com/Content/images/poi_custom.png",
                anchor: new window.Microsoft.Maps.Point(12, 12),
              }
            );

            map.entities.push(locationPin);

            // Display the latitude and longitude of the searched location
            latitudeRef.current.textContent =
              firstResult.location.latitude.toFixed(6);
            longitudeRef.current.textContent =
              firstResult.location.longitude.toFixed(6);

            setFormData((prevFormData) => ({
              ...prevFormData,
              location: {
                ...prevFormData.location,
                latitude: location?.latitude
                  ? location.latitude.toFixed(6)
                  : null,
                longitude: location?.longitude
                  ? location.longitude.toFixed(6)
                  : null,
              },
            }));
          } else {
            alert("Location not found.");
          }
        },
      });
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchLocation();
        }}
        className="flex flex-row my-2"
      >
        <input
          type="text"
          ref={locationInputRef}
          placeholder="Enter location"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-md focus:ring-cyan-600 focus:border-cyan-600 block px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-medium px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>
      <div ref={mapRef} className="w-full h-[300px]"></div>
      <div className="flex flex-row gap-1 text-rose-600 font-medium text-xs justify-end">
        <span ref={latitudeRef}></span>
        <span ref={longitudeRef}></span>
      </div>
    </div>
  );
};

export default BingMap;
