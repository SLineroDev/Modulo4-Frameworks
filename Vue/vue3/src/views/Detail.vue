<template>
  <button @click="back()">Volver</button>
  <div v-if="member">
    <img :src="member.avatar_url" />
    <div>
      {{ member.login }}
    </div>
    <div>
      <a :href="member.html_url" target="_blank">{{ member.html_url }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Member } from "@/models/Member";
import { useRoute } from "vue-router";
import { MemberService } from "@/services/member";
import router from "@/router";

export default defineComponent({
  async setup() {
    const member = ref({} as Member);

    const back = () => {
      router.push("/");
    };

    const route = useRoute();
    const userName = route.params.login?.toString();

    if (userName) {
      member.value = await MemberService.getMemberData(userName);
    }

    return { member, back };
  },
});
</script>

<style lang="scss"></style>
