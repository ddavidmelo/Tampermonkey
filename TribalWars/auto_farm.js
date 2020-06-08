// ==UserScript==
// @name         Script barbaras
// @namespace    https://github.com/ddavidmelo/Tampermonkey/TribalWars
// @version      1.10
// @description  try to take over the world!
// @author       David
// @match        https://pt73.tribalwars.com.pt/*
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @icon         https://dspt.innogamescdn.com/asset/b56a168/graphic/favicon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var lands = ["111|222","333|444"];    //place the coordinates in here
    var isPaused = false;
    var type_of_troop = "light"; // light, spy
    var minutes_between_raids = 45;
    function prepare_troops() {
        $(document).ready(function(){
            if($("#target_attack").length) {
                if(cookie_work()[1]<lands.length && document.getElementById("units_entry_all_"+type_of_troop).innerHTML.replace('(','').replace(')','') != '0') {
                    $(".target-input-autocomplete").css( "border", "3px solid red" );
                    var landN = cookie_work()[1];
                    console.log("Sending troops to land nº" + landN);
                    $(".target-input-autocomplete").val(lands[landN]).trigger('change');
                    document.cookie = "land="+(parseInt(cookie_work()[1])+1);
                    $("[name='"+type_of_troop+"']").val(1).trigger('change');
                    $("#target_attack").trigger('click');
                }
                else {
                    document.cookie = "land=0";
                    isPaused = true;
                    setInterval(function(){isPaused = false;},minutes_between_raids*60*1000);
                }
            }
        });
    }

    function send_troops() {
        $(document).ready(function(){
            if($("#troop_confirm_go").length) {
                $("#troop_confirm_go").trigger('click');
            }
        });
    }

    function cookie_work() {
        var x = document.cookie;
        var ca = x.split(';');
        for(var i=0; i < ca.length; i++ ) {
            var tmp = ca[i].split('=');
            if(tmp[0] == ' land')
            {
                //console.log(tmp[1]);
                //document.cookie = "land="+(parseInt(tmp[1])+1);
                return [false,tmp[1]];
            }
        }
        return [true,0];
    }

    if(cookie_work()[0]) {
        document.cookie = "land=0";
    }

    setInterval(function(){
        if(!isPaused) {
            prepare_troops();
        }
    },1000);
    setInterval(function(){
        if(!isPaused) {
            send_troops();
        }
    },500);

})();
