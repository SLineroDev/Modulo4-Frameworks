<template>
  <ul class="list-container" v-if="organizationList.value.lenght > 0">
    <li v-for="org in organizationList.data" :key="org.id">
      {{ org.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { Member } from "@/models/Member";
import { MemberService } from "@/services/member";

export default defineComponent({
  async setup() {
    const organization: Ref<string> = ref("lemoncode");

    const organizationList: Ref<Member[]> = ref([]);

    organizationList.value = await MemberService.get(organization.value);

    return { organization, organizationList };
  },
});
</script>

<style></style>
