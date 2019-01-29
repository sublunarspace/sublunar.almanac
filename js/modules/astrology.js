/**
* @preserve Copyright (c) 2018 T. F. Raaion, www.sublunar.space
* License MIT: http://www.opensource.org/licenses/MIT
*/

//Defines Calendar Objects and Methods
var module_moon = {

  definitions: {
    core: true,
    name: "Moon Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Moon in Aries",
        "tags": "moon aries fire mars",
        "hide": "info"
      }], [{
        "id": "2",
        "action": "Moon in Taurus (Exalted)",
        "tags": "moon taurus earth venus exalted"
      }], [{
        "id": "3",
        "action": "Moon in Gemini",
        "tags": "moon gemini air mercury",
        "hide": "info"
      }], [{
        "id": "4",
        "action": "Moon in Cancer (Domicile)",
        "tags": "cancer water moon domicile"
      }], [{
        "id": "5",
        "action": "Moon in Leo",
        "tags": "moon leo fire sun",
        "hide": "info"
      }], [{
        "id": "6",
        "action": "Moon in Virgo",
        "tags": "moon virgo earth mercury",
        "hide": "info"
      }], [{
        "id": "7",
        "action": "Moon in Libra",
        "tags": "moon libra air venus",
        "hide": "info"
      }], [{
        "id": "8",
        "action": "Moon in Scorpio (Fall)",
        "tags": "moon scorpio water mars fall"
      }], [{
        "id": "9",
        "action": "Moon in Sagittarius",
        "tags": "moon sagittarius fire jupiter",
        "hide": "info"
      }], [{
        "id": "10",
        "action": "Moon in Capricorn (Detriment)",
        "tags": "moon capricorn earth saturn detriment"
      }], [{
        "id": "11",
        "action": "Moon in Aquarius",
        "tags": "moon aquarius air saturn",
        "hide": "info"
      }], [{
        "id": "12",
        "action": "Moon in Pisces",
        "tags": "moon pisces water jupiter",
        "hide": "info"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.moon.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_mercury = {

  definitions: {
    core: true,
    name: "Mercury Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Mercury in Aries",
        "tags": "mercury aries fire mars",
        "hide": "info"
      }], [{
        "id": "2",
        "action": "Mercury in Taurus",
        "tags": "mercury taurus earth venus",
        "hide": "info"
      }], [{
        "id": "3",
        "action": "Mercury in Gemini (Domicile)",
        "tags": "mercury gemini air domicile"
      }], [{
        "id": "4",
        "action": "Mercury in Cancer",
        "tags": "cancer water moon mercury",
        "hide": "info"
      }], [{
        "id": "5",
        "action": "Mercury in Leo",
        "tags": "mercury leo fire sun",
        "hide": "info"
      }], [{
        "id": "6",
        "action": "Mercury in Virgo (Domicile/Exaltation)",
        "tags": "mercury virgo earth domicile exaltation"
      }], [{
        "id": "7",
        "action": "Mercury in Libra",
        "tags": "mercury libra air venus",
        "hide": "info"
      }], [{
        "id": "8",
        "action": "Mercury in Scorpio",
        "tags": "mercury scorpio water mars",
        "hide": "info"
      }], [{
        "id": "9",
        "action": "Mercury in Sagittarius (Detriment)",
        "tags": "mercury sagittarius fire jupiter detriment"
      }], [{
        "id": "10",
        "action": "Mercury in Capricorn",
        "tags": "mercury capricorn earth saturn",
        "hide": "info"
      }], [{
        "id": "11",
        "action": "Mercury in Aquarius",
        "tags": "mercury aquarius air saturn",
        "hide": "info"
      }], [{
        "id": "12",
        "action": "Mercury in Pisces (Fall)",
        "tags": "mercury pisces water jupiter fall"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.mercury.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_venus = {

  definitions: {
    core: true,
    name: "Venus Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Venus in Aries (Detriment)",
        "tags": "venus aries fire mars detriment"
      }], [{
        "id": "2",
        "action": "Venus in Taurus",
        "tags": "venus taurus earth",
        "hide": "info"
      }], [{
        "id": "3",
        "action": "Venus in Gemini",
        "tags": "venus gemini air mercury",
        "hide": "info"
      }], [{
        "id": "4",
        "action": "Venus in Cancer",
        "tags": "cancer water moon venus",
        "hide": "info"
      }], [{
        "id": "5",
        "action": "Venus in Leo",
        "tags": "venus leo fire sun",
        "hide": "info"
      }], [{
        "id": "6",
        "action": "Venus in Virgo (Fall)",
        "tags": "venus virgo earth mercury fall"
      }], [{
        "id": "7",
        "action": "Venus in Libra (Domicile)",
        "tags": "venus libra air domicile"
      }], [{
        "id": "8",
        "action": "Venus in Scorpio (Detriment)",
        "tags": "venus scorpio water mars detriment"
      }], [{
        "id": "9",
        "action": "Venus in Sagittarius",
        "tags": "venus sagittarius fire jupiter",
        "hide": "info"
      }], [{
        "id": "10",
        "action": "Venus in Capricorn",
        "tags": "venus capricorn earth saturn",
        "hide": "info"
      }], [{
        "id": "11",
        "action": "Venus in Aquarius",
        "tags": "venus aquarius air saturn",
        "hide": "info"
      }], [{
        "id": "12",
        "action": "Venus in Pisces (Exaltation)",
        "tags": "venus pisces water jupiter exaltation"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.venus.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_sun = {

  definitions: {
    core: true,
    name: "Sun Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Sun in Aries (Exaltation)",
        "tags": "sun aries fire mars exaltation"
      }], [{
        "id": "2",
        "action": "Sun in Taurus",
        "tags": "sun taurus earth venus",
        "hide": "info"
      }], [{
        "id": "3",
        "action": "Sun in Gemini",
        "tags": "sun gemini air mercury",
        "hide": "info"
      }], [{
        "id": "4",
        "action": "Sun in Cancer",
        "tags": "cancer water moon sun",
        "hide": "info"
      }], [{
        "id": "5",
        "action": "Sun in Leo (Domicile)",
        "tags": "sun leo fire domicile"
      }], [{
        "id": "6",
        "action": "Sun in Virgo",
        "tags": "sun virgo earth mercury",
        "hide": "info"
      }], [{
        "id": "7",
        "action": "Sun in Libra (Fall)",
        "tags": "sun libra air venus fall"
      }], [{
        "id": "8",
        "action": "Sun in Scorpio",
        "tags": "sun scorpio water mars",
        "hide": "info"
      }], [{
        "id": "9",
        "action": "Sun in Sagittarius",
        "tags": "sun sagittarius fire jupiter",
        "hide": "info"
      }], [{
        "id": "10",
        "action": "Sun in Capricorn",
        "tags": "sun capricorn earth saturn",
        "hide": "info"
      }], [{
        "id": "11",
        "action": "Sun in Aquarius (Detriment)",
        "tags": "sun aquarius air saturn detriment"
      }], [{
        "id": "12",
        "action": "Sun in Pisces",
        "tags": "sun pisces water jupiter",
        "hide": "info"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.sun.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_mars = {

  definitions: {
    core: true,
    name: "Mars Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Mars in Aries (Domicile)",
        "tags": "mars aries fire domicile"
      }], [{
        "id": "2",
        "action": "Mars in Taurus (Detriment)",
        "tags": "mars taurus earth venus detriment"
      }], [{
        "id": "3",
        "action": "Mars in Gemini",
        "tags": "mars gemini air mercury",
        "hide": "info"
      }], [{
        "id": "4",
        "action": "Mars in Cancer (Fall)",
        "tags": "cancer water moon mars fall"
      }], [{
        "id": "5",
        "action": "Mars in Leo",
        "tags": "mars leo fire sun",
        "hide": "info"
      }], [{
        "id": "6",
        "action": "Mars in Virgo",
        "tags": "mars virgo earth mercury",
        "hide": "info"
      }], [{
        "id": "7",
        "action": "Mars in Libra (Detriment)",
        "tags": "mars libra air venus detriment"
      }], [{
        "id": "8",
        "action": "Mars in Scorpio (Domicile)",
        "tags": "mars scorpio water domicile"
      }], [{
        "id": "9",
        "action": "Mars in Sagittarius",
        "tags": "mars sagittarius fire jupiter",
        "hide": "info"
      }], [{
        "id": "10",
        "action": "Mars in Capricorn (Exalted)",
        "tags": "mars capricorn earth saturn exalted"
      }], [{
        "id": "11",
        "action": "Mars in Aquarius",
        "tags": "mars aquarius air saturn",
        "hide": "info"
      }], [{
        "id": "12",
        "action": "Mars in Pisces",
        "tags": "mars pisces water jupiter",
        "hide": "info"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.mars.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_jupiter = {

  definitions: {
    core: true,
    name: "Jupiter Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Jupiter in Aries",
        "tags": "jupiter aries fire mars",
        "hide": "info"
      }], [{
        "id": "2",
        "action": "Jupiter in Taurus",
        "tags": "jupiter taurus earth venus",
        "hide": "info"
      }], [{
        "id": "3",
        "action": "Jupiter in Gemini (Detriment)",
        "tags": "jupiter gemini air mercury detriment"
      }], [{
        "id": "4",
        "action": "Jupiter in Cancer (Exaltation)",
        "tags": "cancer water moon jupiter exaltation"
      }], [{
        "id": "5",
        "action": "Jupiter in Leo",
        "tags": "jupiter leo fire sun",
        "hide": "info"
      }], [{
        "id": "6",
        "action": "Jupiter in Virgo (Detriment)",
        "tags": "jupiter virgo earth mercury detriment"
      }], [{
        "id": "7",
        "action": "Jupiter in Libra",
        "tags": "jupiter libra air venus",
        "hide": "info"
      }], [{
        "id": "8",
        "action": "Jupiter in Scorpio",
        "tags": "jupiter scorpio water mars",
        "hide": "info"
      }], [{
        "id": "9",
        "action": "Jupiter in Sagittarius (Domicile)",
        "tags": "jupiter sagittarius fire domicile"
      }], [{
        "id": "10",
        "action": "Jupiter in Capricorn (Fall)",
        "tags": "jupiter capricorn earth saturn fall"
      }], [{
        "id": "11",
        "action": "Jupiter in Aquarius",
        "tags": "jupiter aquarius air saturn",
        "hide": "info"
      }], [{
        "id": "12",
        "action": "Jupiter in Pisces (Domicile)",
        "tags": "jupiter pisces water domicile"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.jupiter.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_saturn = {

  definitions: {
    core: true,
    name: "Saturn Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Saturn in Aries (Fall)",
        "tags": "saturn aries fire mars fall"
      }], [{
        "id": "2",
        "action": "Saturn in Taurus",
        "tags": "saturn taurus earth venus",
        "hide": "info"
      }], [{
        "id": "3",
        "action": "Saturn in Gemini",
        "tags": "saturn gemini air mercury",
        "hide": "info"
      }], [{
        "id": "4",
        "action": "Saturn in Cancer (Detriment)",
        "tags": "cancer water moon saturn detriment"
      }], [{
        "id": "5",
        "action": "Saturn in Leo (Detriment)",
        "tags": "saturn leo fire sun detriment"
      }], [{
        "id": "6",
        "action": "Saturn in Virgo",
        "tags": "saturn virgo earth mercury",
        "hide": "info"
      }], [{
        "id": "7",
        "action": "Saturn in Libra (Exaltation)",
        "tags": "saturn libra air venus exaltation"
      }], [{
        "id": "8",
        "action": "Saturn in Scorpio",
        "tags": "saturn scorpio water mars",
        "hide": "info"
      }], [{
        "id": "9",
        "action": "Saturn in Sagittarius",
        "tags": "saturn sagittarius fire jupiter",
        "hide": "info"
      }], [{
        "id": "10",
        "action": "Saturn in Capricorn (Domicile)",
        "tags": "saturn capricorn earth domicile"
      }], [{
        "id": "11",
        "action": "Saturn in Aquarius (Domicile)",
        "tags": "saturn aquarius air domicile"
      }], [{
        "id": "12",
        "action": "Saturn in Pisces",
        "tags": "saturn pisces water jupiter",
        "hide": "info"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.saturn.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_ascendant = {

  definitions: {
    core: true,
    name: "Rising Sign",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Aries Rising",
        "tags": "aries fire mars"
      }], [{
        "id": "2",
        "action": "Taurus Rising",
        "tags": "taurus earth venus"
      }], [{
        "id": "3",
        "action": "Gemini Rising",
        "tags": "gemini air mercury"
      }], [{
        "id": "4",
        "action": "Cancer Rising",
        "tags": "cancer water moon"
      }], [{
        "id": "5",
        "action": "Leo Rising",
        "tags": "leo fire sun"
      }], [{
        "id": "6",
        "action": "Virgo Rising",
        "tags": "virgo earth mercury"
      }], [{
        "id": "7",
        "action": "Libra Rising",
        "tags": "libra air venus"
      }], [{
        "id": "8",
        "action": "Scorpio Rising",
        "tags": "scorpio water mars"
      }], [{
        "id": "9",
        "action": "Sagittarius Rising",
        "tags": "sagittarius fire jupiter"
      }], [{
        "id": "10",
        "action": "Capricorn Rising",
        "tags": "capricorn earth saturn"
      }], [{
        "id": "11",
        "action": "Aquarius Rising",
        "tags": "aquarius air saturn"
      }], [{
        "id": "12",
        "action": "Pisces Rising",
        "tags": "pisces water jupiter"
      }]
    ]
  },
  property: function(m) {
    return SL.Astro.Logy.getZodiac(m.ephemeris.asc.deg).sign;
  },
  calculate: function(definitions, property) {
    return definitions.actions[property];
  }
};

//Defines Calendar Objects and Methods
var module_aspects = {

  definitions: {
    core: true,
    name: "Major Aspects",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [
        {
          "id": 1,
          "action": "Moon &#9740; Mercury",
          "tags": "moon conjunction mercury"
        }
      ],
      [
        {
          "id": 2,
          "action": "Moon &#9740; Venus",
          "tags": "moon conjunction venus"
        }
      ],
      [
        {
          "id": 3,
          "action": "Moon &#9740; Sun",
          "tags": "moon conjunction sun"
        }
      ],
      [
        {
          "id": 4,
          "action": "Moon &#9740; Mars",
          "tags": "moon conjunction mars"
        }
      ],
      [
        {
          "id": 5,
          "action": "Moon &#9740; Jupiter",
          "tags": "moon conjunction jupiter"
        }
      ],
      [
        {
          "id": 6,
          "action": "Moon &#9740; Saturn",
          "tags": "moon conjunction saturn"
        }
      ],
      [
        {
          "id": 7,
          "action": "Mercury &#9740; Venus",
          "tags": "mercury conjunction venus"
        }
      ],
      [
        {
          "id": 8,
          "action": "Mercury &#9740; Sun",
          "tags": "mercury conjunction sun"
        }
      ],
      [
        {
          "id": 9,
          "action": "Mercury &#9740; Mars",
          "tags": "mercury conjunction mars"
        }
      ],
      [
        {
          "id": 10,
          "action": "Mercury &#9740; Jupiter",
          "tags": "mercury conjunction jupiter"
        }
      ],
      [
        {
          "id": 11,
          "action": "Mercury &#9740; Saturn",
          "tags": "mercury conjunction saturn"
        }
      ],
      [
        {
          "id": 12,
          "action": "Venus &#9740; Sun",
          "tags": "venus conjunction sun"
        }
      ],
      [
        {
          "id": 13,
          "action": "Venus &#9740; Mars",
          "tags": "venus conjunction mars"
        }
      ],
      [
        {
          "id": 14,
          "action": "Venus &#9740; Jupiter",
          "tags": "venus conjunction jupiter"
        }
      ],
      [
        {
          "id": 15,
          "action": "Venus &#9740; Saturn",
          "tags": "venus conjunction saturn"
        }
      ],
      [
        {
          "id": 16,
          "action": "Sun &#9740; Mars",
          "tags": "sun conjunction mars"
        }
      ],
      [
        {
          "id": 17,
          "action": "Sun &#9740; Jupiter",
          "tags": "sun conjunction jupiter"
        }
      ],
      [
        {
          "id": 18,
          "action": "Sun &#9740; Saturn",
          "tags": "sun conjunction saturn"
        }
      ],
      [
        {
          "id": 19,
          "action": "Mars &#9740; Jupiter",
          "tags": "mars conjunction jupiter"
        }
      ],
      [
        {
          "id": 20,
          "action": "Mars &#9740; Saturn",
          "tags": "mars conjunction saturn"
        }
      ],
      [
        {
          "id": 21,
          "action": "Jupiter &#9740; Saturn",
          "tags": "jupiter conjunction saturn"
        }
      ],
      [
        {
          "id": 22,
          "action": "Moon &#9913; Mercury",
          "tags": "moon sextile mercury"
        }
      ],
      [
        {
          "id": 23,
          "action": "Moon &#9913; Venus",
          "tags": "moon sextile venus"
        }
      ],
      [
        {
          "id": 24,
          "action": "Moon &#9913; Sun",
          "tags": "moon sextile sun"
        }
      ],
      [
        {
          "id": 25,
          "action": "Moon &#9913; Mars",
          "tags": "moon sextile mars"
        }
      ],
      [
        {
          "id": 26,
          "action": "Moon &#9913; Jupiter",
          "tags": "moon sextile jupiter"
        }
      ],
      [
        {
          "id": 27,
          "action": "Moon &#9913; Saturn",
          "tags": "moon sextile saturn"
        }
      ],
      [
        {
          "id": 28,
          "action": "Mercury &#9913; Venus",
          "tags": "mercury sextile venus"
        }
      ],
      [
        {
          "id": 29,
          "action": "Mercury &#9913; Sun",
          "tags": "mercury sextile sun"
        }
      ],
      [
        {
          "id": 30,
          "action": "Mercury &#9913; Mars",
          "tags": "mercury sextile mars"
        }
      ],
      [
        {
          "id": 31,
          "action": "Mercury &#9913; Jupiter",
          "tags": "mercury sextile jupiter"
        }
      ],
      [
        {
          "id": 32,
          "action": "Mercury &#9913; Saturn",
          "tags": "mercury sextile saturn"
        }
      ],
      [
        {
          "id": 33,
          "action": "Venus &#9913; Sun",
          "tags": "venus sextile sun"
        }
      ],
      [
        {
          "id": 34,
          "action": "Venus &#9913; Mars",
          "tags": "venus sextile mars"
        }
      ],
      [
        {
          "id": 35,
          "action": "Venus &#9913; Jupiter",
          "tags": "venus sextile jupiter"
        }
      ],
      [
        {
          "id": 36,
          "action": "Venus &#9913; Saturn",
          "tags": "venus sextile saturn"
        }
      ],
      [
        {
          "id": 37,
          "action": "Sun &#9913; Mars",
          "tags": "sun sextile mars"
        }
      ],
      [
        {
          "id": 38,
          "action": "Sun &#9913; Jupiter",
          "tags": "sun sextile jupiter"
        }
      ],
      [
        {
          "id": 39,
          "action": "Sun &#9913; Saturn",
          "tags": "sun sextile saturn"
        }
      ],
      [
        {
          "id": 40,
          "action": "Mars &#9913; Jupiter",
          "tags": "mars sextile jupiter"
        }
      ],
      [
        {
          "id": 41,
          "action": "Mars &#9913; Saturn",
          "tags": "mars sextile saturn"
        }
      ],
      [
        {
          "id": 42,
          "action": "Jupiter &#9913; Saturn",
          "tags": "jupiter sextile saturn"
        }
      ],
      [
        {
          "id": 43,
          "action": "Moon &#9633; Mercury",
          "tags": "moon square mercury"
        }
      ],
      [
        {
          "id": 44,
          "action": "Moon &#9633; Venus",
          "tags": "moon square venus"
        }
      ],
      [
        {
          "id": 45,
          "action": "Moon &#9633; Sun",
          "tags": "moon square sun"
        }
      ],
      [
        {
          "id": 46,
          "action": "Moon &#9633; Mars",
          "tags": "moon square mars"
        }
      ],
      [
        {
          "id": 47,
          "action": "Moon &#9633; Jupiter",
          "tags": "moon square jupiter"
        }
      ],
      [
        {
          "id": 48,
          "action": "Moon &#9633; Saturn",
          "tags": "moon square saturn"
        }
      ],
      [
        {
          "id": 49,
          "action": "Mercury &#9633; Venus",
          "tags": "mercury square venus"
        }
      ],
      [
        {
          "id": 50,
          "action": "Mercury &#9633; Sun",
          "tags": "mercury square sun"
        }
      ],
      [
        {
          "id": 51,
          "action": "Mercury &#9633; Mars",
          "tags": "mercury square mars"
        }
      ],
      [
        {
          "id": 52,
          "action": "Mercury &#9633; Jupiter",
          "tags": "mercury square jupiter"
        }
      ],
      [
        {
          "id": 53,
          "action": "Mercury &#9633; Saturn",
          "tags": "mercury square saturn"
        }
      ],
      [
        {
          "id": 54,
          "action": "Venus &#9633; Sun",
          "tags": "venus square sun"
        }
      ],
      [
        {
          "id": 55,
          "action": "Venus &#9633; Mars",
          "tags": "venus square mars"
        }
      ],
      [
        {
          "id": 56,
          "action": "Venus &#9633; Jupiter",
          "tags": "venus square jupiter"
        }
      ],
      [
        {
          "id": 57,
          "action": "Venus &#9633; Saturn",
          "tags": "venus square saturn"
        }
      ],
      [
        {
          "id": 58,
          "action": "Sun &#9633; Mars",
          "tags": "sun square mars"
        }
      ],
      [
        {
          "id": 59,
          "action": "Sun &#9633; Jupiter",
          "tags": "sun square jupiter"
        }
      ],
      [
        {
          "id": 60,
          "action": "Sun &#9633; Saturn",
          "tags": "sun square saturn"
        }
      ],
      [
        {
          "id": 61,
          "action": "Mars &#9633; Jupiter",
          "tags": "mars square jupiter"
        }
      ],
      [
        {
          "id": 62,
          "action": "Mars &#9633; Saturn",
          "tags": "mars square saturn"
        }
      ],
      [
        {
          "id": 63,
          "action": "Jupiter &#9633; Saturn",
          "tags": "jupiter square saturn"
        }
      ],
      [
        {
          "id": 64,
          "action": "Moon &#9651; Mercury",
          "tags": "moon trine mercury"
        }
      ],
      [
        {
          "id": 65,
          "action": "Moon &#9651; Venus",
          "tags": "moon trine venus"
        }
      ],
      [
        {
          "id": 66,
          "action": "Moon &#9651; Sun",
          "tags": "moon trine sun"
        }
      ],
      [
        {
          "id": 67,
          "action": "Moon &#9651; Mars",
          "tags": "moon trine mars"
        }
      ],
      [
        {
          "id": 68,
          "action": "Moon &#9651; Jupiter",
          "tags": "moon trine jupiter"
        }
      ],
      [
        {
          "id": 69,
          "action": "Moon &#9651; Saturn",
          "tags": "moon trine saturn"
        }
      ],
      [
        {
          "id": 70,
          "action": "Mercury &#9651; Venus",
          "tags": "mercury trine venus"
        }
      ],
      [
        {
          "id": 71,
          "action": "Mercury &#9651; Sun",
          "tags": "mercury trine sun"
        }
      ],
      [
        {
          "id": 72,
          "action": "Mercury &#9651; Mars",
          "tags": "mercury trine mars"
        }
      ],
      [
        {
          "id": 73,
          "action": "Mercury &#9651; Jupiter",
          "tags": "mercury trine jupiter"
        }
      ],
      [
        {
          "id": 74,
          "action": "Mercury &#9651; Saturn",
          "tags": "mercury trine saturn"
        }
      ],
      [
        {
          "id": 75,
          "action": "Venus &#9651; Sun",
          "tags": "venus trine sun"
        }
      ],
      [
        {
          "id": 76,
          "action": "Venus &#9651; Mars",
          "tags": "venus trine mars"
        }
      ],
      [
        {
          "id": 77,
          "action": "Venus &#9651; Jupiter",
          "tags": "venus trine jupiter"
        }
      ],
      [
        {
          "id": 78,
          "action": "Venus &#9651; Saturn",
          "tags": "venus trine saturn"
        }
      ],
      [
        {
          "id": 79,
          "action": "Sun &#9651; Mars",
          "tags": "sun trine mars"
        }
      ],
      [
        {
          "id": 80,
          "action": "Sun &#9651; Jupiter",
          "tags": "sun trine jupiter"
        }
      ],
      [
        {
          "id": 81,
          "action": "Sun &#9651; Saturn",
          "tags": "sun trine saturn"
        }
      ],
      [
        {
          "id": 82,
          "action": "Mars &#9651; Jupiter",
          "tags": "mars trine jupiter"
        }
      ],
      [
        {
          "id": 83,
          "action": "Mars &#9651; Saturn",
          "tags": "mars trine saturn"
        }
      ],
      [
        {
          "id": 84,
          "action": "Jupiter &#9651; Saturn",
          "tags": "jupiter trine saturn"
        }
      ],
      [
        {
          "id": 85,
          "action": "Moon &#9741; Mercury",
          "tags": "moon opposition mercury"
        }
      ],
      [
        {
          "id": 86,
          "action": "Moon &#9741; Venus",
          "tags": "moon opposition venus"
        }
      ],
      [
        {
          "id": 87,
          "action": "Moon &#9741; Sun",
          "tags": "moon opposition sun"
        }
      ],
      [
        {
          "id": 88,
          "action": "Moon &#9741; Mars",
          "tags": "moon opposition mars"
        }
      ],
      [
        {
          "id": 89,
          "action": "Moon &#9741; Jupiter",
          "tags": "moon opposition jupiter"
        }
      ],
      [
        {
          "id": 90,
          "action": "Moon &#9741; Saturn",
          "tags": "moon opposition saturn"
        }
      ],
      [
        {
          "id": 91,
          "action": "Mercury &#9741; Venus",
          "tags": "mercury opposition venus"
        }
      ],
      [
        {
          "id": 92,
          "action": "Mercury &#9741; Sun",
          "tags": "mercury opposition sun"
        }
      ],
      [
        {
          "id": 93,
          "action": "Mercury &#9741; Mars",
          "tags": "mercury opposition mars"
        }
      ],
      [
        {
          "id": 94,
          "action": "Mercury &#9741; Jupiter",
          "tags": "mercury opposition jupiter"
        }
      ],
      [
        {
          "id": 95,
          "action": "Mercury &#9741; Saturn",
          "tags": "mercury opposition saturn"
        }
      ],
      [
        {
          "id": 96,
          "action": "Venus &#9741; Sun",
          "tags": "venus opposition sun"
        }
      ],
      [
        {
          "id": 97,
          "action": "Venus &#9741; Mars",
          "tags": "venus opposition mars"
        }
      ],
      [
        {
          "id": 98,
          "action": "Venus &#9741; Jupiter",
          "tags": "venus opposition jupiter"
        }
      ],
      [
        {
          "id": 99,
          "action": "Venus &#9741; Saturn",
          "tags": "venus opposition saturn"
        }
      ],
      [
        {
          "id": 100,
          "action": "Sun &#9741; Mars",
          "tags": "sun opposition mars"
        }
      ],
      [
        {
          "id": 101,
          "action": "Sun &#9741; Jupiter",
          "tags": "sun opposition jupiter"
        }
      ],
      [
        {
          "id": 102,
          "action": "Sun &#9741; Saturn",
          "tags": "sun opposition saturn"
        }
      ],
      [
        {
          "id": 103,
          "action": "Mars &#9741; Jupiter",
          "tags": "mars opposition jupiter"
        }
      ],
      [
        {
          "id": 104,
          "action": "Mars &#9741; Saturn",
          "tags": "mars opposition saturn"
        }
      ],
      [
        {
          "id": 105,
          "action": "Jupiter &#9741; Saturn",
          "tags": "jupiter opposition saturn"
        }
      ]
    ]
  },
  property: function(m) {
    return m.ephemeris;
  },
  calculate: function(definitions, property) {
    var chaldean = ["void", "moon", "mercury", "venus", "sun", "mars", "jupiter", "saturn"];
    var combo = [[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,3],[2,4],[2,5],[2,6],[2,7],[3,4],[3,5],[3,6],[3,7],[4,5],[4,6],[4,7],[5,6],[5,7],[6,7]];
    var ret = [];
    combo.forEach(function(c, idx) {
      var diff = eval("property."+chaldean[c[0]]+".deg") - eval("property."+chaldean[c[1]]+".deg");
      var angle = Math.min( Math.abs(diff), 360-Math.abs(diff) );
      var orb = 3.0;
      if ( c[0] == 1 ) orb = 13.0;
      if ( c[0] == 4 || c[1] == 4) orb = 15.0;
      if ( angle <= orb ) ret.push(definitions.actions[idx][0]);
      if ( c[0] == 1 || c[0] == 4 || c[1] == 4) orb = 3.1;
      if ( c[0] == 1 && c[1] == 4) orb = 3.2;
      if ( Math.abs(angle -  60) <= orb ) ret.push(definitions.actions[idx+21][0]);
      if ( Math.abs(angle -  90) <= orb ) ret.push(definitions.actions[idx+21*2][0]);
      if ( Math.abs(angle - 120) <= orb ) ret.push(definitions.actions[idx+21*3][0]);
      if ( Math.abs(angle - 180) <= orb ) ret.push(definitions.actions[idx+21*4][0]);
    });
    return ret;
  }
};

//Defines Calendar Objects and Methods
var module_motion = {

  definitions: {
    core: true,
    name: "Stations + Retrogrades",
    group: {
      id: "astrology",
      text: "Astrology",
      info: "true"
    },
    actions: [
      [0],
      [{
        "id": "1",
        "action": "Mercury Station",
        "tags": "mercury station retrograde"
      }], [{
        "id": "2",
        "action": "Mercury Retrograde",
        "tags": "mercury retrograde"
      }], [{
        "id": "3",
        "action": "Venus Station",
        "tags": "venus station retrograde"
      }], [{
        "id": "4",
        "action": "Venus Retrograde",
        "tags": "venus retrograde"
      }], [{
        "id": "5",
        "action": "Mars Station",
        "tags": "mars station retrograde"
      }], [{
        "id": "6",
        "action": "Mars Retrograde",
        "tags": "mars retrograde"
      }], [{
        "id": "7",
        "action": "Jupiter Station",
        "tags": "jupiter station retrograde"
      }], [{
        "id": "8",
        "action": "Jupiter Retrograde",
        "tags": "jupiter retrograde"
      }], [{
        "id": "9",
        "action": "Saturn Station",
        "tags": "saturn station retrograde"
      }], [{
        "id": "10",
        "action": "Saturn Retrograde",
        "tags": "saturn retrograde"
      }], [{
        "id": "11",
        "action": "Mercury Direct",
        "tags": "mercury direct",
        "hide": "info"
      }], [{
        "id": "12",
        "action": "Venus Direct",
        "tags": "venus direct",
        "hide": "info"
      }], [{
        "id": "13",
        "action": "Mars Direct",
        "tags": "mars direct",
        "hide": "info"
      }], [{
        "id": "14",
        "action": "Jupiter Direct",
        "tags": "jupiter direct",
        "hide": "info"
      }], [{
        "id": "15",
        "action": "Saturn Direct",
        "tags": "saturn direct",
        "hide": "info"
      }]
    ]
  },
  property: function(m) {
    return m.ephemeris;
  },
  calculate: function(definitions, property) {
    var chaldean = ["moon", "mercury", "venus", "mars", "jupiter", "saturn"];
    var ret = [];
    chaldean.forEach(function(c, idx) {
      var speed = eval("property."+c+".speed");
      if ( c == "mercury" && speed > 0.01 ) ret.push(definitions.actions[11][0]);
      if ( c == "mercury" && speed < 0.01 && speed > -0.01 ) ret.push(definitions.actions[1][0]);
      if ( c == "mercury" && speed < -0.01 ) ret.push(definitions.actions[2][0]);
      if ( c == "venus" && speed > 0.01 ) ret.push(definitions.actions[12][0]);
      if ( c == "venus" && speed < 0.01 && speed > -0.01 ) ret.push(definitions.actions[3][0]);
      if ( c == "venus" && speed < -0.01 ) ret.push(definitions.actions[4][0]);
      if ( c == "mars" && speed > 0.01 ) ret.push(definitions.actions[13][0]);
      if ( c == "mars" && speed < 0.01 && speed > -0.01 ) ret.push(definitions.actions[5][0]);
      if ( c == "mars" && speed < -0.01 ) ret.push(definitions.actions[6][0]);
      if ( c == "jupiter" && speed > 0.001 ) ret.push(definitions.actions[14][0]);
      if ( c == "jupiter" && speed < 0.001 && speed > -0.001 ) ret.push(definitions.actions[7][0]);
      if ( c == "jupiter" && speed < -0.001 ) ret.push(definitions.actions[8][0]);
      if ( c == "saturn" && speed > 0.001 ) ret.push(definitions.actions[15][0]);
      if ( c == "saturn" && speed < 0.001 && speed > -0.001 ) ret.push(definitions.actions[9][0]);
      if ( c == "saturn" && speed < -0.001 ) ret.push(definitions.actions[10][0]);
    });
    return ret;
  }
};
