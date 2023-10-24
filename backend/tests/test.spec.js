const axios = require('axios');
const favoritesController = require('../controller/controller');

describe('Favorites Controller - createUser', () => {
  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a favorite user', async () => {
    const requestMock = {
      params: { name: 'matferreira1' },
    };

    const apiResponse = {
      data:{
        login: 'matferreira1',
        name: 'Matheus Ferreira',
        avatar_url: 'https://avatars.githubusercontent.com/u/108153562?v=4',
        html_url: 'https://github.com/matferreira1',
        bio: 'Software engineering student - UnB',
        starred: false,
      }
    };

    axios.get = jest.fn().mockResolvedValue(apiResponse);

    await favoritesController.create(requestMock, responseMock);

    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/matferreira1');
  });

  it('should handle user already in favorites', async () => {
    const requestMock = {
      params: { name: 'matferreira1' },
    };

    favoritesController.create(requestMock, responseMock);

    expect(responseMock.json).toHaveBeenCalledWith({ msg: 'This user is in the favorites already.' });
  });

  it('should handle user not found', async () => {
    const requestMock = {
      params: { name: 'matferreira1158489' },
    };

    axios.get = jest.fn().mockRejectedValue({ message: 'User not found' });

    await favoritesController.create(requestMock, responseMock);

    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/matferreira1158489');
    expect(responseMock.json).toHaveBeenCalledWith({ msg: 'User not found', error: 'User not found' });
  });

  describe('Favorites Controller - deleteUser', () => {
    let requestMock;
    let responseMock;
  
    beforeEach(() => {
      requestMock = {
        params: { username: 'matferreira1' },
      };
  
      responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete a user from favorites', async () => {
      favoritesController.deleteUser(requestMock, responseMock);
  
      expect(responseMock.send).toHaveBeenCalled();
    });
  
    it('should return a 404 status if the user is not found in favorites', async () => {
      favoritesController.deleteUser({ params: { username: 'nonexistentuser' } }, responseMock);
  
      expect(responseMock.json).toHaveBeenCalledWith({ msg: 'User not found in favorites' });
    });
  });
  describe('Favorites Controller - getFavorites', () => {
    let requestMock;
    let responseMock;
  
    beforeEach(() => {
      requestMock = {};
      responseMock = {
        json: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return a list of favorite users', () => {
      favoritesController.create({ params: { name: 'matferreira1' } }, responseMock);
      favoritesController.create({ params: { name: 'matferreira2' } }, responseMock);
      favoritesController.getFavorites(requestMock, responseMock);
  
      expect(responseMock.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
  describe('toggleStar', () => {
  const responseMock = {
    json: jest.fn(), 
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle star for an existing user', () => {
    const username = 'testuser';
    const userIndex = 0;
    const userStarred = { login: 'testuser', starred: true };

    const favorites = [
      { login: 'testuser', starred: false },
    ];

    const requestMock = { params: { username } };

    favoritesController.favorites = favorites;
    favoritesController.toggleStar(requestMock, responseMock);

    expect(responseMock.json).toHaveBeenCalledWith(favorites[userIndex].starred);
  });

  it('should toggle star for an existing user and unset star for others', () => {
    const username = 'testuser';
    const userIndex = 0;
    const userStarred = { login: 'otheruser', starred: true };

    const favorites = [
      { login: 'testuser', starred: false },
      { login: 'otheruser', starred: true },
    ];

    const requestMock = { params: { username } };

    favoritesController.favorites = favorites;
    favoritesController.toggleStar(requestMock, responseMock);

    expect(responseMock.json).toHaveBeenCalledWith(favorites[userIndex].starred);
    expect(userStarred.starred).toBe(false); 
  });

  it('should handle user not found', () => {
    const favorites = [{ login: 'otheruser', starred: true }];

    const requestMock = { params: { username: 'testuser' } };

    favoritesController.favorites = favorites;
    favoritesController.toggleStar(requestMock, responseMock);

    expect(responseMock.json).toHaveBeenCalledWith({ msg: 'User not found in favorites' });
  });
});
});