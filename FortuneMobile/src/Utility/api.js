var api  = {
  login() {
    var url = "https://fortunestore.herokuapp.com/api/v1/login/"
    return fetch(url).then((res)=> res.json())

  }
}
module.exports = api;
