var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;

var category = []
var unit = []
var factor = []
var tempIncrement;

var focused;
var selectedCategory = $('#category');
var selectUnit;
var selectedUnit = $('#unit');

//-- Category, unit, and factor definitions
category[0] = "Acceleration";
unit[0] = ["Meter/sq.sec (m/sec^2)", "Foot/sq.sec (ft/sec^2)", "G (g)", "Galileo (gal)", "Inch/sq.sec (in/sec^2)"];
factor[0] = [1, .3048, 9.806650, .01, 2.54E-02];
category[1] = "Area";
unit[1] = ["Square meter (m^2)", "Acre (acre)", "Are", "Barn (barn)", "Hectare", "Rood", "Square centimeter", "Square kilometer", "Circular mil", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)"];
factor[1] = [1, 4046.856, 100, 1E-28, 10000, 1011.71413184285, .0001, 1000000, 5.067075E-10, 9.290304E-02, 6.4516E-04, 2589988, .8361274];
category[2] = "Torque";
unit[2] = ["Newton-meter (N m)", "Dyne-centimeter(dy cm)", "Kgrf-meter (kgf m)", "lbf-inch (lbf in)", "lbf-foot (lbf ft)"];
factor[2] = [1, .0000001, 9.806650, .1129848, 1.355818];
category[3] = "Electricity";
unit[3] = ["Coulomb (Cb)", "Abcoulomb", "Ampere hour (A hr)", "Faraday (F)", "Statcoulomb", "Millifaraday (mF)", "Microfaraday (mu-F)", "Picofaraday (pF)"];
factor[3] = [1, 10, 3600, 96521.8999999997, .000000000333564, 96.5219, 9.65219E-02, 9.65219E-05];
category[4] = "Energy";
unit[4] = ["Joule (J)", "BTU (mean)", "BTU (thermochemical)", "Calorie (SI) (cal)", "Calorie (mean)(cal)", "Calorie (thermo)", "Electron volt (eV)", "Erg (erg)", "Foot-pound force", "Foot-poundal", "Horsepower-hour", "Kilocalorie (SI)(kcal)", "Kilocalorie (mean)(kcal)", "Kilowatt-hour (kW hr)", "Ton of TNT", "Volt-coulomb (V Cb)", "Watt-hour (W hr)", "Watt-second (W sec)"];
factor[4] = [1, 1055.87, 1054.35, 4.1868, 4.19002, 4.184, 1.6021E-19, .0000001, 1.355818, 4.214011E-02, 2684077.3, 4186.8, 4190.02, 3600000, 4.2E9, 1, 3600, 1];
category[5] = "Force";
unit[5] = ["Newton (N)", "Dyne (dy)", "Kilogram force (kgf)", "Kilopond force (kpf)", "Kip (k)", "Ounce force (ozf)", "Pound force (lbf)", "Poundal"];
factor[5] = [1, .00001, 9.806650, 9.806650, 4448.222, .2780139, .4535924, .138255];
category[6] = "Force / Length";
unit[6] = ["Newton/meter (N/m)", "Pound force/inch (lbf/in)", "Pound force/foot (lbf/ft)"];
factor[6] = [1, 175.1268, 14.5939];
category[7] = "Length";
unit[7] = ["Meter (m)", "Angstrom (A')", "Astronomical unit (AU)", "Caliber (cal)", "Centimeter (cm)", "Kilometer (km)", "Ell", "Em", "Fathom", "Furlong", "Fermi (fm)", "Foot (ft)", "Inch (in)", "League (int'l)", "League (UK)", "Light year (LY)", "Micrometer (mu-m)", "Mil", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Mile (UK nautical)", "Mile (US nautical)", "Mile (US statute)", "Parsec", "Pica (printer)", "Picometer (pm)", "Point (pt)", "Rod", "Yard (yd)"];
factor[7] = [1, 1E-10, 1.49598E11, .000254, .01, 1000, 1.143, 4.2323E-03, 1.8288, 201.168, 1E-15, .3048, .0254, 5556, 5556, 9.46055E+15, .000001, .0000254, .001, 1E-9, 1852, 1853.184, 1852, 1609.344, 3.08374E+16, 4.217518E-03, 1E-12, .0003514598, 5.0292, .9144];
category[8] = "Light";
unit[8] = ["Lumen/sq.meter (Lu/m^2)", "Lumen/sq.centimeter", "Lumen/sq.foot", "Foot-candle (ft-cdl)", "Foot-lambert", "Candela/sq.meter", "Candela/sq.centimeter", "Lux (lux)", "Phot"];
factor[8] = [1, 10000, 10.76391, 10.76391, 10.76391, 3.14159250538575, 31415.9250538576, 1, 10000];
category[9] = "Mass";
unit[9] = ["Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Hundredweight (long)", "Hundredweight (short)", "Pound mass (lbm)", "Pound mass (troy)", "Ounce mass (ozm)", "Ounce mass (troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (short)", "Ton (metric)", "Tonne"];
factor[9] = [1, .001, 1e-6, .000000001, .0002, 50.80235, 45.35924, .4535924, .3732417, .02834952, .03110348, 14.5939, .02916667, 1016.047, 907.1847, 1000, 1000];
category[10] = "Mass Flow";
unit[10] = ["Kilogram/second (kgr/sec)", "Pound mass/sec (lbm/sec)", "Pound mass/min (lbm/min)"];
factor[10] = [1, .4535924, .007559873];
category[11] = "Density & Mass capacity";
unit[11] = ["Kilogram/cub.meter", "Grain/galon", "Grams/cm^3 (gr/cc)", "Pound mass/cubic foot", "Pound mass/cubic-inch", "Ounces/gallon (UK,liq)", "Ounces/gallon (US,liq)", "Ounces (mass)/inch", "Pound mass/gal (UK,liq)", "Pound mass/gal (US,liq)", "Slug/cubic foot", "Tons (long,mass)/cub.yard"];
factor[11] = [1, .01711806, 1000, 16.01846, 27679.91, 6.236027, 7.489152, 1729.994, 99.77644, 119.8264, 515.379, 1328.939];
category[12] = "Power";
unit[12] = ["Watt (W)", "Kilowatt (kW)", "Megawatt (MW)", "Milliwatt (mW)", "BTU (SI)/hour", "BTU (thermo)/second", "BTU (thermo)/minute", "BTU (thermo)/hour", "Calorie (thermo)/second", "Calorie (thermo)/minute", "Erg/second", "Foot-pound force/hour", "Foot-pound force/minute", "Foot-pound force/second", "Horsepower(550 ft lbf/s)", "Horsepower (electric)", "Horsepower (boiler)", "Horsepower (metric)", "Horsepower (UK)", "Kilocalorie (thermo)/min", "Kilocalorie (thermo)/sec"];
factor[12] = [1, 1000, 1000000, .001, .2930667, 1054.35, 17.5725, .2928751, 4.184, 6.973333E-02, .0000001, .0003766161, .02259697, 1.355818, 745.7, 746, 9809.5, 735.499, 745.7, 69.7333, 4184];
category[13] = "Pressure & Stress";
unit[13] = ["Newton/sq.meter", "Atmosphere (normal)", "Atmosphere (techinical)", "Bar", "Centimeter mercury(cmHg)", "Centimeter water (4'C)", "Decibar", "Kgr force/sq.centimeter", "Kgr force/sq.meter", "Kip/square inch", "Millibar", "Millimeter mercury(mmHg)", "Pascal (Pa)", "Kilopascal (kPa)", "Megapascal (Mpa)", "Poundal/sq.foot", "Pound-force/sq.foot", "Pound-force/sq.inch (psi)", "Torr (mmHg,0'C)"];
factor[13] = [1, 101325, 98066.5, 100000, 1333.22, 98.0638, 10000, 98066.5, 9.80665, 6894757, 100, 133.3224, 1, 1000, 1000000, 47.88026, 47.88026, 6894.757, 133.322];
// !!! Caution: Temperature requires an increment as well as a multiplying factor
// // !!! and that's why it's handled differently
// // !!! Be VERY careful in how you change this behavior
category[14] = "Temperature --BROKEN--";
unit[14] = ["Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)"];
factor[14] = [1,  0.555555555555, 1, 0.555555555555];
tempIncrement = [0, -32, -273.15, -491.67];
category[15] = "Time";
unit[15] = ["Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (tropical)", "Year (sidereal)"];
factor[15] = [1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31556930, 31558150];
category[16] = "Velocity & Speed";
unit[16] = ["Meter/second (m/sec)", "Foot/minute (ft/min)", "Foot/second (ft/sec)", "Kilometer/hour (kph)", "Knot (int'l)", "Mile (US)/hour (mph)", "Mile (nautical)/hour", "Mile (US)/minute", "Mile (US)/second", "Speed of light (c)", "Mach (STP)(a)"];
factor[16] = [1, 5.08E-03, .3048, .2777778, .5144444, .44707, .514444, 26.8224, 1609.344, 299792458, 340.0068750];
category[17] = "Viscosity";
unit[17] = ["Newton-second/meter", "Centipoise", "Centistoke", "Sq.foot/second", "Poise", "Poundal-second/sq.foot", "Pound mass/foot-second", "Pound force-second/sq.foot", "Rhe", "Slug/foot-second", "Stoke"];
factor[17] = [1, .001, .000001, 9.290304E-02, .1, 1.488164, 1.488164, 47.88026, 10, 47.88026, .0001];
category[18] = "Volume & Capacity";
unit[18] = ["Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter", "Acre-foot", "Barrel (oil)", "Board foot", "Bushel (US)", "Cup", "Fluid ounce (US)", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Gill (UK)", "Gill (US)", "Cubic inch (in^3)", "Liter (new)", "Liter (old)", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Peck (US)", "Pint (US,dry)", "Pint (US,liq)", "Quart (US,dry)", "Quart (US,liq)", "Stere", "Tablespoon", "Teaspoon", "Ton (register)", "Cubic yard"];
factor[18] = [1, .000001, .000000001, 1233.482, .1589873, .002359737, .03523907, .0002365882, .00002957353, .02831685, .004546087, .004404884, .003785412, .0001420652, .0001182941, .00001638706, .001, .001000028, .00002841305, .00002957353, 8.8097680E-03, .0005506105, 4.7317650E-04, .001101221, 9.46353E-04, 1, .00001478676, .000004928922, 2.831685, .7645549];
category[19] = "Volume Flow";
unit[19] = ["Cubic meter/second", "Cubic foot/second", "Cubic foot/minute", "Cubic inches/minute", "Gallons (US,liq)/minute)"];
factor[19] = [1, .02831685, .0004719474, 2.731177E-7, 6.309020E-05];
//-- End category, unit and factor definitions

//-- Build category list from category array
!function buildCategories() {
  var i;
  for (i=0; i < category.length; i++) {
    $('.categories').append("<a href='javascript:void(0)' id='" + category[i] +  "'>" + category[i] + "</a>")}}()

//-- Build unit list from category array key
function buildUnitList(id){
  var i;
  $('.units').html('')
  for (i=0; i < unit[id].length; i++) {
    $('.units').append("<a href='javascript:void(0)' id='" +  unit[id][i] + "'>" + unit[id][i] + "</a>")}};

//-- On Up/Down/Left/Right move focus
$('.categories').on('keydown', 'a', function (e) {
  switch(e.which) {
    case UP:
      $('.categories a').first().focus();
      break;
    case DOWN:
      $('.units a').first().focus();
      break;
    case LEFT:
      $( this ).prev('a').focus();
      break;
    case RIGHT:
      $( this ).next('a').focus();
      break;

    default: return;
  }
  e.preventDefault();
});

$('.units').on('keydown', 'a', function (e) {
  switch(e.which) {
    case UP:
      $('.categories a').first().focus();
      break;
    case DOWN:
      $('#inputForm').focus();
      break;
    case LEFT:
      $( this ).prev('a').focus();
      break;
    case RIGHT:
      $( this ).next('a').focus();
      break;

    default: return;
  }
  e.preventDefault();
});

//-- On category focus build unit list
$('.categories').on('focus', 'a', function (e) {
  tempCategory = $(this).text();
  selectedCategory.text(tempCategory);
    var i;
      for (i=0; i < category.length; i++) {
        if (tempCategory === category[i]) {
          buildUnitList(i)
        }}});

//-- On unit focus change #unit and add input form
$('.units').on('focus', 'a', function (e) {
  $('.output').html('')
  selectUnit = $(this).text();
  selectedUnit.text(selectUnit);
  $('#input').html('Numbers only please!<br><input type="text" value="" maxlength="20" size="20" id="inputForm"></input><input type="button" value="Convert value" id="submitUnit" onclick="press()"></input>');
});
//-- output based on selected category and unit
function press() {
  $('.output').html('')
    var i;
    for (i=0; i < category.length; i++) {
      if (tempCategory === category[i]) {
        var b;
        for (b=0; b < unit[i].length; b++) {
          if (selectUnit === unit[i][b]) {
            var base;
            base = $('#inputForm').val() * factor[i][b];
            var c;
            for (c=0; c < factor[i].length; c++) {
              $('.output').append('Output for ' + unit[i][b] + ' to ' + unit[i][c] + ' was ' + base / factor[i][c] + '<br>');
            }
          }}}}};
$('#input').on('change', '#inputForm', function() {
  press();
});
$('#input').on('keyup', '#inputForm', function() {
  press();
});
$('#input').on('input', '#inputForm', function() {
  $('#input').off('keyup', '#inputForm');
  press();
});
