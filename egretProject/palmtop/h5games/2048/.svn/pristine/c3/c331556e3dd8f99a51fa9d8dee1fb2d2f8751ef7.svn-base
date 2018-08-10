#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import re

print("##### update proto start!!")

proto = ""

def compressProto(matched):
    return ""

def writeProto(matched):
    protoStr = matched.group(1) + proto + matched.group(2)
    return protoStr

for fpath,dirs,fs in os.walk('../proto'):
  for f in fs:
    fileName = os.path.join(fpath,f)
    print(fileName)
    #读
    with open(fileName,"r") as f:
        lines = f.read()
        protoOne = re.sub('(//.+)', compressProto, lines)
        protoOne = re.sub('(\n)', compressProto, protoOne)
        protoOne = re.sub('  ', compressProto, protoOne)
        proto += protoOne
        # print(proto)

#读
with open("client/src/module/ModuleConfig.ts","r") as f:
    line = f.read() 
#写
with open("client/src/module/ModuleConfig.ts","w") as f_w:
    # for line in lines:
        #添加
        line = re.sub('(protoText.*=.*").*(")', writeProto, line)
        f_w.write(line)

input ("##### update proto end!!")
