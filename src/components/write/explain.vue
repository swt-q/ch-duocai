<template>
    <div class="show">
        <div class="top">
            <div class="left">
                <p>“哆采”</p>
                <p>服务</p>
            </div>
            <h3>为核心合作伙伴的进货提供高额度、低息采购付款的资金服务，帮助合作伙伴 降低进货资金成本，减少资金周转压力；</h3>
        </div>
        
        <div class="icon-wp">
            <div class="icon-all">
                <div class="icon">
                    <i class="iconfont icon-tijiao1"></i>
                </div>
                <p>提交需求</p>
            </div>
            <div class="xian self">
                <i class="iconfont icon-arrowRight"></i>
            </div>
            <div class="icon-all">
                <div class="icon">
                    <i class="iconfont icon-shenhe"></i>
                </div>
                <p>需求审核</p>
            </div>
            <div class="xian">
                <i class="iconfont icon-arrowRight"></i>
            </div>
            <div class="icon-all">
                <div class="icon">
                    <i class="iconfont icon-qianshu"></i>
                </div>
                <p>签署销售合同</p>
            </div>
            <div class="xian self1">
                <i class="iconfont icon-arrowRight"></i>
            </div>
            <div class="icon-all">
                <div class="icon">
                    <i class="iconfont icon-fukuan"></i>
                </div>
                <p>佳华完成采购付款</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'explain',
  data () {
    return {
      
    }
  },
  methods:{

  },
  mounted(){
    
  }
}
</script>
<style lang="less" scoped>
.show{
    width: 1138px;
    background: url(../../../static/images/serve.png) no-repeat;
    .top{
        margin-bottom: 27px;
        height: 112px;
        line-height: 112px;
        .left{
            float: left;
            width: 282px;
            font-size: 36px;
            color: #fff;
            &>p{
                float: left;
            }
            &>p:first-child{
                font-weight: bold;
                padding: 0 45px 0 24px;
            }
            &>p:last-child{
                font-weight: 300;
            }
        }
        &>h3{
            float: left;
            width: 630px;
            margin: 25px 0 0 35px;
            line-height: 32px;
            color: #353535;
            font-size: 18px;
        }
    }
    .icon-wp{
        margin: 0 0 36px 30px;
        display: flex;
        align-items: center;
        .icon-all{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 76px;
                height: 76px;
                line-height: 76px;
                background: @orange;
                border: 5px solid @inter;
                border-radius: 50%;
                text-align: center;
                &>i{
                    display: inline-block;
                    font-size: 40px;
                    color: #fff;
                }
            }
            &>p{
                padding-top: 10px;
                color: #FF8523;
                font-size: 16px;
            }
        }
        .xian{
            width: 199px;
            height: 3px;
            margin: 0 16px 22px 10px;
            display: flex;
            align-items: center;
            background: url(../../../static/images/dian.jpg);
            position: relative;
            &>i{
                position: absolute;
                right: -18px;
                font-size: 24px;
                color: #b2b2b2;
            }
        }
        .self{
            margin-right: 20px;
        }
        .self1{
            margin-right: 0;
        }
    }
}
</style>


