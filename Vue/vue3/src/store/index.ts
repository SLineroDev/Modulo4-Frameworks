import { createStore } from "vuex";

export interface IOrganizationState {
  organization: string;
}

const state: IOrganizationState = { organization: "" };

const getters = {
  getOrg(state: IOrganizationState) {
    return state.organization;
  },
};

const mutations = {
  setOrg(state: IOrganizationState, org: string) {
    state.organization = org;
  },
};

export default createStore({
  state,
  getters,
  mutations,
});
