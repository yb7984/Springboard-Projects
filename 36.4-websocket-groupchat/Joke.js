const axios = require('axios');

class Joke {
    /**
     * 
     */
    static async getJoke() {

        const resp = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                "Accept": "application/json"
            }
        });

        return resp.data.joke;
    }
}

module.exports = Joke;