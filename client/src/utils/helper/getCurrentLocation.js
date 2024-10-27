import { notify } from './notification'; 

export const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        notify("Geolocation is not supported by this browser.", "error");
        throw new Error("Geolocation is not supported");
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                resolve([longitude, latitude]);  
            },
            (error) => {
                console.error(`Error Code: ${error.code} - ${error.message}`);
                notify("Unable to retrieve your location. Please allow location access.", "error");
                reject(new Error(`Geolocation error: ${error.message}`));  
            }
        );
    });
};
