<template>
  <div class="search-container">
    <label for="org">Organizacion: </label>
    <input type="text" name="org" v-model="organization" />
    <button @click="search()">Buscar</button>
  </div>
  <div class="list-container">
    <div class="list-item" v-for="member in memberList" :key="member.id">
      <router-link :to="`/${organization.value}/member/${member.login}`">
        <img :src="member.avatar_url" />
        {{ member.login }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { MemberService } from "@/services/member";
import { Member } from "@/models/Member";

export default defineComponent({
  name: "Members",
  async setup() {
    const organization: Ref<string> = ref("lemoncode");

    const memberList: Ref<Member[]> = ref([]);

    memberList.value = await MemberService.getMembersByOrg(organization.value);

    const search = async () => {
      memberList.value = await MemberService.getMembersByOrg(
        organization.value
      );
    };

    return { organization, memberList, search };
  },
});
</script>

<style lang="scss">
.list-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .list-item {
    border: 1px solid #bbb;
    padding: 1rem;
    border-radius: 1rem;
    margin: 1rem;

    img {
      height: 3rem;
    }
  }
}
</style>
