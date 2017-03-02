export class MainController {

  constructor($http) {
    'ngInject';

    this.$http = $http;
    this.getMessages();
    this.getImages();



  }




  getImages() {



    var vm = this;

    vm.arrayBufferToBase64 = function(buffer) {

      console.log(buffer);
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }

    this.$http.get('http://localhost:5000/api/photo').then(function(result) {


      result.data.forEach(
        function(x) {
          x.img.base64 = vm.arrayBufferToBase64(x.img.data.data);

        });
      vm.images = result.data;
      console.log(result.data);

    });
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
