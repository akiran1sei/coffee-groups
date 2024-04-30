// app/pages/group/page.jsx
import { Group } from "@/app/components/molecules/Group/Group";
import Head from "next/head";
import dotenv from "dotenv";
import upDate from "@/app/utils/upDate";

const GroupPage = async () => {
  dotenv.config();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/group/chioce`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const allGroup = await response.json();
  const upData = await upDate(allGroup);
  console.log("upData:", upData);
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
      <Group data={upData} />
    </>
  );
};
export default GroupPage;
