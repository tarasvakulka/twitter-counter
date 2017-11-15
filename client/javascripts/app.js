var main = function () {
	"use strict";
	var insertCounts = function (counts) {
        var awesomediv = document.getElementById("awesome_block");
        var cooldiv = document.getElementById("cool_block");
        var groovydiv = document.getElementById("groovy_block");
        
        awesomediv.innerHTML = "Count of words 'awesome'="+counts.awesome;
        cooldiv.innerHTML = "Count of words 'cool'="+counts.cool;
        groovydiv.innerHTML = "Count of words 'groovy'="+counts.groovy;
    }
	setInterval(function () {
        $.getJSON("/counts.json", insertCounts);
    },3000);
}
$(document).ready(main);