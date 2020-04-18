#!/usr/bin/env python

import cgi;
import cgitb
cgitb.enable()
import glob

print (glob.glob("/pic/*.png"))