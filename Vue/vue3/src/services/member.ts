import { Member } from "@/models/Member";

export const MemberService = {
  async getMembersByOrg(org: string): Promise<Member[]> {
    const memberList: Member[] = await fetch(
      `https://api.github.com/orgs/${encodeURI(org)}/members`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        /*       "/members.mock.json",
      {
        headers: {
          Accept: "application/json",
        }, */
      }
    )
      .then((resp) => {
        console.log(resp);
        if (resp.status != 200) {
          throw new Error("No existe la organizacion");
        }

        return resp.json();
      })
      .catch((err) => {
        console.log(err);
      });

    return memberList;
  },
  async getMemberData(userName: string): Promise<Member> {
    const memberList: Member = await fetch(
      `https://api.github.com/users/${userName}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
      .then((resp) => resp.json())
      .catch((err) => {
        console.log(err);
      });

    return memberList;
  },
};
