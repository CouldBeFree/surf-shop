require('dotenv').config();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

async function geocoder(location){
    // match.features[0].geometry.coordinates
    try{
        let respone = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1
        })
            .send();
        console.log(respone.body.features[0].geometry.coordinates);
    } catch (error) {
        console.log(error.message)
    }
}

geocoder('Alaska, US');
