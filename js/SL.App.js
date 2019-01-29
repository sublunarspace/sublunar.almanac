/**
 * @preserve Copyright (c) 2018 T. F. Raaion, www.sublunar.space
 * License MIT: http://www.opensource.org/licenses/MIT
 *
 * SUBLUNAR ALMANAC
 */

var SL = SL || {};

/**
 * Offline App Functions
 */
SL.App = (function() {

    const fs = require('fs');
    const path = require('path');
    const http = require('http');
    const AutoUpdater = require( "nw-autoupdater" );
    const mid = require( "node-machine-id" );
    const crypto = require('crypto');
    const config = path.normalize(nw.App.dataPath+'/config.json');

    var editJson = '';

    var waiting = false;

    function downloadStatus(file, response) {
        var num = parseInt($(".stoke span").text());
        $(".stoke span").html(++num);
        if ( num == 4 ) {
            waiting = false;
            file.hasFiles = true;
            writeHash(file, response);
        }
    }

    function downloadPreset(file, url, filename, response) {
        var p = path.normalize(nw.App.dataPath+"/presets/"+filename);
        waiting = true;
        http.get(url, function(r) {
            r.pipe(fs.createWriteStream(p)).on('finish', function () {
                downloadStatus(file, response);
            });
        });
    }

    function writeHash(file, response) {
        if ( waiting == false) {
            file.hash = response.hash;
            fs.writeFile(config, JSON.stringify(file, null, 2), 'utf8', function(err) {
                if(err) {
                    return console.log(err);
                } else {
                    $('#caption .stoke').html('All set. Restarting application...');
                    console.log(file);
                    window.setTimeout(chrome.runtime.reload,2000);
                }
            });
        } else {
            console.log("still waiting for download...");
        }
    }

    function authorize() {
        $("#navigation").css({"visibility":"hidden"});
        if (!fs.existsSync(config)){
            fs.writeFile(config, JSON.stringify({"config" : "Sublunar Almanac"}), 'utf8', function(err) {
                if(err) {
                    return console.log(err);
                } else {
                    $('#caption .stoke').html('Created configuration file... Restarting application...');
                    window.setTimeout(chrome.runtime.reload,2000);
                }
            });
        } else {
            editJson = require(config);
            let file = editJson;
            if ( !file.hasOwnProperty("userEmail") ) {
                if ( !navigator.onLine) {
                    $('#caption .stoke').html('You need to be online for activation...');
                    return;
                }
                var email = prompt("Please enter the email address you registered with");
                file.userEmail = email;
                /*
                fs.writeFile(config, JSON.stringify(file, null, 2), 'utf8', function(err) {
                    if(err) {
                        return console.log(err);
                    }
                });
                */
            }
            if ( !file.hasOwnProperty("hash") ) {
                if ( !navigator.onLine) {
                    $('#caption .stoke').html('You need to be online for activation...');
                    return;
                }
                $.ajax({
                    url : "http://release.sublunar.space/index.php",
                    type: "POST",
                    data: {
                        email: file.userEmail,
                        mid: mid.machineIdSync({original: true})
                    },
                    success:function(response) {
                        console.log(response);
                        if ( response.status == "authorized") {
                            var dir = path.normalize(nw.App.dataPath+"/presets");
                            if (!fs.existsSync(dir)){
                                fs.mkdirSync(dir);
                            }
                            if ( response.hasOwnProperty("files") ) {
                                var url = "http://release.sublunar.space/presets/";
                                $('#caption .stoke').html('downloaded preset file <span>0</span> of 5');
                                downloadPreset(file, url+response.files.file1, "modals.html", response);
                                downloadPreset(file, url+response.files.file2, "filtermenu.html", response);
                                downloadPreset(file, url+response.files.file3, "grid.html", response);
                                downloadPreset(file, url+response.files.file4, "ephemeris.json", response);
                                downloadPreset(file, url+response.files.file5, "setup.json", response);
                            } else {
                                writeHash(file, response);
                            }
                        } else {
                            $('#caption .stoke').html('Sorry, there is something wrong with your authorization. <a onClick="SL.App.reset()">Reset?</a>');
                        }
                    },
                    error:function(){
                        console.log("error");
                    }
                });
            } else {
                const check = crypto.createHash('sha256');
                check.update(mid.machineIdSync({original: true}));
                if ( file.hash == check.digest('hex') ) {
                    $("#navigation").css({"visibility":"visible"});
                    if ( file.hasOwnProperty("hasFiles") && file.hasFiles == true )
                        $("#filterreset").closest('li').before('<li><p class="navbar-btn"><a id="loadpreset" class="btn btn-default" onClick="SL.App.loadPreset()" href="#"><span class="glyphicon glyphicon-open"></span> Load Preset</a></p></li>');
                    if ( !navigator.onLine ) {
                        offlineUse();
                    } else {
                        updateApp();
                    }
                } else {
                    $('#caption .stoke').html('Sorry, there is something wrong with your authorization. <a onClick="SL.App.reset()">Reset?</a>');
                }
            }
        }
    }

    function reset() {
        file = require(config);
        if ( file.hasOwnProperty("userEmail") ) delete file.userEmail;
        if ( file.hasOwnProperty("hash") ) delete file.hash;
        if ( file.hasOwnProperty("hasFiles") ) delete file.hasFiles;
        var presetfiles = ['/presets/modals.html', '/presets/filtermenu.html', '/presets/grid.html', '/presets/ephemeris.json', '/config.json'];
        presetfiles.forEach( function(fn) {
            var p = path.normalize(nw.App.dataPath+fn);
            fs.unlink(p, (err) => {
              if (err) throw err;
              console.log(p+' was deleted');
            });
        });
        $('#caption .stoke').html('App has been reset. <a onClick="chrome.runtime.reload()">Reload?</a>');
        fs.writeFile(config, JSON.stringify(file, null, 2), 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
        });
        $('#aboutSLC').modal('hide');
    }

    function geoLocate() {
        $.ajax({ type : 'POST', data: '', url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA7DG6Kz0VawkYVONoq7Yk8igTAQFGxGN4", success: function(data){
                var item = {
                    lat: data.location.lat,
                    lon: data.location.lng
                }
                SL.Calendar.getGeoCode(item);
            }
        });
    }

    /**
     * loadPreset loads precalculated menubar, modals and hour grid
     */
    function loadPreset() {
        $('#caption .stoke').html('loading preset...please wait.');
        fs.readFile(path.normalize(nw.App.dataPath+"/presets/filtermenu.html"), "utf8", function(err, html) {
            if (err) throw err;
            $("#filterList").empty();
            $("#filterList").append(html);
        });
        fs.readFile(path.normalize(nw.App.dataPath+"/presets/modals.html"), "utf8", function(err, html) {
            if (err) throw err;
            $("#modals").empty();
            $("#modals").append(html);
            SL.Calendar.about();
        });
        fs.readFile(path.normalize(nw.App.dataPath+"/presets/grid.html"), "utf8", function(err, html) {
            if (err) throw err;
            $("#grid").empty();
            $("#grid").append(html);
            $('#caption .stoke').empty();
            $('#moduleSelect input:checkbox').prop('checked', true);
            $(".planetaryhour").each(function() {
                if ( $(this).attr("ts") < (moment.utc().startOf("day").unix()) ) $(this).remove();
            });
            $('.planetaryhour').on('click', SL.Calendar.hourInfo);
        });
        fs.readFile(path.normalize(nw.App.dataPath+"/presets/ephemeris.json"), "utf8", function(err, data) {
            if (err) throw err;
            var json = JSON.parse(data);
            SL.Calendar.load(json.query);
        });
        fs.readFile(path.normalize(nw.App.dataPath+"/presets/setup.json"), "utf8", function(err, data) {
            if (err) throw err;
            var json = JSON.parse(data);
            $("#search").val(json.place.name);
            $("#lat").val(json.place.lat);
            $("#lon").val(json.place.lon);
            $("#offset").val(json.place.offset);
            $('#zodiac').prop('checked', json.sidereal);
        });
        if ( $('#calendar').data('isotope') ) $('#calendar').isotope('destroy');
    }

    /**
     * updateApp function updates the offline App
     * from https://github.com/dsheiko/nw-autoupdater/blob/master/example/client-strategy-app/index.html
     */
    async function updateApp() {
        const updater = new AutoUpdater( require( "./package.json" ) ),
            output =  $("#caption .stoke");
        try {
           // Update copy is running to replace app with the update
          if ( updater.isSwapRequest() ) {
            output.html("Swapping...");
            await updater.swap();
            output.html("Done.");
            await updater.restart();
            return;
          }
          // Download/unpack update if any available
          const rManifest = await updater.readRemoteManifest();
          const needsUpdate = await updater.checkNewVersion( rManifest );
          if ( !needsUpdate ) {
            return;
          }
          if ( !confirm( "New release is available. Do you want to upgrade?" ) ) {
            return;
          }
          // Subscribe for progress events
          updater.on( "download", ( downloadSize, totalSize ) => {
            output.html("Downloading "+Math.floor( downloadSize / totalSize * 100 )+"%" );
          });
          updater.on( "install", ( installFiles, totalFiles ) => {
            output.html("Installing "+Math.floor( installFiles / totalFiles * 100 )+"%" );
          });
          reset();
          const updateFile = await updater.download( rManifest );
          await updater.unpack( updateFile );
          alert( `The application will automatically restart to finish installing the update` );
          await updater.restartToSwap();
        } catch ( e ) {
          console.error( e );
        }
    }

    function offlineUse() {
        $(".autolocate label").html("Save Coordinates");
        $(".autolocate button").attr('id', 'savePlace').html("Save Place");
        $(".manuallocate label").html("Last Searched & Saved Places");
        $(".manuallocate input").remove();
        $(".manuallocate").append("<br />");
        $('<button/>').attr('type', 'button').attr('data-toggle', 'dropdown').attr('id', 'placeList').html('Place <span class="caret"></span>').addClass('btn btn-default dropdown-toggle').appendTo('.manuallocate');
        $('<ul />').addClass('dropdown-menu placeSelect').appendTo('.manuallocate');
        $('#savePlace').on('click', function() {
            var placeName = prompt("Please enter a name for the place you want to save.");
            if (placeName != "" ) savePlace(placeName);
        });
        getPlaces();
    }

    function savePlace(name) {
        let file = editJson;
        if ( !file.hasOwnProperty("place") ) file.place = {};
        var placeData = {
            lat : $("#lat").val(),
            lon : $("#lon").val(),
            offset : $("#offset").val(),
        }
        file.place[name] = placeData;
        fs.writeFile(config, JSON.stringify(file, null, 2), 'utf8', function(err) {
            if(err) return console.log(err);
        });
    }

    function getPlace(name) {
        let file = editJson;
        $("#lat").val(file.place[name].lat);
        $("#lon").val(file.place[name].lon);
        $("#offset").val(file.place[name].offset);
    }

    function delPlace(name) {
        console.log(name);
        let file = editJson;
        if ( file.place.hasOwnProperty(name) ) {
            delete file.place[name];
        }
        console.log(file);
        fs.writeFile(config, JSON.stringify(file, null, 2), 'utf8', function(err) {
            if(err) return console.log(err);
            getPlaces();
        });
    }

    function getPlaces() {
        let file = editJson;
        $('.placeSelect').empty();
        Object.keys(file.place).forEach(function(key) {
            $('<li />').html('<a href="#">'+key+'</a>').appendTo('.placeSelect').on('click', function() {
                getPlace(key);
                $('#placeList').html( key+' <span class="caret"></span>' );
            });
        });
        $('<span />').html(' &#10005;').appendTo('.placeSelect li a').on('click', function(e) {
            e.stopPropagation();
            var placeName = $(this).parent().text().slice(0, -2);
            delPlace(placeName);
            $(this).parent().remove();
        });
    }

    return {
      authorize : authorize,
      geoLocate : geoLocate,
      loadPreset : loadPreset,
      updateApp : updateApp,
      reset : reset,
      place : {
          get : getPlace,
          set : savePlace
      }
  }
}());
