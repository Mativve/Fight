$(document).ready(function () {

    var slowmo = new Audio("http://freesound.org/data/previews/123/123437_1149625-lq.mp3");

    var red = 50,
        win_red = 0,
        click_red = 0,
        key_red = 75,

        blue = 50,
        win_blue = 0,
        click_blue = 0,
        key_blue = 83,

        play = false,
        count = 3,
        round = 0;

    var $info = $(".info");

    //Settings
    var shakeAnimate = true,
        light = false;

    function start() {
        play = true;
    }

    function reset() {
        red = 50;
        click_red = 0;

        blue = 50;
        click_blue = 0;

        count = 3;
        barWidth();
        console.log("Reset done!");        
    }

    function countDown() {
        reset();
        console.log("Start countdown");

        round++;

        let click = new Audio("http://freesound.org/data/previews/384/384187_6712901-lq.mp3");
        click.play();

        $info.html("<p>" + count + "</p>");

        let timer = setInterval(function () {
            let click = new Audio("http://freesound.org/data/previews/384/384187_6712901-lq.mp3");
            click.play();

            if (count == 1) {
                clearInterval(timer);
                start();
                $info.removeClass("show");
                console.log(play);
            } else {
                count--;
                $info.html("<p>" + count + "</p>");
            }
        }, 1000);

        $info.addClass("show");
    }
    //    countDown();

    function checkWin() {
        if (red >= 100) {
            console.log("Red Win!");
            var win = new Audio("http://freesound.org/data/previews/269/269184_4409114-lq.mp3");
            win.play();
            play = false;
            win_red++;
            updateStats();

            $info.addClass("show");
            $info.html("<p>Red win!</p><br><p><button class='btn startGame'>Try again&nbsp;<i class='fas fa-play'></i></button></p>");
            $(".startGame").click(countDown);
        } else if (blue >= 100) {
            console.log("Blue Win!");
            var win = new Audio("http://freesound.org/data/previews/269/269184_4409114-lq.mp3");
            win.play();
            play = false;
            win_blue++;
            updateStats();

            $info.addClass("show");
            $info.html("<p>Blue win!</p><br><p><button class='btn startGame'>Try again&nbsp;<i class='fas fa-play'></i></button></p>");
            $(".startGame").click(countDown);
        }
    }

    function barWidth() {

        $(".bar.red").css({
            "width": red + "%"
        });
        $(".bar.blue").css({
            "width": blue + "%"
        });

        if (red > 90 && red < 100) {
            if (shakeAnimate) {
                $(".battle").addClass("shakeRed");
            } else {
                $(".battle").css({
                    transform: "translate(20%, -50%) scale(2)"
                });
            }
        } else if (blue > 90 && blue < 100) {
            if (shakeAnimate) {
                $(".battle").addClass("shakeBlue");
            } else {
                $(".battle").css({
                    transform: "translate(-120%, -50%) scale(2)"
                });
            }

        } else if (blue <= 90 || red <= 90) {
            if (shakeAnimate) {
                $(".battle").removeClass("shakeRed").removeClass("shakeBlue");
            } else {
                $(".battle").css({
                    transform: "translate(-50%, -50%) scale(1)"
                });
            }
        }

        checkWin();
    }

    var $blueStat = $(".top .left");
    var $redStat = $(".top .right");
    var $roundStat = $(".top .center");

    function updateStats() {
        $blueStat.html("<p>" + click_blue + "</p>");
        $redStat.html("<p>" + click_red + "</p>");

        let html = "<div class='center'><p>Round " + round + "</p><p>" + win_blue + ":" + win_red + "</p></div>";

        $roundStat.html(html);
    }


    document.addEventListener("keyup", keyPush);

    function keyPush(e) {
        if (play == false) return;
        console.log(String.fromCharCode(e.keyCode));
        if (e.keyCode == key_red) {
            if (red < 100) {
                red++;
                click_red++;

                blue--;

                console.log("Red click");
            }
        }

        if (e.keyCode == key_blue) {
            if (blue < 100) {
                blue++;
                click_blue++;

                red--;

                console.log("Blue click");
            }
        }
        barWidth();
        updateStats();
    }


    $(".settingbtn").click(function () {
        play = !play;
        $(".settings").toggleClass("show");
    });

    $("#animation").on("input change", function () {
        shakeAnimate = !shakeAnimate;
        if (($(".battle").hasClass("shakeRed")) || ($(".battle").hasClass("shakeBlue"))) {
            $(".battle").removeClass("shakeRed").removeClass("shakeBlue");
        }
        console.log("Zmieniono animację na " + shakeAnimate);
    });

    $(".startGame").click(countDown);
    
    $("#blueKey").on("input change",function(){
        key_blue = parseFloat($(this).val());
        $(".bar.blue").html(String.fromCharCode(key_blue));
    });
    
    $("#redKey").on("input change",function(){
        key_red = $(this).val();
        $(".bar.red").html(String.fromCharCode(key_red));
    });    

});
