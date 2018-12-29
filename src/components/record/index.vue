<template>
	<Modal v-model="modal2" @on-cancel="Callback()" width="880">
        <p slot="header">
            <span>战绩</span>
        </p>
        <div class="record_main">
        	<ul class="record_header">
                <li class="record_header_one">
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="record_header_two">
                    <img v-if="formTop.upic != ''" :src="formTop.upic">
                    <img v-else src="../../assets/imgs/loginlogo.png" alt="">
                    <p>{{formTop.realname}}</p>
                </li>
            </ul>
            <ul class="record_box">
                <li class="record_box_list">
                    <div class="record_box_left">
                        <i class="recordicon icon_1"></i>
                    </div>
                    <div class="record_box_right">
                        <h2>当前收益</h2>
                        <p>{{formTopList.income}}</p>
                    </div>
                </li>
                <li class="record_box_list">
                    <div class="record_box_left">
                        <i class="recordicon icon_2"></i>
                    </div>
                    <div class="record_box_right">
                        <h2>竞猜总额</h2>
                        <p>{{formTopList.leiji}}</p>
                    </div>
                </li>
                <li class="record_box_list">
                    <div class="record_box_left">
                        <i class="recordicon icon_3"></i>
                    </div>
                    <div class="record_box_right">
                        <h2>最高盈利</h2>
                        <p>{{formTopList.zuigao}}</p>
                    </div>
                </li>
                <li class="record_box_list">
                    <div class="record_box_left">
                        <i class="recordicon icon_4"></i>
                    </div>
                    <div class="record_box_right">
                        <h2>最高亏损</h2>
                        <p>{{formTopList.loss}}</p>
                    </div>
                </li>
                <li class="record_box_list">
                    <div class="record_box_left">
                        <i class="recordicon icon_5"></i>
                    </div>
                    <div class="record_box_right">
                        <h2>盈利排名</h2>
                        <p>{{formTopList.ranking}}</p>
                    </div>
                </li>
                <li class="record_box_list">
                    <div class="record_box_left">
                        <i class="recordicon icon_6"></i>
                    </div>
                    <div class="record_box_right">
                        <h2>竞猜次数</h2>
                        <p>{{formTopList.num}}</p>
                    </div>
                </li>
            </ul>
            <p class="record_box_footer">注册于 {{$public.formatDateTime(formTop.reg_time)}}</p>
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
                        label: 'FB'
                    },{
                        value: 'CNY',
                        label: 'USDT'
                    },{
                        value: 'USDT',
                        label: 'CNY'
                    }],
                modal_loading: false,
                modal2:false,
                model1:"FB",
                formTop: {},
                formTopList:{}
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
                const _this = this;
				_this.modal2 = val;
                switch (_this.model1) {
                    case 'FB':
                        _this.getdata('pb');
                        break;
                    case 'CNY':
                        _this.getdata('cny');
                        break;
                    default:
                        // statements_def
                        break;
                }
			},
            'model1':function(val,oval){
                const _this = this;
                _this.modal2 = val;
                switch (val) {
                    case 'FB':
                        _this.getdata('pb');
                        break;
                    case 'CNY':
                        _this.getdata('cny');
                        break;
                    default:
                        // statements_def
                        break;
                }
            },
        },
        methods: {
        	Callback(){
        		const _this = this;
        		_this.$emit('modifyfun');
        	},
            del(){
                const _this = this;
            	_this.$emit('modifyfun');
            },
            getdata(type){
                const _this = this;
                const _data = {
                    money_type:type,
                };
                _this.$http.post(_this.$http.userinfo,_data).then(function(response) {
                    if(response.data.status == "200") {
                        _this.formTop = response.data.data;
                        _this.formTopList = response.data.data.list[0];
                    }
                }).catch(function(error) {});
            },
        },
        mounted(){
            const _this = this;
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
    @import './indexmove.less';
</style>



// WEBPACK FOOTER //
// src/components/record/index.vue