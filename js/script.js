//Variables

///Red stats
var r = 50;
var rclick = 0;

///Blue stats
var b = 50;
var bclick = 0;

///Game state
var g = 0;
var cd = 3;


//Audio effect
///Countdown sound
var cd_audio = new Audio('audio/321f.wav');

///Count down 
var cda = 0;

//Finish him sound
var fh = new Audio('audio/finishhim.wav');

//Are you ready to rumble sound
var rumble = new Audio('audio/rumble.wav');


//Start game on load js
countdown();

function countdown() {
    cd_audio.play();

    if (cd > 0) {
        $("#togame").text(cd);
        cd--;
        setTimeout(countdown, 1000);
        g = 0;
    } else {
        $("#togame").text("FIGHT!");
        g = 1;
    }
}

//Detect click red/blue player
document.addEventListener("keyup", keyPush);
function keyPush(evt) {
    if (g == 1) {
        switch (evt.keyCode) {
            case 75:
                r++;
                b--;
                changewidth(r, b);
                rclick++;
                $("#stats .right h2").text(rclick);

                //console.log(r + ", " + b);
                break;
            case 83:
                r--;
                b++;
                bclick++;
                $("#stats .left h2").text(bclick);

                changewidth(r, b);
                //console.log(r + ", " + b);
                break;
        }
    }
}


//Change width bars
function changewidth(red, blue) {

    //Finish him checker
    if ((red > 90 && red < 110) || (blue > 90 && blue < 110)) {
        $("#info").text("Finish him!");
    } else {
        $("#info").text("");
    }

    //Check who win
    if (red > 100 && g == 1) {
        $("#info").text("Red win!");
        g = 0;
        $("#game").css("color", "#c73f3f");
    } else if (blue > 100 && g == 1) {
        $("#info").text("Blue win!");
        g = 0;
        $("#game").css("color", "#3f60c7");

    } else {

        //Change glow color
        if (red > blue) {
            $(".bar").removeClass("blueshadow");
            $(".bar").addClass("redshadow");

        } else if (blue > red) {
            $(".bar").removeClass("redshadow");
            $(".bar").addClass("blueshadow");
        } else {
            $(".bar").removeClass("blueshadow");
            $(".bar").removeClass("redshadow");
        }

        //Change width bar
        $("#blue").css("width", blue + "%");
        $("#red").css("width", red + "%");


    }
}


//Reset the game
function reset() {
    r = 50;
    b = 50;
    g = 0;
    rclick = 0;
    bclick = 0;
    cd = 3;
    setTimeout(countdown, 2000);
    cda = 0;
    $("#info").text("");
    $("#blue").css("width", b + "%");
    $("#red").css("width", r + "%");
    $(".bar").removeClass("blueshadow");
    $(".bar").removeClass("redshadow");
    $("#game").css("color", "#fff");
    $("#stats .left h2").text(bclick);
    $("#stats .right h2").text(rclick);
    $("#togame").text("Are you ready to rumble?");
    rumble.play();
}


//
//setting panel
//

$("#settingbtn").click(function(){ $("#setting_panel").show(); });
$("#exitbtn").click(function(){ $("#setting_panel").hide(); });