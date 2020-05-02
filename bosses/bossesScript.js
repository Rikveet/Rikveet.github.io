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
`;
var TierI = `Data pending`;
var TierII = `Data pending`;
var TierIII = `Data pending`;
var TierIV = `Data pending`;
var TierV = `Data pending`;
BossArenaDataArr = BossArenaData.split("id:");
BossArenaImageNames = [];
BossArenaDataArr.forEach((element) => {
  BossArenaImageNames.push(element.split("\n")[0]);
});
var images = "<div id='BossArena'>";
for (i = 1; i < BossArenaImageNames.length; i++) {
  images +=
    "<div id='advt'><div id='border'><img src='./BossArena/" +
    BossArenaImageNames[i] +
    ".png'><div id='back'><div id='content'>" +
    BossArenaDataArr[i] +
    "</div></div><div id='title'>" +
    BossArenaImageNames[i] +
    "</div></div></div>";
}
images +=
  "<div id='advt'><div id='TierI'>Pending Data</div></div><div id='advt'><div id='TierII'>Pending Data</div></div><div id='advt'><div id='TierIII'>Pending Data</div></div><div id='advt'><div id='TierIV'>Pending Data</div></div><div id='advt'><div id='TierV'>Pending Data</div></div>";
images += "</div>";
document.getElementById("gallery").innerHTML = images;

$(document).ready(function () {
  elements = document.querySelectorAll("[id=border]");
  elements.forEach((element) => {
    $(element).hover(
      function () {
        console.log();
        $(element.children[0]).css("box-shadow", "0px 6px #4357ad");
      },
      function () {
        $(element.children[0]).css("box-shadow", "none");
      }
    );
  });
});
