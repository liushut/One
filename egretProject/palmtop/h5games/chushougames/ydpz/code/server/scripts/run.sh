#!/bin/bash
PLATFORM_NAME=fire2333
NODE=1
SERVER_IP=127.0.0.1
GAME=elsfk
TICKET=elsfk_ticket
COOKIE=${GAME}_${PLATFORM_NAME}_${TICKET}
NODE_NAME=${GAME}_${PLATFORM_NAME}_node${NODE}@${SERVER_IP}
CONFIG_FILE=./config/game.config

SMP=auto
POLL=true
ERL_PROCESSES=102400
ERL_MAX_PORTS=32000

export ERL_MAX_PORTS

DATETIME=`date "+%Y%m%d%H%M%S"`

LOG_DIR="/data/server/${GAME}/logs"

cd ../

ARGS=$1

start()
{
    echo "--------------------------------------------------------------------"
    echo ""
    echo "Server将以后台进程模式启动,"
    echo ""
    echo "--------------------------------------------------------------------"
    echo "任意键继续"
    echo `pwd`
        started
        if [ $? = 1 ] ; then
        mkdir -p ${LOG_DIR}/back
        mv ${LOG_DIR}/*.log ${LOG_DIR}/back
        erl +P ${ERL_PROCESSES} \
            +t 2048576 \
            -smp ${SMP} \
            -pa ./ebin ./deps/cowboy/ebin ./deps/util/ebin ./config \
            -name ${NODE_NAME} \
            -setcookie ${COOKIE} \
            -boot start_sasl \
            -config ${CONFIG_FILE} -detached \
            -s main server_start
        sleep 4
        local DATETIME=`date "+%Y-%m-%d %H:%M:%S"`
        echo "=($DATETIME)===================服务器启动完毕===================="
        fi
}

#切入后台程序
debug()
{
    echo "--------------------------------------------------------------------"
    echo ""
    echo "重要提示: 我们将试图连接一个交互式的SHELL到一个已运行中的Server结点"
    echo "如果打印了任何错误，代表连接尝试失败了."
    echo "记住:退出请按 Ctrl + c"
    echo ""
    echo "--------------------------------------------------------------------"
    echo "任意键继续"
    echo $NODE_NAME
    read foo
    erl +P $ERL_PROCESSES \
        +K $POLL \
        -smp $SMP \
        -setcookie $COOKIE \
        -name debug_$NODE_NAME \
        -remsh $NODE_NAME \
        -hidden
}
#交互模式
live()
{
    echo "--------------------------------------------------------------------"
    echo ""
    echo "重要提示: Server将会以交互式模式启动"
    echo "所有的消息都会被直接打印在终端上."
    echo ""
    echo "如果想退出该模式请输入 q()，然后回车"
    echo ""
    echo "--------------------------------------------------------------------"
    echo "任意键继续"
    read foo
    mkdir -p ${LOG_DIR}/back
    mv ${LOG_HEAD}*.log ${LOG_DIR}/back
    erl +P ${ERL_PROCESSES} \
        +t 2048576 \
        -smp ${SMP} \
        -pa ./ebin ./deps/cowboy/ebin ./deps/util/ebin ./config \
        -name ${NODE_NAME} \
        -setcookie ${COOKIE} \
        -boot start_sasl \
        -config ${CONFIG_FILE} \
        -s reloader -s main server_start
}

started()
{
        local DATETIME=`date "+%Y-%m-%d %H:%M:%S"`
        PID=`ps awux | grep $NODE_NAME | grep -v "grep" | awk '{print $2}'`
        if [ "$PID" != '' ] ; then
                echo "=($DATETIME)===================服务器已启动===================="
                return 0
        else
                echo "=($DATETIME)===================服务器未启动===================="
                return 1
        fi
}

help()
{
    echo "--------------------------------------------------------------------"
    echo ""
    echo "Server管理命令:"
    echo " start  以正常服务器方式启动"
    echo " debug  以交互式命令行的方式连接到已有Server结点"
    echo " live  以交互方式启动服务器"
    echo " started  查询服务器是否已启动"
    echo ""
    echo "命令行参数，如: ./run.sh start"
    echo ""
    echo "--------------------------------------------------------------------"
}

WARNING () {
echo -e "\033[0;31;1m$*\033[0m"
}

case $ARGS in
    'start') start;;
    'debug') debug;;
    'live') live;;
    'started') started;;
    *) help;;
esac


