const axios = require('axios');
module.exports = {
    async searchUserGitHub(request, response){
        const { name } = request.params;

        var username, user, photo, urlUser;
        await axios.get('https://api.github.com/users/' + name).then(function(apiResponse) {
            user = apiResponse.data.login;
            username = apiResponse.data.name;
            photo = apiResponse.data.avatar_url;
            urlUser = apiResponse.data.html_url;
            return response.send('<html> <head> </head>  <body> <h1>' + username + ' </h1> <img src="' + photo + '" /> <h2> ' + urlUser + ' </body> </html>');
        }).catch((err) => {
            response.json({ msg: " User not found " + err});
        })
    }
}