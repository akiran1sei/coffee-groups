"use client";
import { useState } from "react";
import styles from "@/app/styles/Contents.module.css";
import dotenv from "dotenv";
import { useRouter } from "next/navigation";
// import { addGroup } from "@/app/api/data/route";
// import { deleteGroup } from "@/app/api/data/route";
// import Link from "next/link";

export function Group(context) {
  dotenv.config();
  const data = context.data.groups;

  const [groupCreate, setGroupCreate] = useState("");
  const [groupChoice, setGroupChoice] = useState(data);
  const [error, setError] = useState("");
  const router = useRouter();

  const options = [];
  const groupName = [];
  data.forEach((DataName) => {
    options.push(
      <option key={DataName._id} value={DataName._id}>
        {DataName.groupname}
      </option>
    );
  });
  data.forEach((DataName) => {
    groupName.push(
      <p key={DataName._id} value={DataName._id}>
        {DataName.groupname}
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

        const CreateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/group/create`,
          {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({ groupname: groupCreate }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const CreateData = await CreateResponse.json();

        alert(CreateData.message);
        // setGroupCreate("");
        return router.refresh();
      }
    } catch (error) {
      return alert("グループ作成失敗");
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const DeleteResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/group/delete/${groupChoice}`,
      {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ groupname: groupChoice }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const DeleteData = await DeleteResponse.json();
    alert(DeleteData.message);
    return router.refresh();
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
                    <label htmlFor="group-create">Group Crate</label>
                  </h2>
                  <input
                    name="group-create"
                    id="group-create"
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
                      value={groupChoice._id}
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
          </div>
        </div>
      </div>
    </>
  );
}
