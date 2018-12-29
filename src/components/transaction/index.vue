<template>
	<Modal v-model="modal2" @on-cancel="Callback()" width="880">
        <p slot="header">
            <span>交易记录</span>
        </p>
        <div class="transaction_main">
        	<div class="transaction_header">
        		<Menu mode="horizontal" active-name="1">
			        <MenuItem name="1">
			            <p @click="tabtypefun('1')">充值记录</p>
			        </MenuItem>
			        <MenuItem name="2">
			            <p @click="tabtypefun('2')">提现记录</p>
			        </MenuItem>
			    </Menu>
        	</div>
        	<div class="transaction_box">
        		<section class="transaction_box_one" v-if="tabtype == '1'">
        			<ul class="transaction_box_one_box">
        				<li class="transaction_box_list" v-for="(item,index) in paywayrecode" :key="index" v-if="moneyType == 'cny'">
        					<dl class="">
        						<dt>充值地址 {{item.chongzhi_url}}</dt>
        						<dt>充值数量 {{item.price}} USDT</dt>
        					</dl>
        					<dl class="">
        						<dt>充值时间 {{item.addtime}}</dt>
        						<dt>充值状态 {{item.state == 1 ? '充币中' : '已到账'}}</dt>
        					</dl>
        				</li>
                        <li class="transaction_box_list" v-for="(item,index) in paywayrecode" :key="index"  v-if="moneyType != 'cny'">
                            <dl class="">
                                <dt>订单号： {{item.ordername}}</dt>
                                <dt class="recharge_status">
                                    ￥{{item.price}}
                                </dt>
                            </dl>
                            <dl class="">
                                <dt>{{item.create_time}}</dt>
                                <dt class="recharge_status">
                                    <span class="recharge_CNY_status">{{item.status == 1 ? '未付款' : '已付款'}}</span>
                                </dt>
                            </dl>
                        </li>
                        <!-- <li class="transaction_box_list">
                            <dl class="">
                                <dt>充币地址 111111111</dt>
                            </dl>
                            <dl class="">
                                <dt>充币数量 2222222222 USDT</dt>
                                <dt class="recharge_status">
                                    状态 <span class="recharge_status1">充币中</span>
                                </dt>
                            </dl>
                            <dl class="">
                                <dt>充币时间 2018-12-12 08:08:08</dt>
                            </dl>
                        </li>
                        <li class="transaction_box_list">
                            <dl class="">
                                <dt>充币地址 111111111</dt>
                            </dl>
                            <dl class="">
                                <dt>充币数量 2222222222 USDT</dt>
                                <dt class="recharge_status">
                                    状态 <span class="recharge_status2">已到账</span>
                                </dt>
                            </dl>
                            <dl class="">
                                <dt>充币时间 2018-12-12 08:08:08</dt>
                            </dl>
                        </li>
                        <li class="transaction_box_list">
                            <dl class="">
                                <dt>充币地址 111111111</dt>
                            </dl>
                            <dl class="">
                                <dt>充币数量 2222222222 USDT</dt>
                                <dt class="recharge_status">
                                    状态 <span class="recharge_status1">充币失败</span>
                                </dt>
                            </dl>
                            <dl class="">
                                <dt>充币时间 2018-12-12 08:08:08</dt>
                            </dl>
                            <dl class="">
                                <span class="recharge_status1">充币未到账</span>
                            </dl>
                        </li>
                        <li class="transaction_box_list">
                            <dl class="">
                                <dt>订单号： 33333</dt>
                                <dt class="recharge_status">
                                    ￥888.00
                                </dt>
                            </dl>
                            <dl class="">
                                <dt>2018-12-12 08:08:08</dt>
                                <dt class="recharge_status">
                                    <span class="recharge_CNY_status">成功</span>
                                </dt>
                            </dl>
                        </li> -->
        			</ul>
					<div class="page-center">
						<Page :total="pageAmount*10" size="small" @on-change="getPayPage"/>
					</div>
        		</section>
        		<section class="transaction_box_two" v-else-if="tabtype == '2'">
        			<ul class="transaction_box_one_box">
        				<li class="transaction_box_list" v-for="(item,index) in putwayrecode" :key="index" v-if="moneyType != 'cny'">
        					<!-- <dl class="">
        						<dt>提现账号 {{item.address}}</dt>
        						<dt>提现数量 {{item.price}} CNY</dt>
        					</dl>
        					<dl class="">
        						<dt>提交时间 {{item.create_time}}</dt>
								<dt>审核时间 {{item.shenhe_time}}</dt>
        					</dl>
							<dl class="">
								<dt>提现状态 {{putStatus[index]}}</dt>
                                <dt v-if="item.reason">拒绝原因：{{item.reason}}</dt>
							</dl> -->
                            <p>提现账号 {{item.address}}</p>
                            <p>提现数量 {{Number(item.price).toFixed(2)}} CNY</p>
                            <p>提交时间 {{item.create_time}}</p>
                            <p>审核时间 {{item.shenhe_time}}</p>
                            <p>提现状态 {{putStatus[index]}}</p>
                            <p v-if="item.reason">拒绝原因：{{item.reason}}</p>
        				</li>
                        <li class="transaction_box_list" v-for="(item,index) in putwayrecode" :key="index" v-if="moneyType == 'cny'">
                            <!-- <dl class="">
                                <dt>提币地址 {{item.address}}</dt>
                                <dt>提币数量 {{item.price}} USDT</dt>
                            </dl>
                            <dl class="">
                                <dt>提交时间 {{item.create_time}}</dt>
                                <dt>审核时间 {{item.shenhe_time}}</dt>
                            </dl>
                            <dl class="">
                                <dt>提币状态 {{putStatus[index]}}</dt>
                                <dt v-if="item.reason">拒绝原因：{{item.reason}}</dt>
                            </dl> -->
                            <p>提币地址 {{item.address}}</p>
                            <p>提币数量 {{item.price}} USDT</p>
                            <p>提交时间 {{item.create_time}}</p>
                            <p>审核时间 {{item.shenhe_time}}</p>
                            <p>提币状态 {{putStatus[index]}}</p>
                            <p v-if="item.reason">拒绝原因：{{item.reason}}</p>
                        </li>
                        <!-- <li class="transaction_box_list">
                            <dl class="">
                                <dt>订单号： 33333</dt>
                                <dt class="recharge_status">
                                    ￥888.00
                                </dt>
                            </dl>
                            <dl class="">
                                <dt>2018-12-12 08:08:08</dt>
                                <dt class="recharge_status">
                                    <span class="recharge_CNY_status">成功</span>
                                </dt>
                            </dl>
                        </li> -->
        			</ul>
					<div class="page-center">
						<Page v-if="pageShowOr" :total="putAmount*10" size="small" @on-change="getPayPage"/>
						<div v-else>没有数据</div>
					</div>
        		</section>
        	</div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            return {
                paywayrecode:[],
				pageAmount:'',
                putwayrecode:[],
				putAmount:'',
				putStatus:[],
                pageShowOr:false,
                modal_loading: false,
                modal2:false,
                model1:"",
                formTop: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                tabtype:'1',
                moneyType: '',
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.moneyType = window.localStorage.currency
                if (_this.moneyType == 'cny') {
                    _this.getPayRecode('1');
                    _this.getPutRecode(1,'1');
                } else {
                    _this.getPayCNYRecode('1');
                    _this.getPutRecode(1,'3');
                }
                // _this.getPutRecode('1');
			},
        },
        methods: {
            getPayPage(argument){
                var _this = this;
                _this.moneyType = window.localStorage.currency;
                if(_this.moneyType=='cny'){
                    _this.getPayRecode(argument);
                    _this.getPutRecode(argument,'1');
                }else{
                    _this.getPayCNYRecode(argument);
                    _this.getPutRecode(argument,'3');
                }
            },
    	    getPayRecode(page){
    	        const _this = this;
    	        let _data = {
                    page:page,
                    size:10
				};
                _this.$http.post(_this.$http.paywayrecode,_data).then(function(response) {
					if(response.status == 200){
					    _this.paywayrecode = response.data.data.list;
					    _this.pageAmount = response.data.data.page_count?response.data.data.page_count:0.1;
					}
				})
			},
            getPayCNYRecode(page){
                const _this = this;
                let _data = {
                    page:page,
                    size:10
                };
                _this.$http.post(_this.$http.paywayrecodecny,_data).then(function(response) {
                    if(response.status == 200){
                        _this.paywayrecode = response.data.data.list;
                        _this.pageAmount = response.data.data.page_count;
                    }
                })
            },
            getPutRecode(page,pid){
                const _this = this;
                let _data = {
                    page:page,
                    size:10,
                    pid:pid
                };
                _this.$http.post(_this.$http.putwayrecode,_data).then(function(response) {
                    if(response.data.status == 200){
                        if(response.data.data.list.length>0){
                            _this.pageShowOr = true;
                            _this.putwayrecode = response.data.data.list;
                            _this.putAmount = response.data.data.page_count;
                            let dataList = response.data.data.list;
                            let statsArr = [];
                            for(let i = 0; i < dataList.length;i++){
                                let statasBrage;
                                if(dataList[i].status == 0){
                                    statasBrage = '待审核';
								}else if(dataList[i].status == 1){
                                    statasBrage = '已同意';
								}else{
                                    statasBrage = '已拒绝';
								}
                                statsArr.push(statasBrage);
							}
							_this.putStatus = statsArr;
						}else{
							_this.pageShowOr = false;
						}
                    };
                })
            },
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
        	},
            del(){
            	var _this = this;
            	_this.$emit('modifyfun');
            },
            tabtypefun(type){
            	var _this = this;
            	_this.tabtype = type;
            }
        },
        mounted(){}

    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/transaction/index.vue