// ==UserScript== PT74
// @name         Script Power
// @namespace    https://github.com/ddavidmelo/Tampermonkey/TribalWars
// @version      1.10
// @description  try to take over the world!
// @author       David
// @match        https://pt74.tribalwars.com.pt/*
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @icon         https://dspt.innogamescdn.com/asset/b56a168/graphic/favicon.png
// @updateURL    https://raw.githubusercontent.com/ddavidmelo/Tampermonkey/master/TribalWars/auto_search.js
// @downloadURL  https://raw.githubusercontent.com/ddavidmelo/Tampermonkey/master/TribalWars/auto_search.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var c = 0;
    var server_info = document.getElementById("serverDate");
    server_info.innerHTML = server_info.innerHTML + " <span> | </span> <span id=\"counter\"></span>";
    var troops_go =[[0   ,   0,   0,   0,   100,   0,   0,  0],     // Weak Search
                    [0   ,   0,   0,   0,   0,   0,   0,  0],     // Humble Search
                    [111 ,  30,   0,   0,   0,   0,   0,  0],     // Smart Search
                    [0   ,   0,   0,   0,   0,   0,   0,  0]];    // Extreme Search
                  // lan   esp   vik arch  lev  levAR pes pala

    function select_troops(x) {
        $("[name='spear']").val(troops_go[x][0]).trigger('change');
        $("[name='sword']").val(troops_go[x][1]).trigger('change');
        $("[name='axe']").val(troops_go[x][2]).trigger('change');
        $("[name='arch']").val(troops_go[x][3]).trigger('change');
        $("[name='light']").val(troops_go[x][4]).trigger('change');
        $("[name='marcher']").val(troops_go[x][5]).trigger('change');
        $("[name='heavy']").val(troops_go[x][6]).trigger('change');
        $("[name='knight']").val(troops_go[x][7]).trigger('change');
        console.log("Troops Selected");
        $(".status-specific").slice(x,x+1).find(".btn.btn-default.free_send_button").trigger('click');
    }

    function begin_search() {
            for (var k = 0; k < 4; k++) {
                console.log("here");
                var flag = true;
                if($(".status-specific").slice(k,k+1).find(".btn.btn-default.free_send_button").length) {
                    if(troops_go[k].reduce((a, b) => a + b, 0) >= 10) {
                        //$(".status-specific").slice(k,k+1).find(".btn.btn-default.free_send_button").css( "border", "13px solid red" );
                        for (var i = 0; i < 6; i++) {
                            //console.log(i);
                            var tmp = document.getElementsByClassName("units-entry-all squad-village-required");
                            var troops = tmp[i].innerHTML.replace('(','').replace(')','');
                            //console.log(troops,troops_go[k][i]);
                            if(troops < troops_go[k][i]) {
                                console.log("Not enought troops");
                                flag = false;
                                break;
                            }
                        }
                        if(flag) {
                            select_troops(k);
                        };
                    } else {console.log("More than 10 troops needed");}
                } else {console.log("Search Not Available");}
            };

        document.getElementById("counter").innerHTML = c++;
    }

    setInterval(function(){ begin_search() },5000);
})();
