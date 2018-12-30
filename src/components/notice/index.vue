<template>
	<Modal v-model="modal2" width="880" @on-cancel="Callback()">
        <p slot="header">
            <span>通知中心</span>
        </p>
        <div class="notice_main">
        	<ul class="notice_box">
        		<li class="notice_list" v-for="(item,index) in cityList.list" :key="index" @click="getdatanepost(item.id)" >
                    <i class="Littleredspot" v-if="item.is_read == 0"></i>
        			<h2>{{item.content}}</h2>
        			<p>{{item.create_time}}</p>
        		</li>
                <li v-if="cityList">
                    <Page :total="cityList.count_page*10" size="small" @on-change="getdatalist"/>
                </li>
                <li v-else>
                    <p>暂无通知</p>
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
                cityList:"",
                modal_loading: "",
                modal2:false,
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.getdatalist('1');
			},
        },
        methods: {
        	Callback(){
        	    let _this = this;
                _this.$emit('modifyfun');
                _this.$emit('tongzhi');
                _this.modal2 = false;
        	},
            getdatalist(argument){
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                var _data = {
                    page:argument,size:"15",
                    account:account,
                    token:token,
                };
                _this.$http.post(_this.$http.noticelistpost,_data).then(function(response) {
                    if(response.data.status == "200") {
                        if(response.data.msg != "没有数据"){
                            _this.cityList = response.data.data;
                        };

                    };
                }).catch(function(error) {});
            },
            getdatanepost(data){
                var _this = this;
                _this.modal2 = false;
                _this.$emit('gonoticeContent',data);
                _this.$emit('Otherfunctions','18');
            },
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
</style>


