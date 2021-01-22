<template>
  <div>
    <template v-for="(value, index) in menuData">
      <el-submenu v-if="value.children.length > 0" :index="value.menu.name" :key="index">
          <template slot="title">
          <span slot="title">{{ value.menu.name }}</span>
        </template>
        <MenuTree :menu-data="value.children" />
      </el-submenu>
      <el-menu-item v-else :index="value.menu.path" :key="index">
        <span slot="title">{{ value.menu.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MenuTree',
  props: ['menu-Data']
}
</script>
<style>
.el-submenu__title i {
  color: #fff;
}
.el-menu--collapse {
  width: 54px;
}
</style>