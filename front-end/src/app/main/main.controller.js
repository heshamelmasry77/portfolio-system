export class MainController {

  constructor($http) {
    'ngInject';

    this.$http = $http;
    this.getMessages();
  }

  // Adding my functions
  // http return a promise
  // anonymous function as the callback, which will take in the result
  // and i will put result as an argument so i have access to it
  getMessages() {
    var vm = this;
    this.$http.get('http://localhost:5000/api/message').then(function(result) {
      vm.messages = result.data;
    });
  }

  postMessage() {

    this.$http.post('http://localhost:5000/api/message', {
      msg: this.message
    });
  }
}
