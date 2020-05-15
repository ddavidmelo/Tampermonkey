// ==UserScript==
// @name         Script Power
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  try to take over the world!
// @author       David
// @match        https://pt73.tribalwars.com.pt/*
// @grant        none
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include      /https?:\/\/github\.com.*\/pull\/.*/
// @icon         https://dspt.innogamescdn.com/asset/b56a168/graphic/favicon.png
// @updateURL    https://raw.githubusercontent.com/ddavidmelo/Tampermonkey/master/TribalWars/auto_search.js
// @downloadURL  https://raw.githubusercontent.com/ddavidmelo/Tampermonkey/master/TribalWars/auto_search.js
// ==/UserScript==

(function() {
    var i = 0;
    var server_info = document.getElementById("serverDate");
    server_info.innerHTML = server_info.innerHTML + " <span> | </span> <span id=\"counter\"></span>";

    function begin_search() {
        var x = document.getElementsByClassName("units-entry-all squad-village-required");
        var lanceiros = x[0].innerHTML.replace('(','').replace(')','');
        if (lanceiros > 10) {
            console.log("Start");

            $(document).ready(function(){
                //$(".fill-all").css( "border", "13px solid red" );
                $(".units-entry-all.squad-village-required:not(:last)").trigger('click');
            });
            setTimeout(function() {
                $(document).ready(function(){
                    $(".btn.btn-default.free_send_button:last").trigger('click');
                });

            }, 2000);
        }
        document.getElementById("counter").innerHTML = i++;
    }

    setInterval(function(){ begin_search() },5000);
})();
