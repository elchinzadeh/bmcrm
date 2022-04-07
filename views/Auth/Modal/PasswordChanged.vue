<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      class="bm-bialog change-pass"
  >
    <span slot="title" class="dialog-header"></span>
    <div class="sqr">
      <img src="@/assets/images/box-1.png" alt="box.png">
    </div>
    <p class="change-pass__text"><span v-html="$t('dialog.changed_pass.text')"></span></p>

    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goTo()">{{ $t('dialog.changed_pass.btn') }}</el-button>
        </span>
  </el-dialog>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  props: ['dialogVisible'],
  methods: {
    goTo() {
      this.dialogVisible = false
      this.$router.push({name: 'Login'})

      Cookie.remove('forgotenEmail')
      Cookie.remove('password')
    }
  },
  watch: {
    dialogVisible: function () {
      if (!this.dialogVisible) {
        this.$emit('closeDialog')
      }
    }
  },
}
</script>
