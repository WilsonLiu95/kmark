#!/bin/bash

# walk 函数 三个配置
# 第一个是遍历的目标文件，第二个是对文件处理的调用函数,第三个是对文件夹处理的调用函数，
# 调用函数 有两个输入一个是遍历的文件夹，一个是当前文件夹
function walk()
{
  for file in `ls ${1}`
  do
    local path=${1}"/"${file}
    if [ -d ${path} ]
     then
      #  如果存在回调函数，则调用文件处理回调函数 并且输入遍历的目标文件夹以及当前文件夹路径
      if [ ${3} ]
      then
        $3 $1 ${path}
      fi
      # 对当前文件夹继续调用walk函数
      walk ${path} $2 $3
    else
      # 调用文件处理函数对文件进行处理，并输入遍历的目标文件夹以及当前文件路径
      $2 $1 ${path}
    fi
  done
}
# 将html中的所有链接中的 VERSION 改为正确的版本号码
function html_into_ver()
{
  # 获取当前$2的html文件内所有的链接地址
  link=`sed -n "s#${de_reg_rule}#\2\3\4\5#p"  $2`
  # 获取当前$2的html文件内所有的连接路径
  link_path=`sed -n "s#${de_reg_rule}#\3\5#p" $2`

  i=1
  while [ `echo ${link} | cut -d " " -f $i` ]; do
    cur_link=`echo ${link} | cut -d " " -f $i` #html中的完整路径
    cur_link_path=`echo ${link_path} | cut -d " " -f $i` #html中的完整路径

    cur_version=`sed -n "s*${cur_link_path}#**p" ${de_ver_file}` #当前文件的版本号
    cur_replace_link=`echo ${cur_link} | sed -n   "s#\(.*\)\(@VERSION\)\(.*\)#\1@${cur_version}\3#p"` #当前替代cur_link的链接

    if [ `uname -s` == "Darwin" ]; then
      sed -i ""  "s#${cur_link}#${cur_replace_link}#" ${2} #对当前文件进行VERSION修改
    else
      sed -i     "s#${cur_link}#${cur_replace_link}#" ${2} #对当前文件进行VERSION修改
    fi
    # 循环的条件
    i=`expr $i + 1`
  done
  if [ `uname -s` == "Darwin" ]; then
    sed -i "" "s#${de_cur_prefix}#${de_replace_prefix}#g" ${2}  #修改链接的前置部分
  else
    sed -i "s#${de_cur_prefix}#${de_replace_prefix}#g" ${2}  #修改链接的前置部分
  fi
}
function init()
{
  # html_into_ver配置区
  de_reg_rule="\(.*\)\(http://localhost/kindleClipingDeal/prd/\)\(.*\)\(@VERSION\)\(.*\)\".*"
  de_cur_prefix="http://localhost/kindleClipingDeal" #当前prd前面的路径
  de_replace_prefix="http://kmark.wilsonliu.cn/v1.0" #替换的路径
  de_ver_file="ver/versions.mapping"  #当前存储版本号码的文件

  de_target_dir="export_html" #将html修改后，输出的目标文件夹
  de_source_dir="html" # 源文件夹为html

  # 如果目标文件夹存在，则先删除
    if [ -e ${de_target_dir} ]; then
      rm -rf ${de_target_dir}
    fi
    #首先复制源文件夹为输出文件夹，在输出文件夹
    cp -rf ${de_source_dir} ${de_target_dir}
  
  # walk 的3个参数配置
  de_dir_to_walk=${de_target_dir} #操作文件夹
  de_walk_file_callback="html_into_ver" #文件处理回调函数
  de_walk_dir_callback="" #文件夹处理回调函数，非必要，可为空

  # 调用walk函数
  walk $de_dir_to_walk $de_walk_file_callback $de_walk_dir_callback
}
init;
