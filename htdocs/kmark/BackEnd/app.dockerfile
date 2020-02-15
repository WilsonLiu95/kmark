FROM centos:7

RUN yum update -y && yum upgrade 
RUN rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm && \
    rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm


RUN yum install zip unzip openssl openssl-devel gcc vim git wget libxml2-devel autoconf make -y

RUN yum install -y php72w php72w-cli php72w-fpm 
# PHP 自身 / cli PHP 的命令行接口 / 用于管理 PHP 进程，并提供 FastCGI 接口与 Nginx 交互
RUN yum install -y php72w-mbstring php72w-xml php72w-bcmath && \
    yum install -y php72w-gd php72w-mysql php72w-opcache php72w-process php72w-devel
# 安装扩展 

# 安装composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    composer -V
# 配置镜像源
RUN composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

COPY . /var/www

RUN cd /var/www && composer install
WORKDIR /var/www
CMD ["php", "artisan", "serve", "--host=0.0.0.0" ,"--port=80"]
