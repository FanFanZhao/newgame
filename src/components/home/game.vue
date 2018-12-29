<style type="text/css">

</style>
<template>
	<div>
		<div class="index_heaer_header">
			<ul class="index_heaer_headernav">
                <li class="index_heaer_headernavon">
                    <router-link to="allguessing">
                        <img src="../../assets/imgs/quiz.png">
                        <p>竞猜</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="faq">
                        <img src="../../assets/imgs/question1.png">
                        <p>FAQ</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="ranklist">
                        <img src="../../assets/imgs/Leaderboard.png">
                        <p>排行榜</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="download">
                        <img src="../../assets/imgs/download.png">
                        <p>APP</p>
                    </router-link>
                </li>
                <li >
                    <router-link to="faq?tofair&id=3">
                        <i class="icon_fair"></i>
                        <p>公平</p>
                    </router-link>
                </li>
            </ul>
		</div>
		<ul class="index_header">
			<li class="index_header_one">
			    <Dropdown trigger="click" style="margin-left: 20px">
			        <a href="javascript:void(0)">
			            <p>
			            	<i class="icon_pb" v-if="cityListtype.value == 'fb'"></i>
			            	<i class="icon_cny" v-else-if="cityListtype.value == 'cny'"></i>
		            		<i class="icon_usdt" v-else></i>
			            	{{cityListtype.value=='usdt'?parseFloat(cityListtype.label).toFixed(2)+'CNY':cityListtype.label}}
			            </p>
			            <Icon type="ios-arrow-down"></Icon>
			        </a>
			        <DropdownMenu slot="list">
			            <DropdownItem v-for="(item,index) in cityList" :key="index">
			            	<h2 @click="Currencystate(item.label,item.value)">
			            		<i class="icon_pb" v-if="item.value == 'fb'"></i>
			            		<i class="icon_cny" v-else-if="item.value == 'cny'"></i>
			            		<i class="icon_usdt" v-else></i>
			            		{{ item.value=='usdt'?parseFloat(item.label).toFixed(2)+'CNY':item.label }}
			            	</h2>
			            </DropdownItem>
			        </DropdownMenu>
			    </Dropdown>
			</li>
			<li class="index_header_two" @click="walletdisplay">
				<!-- <Icon type="md-card"></Icon> -->
				<i class="icon_moneyDai"></i>
				<p>钱包</p>
			</li>
			<li class="index_header_three">
				<i class="icon_notice"></i>
				<a :href="noticelistpost.link" v-if="noticelistpost.link && noticelistpost.type">
					<p>{{noticelistpost.notice_title}}</p>
				</a>
				<a :href="noticelistpost.link" v-else-if="noticelistpost.link" target="_blank">
					<p>{{noticelistpost.notice_title}}</p>
				</a>
				<a href="javascript:;" v-else>
					<p>{{noticelistpost.notice_title}}</p>
				</a>
			</li>
		</ul>
		<div class="gamerecord_main">
			<ul class="gamerecord_box">
				<li class="gamerecord_box_list" v-for="(item,index) in list.list" :key="index" v-if="index < 10">
					<p class="gamerecord_header">
						<i class="icon_Floret"></i>
						<span>{{item.periodID}}</span>
					</p>
					<p class="gamerecord_footer">{{item.boomValue}}X</p>
				</li>
			</ul>
		</div>
		<div class="game">
			<div class="game_box">
				<div class="Thebanker" @click="Thebankerbut">
					<div class="Thebanker_img"></div>
					<p class="Thebanker_text">奖池：
					<span class="jiangci">{{currencynum}} {{currency}}</span>
					</p>
				</div>
				<div class="Underline">
					<div id="myCanvas" ></div>
					<div class="Jackpot">
						<p class="multiple" style="display: none;"></p>
						<p class="explosion" style="display: none;"></p>
						<p class="Countdown" style="display: none;"></p>
					</div>
					<div class="Gobeyond" style="display: none;"></div>
					<div class="barrage-container-wrap clearfix">
					    <div class="barrage-container"></div> 
					</div>
					<div class="Burstanimation" style="display: none;">
						<div></div>
					</div>
				</div>
			</div>
			<div class="game_main">
				<div v-if="Loginstate">
					<div v-if="Purchasestatus">
						<div class="betsbutton game_betsbutton1" v-if="Singlestate">投注</div>
						<div class="betsbutton game_betsbutton" @click="buttonescape()" v-else>逃跑</div>
					</div>
					<div v-else>
						<div class="betsbutton game_betsbutton" @click="buttonBets()" v-if="Singlestate">投注</div>
						<div class="betsbutton game_betsbutton1" v-else>逃跑</div>
					</div>
				</div>
				<div v-else>
					<div class="betsbutton game_betsbutton1" @click="Login()" v-if="Singlestate">投注</div>
					<div class="betsbutton game_betsbutton1" @click="Login()" v-else>逃跑</div>
				</div>

				<ul class="game_Bets">
					<li class="game_Bets_left">
						<Form :model="formItem" :label-width="80">
					        <FormItem label="投注">
					            <Input v-model="formItem.money" @on-blur="earnings"></Input>
					        </FormItem>
					        <FormItem>
					            <div class="but_dian">
					            	<Button @click="Doubling('max')">Max</Button>
						            <Button @click="Doubling('min')">Min</Button>
						            <Button @click="Doubling('/2')">/2</Button>
						            <Button @click="Doubling('x2')">x2</Button>
					            </div>
					        </FormItem>
					    </Form>
					</li>
					<li class="game_Bets_right">
						<Form :model="formItem" :label-width="80">
					        <FormItem label="自动逃跑">
					            <Input v-model="formItem.escape_beishu" @on-blur="chance">
					            	<span slot="append">X</span>
					            </Input>
					        </FormItem>
					        <FormItem>
					            <div class="right_box">
					            	<p>收益：<span>{{Opportunity.a}}</span></p>
					            	<p>机会：<span>{{Opportunity.b}}%</span></p>
					            </div>
					        </FormItem>
					    </Form>
					</li>
				</ul>
				<ul class="game_Bets_move">
					<li class="game_Bets_left">
						<Form :model="formItem" label-position="top" inline>
					        <FormItem label="投注">
					            <Input v-model="formItem.money" @on-blur="earnings"></Input>
					        </FormItem>
					        <FormItem label="自动逃跑">
					        	<Input v-model="formItem.escape_beishu" @on-blur="chance">
					            	<span slot="append">X</span>
					            </Input>
					        </FormItem>
					    </Form>
					</li>
					<li class="game_Bets_left">
						<h2 class="game_but" @click="Doubling('max')">Max</h2>
						<h2 class="game_but" @click="Doubling('min')">Min</h2>
						<h2 class="game_but" @click="Doubling('/2')">/2</h2>
						<h2 class="game_but" @click="Doubling('x2')">X2</h2>
					</li>
					<li class="game_Bets_left">
						<p>收益：<span>{{Opportunity.a}}</span></p>
						<p>机会：<span>{{Opportunity.b}}%</span></p>
					</li>
				</ul>
			</div>
		</div>
		<div id="petalbox"></div>
	</div>

</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    money: '1',
                    escape_beishu:"100"
                },
                MainData:"",
                currencyinfozhong:{},//购买限制条件
                Singlestate:true,
                Underline:"0",
                currency:"",
                currencynum:"0",
                cityList: [{
                    value: 'fb',
                    label: '0.000000FB'
                },{
                    value: 'cny',
                    label: '0.00000USDT'
                },{
                    value: 'usdt',
                    label: '0.00CNY'
                }],
                cityListtype:{
                	value: 'fb',
                    label: '0.000000FB'
                },
                model1: 'fb',
                list:[],
	            Opportunity:{
	            	a:"100",
	            	b:"100",
	            },
	            echartsdata:[[0,1]],
	            myChart:"",
	            escapelist:[],
	            TaoChronicle:'',
	            Pushstate:true,//判断推送状态
	            Purchasestatus:false,//判断购买状态
	            noticelistpost:{
	            	type:true,
	            	link:"#",
	            	notice_title:"",
	            },//公告列表
	            Loginstate:false,//登录状态
	            isopen:true,//判断当前页面是否是去焦点
            }
        },
        watch:{
        	'model1':function(val,oval){
        		var _this = this;
        		window.localStorage.Currencytype = val;
        		switch (val) {
					case 'fb':
						_this.currency = "FB";
						_this.formItem.money = _this.currencyinfozhong.pb_buy_min_money;
                    	_this.formItem.escape_beishu = _this.currencyinfozhong.pb_escape_beishu;
						break;
					case 'cny':
						_this.currency = "USDT";
						_this.formItem.money = _this.currencyinfozhong.cny_buy_min_money;
                    	_this.formItem.escape_beishu = _this.currencyinfozhong.cny_escape_beishu;
						break;
					case 'usdt':
						_this.currency = "CNY";
						_this.formItem.money = _this.currencyinfozhong.usdt_buy_min_money;
                    	_this.formItem.escape_beishu = _this.currencyinfozhong.usdt_escape_beishu;
						break;
					default:
						// statements_def
						break;
				};
        	},
        },
        methods:{
        	Login(){//去登录
        		var _this = this;
        		_this.$emit('subsidiary','11');
            	localStorage.clear();
            	return false;
        	},
        	buttonBets(){//下注
        		var _this = this;
        		let account =  localStorage.account;
                let token = localStorage.token;
                if(!account || !token){
                	_this.$emit('subsidiary','11');
                	localStorage.clear();
                	return false;
                };
                if(!_this.formItem.money){
                	_this.$Message.warning("竞猜数不能为空！");
                	return false;
                };
                if(isNaN(_this.formItem.money)){
                	_this.$Message.warning("竞猜数应该为数字类型！");
                	return false;
                };
                if(_this.formItem.money%1 != 0){
                	_this.$Message.warning("竞猜数应该为整数！");
                	return false;
                };
                if(_this.formItem.escape_beishu){
                	if(isNaN(_this.formItem.escape_beishu)){
	                	_this.$Message.warning("自动逃跑数应该为数字类型！");
	                	return false;
	                };
	                if(_this.formItem.escape_beishu.toString().split(".").length > "1"){
	                	if(_this.formItem.escape_beishu.toString().split(".")[1].length  > "2"){
	                		_this.$Message.warning("自动逃跑数应该为小数位两位数！");
	                		return false;
	                	}
	                }
                };
        		let _data = {
        			type:_this.model1=='fb'?'pb':_this.model1,
        			money:_this.formItem.money,
        			escape_beishu:_this.formItem.escape_beishu,
        		};
        		_this.$http.post(_this.$http.orderaddpost,_data).then(function(response) {
					if(response.data.status == "200") {
						_this.$Message.success("投注成功");
						_this.getdata();
						_this.Purchasestatus = true;
					} else {
						_this.$Message.warning(response.data.msg);
					}
				}).catch(function(error) {});
        	},
        	buttonescape(){//逃跑
        		var _this = this;
        		let account =  localStorage.account;
                let token = localStorage.token;
                if(!account || !token){
                	_this.$emit('subsidiary','11');
                	localStorage.clear();
                	return false;
                };
        		_this.$http.post(_this.$http.orderescapepost).then(function(response) {
					if(response.data.status == "200") {
						_this.$Message.success("逃跑成功");
						_this.Purchasestatus = false;
					} else {
						_this.$Message.warning(response.data.msg);
					}
				}).catch(function(error) {});
        	},
			MainDatapushh() {//Highcharts推送
				var connet = this,explosiontime = 0,explosiontimetype = 0,multipletime = 6000,multipletimetype,k,timex,timey,Explosioneffecttype = true,Multipletype;
				var multiple = $(".Jackpot .multiple")[0];
				var explosion = $(".Jackpot .explosion")[0];
				var Countdown = $(".Jackpot .Countdown")[0];
				var escape = $(".Underline .escape")[0];
				var Gobeyond = $('.Gobeyond')[0];
				var Burstanimation = $('.Burstanimation')[0];
				var percent1 = 0,percent2;
				// 首先判断是否 支持 WebSocket
				if('WebSocket' in window) {
					connet.MainData = new WebSocket(connet.$http.secrurl);
				} else if('MozWebSocket' in window) {
					connet.MainData = new MozWebSocket(connet.$http.secrurl);
				} else {
					connet.MainData = new SockJS(connet.$http.secrurl);
				}
				// 打开时
				connet.MainData.onopen = function(evnt) {
					var msg = {
						op: "look"
					};
					// 发送消息
					connet.MainData.send(JSON.stringify(msg));
				};

				// 处理消息时
				connet.MainData.onmessage = function(evnt) {
					var datanum = JSON.parse(evnt.data);
					switch (datanum.status) {
						case 1://游戏开始倒计时
							connet.echartsdata = [[0,1]];
							explosiontime = 0;
							multipletime = datanum.data[0].prepare.st-datanum.back_time;
							connet.Pushstate = false;
							Countdown.style.display = "block";
							multiple.style.display = "none";
							explosion.style.display = "none";
							Gobeyond.style.display = "none";
							connet.Singlestate = true;
							switch (connet.model1) {
								case 'fb':
									connet.currency = "FB";
									connet.currencynum = datanum.data[0].prepare.start_pb_pool_money;
									break;
								case 'cny':
									connet.currency = "USDT";
									connet.currencynum = datanum.data[0].prepare.start_cny_pool_money;
									break;
								case 'usdt':
									connet.currency = "CNY";
									connet.currencynum = Number(datanum.data[0].prepare.start_usdt_pool_money).toFixed(2);
									break;
								default:

									break;
							};
							break;
						case 2://游戏中划线
							if(datanum.data[0].process.e<600){
						 		connet.Historicalrecords();
						 		connet.$emit('refreshList');
						 		connet.myChart.xAxis[0].setExtremes(0, 10 ,true ,true );
								connet.myChart.yAxis[0].setExtremes(1, 2 ,true ,true );
						 		connet.myChart.update({
							        series: [{
							        	data: [[0,1]]
							    	}]
							    });
							    explosiontimetype = 300;
						 	};
						 	explosiontime = datanum.data[0].process.e;
						 	var arrayshuju = [[0,1]];
						 	if(connet.Singlestate){
						 		k = 0;
						 		while (k < datanum.data[0].process.e) {
						 			k+=300;
						 			arrayshuju.push([k/1000, Number(getbeishu(k))]);
						 		};
						 		connet.myChart.update({
							        series: [{
							        	data: arrayshuju,
							    	}]
							    })
						 	};

						 	
					 		timex = (datanum.data[0].process.e/1000).toFixed('4');
							timey = Number(getbeishu(datanum.data[0].process.e)).toFixed('2');
							if (connet.isopen) {
								setTimeout(function () {
									// 一下是消耗内存最严重的地方，大量数据绘图，会导致页面卡死
									if (timex > 10) {
										connet.myChart.xAxis[0].setExtremes(0, timex ,true ,true );
									};
									if(timey > 2){
										connet.myChart.yAxis[0].setExtremes(1, Math.ceil(timey) ,true ,true );
									};
									connet.myChart.series[0].addPoint([Number(timex), Number(timey)]);
								}, 50)
							}
					 		switch (connet.model1) {
								case 'fb':
									connet.currency = "FB";
									connet.currencynum = datanum.data[0].process.start_pb_pool_money;
									break;
								case 'cny':
									connet.currency = "USDT";
									connet.currencynum = datanum.data[0].process.start_cny_pool_money;
									break;
								case 'usdt':
									connet.currency = "CNY";
									connet.currencynum = Number(datanum.data[0].process.start_usdt_pool_money).toFixed(2);
									break;
								default:

									break;
							};
							if(timey > 100){
								Gobeyond.style.display = "block";
							};
					 		connet.Pushstate = true;
						    multiple.style.display = "block";
							explosion.style.display = "none";
							Countdown.style.display = "none";
							connet.Singlestate = false;
							Explosioneffecttype = true;
							for (var i = 0; i < datanum.data[2].escape_list.length; i++) {
								connet.$barrage.Method(datanum.data[2].escape_list[i].realname+" @ "+datanum.data[2].escape_list[i].final_beishu)
							};
							break;
						case 3://游戏结束爆炸
							timex = datanum.data[0].crash.e;
							timey = getbeishu(datanum.data[0].crash.e);
							connet.Pushstate = false;
							connet.Purchasestatus = false;

						    switch (connet.model1) {
								case 'fb':
									connet.currency = "FB";
									connet.currencynum = datanum.data[0].crash.start_pb_pool_money;
									break;
								case 'cny':
									connet.currency = "USDT";
									connet.currencynum = datanum.data[0].crash.start_cny_pool_money;
									break;
								case 'usdt':
									connet.currency = "CNY";
									connet.currencynum = Number(datanum.data[0].crash.start_usdt_pool_money).toFixed(2);
									break;
								default:
									break;
							};
							if(Explosioneffecttype){
								connet.$explosioneffect.effect();
								window.setTimeout(function(){
									connet.getdata();
								},3000);
							};
							Explosioneffecttype = false;
						    explosion.style.display = "block";
						    explosion.innerHTML = '爆炸了<span>'+ datanum.data[0].crash.boomValue +'X</span>';
							multiple.style.display = "none";
							Countdown.style.display = "none";
							Gobeyond.style.display = "none";
							connet.Singlestate = false;
							break;
						default:
							// statements_def
							break;
					};
				};


				connet.MainData.addEventListener('open',function(event){
					switch (connet.MainData.readyState) {
						case 0://表示正在连接
							Countdown.style.display = "block";
							Countdown.innerHTML = '正在连接';
							multiple.style.display = "none";
							explosion.style.display = "none";
							break;
						case 1://表示连接成功，可以通信
							if (connet.isopen) { // 当切换到后台，不在进行创建图表
								connet.drawLineHigh();
								connet.TaoChronicle = window.setInterval(function(){
									if(connet.Singlestate){
										multipletime = multipletime - 40;
										if(multipletime > 0){
											Countdown.innerHTML = '游戏即将开始'+ connet.$public.toDecimal2((multipletime)/1000) +'s';
										}else {
											Countdown.innerHTML = '游戏即将开始00s';
											if (connet.myChart.series) {
												connet.myChart.series[0].setData([0,1]);
												connet.myChart.series[0].addPoint([0, 1]);
											}
										}
									}else {
										if(connet.Pushstate){
											if (explosiontime < "4000") {
												explosiontime +=40;
											} else if (explosiontime < "8000") {
												explosiontime +=30;
											}else {
												explosiontime +=20;
											}
											
											Multipletype = Number(getbeishu(explosiontime)).toFixed("2");
											if(Multipletype > Number(connet.formItem.escape_beishu)){
												if(connet.Purchasestatus){
													connet.Pushstate = false;
													connet.Purchasestatus = false;
												};
											};
											multiple.innerHTML = Multipletype +'X';
										};
									};
								},40);
							}
							break;
						case 2://表示连接正在关闭
							Countdown.style.display = "block";
							Countdown.innerHTML = '连接失败';
							multiple.style.display = "none";
							explosion.style.display = "none";
							clearInterval(connet.TaoChronicle);
							break;
						case 3://表示连接已经关闭，或者打开连接失败
							Countdown.style.display = "block";
							Countdown.innerHTML = '连接已经关闭';
							multiple.style.display = "none";
							explosion.style.display = "none";
							clearInterval(connet.TaoChronicle);
							break;
						default:
							// statements_def
							break;
					};
				})

				connet.MainData.onerror = function(evnt) {
					console.log("  websocket.onerror");
				};
				connet.MainData.onclose = function(evnt) {
					console.log("  websocket.onclose");
					Countdown.style.display = "block";
					Countdown.innerHTML = '连接已经关闭';
					multiple.style.display = "none";
					explosion.style.display = "none";
					clearInterval(connet.TaoChronicle);
					switch (connet.$route.path) {
						case '/home/allguessing':
							if(connet.isopen){
								connet.MainDatapushh();
							}
							break;
		                case '/home/myguessing':
		                    if(connet.isopen){
								connet.MainDatapushh();
							}
		                    break;
		                case '/home/history':
		                    if(connet.isopen){
								connet.MainDatapushh();
							}
		                    break;
						default:
						    break;
		            }
				};
			  	function getbeishu(x){
				   	var a = 1.0716; //需要和workman配置一致
				  	x = x/1000;
				  	var y = Math.pow(a,x);
				  	y = y.toFixed('2');
				  	if(y<1.01){
				    	y=1.01;
				  	};
				  	return y;
				};
			},
			drawLine(){
				var _this = this;
				_this.myChart = this.$echarts.init(document.getElementById('myCanvas'));
				_this.myChart.setOption({
				    xAxis: {
				        type: 'value',
				        splitLine: {
				            show: false
				        },
				        minInterval: 1,
				        min:0,
				  //       max: function(value) {
						//     console.log(value);
						//     return value.max-value.max*0.5;
						// },
				        axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#10a7ad',//左边线的颜色
		                        width:'2'//坐标线的宽度
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#10a7ad',//坐标值得具体的颜色

		                    }
		                }
				    },
				    yAxis: {
				        type: 'value',
				        splitLine: {
				            show: false
				        },
				        min:1,
					 //  	max: function(value) {
						//     console.log(value);
						//     return value.max-value.max*0.5;
						// },
				        minInterval: 1,
				        axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#10a7ad',//左边线的颜色
		                        width:'2'//坐标线的宽度
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#10a7ad',//坐标值得具体的颜色

		                    }
		                }
				    },
				    series: [{
				        type: 'line',
				        showSymbol: false,
				        hoverAnimation: false,
				        data: _this.echartsdata,
				        lineStyle: {
			                color: "#10a7ad"
			            }
				    }],
				});
				window.onresize=function(){
	                 _this.myChart.resize();
	            }
			},
			drawLineHigh(){//Highcharts绘图
				var _this = this;
				var _data = [[0,1]];
				Highcharts.setOptions({
					global : {
						useUTC : false
					}
				});
				var options = {
						chart : {
							type: 'spline',
							backgroundColor: 'rgba(0,0,0,0)',
							plotBackgroundImage: require('../../assets/imgs/Foldlinediagram.png'),
							events : {
								load : function () {},
							},
						},
						rangeSelector: {
							selected: 0
						},
						title : {
							text:null,
							useHTML:true,
						},
						tooltip: {
							enabled: false
						},
						exporting: {
							enabled: false,//是否启用导出模块
						},
						series : [{
							// data : _this.echartsdata,
							data:_data,
							color: "#9d8758"
						}],

						xAxis:{
							title:null,
			                lineWidth:2,		//设置坐标宽度
			                // floor: 0,//自动计算坐标轴极值的下限
			                lineColor: '#6f5336',
			                gridLineWidth:0,
			                min:0,
			                tickColor: '#6f5336',
			                labels:{
			                   enabled:true,
			                   step:1,
			                   style: {
			                       color: '#9d8758'
			                   }
			                }
			            },
			            yAxis: {
			            	title:null,
							// floor: 1,//自动计算坐标轴极值的下限
							lineWidth:2,
							lineColor: '#6f5336',
							gridLineWidth:0,
							max:2,
							min:1,
			               	labels:{
			                   enabled:true,
			                   step:1,
			                   format: '{value} X',
			                   style: {
			                       color: '#9d8758'
			                   }
			                },
			                tickPositioner: function () {
								var maxdata = this.max,getidata= 0;
								if(maxdata%2 == 0){
									getidata = Math.ceil((maxdata-1)/4).toFixed("1") ;
									return [1 ,1+1*getidata ,1+2*getidata ,1+3*getidata ,maxdata];
								}else {
									getidata = ((maxdata-1)/3).toFixed("1");
									return [1 ,1+1*getidata ,1+2*getidata ,maxdata];
								};
							}
			            },
						legend: {//清除下部的图例
				            enabled: false,
				        },
				        plotOptions: {
				            series: {
				            	marker: {
					                fillColor: 'transparent',
					                lineWidth: 0,
					                lineColor: null // inherit from series
					            },
				                states: {//清除鼠标移动事件
				                    hover: {
				                        enabled: false
				                    }
				                }
				            }
				        },
				        credits:{//是否显示版权信息
				        	enabled : false
				        },
	               	};
				_this.myChart = Highcharts.chart('myCanvas', options);
				_this.myChart.xAxis[0].setExtremes(0, 10 ,true ,true );
				_this.myChart.yAxis[0].setExtremes(1, 10 ,true ,true );
			},
			Thebankerbut(){//庄家点击
				var _this = this;
				let account =  localStorage.account;
                let token = localStorage.token;
                if(!account || !token){
                	_this.$emit('subsidiary','11');
                	localStorage.clear();
                	return false;
                };
				_this.$emit('subsidiary','10');

			},
			walletdisplay(){//钱包点击
        		var _this = this;
        		let account =  localStorage.account;
                let token = localStorage.token;
                if(!account || !token){
                	_this.$emit('subsidiary','11');
                	localStorage.clear();
                	return false;
                };
        		_this.$emit('subsidiary',"5");
        	},
			getdata(){
				var _this = this;

	    		let account =  localStorage.account;
				let token = localStorage.token;
				if(account || token){
					_this.Loginstate = true;
					var _data = {
						money_type:'pb'
					};
				    _this.$http.post(_this.$http.userinfo,_data).then(function(response) {
						if(response.data.status == "200") {
							window.localStorage.balance_pb = response.data.data.balance_pb;
							window.localStorage.balance_cny = response.data.data.balance_cny;
							window.localStorage.balance_usdt = response.data.data.balance_usdt;
							_this.cityList[0].label = response.data.data.balance_pb + "FB";
							_this.cityList[1].label = response.data.data.balance_cny + "USDT";
							_this.cityList[2].label = response.data.data.balance_usdt + "CNY";
							switch (_this.model1) {
								case 'fb':
									_this.cityListtype.value = 'fb';
									_this.cityListtype.label = response.data.data.balance_pb + "FB";
									break;
								case 'cny':
									_this.cityListtype.value = 'cny';
									_this.cityListtype.label = response.data.data.balance_cny + "USDT";
									break;
								case 'usdt':
									_this.cityListtype.value = 'usdt';
									_this.cityListtype.label = response.data.data.balance_usdt + "CNY";
									break;
								default:
									// statements_def
									break;
							};
						};
					}).catch(function(error) {});
				}else {
					_this.model1 = "fb";
				};
			},
			Numberofnotes(){
				var _this = this;
				var domain = window.location.host;
				$.post(_this.$http.commondata,function(result){
	    			if(result.status == "200"){
	    				if(result.data.buy_info.notice_info.link.indexOf(domain) != -1){
	    					_this.noticelistpost.type = true;
	    				}else {
	    					_this.noticelistpost.type = false;
	    				}
	    				_this.noticelistpost = result.data.buy_info.notice_info;
	    				for(var i in result.data.buy_info.pb_info){
	    					_this.currencyinfozhong[i] = result.data.buy_info.pb_info[i];
	    				};
	    				for(var j in result.data.buy_info.cny_info){
	    					_this.currencyinfozhong[j] = result.data.buy_info.cny_info[j];
	    				};
	    				for(var k in result.data.buy_info.usdt_info){
	    					_this.currencyinfozhong[k] = result.data.buy_info.usdt_info[k];
	    				};
	    				switch (_this.model1) {
	    					case 'fb':
	    						_this.formItem.money = result.data.buy_info.pb_info.pb_buy_min_money;
                    			_this.formItem.escape_beishu = result.data.buy_info.pb_info.pb_escape_beishu;

	    						break;
	    					case 'cny':
	    						_this.formItem.money = result.data.buy_info.cny_info.cny_buy_min_money;
                    			_this.formItem.escape_beishu = result.data.buy_info.cny_info.cny_escape_beishu;
	    						break;
	    					case 'usdt':
	    						_this.formItem.money = result.data.buy_info.usdt_info.usdt_buy_min_money;
                    			_this.formItem.escape_beishu = result.data.buy_info.usdt_info.usdt_escape_beishu;
	    						break;
	    					default:
	    						// statements_def
	    						break;
	    				};
	    				_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
						_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
	    			};
	    		});
			},
			Doubling(type){//投注点击翻倍
				var _this = this;
				switch (type) {
					case "max":
						switch (_this.model1) {
							case 'fb':
								_this.formItem.money = _this.currencyinfozhong.pb_buy_max_money;
								break;
							case 'cny':
								_this.formItem.money = _this.currencyinfozhong.cny_buy_max_money;
								break;
							case 'usdt':
								_this.formItem.money = _this.currencyinfozhong.usdt_buy_max_money;
								break;
							default:
								// statements_def
								break;
						}
						_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
						break;
					case "min":
						switch (_this.model1) {
							case 'fb':
								_this.formItem.money = _this.currencyinfozhong.pb_buy_min_money;
								break;
							case 'cny':
								_this.formItem.money = _this.currencyinfozhong.cny_buy_min_money;
								break;
							case 'usdt':
								_this.formItem.money = _this.currencyinfozhong.usdt_buy_min_money;
								break;
							default:
								// statements_def
								break;
						};
						_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
						break;
					case "/2":
						switch (_this.model1) {
							case 'fb':
								if(_this.formItem.money/2 > _this.currencyinfozhong.pb_buy_min_money){
									_this.formItem.money = parseInt(_this.formItem.money/2);
								}else {
									_this.formItem.money = _this.currencyinfozhong.pb_buy_min_money;
								}
								break;
							case 'cny':
								if(_this.formItem.money/2 > _this.currencyinfozhong.cny_buy_min_money){
									_this.formItem.money = parseInt(_this.formItem.money/2);
								}else {
									_this.formItem.money = _this.currencyinfozhong.cny_buy_min_money
								}
								break;
							case 'usdt':
								if(_this.formItem.money/2 > _this.currencyinfozhong.usdt_buy_min_money){
									_this.formItem.money = parseInt(_this.formItem.money/2);
								}else {
									_this.formItem.money = _this.currencyinfozhong.usdt_buy_min_money
								}
								break;
							default:
								// statements_def
								break;
						};
						_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
						break;
					case "x2":
						switch (_this.model1) {
							case 'fb':
								if(_this.formItem.money*2<_this.currencyinfozhong.pb_buy_max_money){
									_this.formItem.money = _this.formItem.money*2;
								}else {
									_this.formItem.money = _this.currencyinfozhong.pb_buy_max_money;
								}
								break;
							case 'cny':
								if(_this.formItem.money*2<_this.currencyinfozhong.cny_buy_max_money){
									_this.formItem.money = _this.formItem.money*2;
								}else {
									_this.formItem.money = _this.currencyinfozhong.cny_buy_max_money;
								}
								break;
							case 'usdt':
								if(_this.formItem.money*2<_this.currencyinfozhong.usdt_buy_max_money){
									_this.formItem.money = _this.formItem.money*2;
								}else {
									_this.formItem.money = _this.currencyinfozhong.usdt_buy_max_money;
								}
								break;
							default:
								// statements_def
								break;
						}
						_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
						break;
					default:
						// statements_def
						break;
				}
			},
			parentHandleclick(){//路由修改
				var _this = this;
				// _this.MainData.close();
				// clearInterval(_this.TaoChronicle);
				// _this.isopen=false;
        		_this.MainData.close();
			},
			earnings(){//投注计算
				var _this = this;
				if(!_this.formItem.money){
					switch (_this.model1) {
						case 'fb':
							_this.formItem.money = _this.currencyinfozhong.pb_buy_min_money;
							break;
						case 'cny':
							_this.formItem.money = _this.currencyinfozhong.cny_buy_min_money;
							break;
						case 'usdt':
							_this.formItem.money = _this.currencyinfozhong.usdt_buy_min_money;
							break;
						default:
							// statements_def
							break;
					};
					_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
					_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
					return false;
				};
				if(isNaN(_this.formItem.money)){
					switch (_this.model1) {
						case 'fb':
							_this.formItem.money = _this.currencyinfozhong.pb_buy_min_money;
							break;
						case 'cny':
							_this.formItem.money = _this.currencyinfozhong.cny_buy_min_money;
							break;
						case 'usdt':
							_this.formItem.money = _this.currencyinfozhong.usdt_buy_min_money;
							break;
						default:
							// statements_def
							break;
					};
					_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
					_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
					return false;
				};
				switch (_this.model1) {
					case 'fb':
						if(Number(_this.formItem.money) < Number(_this.currencyinfozhong.pb_buy_min_money)){
							_this.formItem.money = _this.currencyinfozhong.pb_buy_min_money;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						if(Number(_this.formItem.money) > Number(_this.currencyinfozhong.pb_buy_max_money)){
							_this.formItem.money = _this.currencyinfozhong.pb_buy_max_money;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						break;
					case 'cny':
						if(Number(_this.formItem.money) < Number(_this.currencyinfozhong.cny_buy_min_money)){
							_this.formItem.money = _this.currencyinfozhong.cny_buy_min_money;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						if(Number(_this.formItem.money) > Number(_this.currencyinfozhong.cny_buy_max_money)){
							_this.formItem.money = _this.currencyinfozhong.cny_buy_max_money;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						break;
					case 'usdt':
						if(Number(_this.formItem.money) < Number(_this.currencyinfozhong.usdt_buy_min_money)){
							_this.formItem.money = _this.currencyinfozhong.usdt_buy_min_money;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						if(Number(_this.formItem.money) > Number(_this.currencyinfozhong.usdt_buy_max_money)){
							_this.formItem.money = _this.currencyinfozhong.usdt_buy_max_money;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						break;
					default:
						// statements_def
						break;
				};
				if(_this.formItem.money.split(".").length > 1){
					_this.formItem.money = _this.formItem.money.split(".")[0];
					_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
					_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
					return false;
				};
				console.log(_this.formItem.money)
				_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
				_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
			},
			chance(){//自动逃跑计算
				var _this = this;
				if(!_this.formItem.escape_beishu){
					switch (_this.model1) {
						case 'fb':
							_this.formItem.escape_beishu = _this.currencyinfozhong.pb_escape_beishu;
							break;
						case 'cny':
							_this.formItem.escape_beishu = _this.currencyinfozhong.cny_escape_beishu;
							break;
						case 'usdt':
							_this.formItem.escape_beishu = _this.currencyinfozhong.usdt_escape_beishu;
							break;
						default:
							// statements_def
							break;
					};
					_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
					_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
					return false;
				};
				if(isNaN(_this.formItem.escape_beishu)){
					switch (_this.model1) {
						case 'fb':
							_this.formItem.escape_beishu = _this.currencyinfozhong.pb_escape_beishu;
							break;
						case 'cny':
							_this.formItem.escape_beishu = _this.currencyinfozhong.cny_escape_beishu;
							break;
						case 'usdt':
							_this.formItem.escape_beishu = _this.currencyinfozhong.usdt_escape_beishu;
							break;
						default:
							// statements_def
							break;
					};
					_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
					_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
					return false;
				};
				switch (_this.model1) {
					case 'fb':
						if(_this.formItem.escape_beishu < 1.01){
							_this.formItem.escape_beishu = 1.01;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						break;
					case 'cny':
						if(_this.formItem.escape_beishu < 1.01){
							_this.formItem.escape_beishu = 1.01;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						break;
					case 'usdt':
						if(_this.formItem.escape_beishu < 1.01){
							_this.formItem.escape_beishu = 1.01;
							_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
							_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
							return false;
						};
						break;
					default:
						// statements_def
						break;
				};

				_this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
				_this.Opportunity.b = _this.$public.toDecimal2(100/_this.formItem.escape_beishu);
			},
			Currencystate(num,type){//币种状态
				var _this = this;
				_this.model1 = type;
				_this.cityListtype.value = type;
				_this.cityListtype.label = num;

			},
			Historicalrecords(){//历史开奖
				var _this = this;
				var _data = {
					page:"1",size:"15"
				};
				$.post(_this.$http.Lottery,_data,function(result){
	    			if(result.status == "200"){
	    				_this.list = result.data;
	    			}
	    		});
			}
        },
        mounted(){
        	var _this = this;
        	_this.Numberofnotes();
        	window.setTimeout(function(){
        		_this.MainDatapushh();
        	},500);
        	// window.onblur=function(){
        	// 	console.log('onblur');
        	// 	clearInterval(_this.TaoChronicle);
        	// 	_this.isopen=false;
        	// 	_this.MainData.close();
        	// }
        	// window.onfocus=function(){
        	// 	console.log('onfocus');
        	// 	_this.isopen=true;
        	// 	_this.MainDatapushh();
        	// }
        	window.addEventListener("visibilitychange",function(){
			    if (document.hidden) {
			    	// console.log("隐藏1", document.hidden);
			    	clearInterval(_this.TaoChronicle);
	        		_this.isopen=false;
	        		_this.MainData.close();
			    } else {
			    	// console.log("显示1", document.hidden);
	        		_this.isopen=true;
        			_this.MainDatapushh();
			    }
			});
        },
        created:function(){
        	var _this = this;
        	_this.getdata();
        	_this.Historicalrecords();
        	setTimeout(function(){
        		if(localStorage.Currencytype){
	        		_this.model1 = localStorage.Currencytype;
	        		if(localStorage.Currencytype == 'fb'){
	        			_this.currency = "FB";
	        		}else if(localStorage.Currencytype == 'cny'){
	        			_this.currency = "USDT";
	        		}else{
	        			_this.currency = "CNY";
	        		}
	        	}else {
	        		_this.currency = "FB";
	        		window.localStorage.Currencytype = 'fb';
	        	};
        	},100)

        }
    }
</script>



// WEBPACK FOOTER //
// src/components/home/game.vue