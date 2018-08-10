#!/usr/bin/python
# -*- coding: utf-8 -*-
# [使用说明]
# 1、需要svn命令行，没有请从安装包modify
# 2、确保发布路径下有项目svn(例如tyt)

import os
import re
import shutil
import codecs
print("##### publish start!!")

######### 路径 ps.oppo还需要改insert_to_manifest
game_name = 'ydpz'
path_client = 'client'
path_build = 'client/bin-release/web/release'
path_release = '..\\..\\..\\debug\\client\\' + game_name
path_js = path_release + '/js'


######### build
print('')
if os.path.exists(path_build):
    shutil.rmtree(path_build)
os.system("egret publish " + path_client + " --version release")


######### 更新版本
print('')
os.system('svn update ' + path_release)

######## 版本号
print('')
revision = '0'
svn_info = os.popen('svn info ' + path_js + "/..")
svn_infostr = svn_info.read()
# print svn_infostr # test

list = svn_infostr.splitlines()
for info_one in list:
    if info_one.find('Revision:') >= 0:
        version = re.findall("\d+", info_one)
        revision = version[0]
        break

def addVersion(matched):
    versionStr = matched.group(1)+"?v=" + revision + matched.group(2)
    print("  " + versionStr)
    return versionStr

######### 替换
if os.path.exists(path_release):
    shutil.rmtree(path_release)
shutil.move(path_build, path_release)

######### js后缀
print('')
js_name = os.listdir(path_js)
for temp in js_name:
    num = temp.rfind('.')
    new_name = temp[:num]
    print("  rename: " + new_name)
    os.rename(path_js + '/'+temp,path_js + '/'+new_name+ '.xd')

######### js引用
#读
with open(path_js + "/../manifest.json","r") as f:
    lines = f.readlines() 
#写
with open(path_js + "/../manifest.json","w") as f_w:
    index_m = 0
    for line in lines:
        # if(index_m == 0):
        #     line = line + insert_to_manifest
        if ".js" in line:
         #替换
            line = line.replace(".js",".xd")
        f_w.write(line)
        index_m = index_m + 1

print("  rename inside: manifest.json")

#读
with open(path_js + "/../resource/default.res.json","r") as f:
    lines = f.readlines() 
#写
with open(path_js + "/../resource/default.res.json","w") as f_w:
    for line in lines:
        #添加
        line = re.sub('("url"[^?]+).*(")', addVersion, line)
        f_w.write(line)

#ready
os.system('Start "" ' + path_release + ' ')

input ("##### publish end!!")


