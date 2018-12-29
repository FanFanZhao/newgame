<template>
	<div>

	</div>
</template>
<script>
	export default {
        data () {
            return {
                cityList: [{
                        value: 'fb',
                        label: '0.000000FB'
                    },
                    {
                        value: 'cny',
                        label: '0.00000CNY'
                    }],
                model1: 'fb',
            }
        },
        watch: {
        	'model1':function(val,oval){
        		var _this = this;
        		window.localStorage.Currencytype = val;
        	},
        },
        methods:{
        	getdata(){
        		var _this = this;
        		let account =  localStorage.account;
				let token = localStorage.token;
				if(account || token){
					var _data = {
						money_type:'PB'
					};
				    _this.$http.post(_this.$http.userinfo,_data).then(function(response) {
						if(response.data.status == "200") {
							_this.model1 = "fb";
							window.localStorage.balance_pb = response.data.data.balance_pb;
							window.localStorage.balance_cny = response.data.data.balance_cny;
							_this.cityList[0].label = response.data.data.balance_pb + "FB";
							_this.cityList[1].label = response.data.data.balance_cny + "CNY";
						}
					}).catch(function(error) {});
				}else {
					_this.model1 = "fb";
				}
        	},
        	walletdisplay(){
        		var _this = this;
        		_this.$emit('subsidiary',"5");
        	}
        },
        created:function(){// 加载执行
        	this.getdata();
        }
    }
</script>



// WEBPACK FOOTER //
// src/components/home/header.vue