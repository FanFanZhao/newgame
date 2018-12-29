<template>
	<Modal id="go-notice" v-model="modal2" width="880" @on-cancel="Callback()">
        <!--<div id="test" @click="backNotice"><img src="../../assets/imgs/backnotice.png" alt=""></div>-->
        <p slot="header">
            <span>通知中心</span>
        </p>
        <div class="notice_main">
        	<section class="notice_main_box">
        		<div class="main_title">
                    <div v-html="$public.escapeHtml(modal_loading)"></div>
                </div>
        		<div class="main_main">
                    {{date}}
                </div>
        	</section>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue','getNoticeId'],
        data () {
            return {
                cityList:"",
                modal_loading: "",
                date: "",
                modal2:false,
                noticeId:''
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
			},
            'getNoticeId':function(val){
        	    this.noticeId = val;
                this.getdatanepost();
            },
            // getdatanepost()
        },
        methods: {
            Callback(){
                let _this = this;
                _this.modal2 = false;
                _this.$emit('modifyfun');
                _this.$emit('Otherfunctions','17');
            },
            getdatanepost(){
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                var _data = {
                    id:_this.noticeId,
                    account:account,
                    token:token,
                };
                _this.$http.post(_this.$http.noticeonepost,_data).then(function(response) {
                    if(response.data.status == "200") {
                        _this.modal_loading = response.data.data.list.remark;
                        _this.date = response.data.data.list.create_time;
                    }
                }).catch(function(error) {});
            },
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/noticecontent/index.vue