function solveBAC(form){
    var ounces = eval(form.ounces.value);
    var percent = eval(form.percent.value);
    var weight = eval(form.weight.value);
    var hours = eval(form.hours.value);
    
    var result = (ounces * percent * 0.075 / weight) - (hours * 0.015);
    
    if(result < 0){
        message = "You're good, bro. Did you even drink? What a Nerd."
        result = "--neglible amount--";
    }
    else if(result >= 0 && result <= 0.03){
        message="You've barely drank anything, please go see the host for more alcohol."
    }
    else if(result > 0.03 && result <=0.06){
        message="You're probably feeling pretty good, but slow it down if you want to legally drive home later";
    }
    else if(result > 0.06 && result <=0.09){
        message="You are officially legally impaired. Don't operate heavy machinery."
    }
    else if(result >0.09 && result <=0.125){
        message="Significant impairment of motor functions and loss of good judgement. Now would be a good time to show everybody how to do a handstand"
    }
    else if(result >0.125 && result <=0.15){
        message="You're probably feeling pretty bad at this point. Blurry vision and major loss of balance? Somebody cut this kid off";
    }
    else if(result >0.15 && result <=0.19){
        message ="SLOPPY DRUNK ALERT";
    }
    else if(result > 0.19 && result <=0.25){
        message="Seriously, stop. It shouldn't even be easy to walk at this point";
    }
    else if(result > 0.25 && result <=0.3){
        message="You have little to no comprehension of where you are. I'm surprised you've even able to read this";
    }
    else if(result>0.3 && result <=0.35){
        message="This is the level of surgical anesthesia. I could literally do surgery on you right now.";
    }
    else if(result >0.35 && result <=0.4){
        message="The doctors have reported in, you're pretty drunk. But seriously, you're probably in a coma."
    }
    else if(result >0.4){
        message="Somebody get this guy another beer, He's already dead.";
    }
    else if(result == "NaN"){
        message="Please Try Again";
    }
    
    form.message.value = message;
    form.bacamount.value = result + " %";
}

