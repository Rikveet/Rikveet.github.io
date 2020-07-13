#!/usr/bin/python
import cgi, os 
import glob
folder=cgi.FieldStorage().getfirst('folder')
print "Content-Type: text/html"
print
names= glob.glob("./"+folder+"/*.png")
for name in names:
    name = str(name).replace('./'+folder+'/','').replace('.png','')
    print("<div class='image' onclick=\"show('"+name+"')\"><img src=./"+folder+"/"+name+".png ><span id='back'></span><span id='front'>"+name+"</span></div>")