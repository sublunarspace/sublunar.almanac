/**
* @preserve Copyright (c) 2018 T. F. Raaion, www.sublunar.space
* License MIT: http://www.opensource.org/licenses/MIT
*/

//Defines Calendar Objects and Methods
var module_fruitmachine_day = {

  definitions: {
    core: true,
    name: "Day + Luminaries",
    group: {
      id: "fruitmachine",
      text: "Fruit Machine",
      info: "true"
    },
    actions: [
      [0],
      [
        {
          "id": "1",
          "action": "Day ruler matches sun sign ruler",
          "tags": "sun day"
        }
      ],
      [
        {
          "id": "2",
          "action": "Day ruler matches moon sign ruler",
          "tags": "moon day"
        }
      ],
      [
        {
          "id": "3",
          "action": "Day ruler matches moon and sun sign ruler",
          "tags": "moon day sun"
        }
      ]
    ]
  },
  property: function(m) {
      return m;
  },
  calculate: function(definitions, property) {
      var dayruler = property.planetary.day.no+1;
      var sunsignruler =  SL.Astro.Logy.zodiac.ruler[SL.Astro.Logy.getZodiac(property.ephemeris.sun.deg).sign];
      var moonsignruler = SL.Astro.Logy.zodiac.ruler[SL.Astro.Logy.getZodiac(property.ephemeris.moon.deg).sign];
      if ( dayruler == sunsignruler && dayruler == moonsignruler ) return definitions.actions[3];
      else if ( dayruler == sunsignruler ) return definitions.actions[1];
      else if ( dayruler == moonsignruler ) return definitions.actions[2];
  }
};

//Defines Calendar Objects and Methods
var module_fruitmachine_dignity = {

  definitions: {
    core: true,
    name: "Ascendant + Dignities",
    group: {
      id: "fruitmachine",
      text: "Fruit Machine",
      info: "true"
    },
    actions: [
      [0],
      [
        {
          "id": "1",
          "action": "Same moon and rising sign ruler",
          "tags": "moon ascendant"
        }
      ],
      [
        {
          "id": "2",
          "action": "Same moon, sun, and rising sign ruler",
          "tags": "moon sun ascendant"
        }
      ],
      [
        {
          "id": "3",
          "action": "Rising sign ruler in a domicile or sign of exaltation",
          "tags": "ascendant dignified"
        }
      ],
      [
        {
          "id": "4",
          "action": "Same moon and sun sign ruler in a domicile or sign of exaltation",
          "tags": "moon sun dignified"
        }
      ],
      [
        {
          "id": "5",
          "action": "Same moon and rising sign ruler in a domicile or sign of exaltation",
          "tags": "moon ascendant dignified"
        }
      ],
      [
        {
          "id": "6",
          "action": "Same moon, sun, and rising sign ruler in a domicile or sign of exaltation",
          "tags": "moon sun ascendant dignified"
        }
      ]
    ]
  },
  property: function(m) {
      return m.ephemeris;
  },
  calculate: function(definitions, property) {
      var sun = SL.Astro.Logy.zodiac.ruler[SL.Astro.Logy.getZodiac(property.sun.deg).sign];
      var moon = SL.Astro.Logy.zodiac.ruler[SL.Astro.Logy.getZodiac(property.moon.deg).sign];
      var asc = SL.Astro.Logy.zodiac.ruler[SL.Astro.Logy.getZodiac(property.asc.deg).sign];
      if ( moon == asc && moon == sun && isDignified(moon, property) ) return definitions.actions[6];
      else if ( moon == asc && isDignified(moon, property) ) return definitions.actions[5];
      else if ( moon == sun && isDignified(moon, property) ) return definitions.actions[4];
      else if ( isDignified(asc, property) ) return definitions.actions[3];
      else if ( moon == sun && moon == asc ) return definitions.actions[2];
      else if ( moon == asc ) return definitions.actions[1];
  }
};

function isDignified(ruler, ephemeris) {
    var dignified = false;
    var planet = SL.Astro.Logy.planet.name[ruler];
    var sign = SL.Astro.Logy.getZodiac(eval("ephemeris."+planet.toLowerCase()+".deg")).sign;
    var signruler = SL.Astro.Logy.zodiac.ruler[sign];
    var exaltation = SL.Astro.Logy.zodiac.exaltation[sign];
    if ( ruler == signruler ) dignified = true;
    else if ( ruler == exaltation ) dignified = true;
    return dignified;
}
