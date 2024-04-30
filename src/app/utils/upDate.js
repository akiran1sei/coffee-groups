import { revalidatePath } from "next/cache";

const upDate = async (req, res) => {
  // console.log("upData:", req);
  revalidatePath(`/pages/group`);
  return req;
};
export default upDate;
