import { revalidatePath } from "next/cache";

// export default async function handler(req, res) {
//   // データベースから記事を更新
//   await updateArticle(req.body.id);
//   console.log(req, res);
//   // 記事詳細ページのキャッシュを無効化
//   revalidatePath(`/pages/group`);

//   res.json({ message: "更新しました" });
// }
const upDate = async (req, res) => {
  console.log("upData:", req);
  revalidatePath(`/pages/group`);
  return req;
};
export default upDate;
