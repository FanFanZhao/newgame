<template>
	<Modal v-model="modal2" @on-cancel="Callback()" width="880">
        <p slot="header">
            <span>庄家奖池</span>
        </p>
        <div class="thebanker_main">
        	<div class="thebanker_header">
        		<Menu mode="horizontal" active-name="1">
			        <MenuItem name="1">
			            <p @click="tabtypefun('1')">主页</p>
			        </MenuItem>
			        <MenuItem name="2">
			            <p @click="tabtypefun('2')">坐庄</p>
			        </MenuItem>
			        <MenuItem name="3">
			            <p @click="tabtypefun('3')">历史</p>
			        </MenuItem>
			    </Menu>
        	</div>
        	<div class="thebanker_box">
        		<section class="thebanker_box_one" v-if="tabtype == '1'">
        			<div class="box_one_header">
        				<i-circle :percent="15+$public.Division($public.Multiplication(List.scale,'100'),'1.45')" :size="250" :trail-width="4" :stroke-width="5" trail-color="#7d350e" stroke-color="#f6eca1" dashboard>
					        <div class="demo-Circle-custom">
                                <h1 v-if="$public.Multiplication(List.scale,'100')">{{$public.Multiplication(List.scale,'100').toFixed("3")}}%</h1>
					            <h1 v-else>0.00%</h1>
								<p>您的股份</p>
					        </div>
					    </i-circle>
        			</div>
        			<ul class="box_one_mian">
	        			<li class="box_one_mian_list">
	        				<div class="box_one_mian_list_left">
	        					<i></i>
	        				</div>
	        				<div class="box_one_mian_list_right">
                                <h2 v-if="balancename=='CNY'">{{Number(List.bank_money).toFixed(2)}}{{balancename}}</h2>
	        					<h2 v-if="balancename!='CNY'">{{List.bank_money}}{{balancename}}</h2>
	        					<p>您的坐庄资金</p>
	        				</div>
	        			</li>
	        			<li class="box_one_mian_list">
	        				<div class="box_one_mian_list_left">
	        					<i></i>
	        				</div>
	        				<div class="box_one_mian_list_right">
                                <h2 v-if="balancename!='CNY'">{{List.bank_money_total}}{{balancename}}</h2>
                                <h2 v-if="balancename=='CNY'">{{Number(List.bank_money_total).toFixed(2)}}{{balancename}}</h2>
	        					<!-- <h2>{{List.bank_money_total}}{{balancename}}</h2> -->
	        					<p>庄家奖池资金</p>
	        				</div>
	        			</li>
	        			<li class="box_one_mian_list">
	        				<div class="box_one_mian_list_left">
	        					<i></i>
	        				</div>
	        				<div class="box_one_mian_list_right">
	        					<h2 v-if="balancename=='CNY'">{{Number(List.bank_money_lirun).toFixed(2)}}{{balancename}}</h2>
                                <h2 v-if="balancename!='CNY'">{{List.bank_money_lirun}}{{balancename}}</h2>
	        					<p>您的坐庄利润</p>
	        				</div>
	        			</li>
	        			<li class="box_one_mian_list">
	        				<div class="box_one_mian_list_left">
	        					<i></i>
	        				</div>
	        				<div class="box_one_mian_list_right">
	        					<h2 v-if="balancename=='CNY'">{{Number(List.bank_money_lirun_total).toFixed(2)}}{{balancename}}</h2>
                                <h2 v-if="balancename!='CNY'">{{List.bank_money_lirun_total}}{{balancename}}</h2>
	        					<p>庄家奖池利润</p>
	        				</div>
	        			</li>
	        		</ul>
	        		<h2 class="thebanker_box_one_footer">
                        <a href="javascript:void(0)" @click="Gameintroduction">
                            <img src="../../assets/imgs/more.png" alt="">更多奖池的信息，请点击这里！         
                        </a>
                    </h2>
        		</section>
        		<section class="thebanker_box_two" v-else-if="tabtype == '2'">
        			<div class="box_two_header">
        				<dl class="box_two_header_header">
        					<dt><i></i>注入请填写 <span>正值</span> ，抽取请填写 <span>负值</span> ，请保证额度在您的承受范围内。</dt>
        					<dt><i></i>注入金额的 <span>2%</span> ，将作为不可退还的股份稀释费扣除（其他庄家瓜分稀释费）， 此费用将从您的资金中扣除。</dt>
        				</dl>
        				<p class="header_footer">您钱包余额：<span v-if="balancename!='CNY'">{{balance}}</span><span v-else>{{Number(balance).toFixed(2)}}</span> {{balancename}}</p>
        				<Form :model="formTop" inline>
					        <FormItem>
					            <Input v-model="formTop.input1" placeholder="金额">
					            	<span slot="append">{{balancename}}</span>
					            </Input>
					        </FormItem>
					        <FormItem>
					            <Button type="primary" :loading="modal_loading" @click="TheBets()">注入/抽取</Button>
					        </FormItem>
					    </Form>
        			</div>
        			<div class="box_two_main">
        				<ul class="box_one_mian">
		        			<li class="box_one_mian_list">
		        				<div class="box_one_mian_list_left">
		        					<i></i>
		        				</div>
		        				<div class="box_one_mian_list_right">
                                    <h2 v-if="$public.Multiplication(List.scale,'100')">{{$public.Multiplication(List.scale,'100').toFixed("2")}}%</h2>
		        					<h2 v-else>0.00%</h2>
		        					<p>您的当前股份</p>
		        				</div>
		        			</li>
		        			<li class="box_one_mian_list">
		        				<div class="box_one_mian_list_left">
		        					<i></i>
		        				</div>
		        				<div class="box_one_mian_list_right">
		        					<h2>{{stockright.Shares}}%</h2>
		        					<p>预计注入/抽取后您的股份</p>
		        				</div>
		        			</li>
		        			<li class="box_one_mian_list">
		        				<div class="box_one_mian_list_left">
		        					<i></i>
		        				</div>
		        				<div class="box_one_mian_list_right">
                                    <h2 v-if="balancename!='CNY'">{{List.bank_money}} {{balancename}}</h2>
		        					<h2 v-if="balancename=='CNY'">{{Number(List.bank_money).toFixed(2)}} {{balancename}}</h2>
		        					<p>您的当前坐庄资金</p>
		        				</div>
		        			</li>
		        			<li class="box_one_mian_list">
		        				<div class="box_one_mian_list_left">
		        					<i></i>
		        				</div>
		        				<div class="box_one_mian_list_right">
                                    <h2 v-if="balancename!='CNY'">{{stockright.capital}}{{balancename}}</h2>
		        					<h2 v-else>{{Number(stockright.capital).toFixed(2)}}{{balancename}}</h2>
		        					<p>预计注入/抽取后您的坐庄资金</p>
		        				</div>
		        			</li>
		        			<li class="box_one_mian_list">
		        				<div class="box_one_mian_list_left">
		        					<i></i>
		        				</div>
		        				<div class="box_one_mian_list_right">
                                    <h2 v-if="balancename!='CNY'">{{stockright.Dilutionfee}}{{balancename}}</h2>
		        					<h2 v-else>{{Number(stockright.Dilutionfee).toFixed(2)}}{{balancename}}</h2>
		        					<p>股份稀释费</p>
		        				</div>
		        			</li>
		        		</ul>
        			</div>
        			<h2 class="thebanker_box_one_footer">请尽可能多的填写金额！</h2>
        		</section>
        		<section class="thebanker_box_three" v-else>
        			<ul class="three_box_main">
        				<li class="three_box_list_header">
        					<p class="one">状态</p>
        					<p class="two">金额</p>
        					<p class="three">时间</p>
        				</li>
        				<li class="three_box_list" v-for="(item,index) in cityList.list" :key="index">
        					<p class="one green" v-if="item.type == '1'">注入</p>
                            <p class="one green" v-else-if="item.type == '4'">奖池奖励</p>
                            <p class="one gules" v-else-if="item.type == '5'">提取</p>
                            <p class="one gules" v-else>其它</p>
        					<p class="two green" v-if="item.type == '1'">{{balancename=='CNY'?Number(item.money).toFixed(2):item.money}}{{balancename}}</p>
                            <p class="two green" v-else-if="item.type == '4'">{{balancename=='CNY'?Number(item.money).toFixed(2):item.money}}{{balancename}}</p>
                            <p class="two gules" v-else-if="item.type == '5'">{{balancename=='CNY'?Number(item.money).toFixed(2):item.money}}{{balancename}}</p>
                            <p class="two gules" v-else>{{balancename=='CNY'?Number(item.money).toFixed(2):item.money}}{{balancename}}</p>
        					<p class="three">{{$public.formatDateTime(item.add_time)}}</p>
        				</li>
                        <li class="record_list_footer">
                            <Page :total="cityList.count_page" size="small" @on-change="TheHistory"/>
                        </li>
        			</ul>
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
                cityList:[],
                List:[],
                modal_loading: false,
                modal2:false,
                model1:"",
                formTop: {
                    input1: '',
                },
                tabtype:'1',
                balance:"",
                balancename:"",
                stockright:{
                    Shares:"0",
                    capital:"0",
                    Dilutionfee:"0",
                },
                commondata:'',
            }
        },
        // （输入值+原有）/（输入值+奖池总值）
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
				_this.getdata();
                _this.TheHistory('1');
			},
            'formTop.input1':function(val,oval){
                var _this = this;
                let timestamp = setTimeout(function() {
                    val = _this.balanceFormat(val);
                    _this.formTop.input1 = val;
                    if((val != '') && !isNaN(val)){
                        let bank_money = _this.$public.Addition(_this.List.bank_money,val)
                        let bank_money_total = _this.$public.Addition(_this.List.bank_money_total,val)
                        if (bank_money_total == 0) {
                            return false; // 除数等0 不能进行除法运算
                        }
                        if(val > 0){
                            _this.stockright.Shares = (_this.$public.Division(bank_money,bank_money_total)*100).toFixed("2");
                        }else {
                            if((Number(val)+Number(_this.List.bank_money))<0){
                                return false;
                            }
                            _this.stockright.Shares = (_this.$public.Division(bank_money,bank_money_total)*100).toFixed("2");
                        };
                        _this.stockright.Dilutionfee = _this.$public.Division(_this.$public.Multiplication(val,_this.commondata),'100');
                        _this.stockright.capital = _this.$public.Subtraction(val,_this.stockright.Dilutionfee);

                    }else {
                        _this.stockright.Shares = "0";
                        _this.stockright.capital = "0";
                        _this.stockright.Dilutionfee = "0";
                    }
                    clearTimeout(timestamp);
                });
            },
        },
        methods: {
        	Callback(){
        		var _this = this;
                _this.formTop.input1 = "";
                _this.stockright.Shares = "0";
                _this.stockright.capital = "0";
                _this.stockright.Dilutionfee = "0";
        		_this.$emit('modifyfun');
        	},
            // 注入抽取金额限制
            balanceFormat (val) {
                let _this = this;
                let value = "";
                let valArray = val.split(".");
                if (valArray[0].length > 15) {
                    value = value + valArray[0].substring(0, 15);
                } else {
                    value = value + val;
                }
                if (valArray[1] && valArray[1].length > 4) {
                    value = String(val).slice(0, String(val).indexOf('.') + 5);
                }
                return value;
            },
            del(){
            	var _this = this;
                _this.formTop.input1 = "";
                _this.stockright.Shares = "0";
                _this.stockright.capital = "0";
                _this.stockright.Dilutionfee = "0";
            	_this.$emit('modifyfun');
            },
            Gameintroduction(){
                var _this = this;
                _this.modal2 = false;
                this.$router.push({//你需要接受路由的参数再跳转
                    path: "faq"
                });
                _this.$emit('modifyfun');
            },
            tabtypefun(type){
            	var _this = this;
            	_this.tabtype = type;
            	switch (type) {
            		case "1":
            			_this.getdata();
            			break;
            		case "2":
            			// _this.Thevillage();
            			break;
            		case "3":
            			_this.TheHistory('1');
            			break;
            		default:
            			// statements_def
            			break;
            	}
            },
            getdata(){//主页数据
            	var _this = this;
                _this.List.scale = 100;
            	switch (localStorage.Currencytype) {
					case "fb":
						_this.balance = localStorage.balance_pb;
						_this.balancename = 'FB';
						break;
					case "cny":
						_this.balance = localStorage.balance_cny;
						_this.balancename = 'USDT';
						break;
                    case "usdt":
                        _this.balance = localStorage.balance_usdt;
                        _this.balancename = 'CNY';
                        break;
					default:
						// statements_def
						break;
				}
            	var _data = {
            		money_type: _this.fbTopb(localStorage.Currencytype),
            	};
            	_this.$http.post(_this.$http.Bankerpool,_data).then(function(response) {
					if(response.data.status == "200") {
						_this.List = response.data.data;
					};
				}).catch(function(error) {});


                _this.$http.post(_this.$http.commondata).then(function(response) {
                    if(response.data.status == "200") {
                        _this.commondata = response.data.data.buy_info.xishi_rate.xishi_rate;
                    };
                }).catch(function(error) {});
            },
            TheHistory(argument){//坐庄历史
            	var _this = this;
            	var _data = {
            		money_type: _this.fbTopb(localStorage.Currencytype),
                    page:argument,size:"15"
            	};
            	_this.$http.post(_this.$http.Bankerhistory,_data).then(function(response) {
					if(response.data.status == "200") {
						_this.cityList = response.data.data;
					};
				}).catch(function(error) {});
            },
            // fb 参数转换 pb
            fbTopb (type) {
                switch (type) {
                    case "fb":
                        return "pb";
                        break;
                    default:
                        return type;
                        break;
                }
            },
            TheBets(){//庄家注入和提取
            	var _this = this;
            	if(!_this.formTop.input1){
            		 _this.$Message.warning('注入/抽取金额不为空！');
            		 return false;
            	};
            	if(isNaN(_this.formTop.input1)){
            		 _this.$Message.warning('注入/抽取金额应该为数字类型！');
            		 return false;
            	};
            	if(_this.formTop.input1.split('.').length > 1){
            		if(_this.formTop.input1.split('.')[1].length > 4){
            			_this.$Message.warning('注入/抽取金额小数点应该为四位！');
            		 	return false;
            		}
            	};
            	var _data = {
            		type: _this.fbTopb(localStorage.Currencytype),
            		money:_this.formTop.input1
            	};
                
            	_this.$http.post(_this.$http.bankoppost,_data).then(function(response) {
					if(response.data.status == "200") {
						_this.$Message.success("注入/抽取金额成功!");
                        _this.formTop.input1 = "";
                        _this.stockright.Shares = "0";
                        _this.stockright.capital = "0";
                        _this.stockright.Dilutionfee = "0";
						_this.$emit('modifyfun');
					}else {
                        _this.$Message.warning(response.data.msg);        
                    }
				}).catch(function(error) {});
            },
        },
        mounted(){
        	var _this = this;
        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
    // @import './indexmove.less';
</style>

