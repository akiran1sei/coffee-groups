"use client";
import { useState } from "react";
import styles from "@/app/styles/Contents.module.css";
import useReadGroups from "@/app/utils/useReadGroups";
import { useRouter } from "next/navigation";
// import Link from "next/link";

export function Group(context) {
  const ReadGroups = useReadGroups();
  const [groupCreate, setGroupCreate] = useState("");
  const [groupChoice, setGroupChoice] = useState(ReadGroups);
  const [error, setError] = useState("");
  const router = useRouter();

  const data = context.data.groups;
  console.log(context);
  console.log(context.data);
  console.log(context.data.groups);
  const options = [];
  const groupName = [];
  data.forEach((name) => {
    options.push(
      <option key={name._id} value={name._id}>
        {name.groupname}
      </option>
    );
  });
  data.forEach((name) => {
    groupName.push(
      <p key={name._id} value={name._id}>
        {name.groupname}
      </p>
    );
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!groupCreate || null) {
        return setError("空欄です、記入してください。");
      } else {
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/group/create`,
          {
            // cache: "no-store",
            method: "POST",
            body: JSON.stringify({ groupname: groupCreate }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        alert(jsonData.message);

        if (jsonData.message === "グループ作成成功") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/group/chioce`,
            {
              method: "GET",
              cache: "no-store",
              headers: { "Cache-control": "no-store" },
            }
          );
          const Group = await res.json();
          // revalidate: 60 // 1分ごとにデータを更新
          alert(Group.message);
          router.refresh({ shallow: true });
          return location.reload();
        } else {
          return null;
        }
      }
    } catch (error) {
      return alert("グループ作成失敗");
    }
  };
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/group/delete/${groupChoice}`,
      {
        method: "DELETE",
        body: JSON.stringify({ groupname: groupChoice }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = await response.json();
    alert(jsonData.message);
    router.refresh({ shallow: true });
    return location.reload();
  };

  return (
    <>
      <div className={styles.group_page}>
        <h1 className={styles.group_title}>Group</h1>
        <div className={styles.group_wrap}>
          <p className={styles.group_txt}>
            グループ作成を行ってください。
            <br />
            ここでは、グループ作成/削除を行います。
            <br />
            既存のグループを使用する場合は、
            <br />
            「NewPage」より進んでください。
          </p>
          <div className={styles.group_card}>
            {/* <h2 className={styles.group_title}>Group Create</h2> */}
            <ul className={styles.group_form_list}>
              <p className={styles.group_txt}>
                こちらは、グループ作成になります。
              </p>
              <li className={styles.group_form_item}>
                <form onSubmit={handleCreateSubmit}>
                  <h2 className={styles.group_form_title}>
                    <label htmlFor="group-delete">Group Crate</label>
                  </h2>
                  <input
                    name="group_create"
                    id="group_create"
                    type="text"
                    value={groupCreate}
                    onChange={(e) => setGroupCreate(e.target.value)}
                  />
                  <div className={styles.group_error_txt}>
                    {error && (
                      <span onChange={(e) => setError(e.target.value)}>
                        {error}
                      </span>
                    )}
                  </div>
                  <button type="submit" className={styles.group_create_btn}>
                    CREATE
                  </button>
                </form>
              </li>
              <li className={styles.group_form_item}>
                <form onSubmit={handleDeleteSubmit}>
                  <div className={styles.edit_item_value_box}>
                    <h2 className={styles.group_form_title}>
                      <label htmlFor="group-delete">Group Delete</label>
                    </h2>
                    <select
                      name="group-delete"
                      id="group-delete"
                      value={groupChoice}
                      onChange={(e) => setGroupChoice(e.target.value)}
                    >
                      <option></option>
                      {options}
                    </select>
                    <button className={styles.group_delete_btn}>Delete</button>
                  </div>
                </form>
              </li>
              <li className={styles.group_form_item}>{groupName}</li>
            </ul>
            {/* <button className={styles.group_next_btn}>
              <Link href={"/pages/create"} scroll={false} passHref>
               
              </Link>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
