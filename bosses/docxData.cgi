#!/usr/bin/python
import cgi, os 
import glob, sys
sys.path.append('/home/student/rh18vo/experiments/')
import docx
fileName=cgi.FieldStorage().getfirst('fileName')
print ("Content-Type: text/html")
print
print (fileName)