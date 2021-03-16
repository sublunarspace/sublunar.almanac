/**
* @preserve Copyright (c) 2021 T. F. Raaion, www.sublunar.space
* License MIT: http://www.opensource.org/licenses/MIT
*/

//Defines Calendar Objects and Methods
  
  var module_siderealpsi = {
  
    definitions: {
      core: false,
      name: "Sidereal Time Effect Size",
      description: "In 1997 Psi researcher James Spottiswoode found a correlation of local sidereal time and psychic abilities. The effect size appeared to peak around 13:30 and was at a low around 18:00 - 19:00. Another enquiry in 2015 could not reproduce the same values, but revealed a peak around 7:00.",
      group: {
        id: "siderealpsi",
        text: "Psi"
      },
      actions: [
        [0],
        [
          {
            "id": "1",
            "action": "Galactic Center Rising / Highest Effect Size (1997)",
            "tags": "rising highest"
          }
        ],
        [
          {
           "id": "2",
           "action": "Highest Effect Size (2015)",
           "tags": "highest"
          }
        ],
        [
          {
            "id": "3",
            "action": "Medium Effect Size",
            "tags": "medium"
          }
        ],
        [
          {
            "id": "4",
            "action": "Galactic Center Overhead / Lowest Effect Size (1997)",
            "tags": "overhead lowest"
          }
        ],
      ]
    },
    property: function(m) {
      return m.gst;
    },
    calculate: function(definitions, property) {
      return definitions.actions[getEffectSize(property)];
    }
  };
  
  function getEffectSize(property) {
    if ( property > 12.75 && property < 14.25 ) return 1;
    if ( property > 17.4 && property < 20 ) return 4;
    if ( property > 6 && property < 8 ) return 2;
    else return 3;
  }