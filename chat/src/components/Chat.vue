<template>
  <div class="chat">
    <!-- 名前の入力欄 -->
    <label for="nameInput">名前</label>
    <input type="text" id="nameInput" v-model="name">

    <!-- メッセージの入力欄 -->
    <label for="nameInput">メッセージ</label>
    <input type="text" id="nameInput" v-model="message">

    <!-- ボタン -->
    <div>
      <button type="button" class="btn btn-default" @click="sendMessage">送信</button>
    </div>

    <!-- リスト -->
    <div>
      <ul>
        <li v-for="item in list">{{item.name}}/{{item.message}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadavg } from "os";
export default {
  name: "chat",
  data() {
    return {
      list: [],
      name: "",
      message: ""
    };
  },
  // eslint-disable-next-line space-before-function-paren
  created() {
    this.listen();
  },
  methods: {
    listen() {
      firebase
        .database()
        .ref("myBoard/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            Object.keys(rootList).forEach((val, key) => {
              rootList[val].id = val;
              list.push(rootList[val]);
            });
            this.list = list;
          }
        });
    },
    // eslint-disable-next-line space-before-function-paren
    sendMessage() {
      if (!this.name || !this.message) return; // 空欄の場合は即リターン
      firebase
        .database()
        .ref("myBoard/")
        .push({
          name: this.name,
          message: this.message
        });

      // 送信後、入力欄をクリアする
      this.name = "";
      this.message = "";
    }
  }
};
</script>

<style>
</style>
