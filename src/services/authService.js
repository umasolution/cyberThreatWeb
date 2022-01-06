import jwtDecode from 'jwt-decode';
// import axios from 'src/utils/axios';
import axios from 'axios';

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }

  registerUser = (values) => new Promise((resolve, reject) => {
    axios.post('/user/signup',
      { fName: values.firstName, lName: values.lastName, emailAdd: values.email, passWord: values.password })
      .then((response) => {
        if (response.data.response) {
          // this.setSession(response.data.accessToken);
          resolve(true);
        } else {
          reject(response.data.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

  loginWithEmailAndPassword = (username, password) => new Promise((resolve, reject) => {
    axios.post('/auth', { username, password })
      .then((response) => {
        if (response.data.access_token) {
          this.setSession(response.data.access_token);
          this.setUserName(username);
          // this.setSession(Math.random() * 1000);
          resolve(username);
        } else {
          reject(response.data.message);
          // throw(response.data.message);
        }
      })
      .catch((error) => {
        try {
          if (error.response.data.description) return reject(error.response.data.description);
        } catch (e) {
          return reject('something wrong went');
        }
      });
  })

  loginInWithToken = () => new Promise((resolve, reject) => {
    axios.get('/api/account/me')
      .then((response) => {
        if (response.data.user) {
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

  logout = () => {
    this.setSession(null);
  }

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  }

  setUserName = (userName) => {
    localStorage.setItem('username', userName);
  }

  getUserName = () => {
    return localStorage.getItem('username');
  }

  getAccessToken = () => localStorage.getItem('accessToken');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }
    // todo: fix it later
    return true;

   /*  const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime; */
  }

  isAuthenticated = () => !!this.getAccessToken()
}

const authService = new AuthService();

export default authService;
