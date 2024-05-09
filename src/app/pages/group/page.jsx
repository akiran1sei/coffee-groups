// app/pages/group/page.jsx
import { Group } from "@/app/components/molecules/Group/Group";
import Head from "next/head";
import dotenv from "dotenv";

const GroupPage = async () => {
  dotenv.config();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/group/chioce`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const Groups = await response.json();

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
