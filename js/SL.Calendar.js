/**
 * @preserve Copyright © 2018 T. F. Raaion, www.sublunar.space
 * (MIT): http://www.opensource.org/licenses/MIT
 *
 * SUBLUNAR ALMANAC
 */
var SL = SL || {};

//Defines Calendar Objects and Methods
/**
 * Methods and objects to generate the calendar
 * @public {function} modules() - loads all plugin modules defined in an Array in index.html and adds their filters to the navbar
 * @public {function} make() - creates the grid of planetary hours for given coordinates and time in Settings
 * @public {Array} moments - holds all the JSON Ephemeris objects to calculate the calendar data
 * @public {function} hourInfo() - creates a temporary DOM object to be displayed as hour info upon clicking a planetary hour object
 * @public {function} comboFilter() - is a filter function for Isotope to include all selected tags and operations within a filter but exclude between each other
 * @public {function} getGeoCode() - set latitude, longitude, and UTC-Offset form fields for a given place entered in Settings
 * @public {function} about() - creates a DOM object with the "About" text for SUBLUNAR ALMANAC.
 * @public {function} reset() - simulates a resizing of the browser window. Needed hack for a display glitch in the modals.
 * @public {function} resetFileInput() - resets the file selection button in Settings
 * @public {function} download() - download a JSON object as a file
 * @public {function} update() - updates the offline app
 */
SL.Calendar = (function() {

  /**
   * about function creates a DOM object with the "About" text for SUBLUNAR ALMANAC
   */
  function about() {
    $('<div/>').loadTemplate($("#tpl-modal"), {
        title : '<center><h1 class="stoke">SUBLUNAR ALMANAC</h1></center>',
        right : $("#about-modal").html()
    })
    .appendTo('#modals')
    .attr('id', 'aboutSLC')
    .attr('tabindex', '-1')
    .attr('role', 'dialog')
    .addClass('modal fade autoModal')
    .find('.col-sm-4').closest('.row')
    .find('.col-sm-8').attr('class', 'col-sm-12').closest('.row')
    .find('.col-sm-4').remove();
    if ( $("body").attr("use") == "offline" ) {
        $('<button/>').attr('role', 'button').attr('target', '_blank').attr('onClick', 'SL.App.reset();').html('Reset App').addClass('btn btn-default pull-left').prependTo('#aboutSLC .modal-footer');
        $('#3rdparty').append('<p>The desktop application relies on<br /><a href="http://chromium.org" target="_blank">Google Chromium</a>, © 2015 The Chromium Authors <a href="https://chromium.googlesource.com/chromium/src/+/master/LICENSE" target="_blank">(BSD)</a><br /><a href="http://nwjs.io" target="_blank">node.js</a>, © Node.js Foundation, © Joyent, Inc. <a href="https://github.com/nodejs/node/blob/master/LICENSE" target="_blank">(C)</a><br /><a href="http://nwjs.io" target="_blank">NW.js</a>, © 2015-2019 NW.js community, Intel Corp, The Chromium Authors <a href="https://opensource.org/licenses/MIT" target="_blank">(MIT)</a><br /><a href="https://github.com/kripken/emscripten" target="_blank">emscripten</a>, © 2010-2014 Emscripten authors <a href="https://opensource.org/licenses/MIT" target="_blank">(MIT)</a><br /><a href="https://github.com/automation-stack/node-machine-id" target="_blank">node-machine-id</a>, © 2016 Aleksandr Komlev <a href="https://opensource.org/licenses/MIT" target="_blank">(MIT)</a><br /><a href="https://github.com/dsheiko/nw-autoupdater" target="_blank">nw-autoupdater</a>, © 2018 Dmitry Sheiko <a href="https://opensource.org/licenses/MIT" target="_blank">(MIT)</a><br /></p>');
    }
  }

  /**
   * resetWindow function simulates a resizing of the browser window. Needed hack for a display glitch in the modals.
   */
  function resetWindow() {
    var resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent .initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);
  }

  /**
   * resetFileInput resets the file selection button in Settings
   */
  function resetFileInput() {
    $('#fileInput').wrap('<form>').closest('form').get(0).reset();
    $('#fileInput').unwrap();
    $('#fileInputLabel').removeClass('btn-danger btn-success').addClass('btn-default').find('span').html('Select File');
  }

  /**
   * download a JSON object as a file
   * @param {Object} exportObj - JSON Object to be downloaded
   * @param {string} exportName - file name for the JSON Object to be downloaded
   * found here: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
   */
  function download(exportObj, exportName, query = "query", dataType = "json", type = "text/plain;charset=utf-8"){
      if ( dataType == "json") {
          var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent('{"'+query+'":'+JSON.stringify(exportObj)+'}');
          var downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href",     dataStr);
          downloadAnchorNode.setAttribute("download", exportName + ".json");
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
      } else {
          var text = exportObj;
          var filename = exportName;
          var blob = new Blob([text], {type: type});
          saveAs(blob, filename);
      }
  }

  /**
   * getGeoCode function to set latitude, longitude, and UTC-Offset form fields for a given place entered in Settings
   * @param {Object} item - JSON Object returned from kt.OsmNamesAutocomplete (see index.html)
   */
  function getGeoCode(item) {
    $('#lat').addClass('loading');
    $('#lon').addClass('loading');
    $('#offset').addClass('loading');
    // find timezone with tzlookup for lat and long returned from kt.OsmNamesAutocomplete JSON
    // and extract UTC offset from a string in the format "(UTC+03:00)":
    $.getJSON( "https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json", function( zones ) {
      var off = JSON.search( zones, '//*[utc="'+tzlookup(item.lat, item.lon)+'"]');
      $('#lat').val(item.lat);
      $('#lon').val(item.lon);
      var os;
      // it's a dirty hack solution...
      if ( off[0].text ) {
        if ( off[0].text.split(')')[0] == '(UTC') os = 0;
        else {
          if ( item.lon < 0 ) os = parseInt(off[0].text.split(')')[0].split('-')[1].split(':')[0], 10)*-1;
          if ( item.lon > 0 ) os = parseInt(off[0].text.split(')')[0].split('+')[1].split(':')[0], 10);
        }
      } else os = "???";
      $('#offset').val(os);
      $('#lat').removeClass('loading');
      $('#lon').removeClass('loading');
      $('#offset').removeClass('loading');
    });
  }

  function unik(array){
    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });
  }

  /**
   * Hours object with variable and function to generate the grid of planetary hours
   * @public {Object} moments - JSON object holding all the data returned from the swiss ephemeris calculations done by pmom.c
   * @public {function} make() - creates the grid of planetary hours for given coordinates and time
   */
  var Hours = (function() {

    /**
     * moments JSON object with all returned moments from pmom.c. Filled by make()
     */
    var moments = [];

    /**
     * make function creates the grid of planetary hours for given coordinates and time in Settings
     * @param {int} days - number of days to be calculated
     * @param {int} ts - unix timestamp of first day of the calendar to be calculated
     * @param {float} lat - decimal degrees latitude of place on Earth
     * @param {float} lon - decimal degrees longitude of place on Earth
     */
    function make(days, ts, lat, lon ) {
      if ( days > 60 && $("body").attr("use") == "online" ) {
        alert("Sorry, the calculation is limited to 60 days at the moment! Calculating the first 60 out of your desired "+days+" days!");
        days = 60;
      }
      $('#caption .stoke').html('calculating ephemeris...please wait');
      $("#grid").empty();
      $('#download').remove();
      if ( $("body").attr("use") == "download" ) $("#grid").css({"visibility":"hidden"});
      Filter.load();
      // check if negative UTC offset will be before the beginning of UTC day and if yes, go back one day.
      if ( moment.unix(ts).startOf('day') > moment.unix(ts).add( $("#offset").val(), 'hours') ) {
        ts = moment.unix(ts).subtract(1, 'day').utc().unix();
      }
      var files = document.getElementById('fileInput').files;
      // check if JSON file is loaded. If not, calculate...
      if (files.length <= 0) {
        // checks if usecase is offline, then uses WebAssembly
        if ( $("body").attr("use") != "online" ) {
            var astrologer = new Worker('js/sweph.js');
            astrologer.postMessage([days, ts, lat, lon]);
            astrologer.onmessage = function(response) {
                Hours.moments = response.data;
                maker();
            }
        // checks if usecase is online, then uses server based calculation
        } else {
            var url = "pmom.php?days="+days+"&ts="+ts+"&lat="+lat+"&lon="+lon;
            fetch(url)
            .then(function(response) {
                return response.json();
              })
              .then(function(json) {
                Hours.moments = json.query;
                maker();
              });
        }
      } else {
        // display calendar data from JSON file
        var fr = new FileReader();
        fr.onloadend = function(e) {
          try {
            var result = JSON.parse(e.target.result);
          } catch (e) {
            NProgress.done();
            $('#settings').modal('show');
            $('#fileInputLabel').removeClass('btn-success').addClass('btn-danger').find('span').html('FILE ERROR');
            alert("Sorry, wrong file format!");
            SL.Calendar.resetFileInput();
            return false;
          }
          Hours.moments = result.query;
          maker();
        }
        fr.readAsText(files.item(0));
      }
    }

    function load(moments) {
        Hours.moments = moments;
    }

    function maker() {
        if ( $("body").attr("use") == "offline" ) {
            SL.App.place.set($('#search').val());
        }
        if ( Hours.moments.length > 0 ) {
            $('#caption .stoke').html('generating planetary hours...please wait');
            for (var i = 0, len = Hours.moments.length; i < len; i++) {
              var everyday = setTimeout( Hour.make, 10, Hours.moments[i], i, Hours.moments.length, everyday);
              NProgress.set(i/Hours.moments.length);
            }
        }
    }

    return {
      make: make,
      moments : moments,
      load : load
    }

  }());

  /**
   * Hour object with variable and function to generate a single planetary hour
   * @public {function} make() - creates a DOM object of a planetary hour based on a template defined in index.html
   * @public {function} info() - creates a temporary DOM object to be displayed as hour info upon clicking a planetary hour object
   */
  var Hour = (function() {

    /**
     * make function creates a DOM object of a planetary hour based on a template defined in index.html
     * @param {Object} data - a single hour JSON object with all data to build a DOM object
     * @param {int} j - increment number of hour object
     * @param {int} all - total number of objects to be created
     * @param {int} timeout - holds the ID value returned by setTimeout() in Hours.make()
     */
    function make(data, j, all, timeout) {
      var now = new moment.utc().unix();
      var m = data;
      if ( $("#future").is(':checked') && now > m.ts ) return false;
      var zodiac         = SL.Astro.Logy.getZodiac(m.ephemeris.sun.deg);
      var moonsign       = SL.Astro.Logy.getZodiac(m.ephemeris.sun.deg);
      var extraData = Module.data(m);
      $('<div/>').loadTemplate($("#tpl-planetaryhour"), {
          ruler       : SL.Astro.Logy.planet.symbol[(m.planetary.day.no+1)],
          date        : new moment.unix(m.ts).utc().add($('#offset').val(), 'h').format('D/M'),
          hourstart   : new moment.unix(m.planetary.hour.start).utc().add($('#offset').val(), 'h').format('HH:mm'),
          hourruler   : m.planetary.hour.no+1,
          hournumber  : SL.Astro.Logy.planet.symbol[SL.Astro.Logy.planet.order[((m.planetary.hour.no+1+(m.planetary.day.no*24) - 1) % 7 ) + 1]],
          hourend     : new moment.unix(m.planetary.hour.end).utc().add($('#offset').val(), 'h').format('HH:mm'),
      })
      .addClass('col-md-2 centered planetaryhour')
      .addClass(Module.classes(extraData))
      .attr('id', 'moment_'+j)
      .attr('ts', m.ts)
      .appendTo('#grid');
      if ( m.planetary.hour.no > 11 ) {
        $('#moment_'+j).addClass('night-hour');
      }
      if ( j == all-1 ) {
        if ( $("body").attr("use") == "online" ) {
            var fname = $('#search').val().split(' ').join('_')+'_'+new moment.unix(Hours.moments[0].ts).utc().format('DDMMMYYYY')+'-'+new moment.unix(Hours.moments[0].ts).utc().add($('#days').val(), 'days').format('DDMMMYYYY');
            if ( $('#search').val() != '' && $('#fileInput').val() == '') {
              $('<button/>').attr('role', 'button').attr('target', '_blank').attr('id', 'download').html('Download File').addClass('btn btn-default pull-left').prependTo('#settings .modal-footer');
              $('#download').on('click', function() {
                SL.Calendar.download(Hours.moments, fname);
              });
            }
        }
        SL.Calendar.resetFileInput();
        $('.planetaryhour').on('click', SL.Calendar.hourInfo);
        if ( $('#calendar').data('isotope') ) $('#calendar').isotope('destroy');
        NProgress.done();
        clearTimeout(timeout);
        $('#caption .stoke').empty();
        if ( $("body").attr("use") == "download" ) {
            SL.Calendar.download( $("#grid").html(), "grid.html", "skip", "html", "text/html; charset=utf-8");
            SL.Calendar.download(Hours.moments, "ephemeris");
        }
      }
    }

    /**
     * info function creates a temporary DOM object to be displayed as hour info upon clicking a planetary hour object
     */
    function info() {
      var myid = $(this).attr('id');
      var idx = myid.split('_')[1];
      var mom = Hours.moments[idx];
      var ts = mom.planetary.hour.start;
      if ( $("#hourinfo").length ) $("#hourinfo").remove();
      $('<div/>').loadTemplate($("#tpl-modal"), {
          title : SL.Astro.Logy.planet.day[mom.planetary.day.no+1]+", "+new moment.unix(mom.ts).utc().add($('#offset').val(), 'h').format('MMM D')+", Hour: "+(mom.planetary.hour.no+1),
          right : '<ul id="houractions" class="option-set"></ul>\n',
          left  : '<ul id="hourinfos" class="option-set"></ul>\n'
      }).appendTo('#modals').attr('id', 'hourinfo').attr('tabindex', '-1').attr('role', 'dialog').addClass('modal fade autoModal');
      $('#p-info').html(
        $('#hourinfos').append(
          '<li>&nbsp;</li>\n'+
          '<li>Local Sidereal Time'+moment.unix(ts).startOf('day').add(mom.gst, 'h').format('HH:MM:SS')+'</li>'+
          '<li>Lunar Day: '+(mom.lunar.day)+'</li>\n'+
          '<li>'+SL.Astro.Nomy.moon.phase.symbol[SL.Astro.Nomy.moonPhase(mom.lunar)]+' '+SL.Astro.Nomy.moon.phase.name[SL.Astro.Nomy.moonPhase(mom.lunar)]+'</li>\n'+
          '<li>Phase: '+Math.round(mom.lunar.phase * 100)+'%</li>\n'+
          '<li>Angle: '+Math.round(mom.lunar.angle * 100) / 100+'°</li>\n'+
          '<li>&nbsp;</li>\n'
      ));
      var chaldean = ["ASC", "Moon", "Mercury", "Venus", "Sun", "Mars", "Jupiter", "Saturn"];
      chaldean.forEach(function(planet) {
        $('#hourinfos').append(
          '<li><b>'+planet+'</b></li>\n'+
          '<li>Position: '+SL.Astro.Logy.degToZod(eval("mom.ephemeris."+planet.toLowerCase(planet)+".deg"))+'</li>\n'+
          '<li>Sign: '+SL.Astro.Logy.zodiac.name[SL.Astro.Logy.getZodiac(eval("mom.ephemeris."+planet.toLowerCase()+".deg")).sign]+'</li>\n'+
          '<li>Ruler: '+SL.Astro.Logy.planet.name[SL.Astro.Logy.zodiac.ruler[SL.Astro.Logy.getZodiac(eval("mom.ephemeris."+planet.toLowerCase()+".deg")).sign]]+'</li>\n'+
          '<li>&nbsp;</li>\n');
      });
      $('#houractions').html('');
      var tags = [];
      var extData = Module.data(mom);
      Object.keys(extData).forEach(function(key) {
        //if (!extData[key].hasOwnProperty("hide") || (extData[key].hasOwnProperty("hide") && extData[key].hide != "info"))
        //  tags.push(extData[key].tags);
        var appender = '#houractions .'+key+'-actions';
        if ( Module.modules[key].definitions.hasOwnProperty("group") && Module.modules[key].definitions.group.hasOwnProperty("info") ) {
          if ( !$('li.info-section-'+Module.modules[key].definitions.group.id).length ) {
            $('#houractions').append(
              $('<ul/>').append(
                '<li>&nbsp;</li>\n'+
                '<li class="info-section-'+Module.modules[key].definitions.group.id+'"><b>'+Module.modules[key].definitions.group.text+'</b></li>\n'+
                '<li><ul class="'+Module.modules[key].definitions.group.id+'-actions"></ul>\n</li>\n'
              )
            );
          }
          appender = '#houractions .'+Module.modules[key].definitions.group.id+'-actions';
        }
        else {
          $('#houractions').append(
            $('<ul/>').append(
              '<li>&nbsp;</li>\n'+
              '<li><b>'+Module.modules[key].definitions.name+'</b></li>\n'+
              '<li><ul class="'+key+'-actions"></ul>\n</li>\n'
            )
          );
        }

        if (extData[key].data) extData[key].data.forEach(function(el) {
          if (!el.hasOwnProperty("hide") || (el.hasOwnProperty("hide") && el.hide != "info")) {
            var tooltip = '';
            if ( Module.modules[key].definitions.hasOwnProperty("description") ) {
              tooltip = ' data-toggle="tooltip" title="'+Module.modules[key].definitions.description+'"';
            }
            $(appender).append('<li'+tooltip+'>'+el.action+'</li>\n');
          }
        });
      });
      //var tagcloud = tags.join(" ").split(' ').sort();
      //$('#houractions').append( '<br /><b>Tags</b><br />\n'+unik( tagcloud ).join(" "));
      var title = SL.Astro.Logy.planet.day[mom.planetary.day.no+1]+"+Hour+"+(mom.planetary.hour.no+1);
      var desc = $('#hourinfos').html()+'\n\n'+$('#houractions').text();
      $('<a/>').attr('role', 'button').attr('target', '_blank').attr('href',
        'http://www.google.com/calendar/render?action=TEMPLATE&text='
        +title
        +'&dates='+new moment.unix(mom.planetary.hour.start).format('YYYYMMDD[T]HHmmss[Z]')+'/'+new moment.unix(mom.planetary.hour.end).format('YYYYMMDD[T]HHmmss[Z]')
        +'&details='+encodeURIComponent(desc.replace(/<[^>]+>/g, ''))+'&trp=false&sf=true&output=xml'
      ).html('to GCalendar').addClass('btn btn-default').prependTo('#hourinfo .modal-footer');
      $('<a/>').attr('role', 'button').attr('id', 'ics').attr('target', '_blank').html('iCal File').addClass('btn btn-default').prependTo('#hourinfo .modal-footer');
      $('#ics').on('click', function() {
        var iCal = ics();
        iCal.addEvent(title, desc.replace(/<[^>]+>/g, '').split('\n').join('\\n').split('\\n\\n').join('\\n').split('&nbsp;').join(''), $('#lat').val()+' '+$('#lon').val(), new moment.unix(mom.planetary.hour.start).utc().format('DD MMM YYYY HH:mm:ss [GMT]'), new moment.unix(mom.planetary.hour.end).utc().format('DD MMM YYYY HH:mm:ss [GMT]'));
        iCal.download('planetary-'+title);
      });
      $('#hourinfo').modal('show');
      $('[data-toggle="tooltip"]').tooltip();
    }

    return {
      make: make,
      info : info
    }

  }());

  /**
   * Filter object with variable and functions to filter the planetary hours by the plugin modules
   * @public {function} load() - loads all plugin modules defined and adds their filters
   * @public {function} modal() - creates DOM objects to be displayed as navbar menu items and modal hosting all the filter options of a plugin module
   * @public {function} comboFilter() - is a filter function for Isotope to include all selected tags and operations within a filter but exclude between each other
   */
  var Filter = (function() {

    /**
     * load function loads all plugin modules defined in an Array in index.html and adds their filters
     */
    function load() {
      $("#filterList").empty();
      Object.keys(Module.modules).forEach(function(plugin) {
        if ( $("#moduleSelect label .module_"+plugin).is(':checked') ) {
          var definitions = Module.modules[plugin].definitions;
          modal(plugin, definitions);
        }
      });
      if ( $("body").attr("use") == "download" ) {
          SL.Calendar.download( $("#filterList").html(), "filtermenu.html", "skip", "html", "text/html; charset=utf-8");
          SL.Calendar.download( $("#modals").html(), "modals.html", "skip", "html", "text/html; charset=utf-8");
      }
    }

    /**
     * modal function creates DOM objects to be displayed as navbar menu items and modal hosting all the filter options of a plugin module
     * @param {sting} id - id of a plugin module
     * @param {Object} pluginDefinitions - holds all the definitions defined in a plugin module
     */
    function modal(id, pluginDefinitions) {
      var items = pluginDefinitions.actions;
      // check if filters navbar menu item should be grouped ("group" property in plugin module definition)
      // create bootstrap dropdown menu if needed
      if ( pluginDefinitions.hasOwnProperty("group") ) {
        if ( !$('#group_'+pluginDefinitions.group.id).length ) {
          var dropdown = '<li id="group_'+pluginDefinitions.group.id+'" class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-filter"></span> '+pluginDefinitions.group.text+'<span class="caret"></span></a><ul class="dropdown-menu"></ul></li>';
          $(dropdown).appendTo("#filterList");
        }
        var navitem = '<li><a data-toggle="modal" data-target="#'+id+'" href="#">'+pluginDefinitions.name+'</a></li>\n';
        $('#group_'+pluginDefinitions.group.id+' ul').append(navitem);
      // otherwise just throw it into the menu bar
      } else {
        var navitem = '<li><p class="navbar-btn"><a class="btn btn-default" data-toggle="modal" data-target="#'+id+'" href="#"><span class="glyphicon glyphicon-filter"></span> '+pluginDefinitions.name+'</a></p></li>\n';
        $(navitem).appendTo("#filterList");
      }
      // prepare variables and juggle data to create Tags and Operations to be displayed in the filter modal
      var title = $('#navigation a[data-target="#'+id+'"]').clone();
      var tagline = "";
      var actions = "";
      var menuItems = {};
      var tags = [];
      items.forEach(function(item) {
        item.forEach(function(i) {
          if (!i.hasOwnProperty("hide") || (i.hasOwnProperty("hide") && i.hide != "filter")) {
            if (i.id)
              menuItems[i.id] = {action: i.action, tags: i.tags};
            if (i.tags) {
              i.tags.split(" ").forEach(function(tag) {
                tags.push(tag);
              });
            }
          }
        });
      });
      var uniqtags = unik(tags);
      // create DOM objects
      uniqtags.sort().forEach(function(tag) {
        tagline += '<li><input type="checkbox" class="actiontag" value=".'+tag+'" id="'+id+'-'+tag+'" />&nbsp;'+tag+'</li>\n';
      });
      Object.keys(menuItems).forEach(function(key) {
        actions += '<li class="operation '+menuItems[key].tags+'"><input type="checkbox" value=".'+id+'-'+key+'" id="'+id+'-'+key+'" />&nbsp;'+menuItems[key].action+'</li>\n ';
      });
      // load template defined in index.html and append all filter data
      $('<div/>').loadTemplate($("#tpl-modal"), {
          title : 'Filter by '+pluginDefinitions.name,
          right : '<h4>Operations</h4><ul class="option-set">'+actions+'</ul>\n',
          left  : '<h4>Tags</h4><ul class="option-set">'+tagline+'</ul>\n'
      }).appendTo('#modals').attr('id', id).attr('tabindex', '-1').attr('role', 'dialog').addClass('modal fade autoModal')
          .find('.col-sm-4')
            .addClass('actionlistfilter')
            .find('ul')
              .attr('id', id+'-tags' )
              .attr('data-group', id )
          .parents('.modal-body')
          .find('.col-sm-8')
            .addClass('filteroptions')
            .find('ul')
              .attr('id', id+'-actions')
              .attr('data-group', id+'-actions' );
    }

    /**
     * comboFilter is a filter function for Isotope to include all selected tags and operations within a filter but exclude between each other
     * based on https://codepen.io/desandro/pen/MebyMR
     */
    function comboFilter() {
      var combo = [];
      for ( var prop in filters ) {
        var group = filters[ prop ];
        if ( !group.length ) {
          // no filters in group, carry on
          continue;
        }
        // add first group
        if ( !combo.length ) {
          combo = group.slice(0);
          continue;
        }
        // add additional groups
        var nextCombo = [];
        // split group into combo: [ A, B ] & [ 1, 2 ] => [ A1, A2, B1, B2 ]
        for ( var i=0; i < combo.length; i++ ) {
          for ( var j=0; j < group.length; j++ ) {
            var item = combo[i] + group[j];
            nextCombo.push( item );
          }
        }
        combo = nextCombo;
      }
      var comboFilter = combo.join(', ');
      return comboFilter;
    }

    return {
      load: load,
      modal: modal,
      comboFilter: comboFilter
    }

  }());

  /**
   * Module object with variable and functions to load plugin modules and use them to calculate the data for each planetary hour
   * @public {Object} modules - holds all plugin modules
   * @public {function} load() - loads all plugin modules defined in an Array in index.html and adds their filters
   * @public {function} data() - collects all the tags and operations from all plugin modules for a single planetary hour and bundles them
   * @public {function} classes() - takes all operations() of all plugin modules for a single planetary hour and creates classes for the DOM object, so Isotope can filter them
   */
  var Module = (function() {

    /**
     * object to hold all plugin modules
     */
    var modules = {};

    /**
     * load function loads all plugin modules defined in an Array in index.html and adds their filters
     * @param {Array} array - IDs (variable names) of all plugin module to be loaded
     */
    function load(array) {
      var mod = array;
      console.log(mod.length+' modules defined');
      mod.forEach(function(m) {
        extend(m, eval('module_'+m));
      });
      $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * extend function adds a plugin module to the modules Object
     * @param {string} name - id of the plugin module
     * @param {Object} plugin - the plugin Object
     */
    function extend(name,plugin) {
      modules[name] = plugin;
      var groupname = '';
      var tooltip = '';
      var checked = '';
      if ( plugin.definitions.hasOwnProperty("core") && plugin.definitions.core == true ) checked = "checked";
      if ( plugin.definitions.hasOwnProperty("group") ) groupname = "<b>"+plugin.definitions.group.text+"</b> ";
      if ( plugin.definitions.hasOwnProperty("description") ) {
        tooltip = ' <span class="glyphicon glyphicon-info-sign" data-toggle="tooltip" title="'+plugin.definitions.description+'"></span">';
      }
      $("#moduleSelect").append('<label class="col-md-6"><input class="module_'+name+'" type="checkbox" '+checked+'> '+groupname+plugin.definitions.name+tooltip+'</label>');
    }

    /**
     * calculate function pushes the astronomical data of a planetary hour to a plugin and returns the plugin's calculation
     * @param {Object} plugin - the plugin module Object
     * @param {Object} data - the astronomical data Object of a single planetary hour
     */
    function calculate(plugin, data) {
      return plugin.calculate(plugin.definitions, plugin.property(data));
    }

    /**
     * operations function returns the list of tags and operations defined by a plugin module for a planetary hour
     * @param {Array} actionArray - the plugin module's response from above's calculate() function
     * @param {string} idstring - the ID of the plugin
     */
    function operations(actionArray, idstring) {
      var tags = [];
      var actions = [];
      var tagstring = "";
      var actionstring = "";
      if ( idstring != "" ) idstring += "-";
      if (actionArray) {
        if (Array.isArray(actionArray) && actionArray.length > 0) {
          for (var i = 0, len = actionArray.length; i < len; i++) {
            if (!actionArray[i].hasOwnProperty("hide") || (actionArray[i].hasOwnProperty("hide") && actionArray[i].hide != "filter")) {
              if (actionArray[i].hasOwnProperty('tags') && actionArray[i].tags) tags.push(actionArray[i].tags);
              if (actionArray[i].hasOwnProperty('action') && actionArray[i].action) actions.push(actionArray[i]);
            }
          }
          if (tags) tagstring = unik(tags.join(" ").split(' ')).sort().join(" ");
          actionstring = actionArray.map(function(el) { return idstring + el.id; }).join(" ");
          actions.sort();
        }
      }
      var obj = {
        tags : tagstring,
        actions : actionstring,
        data   : actionArray
      }
      return obj;
    }

    /**
     * data function collects all the list objects from operations() for a single planetary hour and bundles them
     * @param {Object} data - the astronomical data Object of a single planetary hour
     * @return {Object} extData - Object with all the operations() of all plugin modules for a single planetary houur
     */
    function data(data) {
      extData = {};
      Object.keys(modules).forEach(function(plugin) {
        if ( $("#moduleSelect .module_"+plugin).is(':checked') )
          extData[plugin] = operations(calculate(modules[plugin], data), plugin);
      });
      return extData;
    }

    /**
     * classes function takes all operations() of all plugin modules for a single planetary hour and creates classes for the DOM object, so Isotope can filter them
     * @param {Object} extData - Object with all the operations() of all plugin modules for a single planetary hour
     * @return {string} string - string of class names to be added to the DOM object
     */
    function classes(extData) {
      tags = [];
      actions = [];
      string = "";
      Object.keys(extData).forEach(function(plugin) {
        //tags.push(extData[plugin].tags);
        actions.push(extData[plugin].actions);
      });
      //if (tags) string = $.unique(tags.join(" ").split(' ')).sort().join(" ") + " ";
      if (actions) string += actions.sort().join(" ");
      return string;
    }

    return {
      load: load,
      modules: modules,
      data: data,
      classes: classes,
    }

  }());

  return {
    about               : about,
    getGeoCode          : getGeoCode,
    reset               : resetWindow,
    modules             : Module.load,
    comboFilter         : Filter.comboFilter,
    hourInfo            : Hour.info,
    make                : Hours.make,
    moments             : Hours.moments,
    load                : Hours.load,
    resetFileInput      : resetFileInput,
    download            : download
  }

}());
