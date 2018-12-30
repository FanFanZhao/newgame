<template>
	<div>
		<ul class="record_box History">
	    	<li class="record_list_header">
	    		<div>
	    			<p class="one">期数</p>
		    		<p class="two">结果</p>
		    		<p class="three">投入</p>
		    		<p class="three">收益</p>
		    		<p class="four">检验值</p>
	    		</div>
	    	</li>
	    	<li class="record_list" v-for="(item,index) in list.list" :key="index">
	    		<div>
	    			<p class="one">
		    			<i class="icon_Floret"></i>
		    			{{item.periodID}}
		    			<!-- <span>{{item.periodID}}</span> -->
		    		</p>
		    		<p class="two">{{item.boomValue}}X</p>
		    		<p class="three" v-if="item.buy_money == '0'">--</p>
		    		<p class="three" v-else>{{item.buy_money}}</p>

		    		<p class="three" v-if="item.buy_money == '0'">--</p>
		    		<p class="three" v-else>{{item.income}}</p>
		    		<p class="four"><span>{{item.boomHash}}</span><a href="" target="_blank"><router-link :to="'/checkaward?'+item.boomHash">校验</router-link></a></p>
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
				if(account || token){
					_data.account = account;
					_data.token = token;
				    _this.$http.post(_this.$http.Lottery,_data).then(function(response) {
						if(response.data.status == "200") {
							_this.list = response.data.data;
						};
					}).catch(function(error) {});
				}else {
					$.post(_this.$http.Lottery,_data,function(result){
		    			if(result.status == "200"){
		    				_this.list = result.data;
		    			}
		    		});
				};
	    	}
	    },
	    created(){
	    	this.getDate(1);
	    }
	}
</script>

