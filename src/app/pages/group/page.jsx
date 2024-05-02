// app/pages/group/page.jsx
import { Group } from "@/app/components/molecules/Group/Group";
import Head from "next/head";
import dotenv from "dotenv";
import { getAllGroups } from "@/app/api/data/route";

const GroupPage = async () => {
  dotenv.config();
  const Groups = await getAllGroups();

  return (
    <>
      <Head>
        <title>グループ作成ページ</title>
        <meta
          name="description"
          content="グループ作成、または、選択するページです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Group data={Groups} />
    </>
  );
};
export default GroupPage;
