const axios = require('axios');
const { request, response } = require('express');
const favorites = [];

module.exports = {
    async create(request, response){
        const { name } = request.params;

        //var username, user, photo, urlUser;

        if (favorites.some((profile) => profile.user === name)){
            response.status(400).json({ msg: 'This user is in the favorites already.' });
        }else{
            try{
                const apiResponse = await axios.get('https://api.github.com/users/' + name);
                const user = apiResponse.data;
                
                if (favorites.length < 5) {
                    const favoriteUser = {
                        login: user.login,
                        username: user.name,
                        photo: user.avatar_url,
                        urlProfile: user.html_url,
                        bio: user.bio,
                    }
                  favorites.push(favoriteUser);
                  response.send(`
                    <html>
                        <head></head>
                            <body>
                                <h1>${favoriteUser.name}</h1>
                                <img src="${favoriteUser.avatar_url}" />
                                <h2><a href="${favoriteUser.html_url}">${favoriteUser.html_url}</a></h2>
                            </body>
                    </html>
                    `);
                } else {
                  response.status(400).json({ msg: 'The favorite list is full' });
                }
              } catch (err) {
                response.status(404).json({ msg: 'User not found', error: err.message });
              }
            }
          },
    getFavorites(request, response) {
        response.json(favorites)
    },
    async deleteUser(request, response) {
        const { username } = request.params;
        const userIndex = favorites.findIndex((user) => user.login === username);
    
        if (userIndex !== -1) {
          favorites.splice(userIndex, 1);
          response.status(204).send();
        } else {
          response.status(404).json({ msg: 'User not found in favorites' });
        }
      },
};        