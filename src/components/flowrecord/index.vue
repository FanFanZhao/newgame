<template>
	<Modal v-model="modal2" @on-cancel="Callback()" width="880">
        <p slot="header">
            <span>账户流水</span>
        </p>
        <div class="flowrecord_main">
        	<div class="flowrecord_header">
        		<DatePicker :value="value2" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="日期" style="width: 200px" @on-change="dataChange"></DatePicker>
        		<Button type="primary" :loading="modal_loading" @click="del">确定</Button>
        	</div>
			<ul class="flowrecord_box">
				<li class="flowrecord_box_list_header">
					<p class="one">类型</p>
					<p>时间</p>
					<p class="two">变动</p>
					<p class="four">变动后</p>
				</li>
				<li class="flowrecord_box_list" v-for="(item,index) in cityList.list" :key="index">
					<p class="one">{{item.memo}}</p>
					<p v-if="item.addtime">{{$public.formatDateTime(item.addtime)}}</p>
					<p class="two">{{money_type=='usdt'?Number(item.price).toFixed(2):item.price}}</p>
					<p class="four">{{money_type=='usdt'?Number(item.nprice).toFixed(2):item.nprice}}</p>
				</li>
                <li style="margin: 10px auto 0px auto;">
                    <Page :total="cityList.count_page*10" size="small" @on-change="getdata"/>
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
                cityList:[],
                modal_loading: false,
                modal2:false,
                value2:[],
                money_type:'',
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.money_type=localStorage.currency;
                _this.getdata("1");
			},
        },
        methods: {
          	dataChange(data){
          	  this.value2 = data;
		  	},
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
        	},
            del(){
        	  // alert('haha')
            	var _this = this;
            	// _this.$emit('modifyfun');
              	_this.getdata("1");
            },
            tabtypefun(type){
            	var _this = this;
            	_this.tabtype = type;
            },
            getdata(type){
                var _this = this;
                // if(_this.value == ''){
                //   _this.value2[0] = '';
                //   _this.value2[1] = '';
				// }
                let _data = {
                    money_type:localStorage.currency,
                    page:type,
                    size:"15",
                  	start_time:_this.value2[0],
                  	end_time:_this.value2[1]
                };
                _this.$http.post(_this.$http.bill,_data).then(function(response) {
                    if(response.data.status == "200") {
                        _this.cityList = response.data.data;
                        _this.value2 = [];
                    }
                }).catch(function(error) {});
            }
        },
        mounted(){
        	var _this = this;

        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
</style>

