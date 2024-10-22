const calculateDistance = ([fromLng, fromLat], [toLng, toLat]=[0,0]) => {

    // Calculate the distance between two coordinates - Haversine formula

    const toRadians = (degrees) => degrees * (Math.PI / 180);  

    const earthRadius = 6371; 

    const dLat = toRadians(toLat - fromLat);
    const dLng = toRadians(toLng - fromLng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(fromLat)) * Math.cos(toRadians(toLat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
};


module.exports = {calculateDistance};