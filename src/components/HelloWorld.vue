<style lang="less">
    // @import '../assets/public.less';
    // @import './index.less';
    // @import './indexmove.less';
</style>
<template>
    <div class="hello">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <div class="move">
                    <div class="move_logo" @click="movenavtype = true">
                        <Icon type="md-menu"></Icon>
                    </div>
                    <ul class="move_nav" v-if="movenavtype" @click="movenavtype = false">
                        <li @click="movenavtype = false" class="move_logoimg">
                            <img src="../assets/imgs/move_logo.png">
                        </li>
                        <li :class="classA=='1'? 'on' : ''" @click="onChange('1')">
                            <router-link to="allguessing">
                                <img src="../assets/imgs/explosion.png">
                                爆发者
                            </router-link>
                        </li>
                        <li :class="classA=='2'? 'on' : ''" @click="onChange('2')">
                            <a> <img src="../assets/imgs/allpeople.png">
                                全民代理
                            </a>
                        </li>
                        <li :class="classA=='3'? 'on' : ''" @click="onChange('3')">
                            <router-link to="help">
                                <img src="../assets/imgs/question.png">
                                帮助中心
                            </router-link>
                        </li>
                        <li :class="classA=='4'? 'on' : ''" @click="onChange('4')">
                            <router-link to="download">
                                <img src="../assets/imgs/download.png">
                                APP下载
                            </router-link>
                        </li>
                        <li class="move_footer"></li>
                    </ul>
                </div>
                <div class="layout-logo">
                    <img src="../assets/imgs/bflogo.png">
                </div>
                <ul class="layout-nav layout_nav">
                    <li :class="classA=='1'? 'dianji' : ''" @click="onChange('1')">
                        <router-link to="allguessing">
                            爆发者
                        </router-link>
                    </li>
                    <li :class="classA=='2'? 'dianji' : ''" @click="onChange('2')">
                        <a>全民代理</a>
                    </li>
                    <li :class="classA=='3'? 'dianji' : ''" @click="onChange('3')">
                        <router-link to="help">
                            帮助中心
                        </router-link>
                    </li>
                    <li :class="classA=='4'? 'dianji' : ''" @click="onChange('4')" >
                        <router-link to="download">
                            APP下载
                        </router-link>
                    </li>
                </ul>
                <div class="help-head-lin" style="display:none;"><p>爆发者</p><p>{{$http.defaults.baseURL}}</p></div>
                <div class="layout-geren" v-if="!account.realname">
                    <ul class="geren_type">
                        <li @click="modal1 = true">登录</li>
                        <li class="register-or" @click="modal2 = true ">注册</li>
                    </ul>
                </div>
                <div class="layout-geren" v-else>
                    <!--<div class="notice-ling">-->
                        <!--<img src="../assets/imgs/noticehead.png" alt="" @click="modal11 = true">-->
                    <!--</div>-->
                    <Badge v-if="isReadCount" dot>
                        <img src="../assets/imgs/notification.png" class="notification" @click="modal11 = true">
                    </Badge>
                    <Badge v-else dot :count="0">
                        <img src="../assets/imgs/notification.png" class="notification" @click="modal11 = true">
                    </Badge>
                    <Dropdown style="margin-left: 20px" trigger="click">
                        <a id="hair" href="javascript:void(0)" >
                            <img class="hari-img1" :src="account.upic" v-if="account.upic != ''">
                            <img v-else src="../assets/imgs/defaulttouxiang.png" alt="">
                            <img id="hair-xia" src="../assets/imgs/xiajiantou.png" alt="">
                            <span>{{account.realname}}</span>
                            <!-- <Icon type="md-arrow-dropdown"></Icon> -->
                            <img src="../assets/imgs/down.png" class="down_arrow">
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>
                                <p @click="modal3 = true">战绩</p>
                            </DropdownItem>
                            <DropdownItem>
                                <p @click="modal10 = true">我的资产</p>
                            </DropdownItem>
                            <DropdownItem>
                                <p @click="modal9 = true">安全设置</p>
                            </DropdownItem>
                            <DropdownItem>
                                <p @click="modal11 = true">通知中心</p>
                            </DropdownItem>
                            <DropdownItem>
                                <p @click="modal5 = true">资金密码</p>
                            </DropdownItem>
                            <DropdownItem>
                                <p @click="modal15 = true">钱包地址</p>
                            </DropdownItem>
                            <DropdownItem>
                                <p @click="Signout">退出</p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Header>
            <Layout>
                <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" width='45'>
                    <ul class="layout-nav">
                        <li :class="classA=='1'? 'dianji' : ''" @click="onChange('1')">
                            <router-link to="allguessing">
                                <img src="../assets/imgs/quiz.png">
                                <p>竞猜</p>
                            </router-link>
                        </li>
                        <li :class="classA=='5'? 'dianji' : ''" @click="onChange('5')">
                            <router-link to="faq">
                                <img src="../assets/imgs/question.png">
                                <p>FAQ</p>
                            </router-link>
                        </li>
                        <li :class="classA=='6'? 'dianji' : ''" @click="onChange('6')">
                            <router-link to="ranklist">
                                <img src="../assets/imgs/Leaderboard.png">
                                <p>排行榜</p>
                            </router-link>
                        </li>
                        <li :class="classA=='4'? 'dianji' : ''" @click="onChange('4')">
                            <router-link to="download">
                                <img src="../assets/imgs/download.png">
                                <!-- <Icon type="md-cloud-download"></Icon> -->
                                <p>APP</p>
                            </router-link>
                        </li>
                    </ul>
                </Sider>
                <Content :style="{padding:'0px 0px 0px 45px', minHeight: '500px'}">
                    <div class="main_box">
                        <transition name="transitionRouter">
                            <router-view @gwundds="Popuptype"  class="Router"></router-view>
                        </transition>
                    </div>
                </Content>
            </Layout>
            <Footer>
                <div class="footer">
                    <ul class="footer_box">
                        <li>
                            <p @click="onChange('3')"><router-link to="help?id=1">用户协议</router-link></p>

                            <p @click="onChange('3')"><router-link to="help?id=2">隐私协议</router-link></p>

                            <p @click="onChange('3')"><router-link to="help">帮助中心</router-link></p>

                            <p @click="onChange('4')"><router-link to="download?id=3">APP下载</router-link></p>
                        </li>
                        <li>
                            <img class="footer-img" src="../assets/imgs/footer_logo.png">
                            <h2>该网站由BF.爆发者竞猜平台提供技术支持，并允许玩家使用FB、RMB进行游戏。</h2>
                        </li>
                    </ul>
                </div>
                <div class="footer_footer">
                    <p>Copyring&copy;2018 爆发者 ALL Rights Reserved</p>
                </div>
            </Footer>
        </Layout>
        <!-- 登录 -->
        <Login :Statevalue='modal1' @modifyfun="Refresh" @Otherfunctions='Popuptype'></Login>
        <!-- 注册 -->
        <Register :Statevalue='modal2' @modifyfun="Refresh" @Otherfunctions='Popuptype'></Register>
        <!-- 忘记密码 -->
        <ForgetThe :Statevalue='modal12' @modifyfun="Refresh" @Otherfunctions='Popuptype'></ForgetThe>
        <!-- 战绩 -->
        <Record :Statevalue='modal3' @modifyfun="Refresh"></Record>
        <!-- 庄家 -->
        <TheBanker :Statevalue='modal4' @modifyfun="Refresh"></TheBanker>
        <!-- 设置资金密码 -->
        <Drawing :Statevalue='modal5' @modifyfun="Refresh"></Drawing>
        <!-- 交易记录 -->
        <TransaCtion :Statevalue='modal6' @modifyfun="Refresh"></TransaCtion>
        <!-- USDT提现 -->
        <PutForward :Statevalue='modal7' @modifyfun="Refresh" @Otherfunctions='Popuptype' :getAddList="getAdressListData"></PutForward>
        <!-- 重置资金密码 -->
        <Txchange :Statevalue='modal14' @modifyfun="Refresh" ></Txchange>
        <!-- 流水记录 -->
        <FlowRecord :Statevalue='modal8' @modifyfun="Refresh"></FlowRecord>
        <!-- 安全验证 -->
        <SecurityVerification :Statevalue='modal9' @modifyfun="Refresh" @Otherfunctions='Popuptype'></SecurityVerification>
        <!-- 资产 -->
        <Assets :Statevalue='modal10' @modifyfun="Refresh" @Otherfunctions='Popuptype'></Assets>
        <!-- 通知 -->
        <Notice @gonoticeContent="getnoticeContent" :Statevalue='modal11' @tongzhi="tongzhi1" @modifyfun="Refresh" @Otherfunctions='Popuptype'></Notice>
        <!-- 通知详情 -->
        <Noticecontent :getNoticeId="getnoticeData" :Statevalue='modal17' @modifyfun="Refresh" @Otherfunctions='Popuptype'></Noticecontent>
        <!-- USDT充值 -->
        <Recharge :Statevalue='modal13' @modifyfun="Refresh"></Recharge>
        <!--钱包地址列表-->
        <Adresslist :Statevalue='modal15' @modifyfun="Refresh" @Otherfunctions='Popuptype' @getAddress="Giveput"></Adresslist>
        <!--添加钱包-->
        <AddAdress :Statevalue='modal16' @modifyfun="Refresh"></AddAdress>
        <!--玩法介绍-->
        <Playintruduce @Otherfunctions='Popuptype' :Statevalue='modal18' @modifyfun="Refresh"></Playintruduce>
        <!-- CNY充值 -->
        <RechargeCopy :Statevalue='modal19' @modifyfun="Refresh"></RechargeCopy>
        <!-- CNY提现 -->
        <PutForwardCopy :Statevalue='modal20' @modifyfun="Refresh" @Otherfunctions='Popuptype' :getAddList="getAdressListData"></PutForwardCopy>
    </div>
</template>

<script>
    import Login from "./login/login.vue";
    import Register from "./register/register.vue";
    import ForgetThe from "./forgetthe/forgetthe.vue";
    import Record from "./record/index.vue";
    import TheBanker from "./thebanker/index.vue";
    import Drawing from "./drawing/index.vue";
    import TransaCtion from "./transaction/index.vue";
    import PutForward from "./putforward/index.vue";
    import PutForwardCopy from "./putforwardcopy/index.vue";
    import FlowRecord from "./flowrecord/index.vue";
    import SecurityVerification from "./security/index.vue";
    import Assets from "./assets/index.vue";
    import Notice from "./notice/index.vue";
    import Recharge from "./recharge/index.vue";
    import RechargeCopy from "./rechargecopy/index.vue";
    import Txchange from "./changetixian/changetixian.vue";
    import Adresslist from "./adresslist/index.vue";
    import AddAdress from "./addmoneyAdress/index.vue";
    import Noticecontent from "./noticecontent/index.vue";
    import Playintruduce from "./playintruduce/index.vue";

    export default {
        // 数据
        data() {
            return {
                classA:"1",//移动端nav状态
                getnoticeData:'',
                getAdressListData:'',//从钱包列表中得到值
                isReadCount:true,//判断公告列表是否已读
                activeKey: 0,
                modal1:false,//登录
                modal2:false,//注册
                modal3:false,//战绩
                modal4:false,//庄家
                modal5:false,//设置资金密码
                modal6:false,//交易记录
                modal7:false,//提现
                modal8:false,//流水记录
                modal9:false,//安全验证
                modal10:false,//资产
                modal11:false,//通知
                modal12:false,//忘记密码
                modal13:false,//充值USDT
                modal14:false,//修改提现密码
                modal15:false,//钱包地址
                modal16:false,//添加钱包地址
                modal17:false,//通知详情
                modal18:false,//玩法介绍
                modal19:false,//CNY充值
                modal20:false,//CNY提现
                movenavtype:false,
                appinteractivetype:true,//是不是APP打开
                account:{
                    account:"",
                    token:"",
                },
                transitionName: 'slide-right'  // 默认动态路由变化为slide-right
            };
        },
        // 当数据发生改变时
        watch: {
            '$route':function (to, from) {
　　　　　　          let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
　　　　　　　　        if(isBack) {
　　　　　　　　            this.transitionName = 'slide-right'
　　　　　　　　        } else {
　　　　　　              this.transitionName = 'slide-left'
　　　　　　　　        }
　　　　　　　　        this.$router.isBack = false;
                     this.pageChange();
　　　　　　　　    }
        },
        // 方法
        methods: {
            getnoticeContent(data){//从通知列表传值给通知详情页
                this.getnoticeData = data;
            },
            Giveput(data){//从钱包地址列表中传过来值，给提现页
                this.getAdressListData = data;
            },
            tongzhi1(){
              const _this = this;
              var _data = {
                page:1,size:"15",
                account:localStorage.account,
                token:localStorage.token,
              };
              _this.$http.post(_this.$http.noticelistpost,_data).then(function(response) {
                if(response.data.status == "200") {
                    if(response.data.data.out_show_red == 0){
                      _this.isReadCount = false;
                    }else{
                      _this.isReadCount = true;
                    }
                  //console.log(response.data.data.out_show_red)

                };
              }).catch(function(error) {});
            },
            Refresh(){// 关闭所有弹框
                var _this = this;
                _this.modal1 = false;
                _this.modal2 = false;
                _this.modal3 = false;
                _this.modal4 = false;
                _this.modal5 = false;
                _this.modal6 = false;
                _this.modal7 = false;
                _this.modal8 = false;
                _this.modal9 = false;
                _this.modal10 = false;
                _this.modal11 = false;
                _this.modal12 = false;
                _this.modal13 = false;
                _this.modal14 = false;
                _this.modal15 = false;
                _this.modal16 = false;
                _this.modal17 = false;
                _this.modal18 = false;
                _this.modal19 = false;
                _this.modal20 = false;
                if(window.logins==1){
                    _this.modal1 = true;
                }
            },
            Popuptype(type){ //部分弹框的状态
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                switch (type) {
                    case '1'://注册点登录
                        _this.modal1 = true;
                        _this.modal2 = false;
                        break;
                    case '2'://登录点注册
                        _this.modal1 = false;
                        _this.modal2 = true;
                        break;
                    case '3'://登录点忘记密码
                        _this.modal1 = false;
                        _this.modal12 = true;
                        break;
                    case '4'://忘记密码点登录
                        _this.modal1 = true;
                        _this.modal12 = false;
                        break;
                    case '5'://资产显示
                        _this.modal10 = true;
                        break;
                    case '6'://显示交易记录
                        _this.modal10 = false;
                        _this.modal6 = true;
                        break;
                    case '7'://显示账户流水
                        _this.modal10 = false;
                        _this.modal8 = true;
                        break;
                    case '8'://显示USDT充值
                        _this.modal10 = false;
                        _this.modal13 = true;
                        break;
                    case '9'://显示提现
                        _this.modal10 = false;
                        _this.modal7 = true;
                        break;
                    case '10'://庄家点击
                        _this.modal4 = true;
                        break;
                    case '11'://登录显示
                        _this.modal1 = true;
                        break;
                    case '12'://提现密码显示
                        _this.modal5 = true;
                        _this.modal10 = false;
                        break;
                    case '13'://修改提现密码显示
                        _this.modal5 = true;
                        _this.modal7 = false;
                        break;
                    case '14'://添加钱包地址显示
                        _this.modal15 = false;
                        _this.modal16 = true;
                        break;
                    case '15'://从提币进入提币列表
                        _this.modal7 = false;
                        _this.modal15 = true;
                        break;
                    case '16'://从提币列表返回提币
                        _this.modal7 = true;
                        _this.modal15 = false;
                        break;
                    case '17'://从通知详情返回通知列表
                        _this.modal17 = false;
                        _this.modal11 = true;
                        break;
                    case '18'://从通知列表进入通知详情
                        _this.modal17 = true;
                        _this.modal11 = false;
                        break;
                    case '19'://进入玩法介绍页
                        _this.modal18 = true;
                        break;
                    case '20'://刷新个人信息
                        _this.userinfodata();
                        break;
                    case '21'://刷新个人信息
                        _this.modal10 = false;
                        _this.modal19 = true;
                        break;
                    case '22'://从提币列表返回提币
                        _this.modal20 = true;
                        _this.modal10 = false;
                        break;
                    case '23'://从提币列表返回提币
                        _this.modal9 = true;
                        _this.modal10 = false;
                        break;
                    case '100'://登录成功
                        _this.account.account =  localStorage.account;
                        _this.account.token = localStorage.token;
                        break;
                    default:
                        // statements_def
                        break;
                };
            },
            Signout(){
                var _this = this;
                _this.$Modal.success({
                    closable:true,
                    title: "确定要退出登录吗？",
                    content: "该操作将退出登录，确定要退出登录吗？",
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        _this.$Message.success("退出登录成功！");
                        localStorage.clear();
                        window.setTimeout(function(){
                            window.location.href = "index.html";
                        },1000)
                    },
                });
            },
            dianjiChange(e){
                $('.layout-nav li').removeClass('dianji');
                $(e.currentTarget).addClass('dianji');
            },
            onChange(e){
                // console.log(e)
                if(e == 2){
                    var _this = this;
                    let account =  localStorage.account;
                    let token = localStorage.token;
                    if(!account || !token){
                        _this.modal1 = true;
                        localStorage.clear();
                        return false;
                    }else{
                        _this.$router.push('agent');
                    }
                };
                $('.move_nav li').removeClass('on');
                $(e.currentTarget).addClass('on');
                var _this = this;
                _this.classA = e;
                _this.movenavtype = false;
            },
            userinfodata(){
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                if(account ||token){
                    _this.$http.post(_this.$http.userinfo).then(function(response) {
                        if(response.data.status == "200") {
                            _this.account = response.data.data;
                        }
                    }).catch(function(error) {});
                };
            },
            // 按路由切换页面
            pageChange(){
                const _this = this;
                switch (_this.$route.path) {
                    case '/home/allguessing':
                        _this.classA = '1';
                        break;
                    case '/home/myguessing':
                        _this.classA = '1';
                        break;
                     case '/home/history':
                        _this.classA = '1';
                        break;
                    case '/home/agent':
                        _this.classA = '2';
                        break;
                    case '/home/help':
                        _this.classA = '3';
                        break;
                    case '/home/help?id=1':
                        _this.classA = '3';
                        break;
                    case '/home/help?id=2':
                        _this.classA = '3';
                        break;
                    case '/home/download':
                        _this.classA = '4';
                        break;
                     case '/home/faq':
                        _this.classA = '5';
                        break;
                     case '/home/ranklist':
                        _this.classA = '6';
                        break;
                    default:
                        break;
                }
            }

        },
         // 路由发生变化时
        beforeRouteLeave (to, from, next) {
            var conent = this;
            next()
        },
        mounted(){
            var _this = this;
            _this.userinfodata();
            _this.tongzhi1();
            _this.pageChange();
            if(_this.$route.query.yqcode){
                _this.Refresh();
                _this.modal2=true;
            }
        },
        // 加载模块
        components:{
            'Login':Login,
            'Register':Register,
            'ForgetThe':ForgetThe,
            'Record':Record,
            'TheBanker':TheBanker,
            'Drawing':Drawing,
            'TransaCtion':TransaCtion,
            'PutForward':PutForward,
            'PutForwardCopy': PutForwardCopy,
            'FlowRecord':FlowRecord,
            'SecurityVerification':SecurityVerification,
            'Assets':Assets,
            'Notice':Notice,
            'Recharge':Recharge,
            'RechargeCopy': RechargeCopy,
            'Txchange':Txchange,
            "Adresslist":Adresslist,
            'AddAdress':AddAdress,
            'Noticecontent':Noticecontent,
            'Playintruduce':Playintruduce
         },
        // 加载执行
        created:function(){
            const _this=this;
            if(_this.$route.query.yqcode){
               let data=_this.$route.query.yqcode
               this.$cookies.set('yqcode', data,new Date('2020-10-31'));
            }
        }
    };
</script>
<style lang="less">
.transitionRouter-enter-active,
.transitionRouter-leave-active {
    transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave{
    transform: translate3d(100%, 0, 0);
}
</style>


