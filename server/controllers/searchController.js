const axios = require("axios");

const search = async(req, res) => {
    const { searchQuery, category } = req.query;
    let url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${searchQuery}&language=en`;

    if (category) {
        url += `&category=${encodeURIComponent(category)}`;
    }

    try {
        const response = await axios.get(url);
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.response });
    }

}


const getLocationPhoto = async(req, res) => {
    const { id } = req.params;
    const url = `https://api.content.tripadvisor.com/api/v1/location/${id}/photos?language=en&key=${process.env.TRIPADVISOR_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.response });
    }
}

module.exports = {
    search,
    getLocationPhoto
}
