

function generate() {
    function get(){
    let gradients=[
        "linear-gradient(#8241B8,#6C33A3)",
        "linear-gradient(#EE696B,#523A78)",
        "linear-gradient(#A594F9,#6247AA)",
        "linear-gradient(#5F0F40,#310E68)",
        "linear-gradient(#7E4E60,#B287A3)",
        "linear-gradient(#F79AD3,#C86FC9)",
        "linear-gradient(#E0E5E5,#6B2D5C)",
        "linear-gradient(#170E13,#7A7ADB)",
        "linear-gradient(#DB6885,#972239)",
        "linear-gradient(#A7ACD9,#9E8FB2)",
        "linear-gradient(#A88BEB,#F8CEEC)",
        "linear-gradient(#647DEE,#7F53AC)",
        "linear-gradient(#F53844,#42378F)",
        "linear-gradient(#0652C5,#D4418E)",
        "linear-gradient(#B621FE,#1FD1F9)",
        "linear-gradient(#5F72BE,#9921E8)",
        "linear-gradient(#05D6D9,#F907FC)",
        "linear-gradient(#AD1DEB,#6E72FC)",
        "linear-gradient(#E975A8,#726CF8)",
        "linear-gradient(#A1BAFE,#8D5185)",
        "linear-gradient(#AA4465,#861657)",
        "linear-gradient(#000000,#923CB5)",
        "linear-gradient(#000000,#E056FD)",
        "linear-gradient(#746CC0,#58427C)"];
        while(true){
            ret =gradients[Math.round(Math.random()*gradients.length)];
            if(ret!=undefined){break;}
            }
            console.log(ret);
            return ret;
        }
    var gradient =  get();
     document.getElementById("main").style.background = gradient;
     document.getElementById("main").style.backgroundRepeat = "no-repeat";
}
generate();

