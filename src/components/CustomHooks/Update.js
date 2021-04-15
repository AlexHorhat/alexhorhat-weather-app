export default  class Update {
    constructor(response){
      this.id = response.id;
      this.location =  `${response.name}, ${response.sys.country} `;
      this.temp = Math.round(response.main.temp);
      this.weather = response.weather[0].main;
      this.min = Math.round(response.main.temp_min);
      this.max = Math.round(response.main.temp_max);
      this.icon = response.weather[0].icon;
      this.time = new Date();
    }
  };