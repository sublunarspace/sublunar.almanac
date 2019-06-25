/**
* @preserve Copyright (c) 2018 T. F. Raaion, www.sublunar.space
* License MIT: http://www.opensource.org/licenses/MIT
*/

//Defines Calendar Objects and Methods
var module_behenii = {

  definitions: {
    name: "Rising Behenii",
    description: "The Behenian fixed stars are 15 stars considered especially useful for magic in European and Arab medieval astrology when conjunct with the moon and on the ASC or MC.",
    group: {
      id: "stars",
      text: "Fixed Stars",
      info: "true"
    },
    actions: [
       [0],
       [
          {
             "id":1,
             "action":"Algol / Caput Larvæ: brings hatred and courage, preserves the members of the body, and grants vengeance over anyone you wish",
             "tags":"saturn jupiter war harm protection"
          }
       ],
       [
          {
             "id":2,
             "action":"Pleiades: preserves the eyesight, summons demons and the spirits of the dead, calls the winds, and reveals secrets and things that are lost",
             "tags":"moon mars health necromancy conjuration secrets treasures winds"
          }
       ],
       [
          {
             "id":3,
             "action":"Aldebaran / Aldaboram: increases riches and brings great honors",
             "tags":"mars venus wealth honours"
          }
       ],
       [
          {
             "id":4,
             "action":"Capella / Alhayhoch / Hircus: exalts to honors, brings the favor of kings and nobles, heals toothache, is very medicinal",
             "tags":"saturn jupiter honours authorities health"
          }
       ],
       [
          {
             "id":5,
             "action":"Sirius / Canis major: grants the favor of aerial spirits and peoples of the earth, brings peace and concord between kings and other potentates, and between husbands and wives",
             "tags":"venus winds conjuration earth peace authorities family relationship"
          }
       ],
       [
          {
             "id":6,
             "action":"Procyon / Canis minor: grants the favor of God and man, gives the favor of aerial spirits, gives great power over magic, keeps healthy",
             "tags":"mercury mars authorities winds conjuration magic health"
          }
       ],
       [
          {
             "id":7,
             "action":"Regulus / Cor leonis: takes away anger and melancholy, makes temperate, grants favor",
             "tags":"mars jupiter health protection luck"
          }
       ],
       [
          {
             "id":8,
             "action":"Alkaid / Tail of the Great Bear: power against enchantments, against dryness, gives safety in travel, if it be put together with wolf's teeth it makes hunters proficient",
             "tags":"venus moon unbinding protection travel hunt"
          }
       ],
       [
          {
             "id":9,
             "action":"Algorab / Corvi: makes men angry, hateful, daring, and evil-speaking, causes wicked dreams, drives demons away, and protects men against demons and evil winds",
             "tags":"saturn mars war harm protection dreams winds"
          }
       ],
       [
          {
             "id":10,
             "action":"Spica: will increase gold, accumulate riches, bring victory in lawsuits, free from evil and anguish",
             "tags":"venus mercury wealth justice protection"
          }
       ],
       [
          {
             "id":11,
             "action":"Arcturus / Alchameth: carries away fevers, restrains the flow of blood",
             "tags":"mars jupiter health protection"
          }
       ],
       [
          {
             "id":12,
             "action":"Alphecca / Elpheia: makes men chaste, grants friendship and honor with God and man",
             "tags":"venus mars relationship"
          }
       ],
       [
          {
             "id":13,
             "action":"Antares / Cor scorpii: gives healthy color, grants good memory and intelligence, makes appear wise, banishes demons",
             "tags":"venus jupiter health protection intelligence"
          }
       ],
       [
          {
             "id":14,
             "action":"Vega / Vultur cadens: grants favor with beasts, protects from scabies, demons, nocturnal phantoms, fears",
             "tags":"mercury venus relationship protection health"
          }
       ],
       [
          {
             "id":15,
             "action":"Deneb Algedi / Cauda capricorni: gives favor in lawsuits, improves the home in which it is kept, keeps it secure, increases all manner of riches",
             "tags":"saturn mercury justice protection wealth"
          }
       ]
   ],
   stars: [
     "void",
     "26 Taurus 10",
     "29 Taurus 58",
     "9 Gemini 47",
     "21 Gemini 51",
     "14 Cancer 05",
     "25 Cancer 47",
     "29 Leo 50",
     "27 Virgo 10",
     "13 Libra 27",
     "23 Libra 50",
     "24 Libra 14",
     "12 Scorpio 18",
     "9 Sagittarius 46",
     "15 Capricorn 19",
     "23 Aquarius 30"
   ]
  },
  property: function(m) {
    return m.ephemeris;
  },
  calculate: function(definitions, property) {
    var stars = definitions.stars;
    const orb = 13.0;
    var ret = [];
    stars.forEach( function(star, no) {
        var diff = property.moon.deg - SL.Astro.Logy.zodToDeg(star);
        var angle = Math.min( Math.abs(diff), 360-Math.abs(diff) );
        if ( angle <= orb ) {
            var rangle = Math.min( Math.abs( property.moon.deg - property.asc.deg ), 360-Math.abs(property.moon.deg - property.asc.deg ) );
            var mangle = Math.min( Math.abs( property.moon.deg - property.mc.deg ), 360-Math.abs(property.moon.deg - property.mc.deg ) );
            if ( rangle <= orb || mangle <= orb ) {
                console.log("MC: "+mangle+", ASC: "+rangle);
                ret.push(definitions.actions[no][0]);
            }
        }
    });
    return ret;
  }
};
