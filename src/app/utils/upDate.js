import { revalidatePath } from "next/cache";
import dotenv from "dotenv";
const upDate = async (req, res) => {
  dotenv.config();

  revalidatePath(`${process.env.NEXT_PUBLIC_URL}/pages/group`);
  return req;
};
export default upDate;
