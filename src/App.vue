<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path: '/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import urlParse from 'common/script/util';
  import header from './components/header/header.vue';

  const ERR_OK = 0

  export default{
    data() {
      return {
        seller: {
          //id的值是自执行的函数 返回url里的id的值
          type:Object,
          id:(() => {
            let queryParam = urlParse();
            return queryParam.id
          })()
        }
      }
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        /*返回的response 是 promise 对象*/
        response = response.body;
        if( response.errno === ERR_OK ) {
            // this.seller = response.data;
            //给对象添加属性  否则的话id的属性会被新的对象覆盖  相当于合并对象
            this.seller = Object.assign({},this.seller,response.data)
        }

      });
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import './common/styles/mixin';
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display:inline-block
          width:100%
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color:rgb(240,20,20)
</style>
