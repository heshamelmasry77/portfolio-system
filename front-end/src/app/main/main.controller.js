export class MainController {

  constructor($http) {
    'ngInject';

    this.$http = $http;
  }

  // Adding my functions
  postMessage() {

    this.$http.post('http://localhost:5000/api/message', {
      msg: this.message
    });
  }
}
