
export const calculateDistance = (point1: [number, number], point2: [number, number], unit = 'km') => {
    const [lon1, lat1] = point1; // [долгота, широта]
    const [lon2, lat2] = point2;

    const R = unit === 'km' ? 6371 : 3959; // Радиус Земли: 6371 км или 3959 миль
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    const dist = parseFloat(distance.toFixed(2))

    if( dist < 500) {
        return 2000;
    }else if (dist > 500 && dist < 2000) {
        return 1000;
    }else if (dist > 2000 && dist < 4000) {
        return 500;
    }else if (dist > 4000 && dist < 6000) {
        return 100;
    }

    return 0

};