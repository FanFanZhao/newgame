<template>
	<div>
		<ul class="record_box">
	    	<li class="record_list_header">
	    		<div>
	    			<p class="one">玩家</p>
		    		<p class="two">逃跑</p>
		    		<p class="three">投入</p>
		    		<p class="four">收益</p>
	    		</div>
	    	</li>
	    	<li class="record_list" v-for="(item,index) in list" :key="index">
	    		<div>
	    			<p class="one">
		    			<img :src="item.upic" v-if="item.upic">
		    			<img src="../../../assets/imgs/defaulttouxiang.png" v-else>
		    			<span>{{item.realname}}</span>
		    		</p>
		    		<p class="two" v-if="item.status == '1'">--</p>
		    		<p class="two green" v-else-if="item.status == '2'">{{item.final_beishu}}X</p>
		    		<p class="two gules" v-else>{{item.final_beishu}}X</p>

		    		<p class="three" v-if="item.pid == '1'">{{item.buy_money}}USDT</p>
		    		<p class="three" v-else-if="item.pid == '2'">{{item.buy_money}}FB</p>
					<p class="three" v-else-if="item.pid == '3'">{{Number(item.buy_money).toFixed(2)}}CNY</p>
		    		
		    		<p class="four" v-if="item.pid == '1'">
		    			<span v-if="item.status == '1'">--</span>
			    		<span class="green" v-else-if="item.status == '2'">{{(item.final_beishu*item.buy_money).toFixed('2')}}USDT</span>
			    		<span class="gules" v-else>-{{item.buy_money}}USDT</span>
		    		</p>
		    		<p class="four" v-else-if="item.pid == '2'">
		    			<span v-if="item.status == '1'">--</span>
			    		<span class="green" v-else-if="item.status == '2'">{{(item.final_beishu*item.buy_money).toFixed('2')}}FB</span>
			    		<span class="gules" v-else>-{{item.buy_money}}FB</span>	
		    		</p>
		    		<p class="four" v-else-if="item.pid == '3'">
		    			<span v-if="item.status == '1'">--</span>
			    		<span class="green" v-else-if="item.status == '2'">{{(item.final_beishu*item.buy_money).toFixed('2')}}CNY</span>
			    		<span class="gules" v-else>-{{Number(item.buy_money).toFixed(2)}}CNY</span>	
		    		</p>
	    		</div>
	    	</li>
	    	<!-- <li class="record_list_footer">
	    		<Page :total="list.count_page*10" size="small" @on-change="getDate"/>
	    	</li> -->
	    </ul>
	</div>
</template>
<script>
	export default {
	    // 数据
	    data() {
	        return {
	            list:[],
	            MainData1:"",
	        };
	    },
	    methods:{
	    	MainDatapush() {
				var connet = this;
				// 首先判断是否 支持 WebSocket
				if('WebSocket' in window) {
					connet.MainData1 = new WebSocket(connet.$http.secrurl);
				} else if('MozWebSocket' in window) {
					connet.MainData1 = new MozWebSocket(connet.$http.secrurl);
				} else {
					connet.MainData1 = new SockJS(connet.$http.secrurl);
				}
				// 打开时
				connet.MainData1.onopen = function(evnt) {
					var msg = {
						op: "look"
					};
					// 发送消息
					connet.MainData1.send(JSON.stringify(msg));
				};
				// 处理消息时
				connet.MainData1.onmessage = function(evnt) {
					var datanum = JSON.parse(evnt.data);
					switch (datanum.status) {
						case 1://倒计时
							connet.list = datanum.data[1].xiazhu_list;
							break;
						case 2://划线
							connet.list = datanum.data[1].xiazhu_list;
							break;
						case 3://爆炸
							connet.list = datanum.data[1].xiazhu_list;
							break;
						default:
							// statements_def
							break;
					};
				};
				connet.MainData1.onerror = function(evnt) {
					console.log("  websocket.onerror");
				};
				connet.MainData1.onclose = function(evnt) {
					console.log("  websocket.onclose");
					switch (connet.$route.path) {
						case '/home/allguessing':
							connet.MainDatapush();
							break;
						default:
						    break;
		            }
				};
			},
	    },
	    mounted(){
	    	let _this = this;
	    	window.setTimeout(function(){
	    		_this.MainDatapush();
	    	},1000)
	    },
	    beforeRouteLeave (to, from, next) {
	      // 导航离开该组件的对应路由时调用
	      // 可以访问组件实例 `this`
	      this.MainData1.close();
	      next();
	    },
	}
</script>



// WEBPACK FOOTER //
// src/components/home/record/Allguessing.vue