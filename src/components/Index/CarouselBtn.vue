<template>
  <div class="block">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <el-image :src="item" alt="图片"  style="padding: 5px 75px; height: 100%;width: 100%"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<script>
    export default {
        name: "CarouselBtn",
        props: ['imgList']
    }
</script>

<style scoped>
  .block{
    height: 200px
  }
  .el-carousel__item{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 480px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  img{
    height: 480px
  }
</style>
