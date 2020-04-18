
function generate() {
    function get(){
    let gradients=[
            "linear-gradient(#A40606,#D98324)",
            "linear-gradient(#380036,#0CBABA)",
            "linear-gradient(#0D324D,#7F5A83)",
            "linear-gradient(#233329,#63D471)",
            "linear-gradient(#A71D31,#3F0D12)",
            "linear-gradient(#28313B,#485461)",
            "linear-gradient(#2A5470,#4C4177)",
            "linear-gradient(#5E5C5C,#9DC5C3)",
            "linear-gradient(#D2CCC4,#2F4353)",
            "linear-gradient(#1E3B70,#29539B)",
            "linear-gradient(#414141,#000000)",
            "linear-gradient(#8CACAC,#AF8C9D)",
            "linear-gradient(#5D4954,#FFA69E)",
            "linear-gradient(#7C98B3,#637081)",
            "linear-gradient(#B02E0C,#EB4511)",
            "linear-gradient(#04619F,#000000)",
            "linear-gradient(#000000,#923CB5)",
            "linear-gradient(#2C3E50,#000000)",
            "linear-gradient(#000000,#A55C1B)",
            "linear-gradient(#B82E1F,#000000)",
            "linear-gradient(#7F8C8D,#000000)",
            "linear-gradient(#000000,#2D3436)",
            "linear-gradient(#000000,#FFEAA7)",
            "linear-gradient(#000000,#E84393)",
            "linear-gradient(#000000,#55EFC4)",
            "linear-gradient(#958E69,#000000)",
            "linear-gradient(#000000,#D2A813)",
            "linear-gradient(#000000,#130F40)",
            "linear-gradient(#0C0C0C,#4834D4)",
            "linear-gradient(#000000,#E056FD)",
            "linear-gradient(#000000,#7ED6DF)",
            "linear-gradient(#5E5368,#000000)",
            "linear-gradient(#576574,#C2B6B6)",
            "linear-gradient(#D58936,#69140E)",
            "linear-gradient(#7D6D61,#5E574D)",
            "linear-gradient(#422419,#000000)",
            "linear-gradient(#0C0C0C,#CA7968)",
            "linear-gradient(#AD6F69,#43302E)",
            "linear-gradient(#874000,#BC6F03)",
            "linear-gradient(#5F0F40,#310E68)",
            "linear-gradient(#CC9934,#1E1D1B)",
            "linear-gradient(#99201C,#AD2F26)",
            "linear-gradient(#A00000,#C62128)",
            "linear-gradient(#59090C,#DA898C)",
            "linear-gradient(#44000B,#E0455F)",
            "linear-gradient(#12100E,#2B4162)",
            "linear-gradient(#5A585A,#090947)",
            "linear-gradient(#191714,#2234AE)",
            "linear-gradient(#313131,#6DADDB)",
            "linear-gradient(#170E13,#7A7ADB)",
            "linear-gradient(#009FC2,#0D0A0B)",
            "linear-gradient(#20A4F3,#182B3A)",
            "linear-gradient(#4D4855,#A399B2)",
            "linear-gradient(#000000,#4D4855)"];
            ret =gradients[Math.round(Math.random()*gradients.length)];
            console.log(ret);
            return ret;
        }
    var gradient =  get();
    document.getElementById("main").style.background = gradient;
}

document.onload = generate();

const home = document.querySelector('.home');
const slider = document.querySelector('.slider');
const narniaLogo = document.querySelector('.narniaLogo');
const text = document.querySelector(".Headline");
const strText = text.textContent;
const splitText = strText.split("");
const container = document.querySelector('.container');
const bottom =  document.querySelector('.bottom');
text.textContent = "";

const tl = new TimelineMax();
if(tras){
    tl.fromTo(
        home,
        2, {
            height: "0%"
        }, {
            height: "80%",
            ease: Power2.easeInOut
        }
    ).fromTo(
        home,
        2, {
            width: '100%'
        }, {
            width: '80%',
            ease: Power2.easeInOut
        }, "-=1"
    ).fromTo(
        slider,
        1.2, {
            x: "-100%"
        }, {
            x: "0%",
            ease: Power2.easeInOut
        }, "-=.8");
        for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";
    }

    let char = 0;
    var timer = setInterval(onTick, 50);
    function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++
    if (char === splitText.length) {
        complete();
        return;
    }
    }
    
stateChange();
}
else{

    tl.fromTo(
        container,
        2, {
            top: '0%'
        }, {
            top: '0%',
            ease: Power2.easeOutIn
        }).fromTo(
        narniaLogo,
        2, {
            bottom: '18%'
        }, {
            bottom: '18%',
            ease: Power2.easeInOut
        }).fromTo(
        bottom,
        1, {
            bottom: '0%'
        }, {
            bottom: '0%',
            ease: Power2.easeInOut
        }
    )
}





function complete() {
    clearInterval(timer);
    timer = null;
}

function stateChange() {
    let time=0;
    if(tras){
        time=5000;
    }
    setTimeout(function() {
        if(tras){
            tl.fromTo(
            home,
            2, {
                height: '80%'
            }, {
                height: '0%',
                ease: Power2.easeOutIn
            }
        ).fromTo(
            slider,
            2, {
                x: "0%"
            }, {
                x: "-100%",
                ease: Power2.easeOutIn
            }, "-=1.2");
        }
        
        text.textContent = "";
        var tablet = window.matchMedia("(max-width: 768px)");
        if (tablet.matches) { 
            tl.fromTo(
                container,
                2, {
                    top: '150%'
                }, {
                    top: '5%',
                    ease: Power2.easeInOut
                }, "-=.5")
                document.getElementById("main").style.overflow = "scroll";
        } 
        else{
                 tl.fromTo(
                container,
                2, {
                    top: '-150%'
                }, {
                    top: '0',
                    ease: Power2.easeOutIn
                }).fromTo(
                narniaLogo,
                2, {
                    bottom: '-30%'
                }, {
                    bottom: '18%',
                    ease: Power2.easeInOut
                }).fromTo(
                bottom,
                1, {
                    bottom: '-30%'
                }, {
                    bottom: '0%',
                    ease: Power2.easeInOut
                })
        }
    }, time);

}