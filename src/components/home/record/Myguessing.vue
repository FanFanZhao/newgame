<template>
	<div>
		<ul class="record_box">
	    	<li class="record_list_header">
	    		<div>
	    			<p class="one">期数</p>
		    		<p class="two">结果</p>
		    		<p class="three">投入</p>
		    		<p class="four">收益</p>
	    		</div>
	    	</li>
	    	<li class="record_list" v-for="(item,index) in list.list" :key="index">
	    		<div v-if="item.status == '1'">
	    			<p class="one">
		    			<i class="icon_Floret"></i>{{item.qs}}
		    		</p>
		    		<p class="two">{{item.boomValue}}X</p>
		    		
		    		<p class="three" v-if="item.pid == '1'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{item.buy_money}} USDT</span>
		    		</p>
		    		<p class="three" v-else-if="item.pid == '2'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{item.buy_money}} FB</span>
		    		</p>
		    		<p class="three" v-else-if="item.pid == '3'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{Number(item.buy_money).toFixed(2)}} CNY</span>
		    		</p>

		    		<p class="four" v-if="item.pid == '1'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{item.income}} USDT</span>
		    		</p>
		    		<p class="four" v-else-if="item.pid == '2'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{item.income}} FB</span>
		    		</p>
		    		<p class="four" v-else-if="item.pid == '3'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{Number(item.income).toFixed(2)}} CNY</span>
		    		</p>
	    		</div>
	    		<div v-else-if="item.status == '2'">
	    			<p class="one">
		    			<i class="icon_Floret"></i>{{item.qs}}
		    		</p>
		    		<p class="two green">{{item.boomValue}}X</p>
		    		
		    		<p class="three green" v-if="item.pid == '1'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{item.buy_money}} USDT</span>
		    		</p>
		    		<p class="three green" v-else-if="item.pid == '2'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{item.buy_money}} FB</span>
		    		</p>
		    		<p class="three green" v-else-if="item.pid == '3'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{Number(item.buy_money).toFixed(2)}} CNY</span>
		    		</p>

		    		<p class="four green" v-if="item.pid == '1'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{item.income}} USDT</span>
		    		</p>
		    		<p class="four green" v-else-if="item.pid == '2'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{item.income}} FB</span>
		    		</p>
		    		<p class="four green" v-else-if="item.pid == '3'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{Number(item.income).toFixed(2)}} CNY</span>
		    		</p>
	    		</div>
	    		<div v-else>
	    			<p class="one">
		    			<i class="icon_Floret"></i>{{item.qs}}
		    		</p>
		    		<p class="two gules">{{item.boomValue}}X</p>
		    		
		    		<p class="three gules" v-if="item.pid == '1'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{item.buy_money}} USDT</span>
		    		</p>
		    		<p class="three gules" v-else-if="item.pid == '2'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{item.buy_money}} FB</span>
		    		</p>
		    		<p class="three gules" v-else-if="item.pid == '3'">
		    			<span v-if="item.buy_money=='0'">--</span>
		    			<span v-else>{{Number(item.buy_money).toFixed(2)}} CNY</span>
		    		</p>

		    		<p class="four gules" v-if="item.pid == '1'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{item.income}} USDT</span>
		    		</p>
		    		<p class="four gules" v-else-if="item.pid == '2'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{item.income}} FB</span>
		    		</p>
		    		<p class="four gules" v-else-if="item.pid == '3'">
		    			<span v-if="item.income=='0'">--</span>
		    			<span v-else>{{Number(item.income).toFixed(2)}} CNY</span>
		    		</p>
	    		</div>
	    	</li>
	    	<li class="record_list_footer">
	    		<Page :total="list.count_page*10" size="small" @on-change="getDate"/>
	    	</li>
	    </ul>
	</div>
</template>
<script>
	export default {
	    // 数据
	    data() {
	        return {
	        	activename:"1",
	            list:[],
	        };
	    },
	     methods:{
	    	getDate:function (argument) {
	    		var _this = this;
		    	let account =  localStorage.account;
				let token = localStorage.token;
				var _data = {
					page:argument,size:"15",
				};
				console.log("456")
				if(account || token){
				    _this.$http.post(_this.$http.myquiz,_data).then(function(response) {
						if(response.data.status == "200") {
							_this.list = response.data.data;
						};
					}).catch(function(error) {});
				};
	    	}
	    },
	    created(){
	    	this.getDate(1);
	    }
	}
</script>

