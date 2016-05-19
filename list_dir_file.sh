#!/bin/bash
# walk 函数 三个配置
# 第一个是遍历的目标文件，第二个是对文件处理的调用函数,第三个是对文件夹处理的调用函数，
# 调用函数 有两个输入一个是遍历的文件夹，一个是当前文件夹
function walk()
{
  for file in `ls ${1}`
  do
    local path=${1}"/"$file
    if [ -d ${path} ]
     then
      #  调用文件处理回调函数 并且输入遍历的目标文件夹以及当前文件夹路径
      if [ ${3} ]
      then
        $3 $1 $path
      # else
      #   echo 文件处理回调函数为空
      fi
      # 对当前文件夹继续调用walk函数
      walk ${path} $2 $3
    else
      # 调用文件处理函数对文件进行处理，并输入遍历的目标文件夹以及当前文件路径
      $2 $1 $path
    fi
  done
}

# 将de_dir_to_walk下的文件遍历并输出到${de_dir_to_walk}_file_list.txt中
function list_file()
{
    echo "${2};" >> ${de_file_name}
}

# 将prd下的文件目录全部变成version
function prd_into_ver()
{
  prd_file_name=`echo $2 | cut -d "@" -f 1`
  file_type=`echo $2 | cut -d "." -f 2`
  sudo mv $2 ${prd_file_name}@VERSION.${file_type}
}
# 将html中的所有链接中的 VERSION 改为正确的版本号码
function html_into_ver()
{
  # 获取当前$2的html文件内所有的链接地址
  link=`sed -n "s#${de_reg_rule}#\2\3\4\5#p"  $2`
  # 获取当前$2的html文件内所有的连接路径
  link_path=`sed -n "s#${de_reg_rule}#\3\5#p" $2`

  i=1

  while [[ `echo ${link} | cut -d " " -f $i` ]]; do
    cur_link=`echo ${link} | cut -d " " -f $i` #html中的完整路径
    cur_link_path=`echo ${link_path} | cut -d " " -f $i` #html中的完整路径

    cur_version=`sed -n "s*${cur_link_path}#**p" ${de_ver_file}` #当前文件的版本号
    cur_replace_link=`echo ${cur_link} | sed -n   "s#\(.*\)\(@VERSION\)\(.*\)#\1@${cur_version}\3#p"` #当前替代cur_link的链接
    sed -i "" "s#${cur_link}#${cur_replace_link}#" ${2} #对当前文件进行VERSION修改

    # 循环的条件
    i=`expr $i + 1`
  done
    sed -i "" "s#${de_cur_prefix}#${de_replace_prefix}#g" ${2}  #修改链接的前置部分

}

function init()
{
  # walk 的3个参数配置
  de_dir_to_walk="html"
  de_walk_dir_callback=""
  de_walk_file_callback="html_into_ver"

  # list_file配置区 可以直接配置也可以在命令行里手动输入
  de_file_name="${de_dir_to_walk}_file_list.txt"

  if [ -e $de_file_name ]
  then
  rm $de_file_name
  fi

  # echo "请输入文件名"
  # read de_file_name

  # html_into_ver配置区
  de_reg_rule="\(.*\)\(http://localhost/kindleClipingDeal/prd/\)\(.*\)\(@VERSION\)\(.*\)\".*"
  de_cur_prefix="http://localhost/kindleClipingDeal" #当前prd前面的路径
  de_replace_prefix="http://wilsonliu.cn/kindleClipingDeal" #替换的路径
  de_ver_file="ver/versions.mapping"  #当前存储版本号码的文件
  walk $de_dir_to_walk $de_walk_file_callback $de_walk_dir_callback
}
init;
