$(function() {
  var canvas = Snap('#nodeschool-animated-svg');

  var buildingDoor = canvas.select('#battersea_door rect');
  var base2 = canvas.select('#battersea_base rect#rect2');
  var base1 = canvas.select('#battersea_base rect#rect1');
  var floor = canvas.select('#bottom line');
  var roof1 = canvas.select('#battersea_roof line#bottom');
  var roof2 = canvas.select('#battersea_roof line#top');
  var chimSmall1 = canvas.select('rect#chim-small1');
  var chimSmall2 = canvas.select('rect#chim-small2');
  var stairStep1 = canvas.select('#battersea_stairs rect#rect1');
  var stairStep2 = canvas.select('#battersea_stairs rect#rect2');
  var stairStep3 = canvas.select('#battersea_stairs rect#rect3');
  var window2 = canvas.select('#battersea_windows rect#window2');
  var window1 = canvas.select('#battersea_windows rect#window1');
  var chimBase1 = canvas.select('#battersea_chim_base rect#chim1');
  var chimBase2 = canvas.select('#battersea_chim_base rect#chim2');
  var chimMain = canvas.select('#battersea_chimney polygon#pol1');
  var chimMain2 = canvas.select('#battersea_chimney polygon#pol2');

  var billboard = 'NODESCHOOL';
  var textElement = canvas.text(349.125, 490, billboard).attr({fontSize: '1px', opacity: 0, fontFamily: 'Open Sans'});

  function animateBorder() {
    var path = document.querySelector('#polygon_border path');
    var length = path.getTotalLength();
    path.style.transition = 'none';
    path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition =   'stroke-dashoffset 2s linear';
    path.style.WebkitTransition = 'stroke-dashoffset 2s linear';
    path.style.strokeDashoffset = '0';

    setTimeout(function(){
      animateFloor();
    }, 2000);
  }

  function animateFloor() {
    floor.animate({'x2': floor.attr('data-x')}, 600, mina.linear, animateStepOne);
  }

  function animateStepOne() {
    stairStep1.animate({'height': stairStep1.attr('data-height')}, 400, mina.linear, animateStepTwo);
    setTimeout(function() {
      animateStepTwo();
    }, 400);
    setTimeout(function() {
      animateStepThree();
    }, 800);
  }

  function animateStepTwo() {
    stairStep2.animate({'height': stairStep1.attr('data-height')}, 400, mina.linear);
  }

  function animateStepThree() {
    stairStep3.animate({'height': stairStep1.attr('data-height')}, 400, mina.linear, animateDoors);
  }

  function animateDoors() {
    buildingDoor.animate({'height': buildingDoor.attr('data-height')}, 400, mina.linear, animateBase);
  }

  function animateBase() {
     base1.animate({'height': base1.attr('data-height')}, 500, mina.easeinout);
     base2.animate({'height': base2.attr('data-height')}, 500, mina.easeinout);
     setTimeout(function() {
      animateBuildings();
     }, 500);
  }

  function animateBuildings() {
    chimBase1.animate({'height': chimBase1.attr('data-height')}, 800, mina.elastic);
    setTimeout(function(){
      chimBase2.animate({'height': chimBase2.attr('data-height')}, 800, mina.elastic);
    }, 100);
    setTimeout(function(){
      chimMain.attr('visibility', 'visible').animate({'transform': 't0 0'}, 1000, mina.elastic);
    }, 200);
    setTimeout(function(){
      chimMain2.attr('visibility', 'visible').animate({'transform': 't0 0'}, 1000, mina.elastic);
    }, 200);
    setTimeout(function(){
      chimSmall1.attr('visibility', 'visible').animate({'transform': 't0 0'}, 800, mina.elastic);
    }, 300);
    setTimeout(function(){
      chimSmall2.attr('visibility', 'visible').animate({'transform': 't0 0'}, 800, mina.elastic, function() {
        animateClouds();
      });
    }, 300);
    animateWindows();
  }

  function animateWindows() {
    window1.animate({transform: 's1 1'}, 400, mina.easeinout);
    window2.animate({transform: 's1 1'}, 400, mina.easeinout);
    setTimeout(function() {
      animateRoof();
    }, 300);
  }

  function animateRoof() {
    roof1.animate({'x2': roof1.attr('data-x')}, 600, mina.easeinout);
    roof2.animate({'x2': roof2.attr('data-x')}, 600, mina.easeinout);
    setTimeout(function() {
      animateText();
    }, 100);
    setTimeout(function() {
      animateClouds();
    }, 200);
  }

  function animateText() {
    Snap.animate(0, 1, function(value) {
      textElement.attr({ 'font-size': value * 30,  opacity: value });
      }, 750, mina.bounce );
  }

  animateBorder();
});
 