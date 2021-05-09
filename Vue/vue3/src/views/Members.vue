<template>
  <div class="search-container">
    <label for="org">Organizacion: </label>
    <input type="text" name="org" v-model="orgInput" @change="setOrgStore()" />
    <button @click="search()">Buscar</button>
  </div>
  <div class="list-container">
    <div class="list-item" v-for="member in memberList" :key="member.id">
      <router-link :to="`/member/${member.login}`">
        <img :src="member.avatar_url" />
        {{ member.login }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import { MemberService } from "@/services/member";
import { Member } from "@/models/Member";
import { useStore } from "vuex";

export default defineComponent({
  name: "Members",
  async setup() {
    const store = useStore();
    const orgInput: Ref<string> = ref("");

    orgInput.value = store.state.organization || "lemoncode";

    const organization = computed(() => ({
      get(): string {
        return store.state.organization;
      },
      set(value: string) {
        store.commit("setOrg", value);
      },
    }));

    const memberList: Ref<Member[]> = ref([]);

    memberList.value = await MemberService.getMembersByOrg(orgInput.value);

    const setOrgStore = () => {
      organization.value.set(orgInput.value);
    };

    const search = async () => {
      console.log(organization.value);

      memberList.value = await MemberService.getMembersByOrg(orgInput.value);
    };

    return { orgInput, organization, memberList, search, setOrgStore };
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
