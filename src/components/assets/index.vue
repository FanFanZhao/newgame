<template>
	<Modal v-model="modal2" @on-cancel="Callback()" width="400">
        <p slot="header">
            <span>我的资产</span>
        </p>
        <div class="assets_main">
        	<ul class="assets_box">
        		<li v-for="(item,index) in cityList" :key="index">
        			<dl class="assets_left">
                        <img :src="item.icon">
        				<dt class="assets_name"><p><i></i>{{item.value}}</p><h5></h5></dt>
                        <dt></dt>
                        <dt></dt>
        				<dt class="flex_1"><p>{{item.label}}</p></dt>
        			</dl>
        			<dl>
                        <span></span>
                        <div class="assets_div">
                            <dt class="div_1">
                                <!-- <p v-if="item.value1 == 'fb'" style=" pointer-events: none;cursor: default;opacity: 0.6;" class="trading_record">交易记录</p> -->
                                <p v-if="item.value1 != 'pb'" @click="Transaction(item.value1)" class="trading_record">交易记录</p>
                                <p @click="Accountflow(item.value1)" class="trading_flow">账户流水</p>
                                <p v-if="item.value1 == 'pb'"></p>
                            </dt>
                            <dt class="div_2">
                                <h2 @click="Recharge(item.value1)" v-if="item.value1 != 'pb'">充值</h2>
                                <h2 @click="Artificial(item.value1)" v-if="item.value1 == 'usdt'">人工充值</h2>
                                <h3 @click="Putforward(item.value1)" v-if="item.value1 != 'pb'">提现</h3>
                            </dt>
                        </div>
        			</dl>
        		</li>
        	</ul>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            return {
                cityList:[{
                    value: 'FB',
                    label: '0',
				    value1:'pb',
                    icon: require("../../assets/imgs/PB.png")
                },{
                    value: 'USDT',
                    label: '0',
                  	value1:'cny',
                    icon: require("../../assets/imgs/USDT.png")
                },{
                    value: 'CNY',
                    label: '0',
                    value1:'usdt',
                    icon: require("../../assets/imgs/CNY.png")
                }],
                modal2:false,
                hastpwdtype:false,
                hasPaymentType: false,
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.getdata();
                _this.Getpaymentmethod();
			},
        },
        methods: {
        	Callback(){
        		var _this = this;
                _this.modal2 = false;
        		_this.$emit('modifyfun');
        	},
            del(){
            	var _this = this;
            	_this.$emit('modifyfun');
            },
            Transaction(type){//交易记录
                var _this = this;
                _this.modal2 = false;
                window.localStorage.currency = type;
                _this.$emit('Otherfunctions',"6");
            },
            Accountflow(type){//账户流水
                var _this = this;
                _this.modal2 = false;
                window.localStorage.currency = type;
                _this.$emit('Otherfunctions',"7");
            },
            Recharge(type){//充值
                var _this = this;
                _this.modal2 = false;
                // window.localStorage.currency = type;
                switch (type) {
                    case 'cny':
                        _this.$emit('Otherfunctions',"8");
                        break;
                    case 'usdt':
                        _this.$emit('Otherfunctions',"21");
                        break;
                    default:
                        // statements_def
                        break;
                }
                
            },
            Putforward(type){//提现
                var _this = this;
                if(!_this.hastpwdtype){
                    _this.modal2 = false;
                    _this.$emit('Otherfunctions',"12");
                    return false;
				};
                _this.modal2 = false;
                // window.localStorage.currency = type;
                if (type == 'cny') {
                    _this.$emit('Otherfunctions',"9");
                } else {
                    if (!_this.hasPaymentType) {
                        _this.$Message.warning('您还没有设置支付方式，请设置支付方式');
                        setTimeout(function(){
                            _this.$emit('Otherfunctions',"23");
                        },1000)
                    }else{
                        _this.$emit('Otherfunctions',"22");
                    }
                    // _this.$emit('Otherfunctions',"22");
                }
                // switch (type) {
                //     case 'cny':
                //         _this.$emit('Otherfunctions',"9");
                //         break;
                //     case 'usdt':
                //         if (_this.hasPaymentType) {
                //             _this.$emit('Otherfunctions',"22");
                //         } else {
                //             _this.$emit('Otherfunctions',"23");
                //         }
                //         break;
                //     default:
                //         // statements_def
                //         break;
                // }
            },
            Getpaymentmethod(){//获取支付方式
                let _this = this;
                _this.$http.post(_this.$http.editpayway).then(function(response){
                  if(response.data.status == 200){
                    let bankcard = response.data.data.bankcard;
                    let alicard = response.data.data.alicard;
                    if (bankcard || alicard || wxcard) {
                        _this.hasPaymentType = true;
                    }
                  }
                })
            },
            getdata(){
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                if(account || token){
                    _this.$http.post(_this.$http.userinfo).then(function(response) {
                        if(response.data.status == "200") {
                            // _this.cityList = response.data;
                            window.localStorage.balance_pb = response.data.data.balance_pb;
                            window.localStorage.balance_cny = response.data.data.balance_cny;
                            window.localStorage.balance_usdt = response.data.data.balance_usdt;
                            _this.cityList[0].label = response.data.data.balance_pb;
                            _this.cityList[1].label = response.data.data.balance_cny;
                            _this.cityList[2].label = Number(response.data.data.balance_usdt).toFixed(2);
                            _this.hastpwdtype = response.data.data.has_tpwd;
                        }else if(response.data.status == "0"){
                            _this.cityList[0].label = 0;
                            _this.cityList[1].label = 0;
                            _this.cityList[2].label = 0;

						}
                    }).catch(function(error) {});
                };
            },
            Artificial(){
                var _this = this;
                _this.modal101 = true;
                _this.$emit('Otherfunctions',"101");
			},
        },
        mounted(){
        	var _this = this;
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/assets/index.vue