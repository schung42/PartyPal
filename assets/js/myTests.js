(function() {
  var avgDrinksFirstHour, avgDrinksSubsHour, beersPerUnit, calculate, calculateTotalDrinks, doCalculate, heavyDrinksFirstHour, heavyDrinksSubsHour, lightDrinksFirstHour, lightDrinksSubsHour, liquorPerUnit, winePerUnit;

  heavyDrinksFirstHour = 3;

  avgDrinksFirstHour = 2;

  lightDrinksFirstHour = 1;

  heavyDrinksSubsHour = 1.5;

  avgDrinksSubsHour = 1;

  lightDrinksSubsHour = 0.5;

  beersPerUnit = 1;

  winePerUnit = 5;

  liquorPerUnit = 20;

  calculateTotalDrinks = function(partyDuration, lightDrinkers, avgDrinkers, heavyDrinkers) {
    var numSubsequentHourDrinks, totalDrinks;
    totalDrinks = heavyDrinksFirstHour * heavyDrinkers + avgDrinksFirstHour * avgDrinkers + lightDrinksFirstHour * lightDrinkers;
    if (partyDuration > 1) {
      numSubsequentHourDrinks = heavyDrinksSubsHour * heavyDrinkers + avgDrinksSubsHour * avgDrinkers + lightDrinksSubsHour * lightDrinkers;
      totalDrinks += numSubsequentHourDrinks * (partyDuration - 1);
    }
    return totalDrinks;
  };

  doCalculate = function() {
    var averageDrinkers, beer, beerSelected, drinkin, duration, heavyDrinkers, lightDrinkers, liquor, liquorSelected, plural, totalDrinks, totalPerType, totalTypes, wine, wineSelected;
    duration = parseInt($("#durationHours").val(), 10);
    if (duration < 1) {
      alert("Duration must be 1 hour or greater");
      return;
    }
    beerSelected = $("#isBeerServed").is(':checked');
    wineSelected = $("#isWineServed").is(':checked');
    liquorSelected = $("#isLiquorServed").is(':checked');
    if (!beerSelected && !wineSelected && !liquorSelected) {
      return;
    }
    lightDrinkers = parseInt($("#numLightDrinkers").val(), 10);
    averageDrinkers = parseInt($("#numAverageDrinkers").val(), 10);
    heavyDrinkers = parseInt($("#numHeavyDrinkers").val(), 10);
    if (lightDrinkers < 0 || averageDrinkers < 0 || heavyDrinkers < 0) {
      alert("Please only use positive numbers");
      return;
    }
    totalDrinks = calculateTotalDrinks(duration, lightDrinkers, averageDrinkers, heavyDrinkers);
    totalTypes = 0;
    if (beerSelected) {
      totalTypes++;
    }
    if (wineSelected) {
      totalTypes++;
    }
    if (liquorSelected) {
      totalTypes++;
    }
    if (totalTypes === 0) {
      return;
    }
    totalPerType = totalDrinks / totalTypes;
    $('.row.needed').show();
    drinkin = $('#drinkin').empty();
    if (beerSelected) {
      beer = Math.ceil(totalPerType / beersPerUnit);
      if (beer > 1) {
        plural = 's';
      }
      $("<p><strong>" + beer + "</strong><br>Bottle" + plural + "/Can" + plural + " of Beer</p>").appendTo(drinkin);
    }
    if (wineSelected) {
      wine = Math.ceil(totalPerType / winePerUnit);
      if (wine > 1) {
        plural = 's';
      }
      $("<p><strong>" + wine + "</strong><br>Bottle" + plural + " of Wine<br>(750 ml)</p>").appendTo(drinkin);
    }
    if (liquorSelected) {
      liquor = Math.ceil(totalPerType / liquorPerUnit);
      if (liquor > 1) {
        plural = 's';
      }
      return $("<p><strong>" + liquor + "</strong><br>Bottle" + plural + " of Liquor<br>(1 liter)</p>").appendTo(drinkin);
    }
  };

  calculate = function() {
    var beerSelected, liquorSelected, wineSelected;
    beerSelected = $("#isBeerServed").is(':checked');
    wineSelected = $("#isWineServed").is(':checked');
    liquorSelected = $("#isLiquorServed").is(':checked');
    if (!beerSelected && !wineSelected && !liquorSelected) {
      alert("You must select at least one beverage type");
      return;
    }
    return doCalculate();
  };

  $(document).ready(function() {
    $('#drink').change(function() {
      return doCalculate;
    });
    return $('#calc').click(function(e) {
      e.preventDefault();
      calculate();
      return false;
    });
  });

}).call(this);



test('calculateTotalDrinks()', function(){
  ok(calculateTotalDrinks(partyDuration, lightDrinkers, avgDrinkers, heavyDrinkers), 'Testing for Invalid Party Duration')
})