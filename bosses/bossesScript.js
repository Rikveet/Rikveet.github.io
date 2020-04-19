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
     
}
generate();

var BossArenaData = `id:Ender Dragon
Cost 1 Dragon Egg to Summon
Reward:
 2 Dragon Eggs 
 1 Dragon Head

id:Cinder Dragon (Accompanied with Blaze)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)
Cost 5 Dragon Eggs to Summon
Reward: 
1 Dragon Head
Sword of Cinders (Has Fire Aspect 2, Knockback 2, Looting 3, Mending, Sharpness 5, Sweeping Edge 3, Unbreaking 3)

id:Witch’s Dragon ( Witch on an Ender Dragon) 
Cost 5 Dragon Eggs to Summon
Reward:
1 Dragon Head
Witches Shovel (Has Efficiency 5, Knockback 2, Mending, Sharpness 5, Silk Touch, Unbreaking 3)

id:Gemini Dragons (Two Dragons) 
Cost 10 Dragon Eggs to Summon
Reward:
2 Dragon Heads
Fortune of Pollux (Pickaxe: Efficiency 5, Fortune 3, Mending, Unbreaking 3)
Silk Touch of Castor (Pickaxe: Efficiency 5, Mending, Silk Touch, Unbreaking 3 )


id:Blackstone The Illusioner (Accompanied by Vindicators and Evokers)
Cost 1 Totem of Undying to Summon
Reward: Axe of Illusions( Efficiency 5, Looting 3, Mending, Sharpness 5, Unbreaking 3)

id:Play Don’t Wake the Baby (Spawns Skeletons, Creepers and Ghasts)
Cost 1 Skeleton Head to Summon
Reward: Baby’s Pants (Blast Protection 4, Mending, Projectile Protection 4, Unbreaking 3)

id:Elder Guardian Moby (Accompanied by Guardians)
Cost 1 Heart of the Seas to Summon
Reward: 2 Heart of Seas

id:Ancient Guardian (Accompanied by Guardians)
Cost 5 Heart of the Seas to Summon
Reward: Helm of The Ancients (Aqua Affinity, Fire Protection 4, Mending, Respiration 3, Unbreaking 3)

id:The Kraken (Accompanied by Guardians)
Cost 5 Heart of the Seas to Summon
Reward: Trident of The Kraken (Channeling, Impaling 5, Looting 3, Loyalty 3, Mending, Unbreaking)

id:Weeping Wither (Accompanied by TNT explosions)
Cost 5 Nether Stars to Summon
Reward: Weeping Chestplate (Blast Protection 4, Mending, Protection 4, Thorns 3, Unbreaking 3)

id:Wicked Wither (Accompanied by TNT explosions)
Cost 5 Nether Stars to Summon
Reward: Bow of Wickedness (Infinity, Looting 3, Mending, Power V, Unbreaking 3)

id:Killer Bunny (Accompanied with more Killer Rabbits)
Cost 1 Rabbit's Foot to Summon
Reward: Killer Boots of Caerbannog (Depth Strider 3, Feather Falling 4, Fire Protection 4, Mending, Thorns 3, Unbreaking 3)
`
var TierI = `Data pending`;
var TierII = `Data pending`;
var TierIII = `Data pending`;
var TierIV = `Data pending`;
var TierV = `Data pending`;
BossArenaDataArr = BossArenaData.split("id:");
BossArenaImageNames = [];
BossArenaDataArr.forEach(element => {
    BossArenaImageNames.push(element.split("\n")[0]);
});
var images="<div id='BossArena'>";
for(i=1;i<BossArenaImageNames.length;i++){
    images+="<div id='advt'><img src='./BossArena/"+BossArenaImageNames[i]+".png'><div id='back'><div id='content'>"+BossArenaDataArr[i]+"</div></div></div>";
}
images+="<div id='advt'><div id='TierI'>Pending Data</div></div><div id='advt'><div id='TierII'>Pending Data</div></div><div id='advt'><div id='TierIII'>Pending Data</div></div><div id='advt'><div id='TierIV'>Pending Data</div></div><div id='advt'><div id='TierV'>Pending Data</div></div>"
images+="</div>";
document.getElementById('gallery').innerHTML=images;