
const sections = document.querySelectorAll("section");
const bubble = document.querySelector(".bubble");

const options = {
    threshold: 0.3
};

let observer = new IntersectionObserver(navCheck,options);
let classNameClone;
function navCheck(entries) {
    entries.forEach(entry =>{
        const className = entry.target.className;
        const activeAnchor = document.querySelector('#'+className);
        const coords = activeAnchor.getBoundingClientRect();
        const directions={
            height: coords.height,
            width: coords.width,
            top:coords.top,
            left:coords.left
        };
        if(entry.isIntersecting){
            bubble.style.setProperty('height',`${directions.height}px`);
            bubble.style.setProperty('width',`${directions.width}px`);
            bubble.style.setProperty('top',`${directions.top}px`);
            bubble.style.setProperty('left',`${directions.left}px`);
            bubble.style.background=(document.getElementsByClassName(className)[0].style.background);
            document.getElementById(className).style.color="black";
            console.log(className);
            resetRest(className);
        }
    });
}
sections.forEach(section =>{
    observer.observe(section);
});
mode = 1;
function generate() {
        function rand() {
            let gradients=[
            "linear-gradient(#ffedd4,#ffb9a2)",
            "linear-gradient(#c6edff,#a3c6ff)",
            "linear-gradient(#ffcef3,#e9e0ed)",
            "linear-gradient(#ffa2a6,#ffd1c4)",
            "linear-gradient(#b2f9ff,#efebbe)",
            "linear-gradient(#88cafc,#ffe3be)",
            "linear-gradient(#ffccf3,#ffb7ba)",
            "linear-gradient(#ffdf72,#a2c1ff)",
            "linear-gradient(#fcd6e3,#aaf0ed)",
            "linear-gradient(#d8ff7e,#97e7a2)",
            "linear-gradient(#e0c4fc,#90c6fd)",
            "linear-gradient(#fb83a7,#fdd29e)",
            "linear-gradient(#c5d0e2,#f4f6f9)",
            "linear-gradient(#fef9d8,#d299c2)",
            "linear-gradient(#fdfbfa,#e2d1c4)",
            "linear-gradient(#ce9ef2,#f4f0ff)",
            "linear-gradient(#ace0f9,#fff2ec)",
            "linear-gradient(#ffb2ab,#f6f0f0)",
            "linear-gradient(#bfffcd,#93efdd)",
            "linear-gradient(#f7d9b5,#a98e83)",
            "linear-gradient(#d9fffe,#fffeff)",
            "linear-gradient(#bfc4e9,#e8e0eb)",
            "linear-gradient(#fedee2,#ef9ea9)",
            "linear-gradient(#ffe9fb,#e4fef6)",
            "linear-gradient(#c6ffbd,#ffffff)",
            "linear-gradient(#e7bb82,#ebcea5)",
            "linear-gradient(#6d94ca,#a8c1ef)",
            "linear-gradient(#fdd7bf,#f894a4)",
            "linear-gradient(#e9e4f0,#d3cce3)",
            "linear-gradient(#93a5cf,#e4efe9)",
            "linear-gradient(#c79081,#dfa579)",
            "linear-gradient(#ffb9f6,#fad0c4)",
            "linear-gradient(#d5c6b4,#ece5db)",
            "linear-gradient(#07f8f9,#ffffff)",
            "linear-gradient(#d4fc79,#96e6a1)",
            "linear-gradient(#c2e9fb,#a1c4fd)",
            "linear-gradient(#fdcbf1,#e6dee9)",
            "linear-gradient(#a8edea,#fed6e3)",
            "linear-gradient(#fddb92,#d1fdff)",
            "linear-gradient(#b5ff9e,#ff5264)",
            "linear-gradient(#efddcc,#dbb99d)",
            "linear-gradient(#9999a4,#60606b)",
            "linear-gradient(#356396,#c8def5)",
            "linear-gradient(#fbc2eb,#a18cd1)",
            "linear-gradient(#2cebc7,#8267d5)",
            "linear-gradient(#cbc0ba,#e7e1de)",
            "linear-gradient(#eacda3,#d6ae7b)",
            "linear-gradient(#c1dfc4,#deecdd)",
            "linear-gradient(#c1e3ff,#abc7ff)",
            "linear-gradient(#ffb3d9,#fffe86)",
            "linear-gradient(#ace28d,#12c6c5)",
            "linear-gradient(#fbd035,#fff3c7)",
            "linear-gradient(#d7dadc,#edf3f3)",
            "linear-gradient(#d0c9ce,#ebebf0)",
            "linear-gradient(#dbdafb,#fff7c1)",
            "linear-gradient(#86adcc,#d4e4ef)",
            "linear-gradient(#fea5f7,#fff9fd)",
            "linear-gradient(#fedaba,#ffb6c1)",
            "linear-gradient(#e9e8e6,#f3e6d6)",
            "linear-gradient(#5eff8b,#f0ff9a)",
            "linear-gradient(#eef5fb,#bfd9f0)",
            "linear-gradient(#ededed,#8b8b8b)",
            "linear-gradient(#efebe0,#c3ede1)",
            "linear-gradient(#f2e78e,#fdfad1)",
            "linear-gradient(#ffdee7,#f2b2c3)",
            "linear-gradient(#ffc96f,#ffeabb)",
            "linear-gradient(#dfa579,#c79081)",
            "linear-gradient(#ffc3c3,#ffe1e1)",
            "linear-gradient(#7bf1f0,#7bb8f1)",
            "linear-gradient(#eeeb8e,#fffdc4)",
            "linear-gradient(#acd8fd,#fbfcfe)",
            "linear-gradient(#cfcfcf,#ffffff)",
            "linear-gradient(#768198,#bec6d8)",
            "linear-gradient(#f9d4bb,#ecc19e)",
            "linear-gradient(#d7a2f9,#f0d8ff)",
            "linear-gradient(#e3fff3,#b0fada)",
            "linear-gradient(#ae8b9c,#8baaaa)",
            "linear-gradient(#4481eb,#04befe)",
            "linear-gradient(#b3ffab,#12fff7)",
            "linear-gradient(#df5eff,#a2fff7)",
            "linear-gradient(#c1c161,#d4d4b1)",
            "linear-gradient(#f4dc89,#fcf3d3)",
            "linear-gradient(#d7fffe,#fffeff)",
            "linear-gradient(#c2daee,#7690c1)"];
            while(true){
                ret =gradients[Math.round(Math.random()*gradients.length)];
                if(ret!=undefined){break;}
                }
                console.log(ret);
                return ret;
        }    
        function nav(){
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
            while(true){
                ret =gradients[Math.round(Math.random()*gradients.length)];
                if(ret!=undefined){break;}
                }
                console.log(ret);
                return ret;
        }
    document.getElementById("1").style.background =  rand();
    document.getElementById("2").style.background =  rand();
    document.getElementById("3").style.background =  rand();
    document.getElementById("4").style.background =  rand();
    document.getElementById("5").style.background =  rand();
    document.getElementById("6").style.background =  rand();
    document.getElementById("back").style.background = nav();
    bubble.style.background=(document.getElementsByClassName(classNameClone)[0].style.background);
    document.getElementById(classNameClone).style.color="black";
    resetRest(classNameClone);
}
classNameClone="s1";
let annhilate=false;
generate();
var para="";
function switchState(){
    var e=document.querySelector("body");
    var child = e.lastElementChild;
    while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        }
    e.style.color="black";
    e.style.color="black";
    annhilate=true;
    document.body.innerHTML = "<section class='ann'></section>";
    document.getElementsByClassName("ann")[0].innerHTML="secret details soon , rebooting in 3 seconds";
    document.getElementsByClassName("ann")[0].style.display="block";
}
function resetRest(a){
   var idNames=['s1','s2','s3','s4','s5','s6'];
   for(var i=0; i<idNames.length;i++){
       if(idNames[i]!=a){
           document.getElementById(idNames[i]).style.color="white";
       }
   }
}
let j =0;

/*const interval = setInterval(() => {  j++;
    if(annhilate){
         console.log(j);
         console.log(document.querySelector(".ann"));
       document.getElementsByClassName("ann")[0].innerHTML+=".";
        if(j>3){
            window.location.href = "";
        }
        
    }
}, 2000);*/
        