<template>
  <img :src="member.avatar_url" />
  {{ member.login }}
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Member } from "@/models/Member";
import { RouteLocation } from "vue-router";
import { MemberService } from "@/services/member";

export default defineComponent({
  async setup() {
    const member = ref({} as Member);

    const org = String((this.$route as RouteLocation).params.org);
    const userName = String((this.$route as RouteLocation).params.login);

    member.value = await MemberService.getMembersByOrgAndUserName(
      org,
      userName
    );

    return { member };
  },
});
</script>

<style lang="scss"></style>
