/**
 * @preserve Copyright (c) 2018 T. F. Raaion, www.sublunar.space
 * License MIT: http://www.opensource.org/licenses/MIT
 *
 * SUBLUNAR ALMANAC
 */

var SL = SL || {};

/**
 * Astronomical and astrological calculations
 */
SL.Astro = (function() {

  /**
   * Astronomical calculations
   * @public {Object} moon - holds definitions and labels
   * @public {function} moonPhase() - calculate moon phase from phase angle and lunar day
   */
  var Nomy = (function() {

    /**
     * moon object with definitions
     */
    var moon = {
      phase : {
        symbol : [ "void", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘" ],
        name : ["void", "new", "waxing crescent", "first quarter", "waxing gibbous", "full", "waning gibbous", "last quarter", "waning crescent" ]
      }
    }

    /**
     * moonPhase function returns the current phase of the moon
     * @param {Object} lunar - Object with lunar day, phase angle and phase (% illumination) of a moment
     * @return {int} phase - number from 1 (new moon) to 5 (full moon) to 8 (waning crescent)
     */
    function moonPhase(lunar) {
      var sphase;
      var g;
      var phase;
        if      ( lunar.angle < 180 ) sphase = "new";
        if      ( lunar.angle < 168 ) sphase = "crescent";
        if      ( lunar.angle < 95 )  sphase = "quarter";
        if      ( lunar.angle < 85 )  sphase = "gibbous";
        if      ( lunar.angle < 12 )  sphase = "full";
        // sweph returns the phase angle just between 0° and 180°, so in order
        // to find whether it is waxing or waning, we utilize the lunar day:
        if      ( lunar.day < 16 )    g = "waxing";
        if      ( lunar.day >= 16 )   g = "waning";
        if ( sphase == "new" ) phase = 1;
        if ( sphase == "full" ) phase = 5;
        if ( sphase == "quarter" && g == "waxing") phase = 3;
        if ( sphase == "quarter" && g == "waning") phase = 7;
        if ( sphase == "crescent" && g == "waxing" ) phase = 2;
        if ( sphase == "crescent" && g == "waning" ) phase = 8;
        if ( sphase == "gibbous" && g == "waxing" ) phase = 4;
        if ( sphase == "gibbous" && g == "waning" ) phase = 6;
      return phase;
    }
    return {
      moonPhase: moonPhase,
      moon     : moon
    }
  }());

  /**
   * Astrological calculations
   * @public {Object} planet - holds definitions and labels
   * @public {Object} zodiac - holds definitions and labels
   * @public {function} zodToDeg() - calculates longitudes in the format "02° Aries 12" to float degrees
   * @public {function} getZodiac() - returns the zodiac sign for given degrees (tropical or sidereal)
   */
  var Logy = (function() {
    /**
     * planet object with definitions
     */
    var planet = {
      name : [ "void", "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn" ],
      ruler : {
        greek : [ "void", "Helios", "Selene", "Ares", "Hermes", "Zeus", "Aphrodite", "Kronos" ],
        roman: [ "void", "Sol", "Luna", "Mars", "Mercury", "Jupiter", "Venus", "Saturn" ]
    },
      symbol : [ "void", "☉", "☽", "♂", "☿", "♃", "♀", "♄" ],
      day : [ "void", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
      order : [ 0, 1, 6, 4, 2, 7, 5, 3 ]
    }

    /**
     * zodiac object with definitions
     */
    var zodiac = {
      name : [ "void", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ],
      symbol : [ "void", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓" ],
      ruler : [ 0, 3, 6, 4, 2, 1, 4, 6, 3, 5, 7, 7, 5 ],
      exaltation : [ 0, 1, 2, 0, 5, 0, 4, 7, 0, 0, 3, 0, 6 ]
    }

    /**
     * zodToDeg function converts zodiacal degree notation to degrees
     * @param {string} zcoord - a string in zodiacal degree notation, e.g. "14° Taurus 34"
     * @return {float} degrees
     */
    function zodToDeg(zcoord) {
      var zdef = zodiac; // global variable needs to be declared before using this function
      if(zcoord) {
        var z = zcoord.split(" ");
        var m = 0;
        for (var i = 0, len = 13; i < len; i++) {
          if (zdef.name[i] == z[1] || zdef.symbol[i] == z[1] ) m = i-1;
        }
        return parseFloat(z[0]) + m * 30 + parseFloat(z[2]) / 60;
      }
    }

    /**
     * degToZod function converts degrees to zodiacal degree notation
     * @param {string} deg - degrees
     * @param {int} - 1 for sidereal zodiac, anything else for tropical
     * @return {float} a string in zodiacal degree notation, e.g. "14° Taurus 34"
     */
    function degToZod(deg, sidereal =-1) {
      var zdef = zodiac;
      if ( $("#zodiac").is(':checked') && sidereal != 0 ) sidereal = 1;
      if ( sidereal == 1 ) {
        deg -= 24.11722222222; // degrees difference between tropical and sidereal
      }
      if ( deg >= 360.0 ) deg -= 360.0;
      if ( deg < 0 ) deg += 360.0;
      var zod = getZodiac(deg, 0);
      var diff = ( zod.sign - 1 ) * 30.0;
      var degrees = deg - diff;
      var first = Math.floor(degrees);
      var second = Math.round((degrees - first) * 60.0);
      return first+" "+zdef.symbol[zod.sign]+" "+second;
    }

    /**
     * getZodiac function returns the zodiac sign and decan for a given longitude
     * @param {float} deg - decimal longitude degrees
     * @param {int} sidereal - 1 for sidereal zodiac, other number for tropical zodiac
     * @return {Object} obj.sign - zodiac sign 1-12, obj.decan - zodiac decan 1-36
     */
    function getZodiac(deg, sidereal = -1) {
      if ( $("#zodiac").is(':checked') && sidereal != 0 ) sidereal = 1;
      if ( sidereal == 1 ) {
        deg -= 24.11722222222; // degrees difference between tropical and sidereal
      }
      if ( deg >= 360.0 ) deg -= 360.0;
      if ( deg < 0 ) deg += 360.0;
      deg += 0.0001; // added to compensate rounding, resulting in 0° to 29.99° being Aries instead of 0° to 30°
      var obj = {
        sign: Math.ceil(deg / 30),
        decan: Math.ceil(deg / 10)
      }
      return obj;
    }
    return {
      planet          : planet,
      zodiac          : zodiac,
      zodToDeg        : zodToDeg,
      degToZod        : degToZod,
      getZodiac       : getZodiac
    }
  }());
  return {
    Nomy : Nomy,
    Logy : Logy,
  }
}());
