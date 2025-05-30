////////////////////////////////////// SELECTOR
function stageAaccel(val){
    if(stageAdirect == 0){
      if(stageAstrength == 0){ return easeInSine(val); }
      else if(stageAstrength == 1){ return easeInCubic(val); }
      else if(stageAstrength == 2){ return easeInCirc(val); }
      else if(stageAstrength == 3){ return easeInExpo(val); }
      else if(stageAstrength == 4){ return easeInBack(val); }
      else if(stageAstrength == 5){ return easeInBounce(val); }
      else if(stageAstrength == 6){ return easeInElastic(val); }
    } else if(stageAdirect == 1){
      if(stageAstrength == 0){ return easeOutSine(val); }
      else if(stageAstrength == 1){ return easeOutCubic(val); }
      else if(stageAstrength == 2){ return easeOutCirc(val); }
      else if(stageAstrength == 3){ return easeOutExpo(val); }
      else if(stageAstrength == 4){ return easeOutBack(val); }
      else if(stageAstrength == 5){ return easeOutBounce(val); }
      else if(stageAstrength == 6){ return easeOutElastic(val); }
    } else if(stageAdirect == 2){
      if(stageAstrength == 0){ return easeInOutSine(val); }
      else if(stageAstrength == 1){ return easeInOutCubic(val); }
      else if(stageAstrength == 2){ return easeInOutCirc(val); }
      else if(stageAstrength == 3){ return easeInOutExpo(val); }
      else if(stageAstrength == 4){ return easeInOutBack(val); }
      else if(stageAstrength == 5){ return easeInOutBounce(val); }
      else if(stageAstrength == 6){ return easeInOutElastic(val); }
    }
  }
  
  function stageBaccel(val){
    if(stageBdirect == 0){
      if(stageBstrength == 0){ return easeInSine(val); }
      else if(stageBstrength == 1){ return easeInCubic(val); }
      else if(stageBstrength == 2){ return easeInCirc(val); }
      else if(stageBstrength == 3){ return easeInExpo(val); }
      else if(stageBstrength == 4){ return easeInBack(val); }
      else if(stageBstrength == 5){ return easeInBounce(val); }
      else if(stageBstrength == 6){ return easeInElastic(val); }
    } else if(stageBdirect == 1){
      if(stageBstrength == 0){ return easeOutSine(val); }
      else if(stageBstrength == 1){ return easeOutCubic(val); }
      else if(stageBstrength == 2){ return easeOutCirc(val); }
      else if(stageBstrength == 3){ return easeOutExpo(val); }
      else if(stageBstrength == 4){ return easeOutBack(val); }
      else if(stageBstrength == 5){ return easeOutBounce(val); }
      else if(stageBstrength == 6){ return easeOutElastic(val); }
    } else if(stageBdirect == 2){
      if(stageBstrength == 0){ return easeInOutSine(val); }
      else if(stageBstrength == 1){ return easeInOutCubic(val); }
      else if(stageBstrength == 2){ return easeInOutCirc(val); }
      else if(stageBstrength == 3){ return easeInOutExpo(val); }
      else if(stageBstrength == 4){ return easeInOutBack(val); }
      else if(stageBstrength == 5){ return easeInOutBounce(val); }
      else if(stageBstrength == 6){ return easeInOutElastic(val); }
    }
  }
  
  ////////////////////////////////////// SINE
  function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }
  
  function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }
  
  function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
  
  ////////////////////////////////////// CUBIC
  function easeInCubic(x) {
    return x * x * x;
  }
  
  function easeOutCubic(x) {
    return 1 - pow(1 - x, 3);
  }
  
  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
  
  ////////////////////////////////////// CIRC
  function easeInCirc(x){
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }
  
  function easeOutCirc(x){
    return sqrt(1 - Math.pow(x - 1, 2));
  }
  
  function easeInOutCirc(x) {
    return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }
  
  ////////////////////////////////////// EXPO
  function easeInExpo(x) {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
  }
  
  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
  
  function easeInOutExpo(x) {
    return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }
  
  ////////////////////////////////////// BACK
  function easeInBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return c3 * x * x * x - c1 * x * x;
  }
  
  function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }
  
  function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
  
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
  
  ////////////////////////////////////// BOUNCE
  function easeInBounce(x) {
    return 1 - easeOutBounce(1 - x);
  }
  
  function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }
  
  function easeInOutBounce(x) {
    return x < 0.5
      ? (1 - easeOutBounce(1 - 2 * x)) / 2
      : (1 + easeOutBounce(2 * x - 1)) / 2;
  }
  
  ////////////////////////////////////// ELASTIC
  function easeInElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
  
  function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
  
  function easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;
  
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  }
  
  
  
  function easeInQuad(x) {
    return x * x;
  }
  
  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }
  
  function easeInOutQuad(x) {
    return x < 0.5
      ? 2 * x * x
      : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
  
  function easeOutQuint(x){
    return 1 - Math.pow(1 - x, 5);
  }
  
  function easeInQuint(x) {
    return x * x * x * x * x;
  }
  
  function easeInOutQuint(x) {
    return x < 0.5 
      ? 16 * x * x * x * x * x
      : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }
  