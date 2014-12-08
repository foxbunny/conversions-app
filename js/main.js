<!-- ;
//
// --- JAVASCRIPT UNIT CONVERTER (JSUC) ----------------------------------------
//
// This HTML/JavaScript utility was written as an exercise in JavaScript and is
// largely based on my previous shareware utility, Total Control Converter for
// Windows 3.1 (1994; http://www.nyx.net/~cmalamas/projex.html).
//
// Since this is essentially a large script file, it goes without saying that
// it can be customized to your heart's content --and if you are reading this,
// then chances are you can figure out how to do it without much help.  A word
// or two must be said though about the data structure used herein: If you
// study this file, you'll see that all the important data (namely, unit names
// and conversion factors) are explicitly defined as JavaScript arrays under
// the "Global Variable & Data Definitions" heading (which should be right under
// these comments).  This is done, because: a) I figured it's the fastest way to
// do it, and b) it keeps everything in one file, making local storage and usage
// a snap.  If you wanna mess with these array definitions, keep in mind the
// following (better study the definitions first before you read this; otherwise
// skip it altogether):
//    1) The unit[i][j] and factor[i][j] arrays should have the same j-length
// and their elements should correspond to each other in the j dimension; i.e.
// unit[0][2] should define the name and factor[0][2] the conversion factor
// of the SAME unit.  Duh!...
//    2) In every property (i.e. the i-dimension of the unit and factor arrays)
// there should be defined a 'primary' or 'base' unit, i.e. one with a conversion
// factor of 1.  The definitions of the other (secondary) units should use this
// formula:
//
//    1 [Secondary unit] = [Secondary unit conversion factor] [Primary Unit]
//                                         ^
//        This goes in the factor array ___|
//
//    e.g.: 1 ft = 0.3048 m
//
// If you find anything wrong with JSUC, or have any suggestions or comments,
// please feel free to e-mail me at cmalamas@nyx.net
//
//   Credits: Some tricks inspired by Infohiway's Cut 'n' Paste JavaScript
//            (http://www.infohiway.com) and Hotwired's Webmonkey
//            (http://webmonkey.com).
//
// Costas Malamas
// Thessaloniki, Greece
// http://www.nyx.net/~cmalamas
//
// ---------------------------------------------------- version: 22 Dec. 1998

// *** Global Variable & Data Definitions **************************************
var property = new Array();
var unit = new Array();
var factor = new Array();
var tempIncrement = new Array(0, -32, -273.15, -491.67);

// *** Getting JSON modules ************** **************** *********
//var accelUrl = $.getJSON($.librarian.files.url('conversions/acceleration.json'));
unit[0] = new Array()
factor[0] = new Array()
var obj = {"acceleration": { "unit": ["Meter/sq.sec (m/sec^2)", "Foot/sq.sec (ft/sec^2)", "G (g)", "Galileo (gal)", "Inch/sq.sec (in/sec^2)" ], "factor": [1, .3048, 9.806650, .01, 2.54E-02]}};
for (var i = 0; i < obj.acceleration.unit.length; i++) {
    unit[0][i] = obj.acceleration.unit[i];
    factor[0][i] = obj.acceleration.factor[i]}

property[0] = "Acceleration";
property[1] = "Test";

//General implimentation
//
//for file in conversion/
//	propertyCounter ++1
//	property[propertyCounter] = file
//	property[propertyCounter] = property[propertyCounter].split(0,-4) ---------To remove .json from property tags
//	fileCounter ++1
//	unit[fileCounter] = new Array()
//	factor[fileCounter] = new Array()
//	for (var i = 0; i < file.unit.length; i++) {
//  		unit[fileCounter][i] = file.unit[i];
//  		factor[fileCounter][i] = file.factor[i]}


//function parse(data) {
//	var i = 0;
//	for (; i < l; i++) {
//	var message = data[i];
//	if (message.lang && message.lang != locale) {
	// Ignore messages that have the locale that doesn't match the current
	// one.
//	continue;
//	}
//	message.is_new = lastCheck < parseDate(message).getTime()
//	html += renderMessage(message);
//}

function fail() {
property[0] = "FAILED";
}
fail
// *** Functions *************************************************************

function UpdateUnitMenu(propMenu, unitMenu){
	// Updates the units displayed in the unitMenu according to the selection of
	// property in the propMenu.
	var i;

	i = propMenu.selectedIndex;
	FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray){
	// Fills the options of myMenu with the elements of myArray.
	// !CAUTION!: It replaces the elements, so old ones will be deleted.
	var i;

	myMenu.length = myArray.length;
	for(i = 0; i < myArray.length; i++){
		myMenu.options[i].text = myArray[i];
	}
}

function CalculateUnit(sourceForm, targetForm){
	// A simple wrapper function to validate input before making the conversion
	var sourceValue = sourceForm.unit_input.value;

	// First check if the user has given numbers or anything that can be made to
	// one...
	sourceValue = parseFloat(sourceValue);
	if ( !isNaN(sourceValue) || sourceValue == 0){
		// If we can make a valid floating-point number, put it in the
		// text box and convert!
		sourceForm.unit_input.value = sourceValue;
		ConvertFromTo(sourceForm, targetForm);
		} else {
		alert("What you gave me cannot be converted or is zero!");
	}
}

function ConvertFromTo(sourceForm, targetForm){
	// Converts the contents of the sourceForm input box to the units specified in
	// the targetForm unit menu and puts the result in the targetForm input box.
	// In other words, this is the heart of the whole script...
	var propIndex;
	var sourceIndex;
	var sourceFactor;
	var targetIndex;
	var targetFactor;
	var result;

	// Start by checking which property we are working in...
	propIndex = document.property_form.the_menu.selectedIndex;

	// Let's determine what unit are we converting FROM (i.e. source) and the
	// factor needed to convert that unit to the base unit.
	sourceIndex = sourceForm.unit_menu.selectedIndex;
	sourceFactor = factor[propIndex][sourceIndex];

	// Cool! Let's do the same thing for the target unit --the units we are
	// converting TO:
	targetIndex = targetForm.unit_menu.selectedIndex;
	targetFactor = factor[propIndex][targetIndex];

	// Simple, huh? let's do the math: a) convert the source TO the base unit:
	// (The input has been checked by the CalculateUnit function).
	result = sourceForm.unit_input.value;
	// Handle Temperature increments!
	if (property[propIndex] == "Temperature"){
		result = parseFloat(result) + tempIncrement[sourceIndex];
	}
	result = result * sourceFactor;

	// not done yet... now, b) use the targetFactor to convert FROM the base unit
	// to the target unit...
	result = result / targetFactor;
	// Again, handle Temperature increments!
	if (property[propIndex] == "Temperature"){
		result = parseFloat(result) - tempIncrement[targetIndex];
	}

	// Ta-da! All that's left is to update the target input box:
	targetForm.unit_input.value = result;
}

function ClearForm(){
	// Clears the input boxes...
	document.form_A.unit_input.value = "";
	document.form_B.unit_input.value = "";
}

// *** End of Main Script ****************************************************

// end hide -->
