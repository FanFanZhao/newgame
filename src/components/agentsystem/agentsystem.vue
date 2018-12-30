<style  lang="less">
    // @import "../../assets/public.less";
    // @import "./agentsystem.less";
</style>
<template>
    <div id="system">
        <ul class="system-menu">
            <li class="system-menu-head">用户管理</li>
            <li @click="levelChange(1)" class="system-menu-active">一级用户</li>
            <li @click="levelChange(2)">二级用户</li>
            <li @click="levelChange(3)">三级用户</li>
        </ul>
        <div class="system-content">
            <ul class="system-content-one">
                <li>{{userLevelHtml}}数量</li>
                <li>{{userNumber}}</li>
               </ul>
            <ul v-if="tabelOrShow" class="system-content-two">
                <li>
                    <span>用户名：</span> <Input v-model="realname" placeholder="请输入用户名称" style="width:200px;" />
                </li>
                <li>
                    <span>注册日期：</span>
                    <!--<Col span="12">-->
                        <DatePicker format="yyyy-MM-dd" v-model="formItem.timeArea[0]" type="date" placeholder="开始日期" style="width:240px;font-size:14px" @on-change="handleChange"></DatePicker>
                    <!--</Col>-->
                    <span>至</span>
                        <DatePicker format="yyyy-MM-dd" v-model="formItem.timeArea[1]" @on-change="handleChange1" type="date" placeholder="结束日期" style="width:240px;font-size:14px;"></DatePicker>
                </li>
                <li>
                    <Button @click="onSearch">搜索</Button>
                </li>
                <li>
                    <Button @click="onSearchBottom">{{userLevelHtml}}</Button>
                </li>
            </ul>
            <ul v-else class="system-content-two">
                <li>
                    <span>订单状态</span>
                    <Select @on-change="statusChange" v-model="myBottomData.big_status" style="width:120px">
                        <Option v-for="item in dataSelectStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span>币种</span>
                    <Select @on-change="biChange" v-model="myBottomData.pid" style="width:120px">
                        <Option v-for="item in dataSelectBi" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span>编号</span>
                    <Input v-model="myBottomData.account" placeholder="用户编号搜索" style="width:200px;" />
                </li>
                <li>
                    <span>手机号</span>
                    <Input v-model="myBottomData.mobile" placeholder="手机号搜索" style="width:200px;" />
                </li>
                <li>
                    <Button @click="onSearchOne">搜索</Button>
                </li>
                <li>
                    <Button @click="backLast">返回</Button>
                </li>
            </ul>
            <div v-if="tabelOrShow" class="system-content-three">
                <Table id="haha" highlight-row ref="currentRowTable" :columns="tableList" :data="tableData" style=""></Table>
            </div>
            <div v-else class="system-content-three">
                <div class="total-total">USDT下单数量：{{totalTotal.usdt_total_order_count}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;USDT下单逃跑成功金额：{{totalTotal.usdt_escape_sum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;USDT下单爆炸金额 {{totalTotal.usdt_explode_sum}}</div>
                <Table highlight-row ref="currentRowTable" :columns="tableListCopy" :data="tableDataCopy" style=""></Table>
            </div>
            <div v-if="tabelOrShow" class="system-content-four">
                <Page @on-change="changePage" :total="totalPage*10" size="small"/>
            </div>
            <div v-else class="system-content-four">
                <Page @on-change="changePage1" :total="totalPage1*10" size="small"/>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "agentsystem",
        data(){
            return {
                danStatus:'',
                danBi:'',
                dataSelectTele:'',
                dataSelectNumber:'',
                dataSelectStatus: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '2',
                        label: '逃跑成功'
                    },
                    {
                        value: '3',
                        label: '爆炸了'
                    }
                ],
                dataSelectBi:[
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: 'USDT'
                    },
                    {
                        value: '2',
                        label: 'FB'
                    }
                ],
                tabelOrShow:true,
                tableList: [
                    {
                        title: '用户名称',
                        key: 'realname'
                    },
                    {
                        title: 'USDT累计竞猜额',
                        key: 'allMoney'
                    },
                    {
                        title: 'FB累计竞猜额',
                        key: 'allMoneyPb'
                    },
                    {
                        title: '注册日期',
                        key: 'registerDate'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.myPur(params.index)
                                        }
                                    }
                                }, '我的下注')
                            ]);
                        }
                    },
                ],
                tableData: [],
                tableListCopy:[
                    {
                        title:'币种类型',
                        key:'pid',
                        width:100,
                    },
                    {
                        title:'用户编号',
                        key:'account',
                        // width:160,
                    },
                    {
                        title:'用户姓名',
                        key:'realname',
                        // width:220,
                    },
                    {
                        title:'用户手机号',
                        key:'mobile',
                        // width:160
                    },
                    {
                        title:'期数',
                        key:'qs',
                        // width:180,
                    },
                    {
                        title:'爆炸倍数',
                        key:'boomValue',
                        // width:160,
                    },
                    {
                        title:'购买金额',
                        key:'buy_money',
                        // width:200
                    },
                    {
                        title:'最终倍数',
                        key:'final_beishu',
                        // width:160,
                    },
                    {
                        title:'购买时间',
                        key:'create_time'
                    },
                ],
                tableDataCopy:[],
                model1: '',
                pageData: {
                    curPage: 1, // 当前页
                    level:1,
                    pageSize: 10,                // 每页条数
                },
                formItem:{
                    timeArea: ['','']
                },
                totalPage:1,
                totalPage1:1,
                userLevelHtml:'一级用户',
                userNumber:'',
                realname:'',
                tabelDataCopyIndex:'',
                myBottomData:{//我的下注
                    level:'',
                    account:'',
                    page:1,
                    size:10,
                    pid:'',//币种类型
                    mobile:'',//用户手机号
                    big_status:'0'//订单状态
                },
                totalTotal:{
                    usdt_escape_sum:'',
                    usdt_explode_sum:'',
                    usdt_total_order_count:'',
                }//总结
            }
        },
        methods:{
            onSearchBottom(){
                let _this = this;
                _this.tabelOrShow = false;
                _this.myBottomData.account = '';
                _this.tableDataCopy = [];
                _this.myBottomData.level =  _this.pageData.level;
                _this.myBottomData.page = 1;
                _this.myBottomData.pid = '';
                _this.myBottomData.mobile = '';
                _this.myBottomData.big_status= '';
                _this.getBottomData();
            },
            onSearchOne(){
                let _this = this;
                _this.myBottomData.page = 1;
                _this.getBottomData();
            },
            statusChange(data){
                let _this = this;
                _this.myBottomData.big_status = data;
            },
            biChange(data){
                let _this = this;
                _this.myBottomData.pid = data;
            },
            backLast(){
                let _this = this;
                _this.tabelOrShow = true;
            },
            changePage1(current){
                let _this = this;
                _this.myBottomData.page = current;
                _this.getBottomData();
            },
            myPur(index){
                let _this = this;
                _this.tabelDataCopyIndex = index;
                _this.tabelOrShow = false;
                _this.myBottomData.level = '';
                _this.tableDataCopy = [];
                _this.myBottomData.page = 1;
                _this.myBottomData.pid = '';
                _this.myBottomData.mobile = '';
                _this.myBottomData.big_status= '';
                _this.myBottomData.account = _this.tableData[index].account;
                _this.getBottomData();
            },
            getBottomData(){
                let _this = this;
                let _data = _this.myBottomData;
                _this.$http.post(_this.$http.applyAgentZhu, _data).then(function(response){
                    if(response.data.status == 200) {
                        _this.tableDataCopy = response.data.data.list;
                        _this.totalTotal = response.data.data.tongji_info;
                        let dataLength = response.data.data.list.length;
                        for(var i = 0; i < dataLength; i++){
                            if( _this.tableDataCopy[i].pid == 2){
                                _this.tableDataCopy[i].pid = 'PB';
                            }else{
                                _this.tableDataCopy[i].pid = 'USDT'
                            }

                        }
                        // if(response.data.data.list)
                        _this.totalPage1 = response.data.data.page_count;
                    }
                });
            },
            onSearch(){
                let _this = this;
                if(_this.tabelOrShow){
                    _this.systemData();
                }else{

                }

            },
            changePage(current){
                this.pageData.curPage = current;
                this.systemData();
            },
            levelChange(level){
                let _this = this;
                _this.tabelOrShow = true;
                _this.realname = '';
                _this.formItem.timeArea[0] = '';
                _this.formItem.timeArea[1] = '';
                _this.pageData.level = level;
                $('.system-menu li').removeClass("system-menu-active");
                $(event.target).addClass('system-menu-active');
                _this.userLevelHtml = $(event.target).html();
                _this.systemData();
            },
            handleChange(daterange) {
                let _this = this;
                _this.formItem.timeArea[0] = daterange;
            },
            handleChange1(daterange){
                let _this = this;
                _this.formItem.timeArea[1] = daterange;
            },
            systemData(){
                let _this = this;
                let _data = {
                    page: _this.pageData.curPage,
                    size: _this.pageData.pageSize,
                    level:_this.pageData.level,
                    realname:_this.realname,
                };
                    _data['reg_start_time'] = _this.formItem.timeArea[0];
                    _data['reg_end_time'] = _this.formItem.timeArea[1];
                _this.$http.post(_this.$http.daililist, _data).then(function(response){
                    if(response.data.status == 200) {
                        _this.userNumber = response.data.data.user_num;
                        _this.totalPage = response.data.data.page_num;
                        let responseDataList = response.data.data.list;
                        let responseDataListL = responseDataList.length;
                        _this.tableData = [];
                        for(let i = 0; i < responseDataListL; i++){
                            let tableDataBefore = {};
                            tableDataBefore.realname = responseDataList[i].realname;
                            tableDataBefore.allMoney = responseDataList[i].cny_leiji;
                            tableDataBefore.allMoneyPb = responseDataList[i].pb_leiji;
                            tableDataBefore.registerDate = responseDataList[i].reg_time.split(' ')[0];
                            tableDataBefore.account = responseDataList[i].account;
                            _this.tableData.push(tableDataBefore);
                        }
                    }else {
                        // _this.$Message.error('获取数据失败');
                    }
                }).catch(function(error) {});
            },
        },
        mounted:function(){
            var _this = this;
            window.setTimeout(function(){
                _this.systemData();
            },1200);
        },
        created:function(){
            var _this = this;
            if (_this.$public.GetQueryString('account')) {
                window.localStorage.account = _this.$public.GetQueryString('account');
                window.localStorage.token = _this.$public.GetQueryString('token');
            }; 
        }
    }
</script>





// WEBPACK FOOTER //
// src/components/agentsystem/agentsystem.vue