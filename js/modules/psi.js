/**
* @preserve Copyright (c) 2021 T. F. Raaion, www.sublunar.space
* License MIT: http://www.opensource.org/licenses/MIT
*/

//Defines Calendar Objects and Methods
  
  var module_siderealpsi = {
  
    definitions: {
      core: true,
      name: "Sidereal Time Effect Size",
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