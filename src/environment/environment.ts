export const environment = {
  production: false, // change this manually to true for production
  apiUrl: '',
  basicAuth: {
    username: '',
    password: ''
  }
};

// Set values depending on production or not
if (!environment.production) {
  environment.apiUrl = 'https://localhost:7210/api';
  environment.basicAuth = {
    username: 'madrasaty',
    password: 'P@ssword2025'
  };
} else {
  environment.apiUrl = 'https://196.179.202.34:503/api';
  environment.basicAuth = {
    username: 'madrasaty',
    password: 'P@ssword2025'
  };
}
