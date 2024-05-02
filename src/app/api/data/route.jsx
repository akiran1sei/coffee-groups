const baseUrl = "http://localhost:3001";

// Fetch all tasks (equivalent to getServerSideProps)
export const getAllGroups = async () => {
  const res = await fetch(`http://localhost:3001/groups`, {
    cache: "no-store",
  });
  const groups = await res.json();
  return groups;
};

// Add a new task
export const addGroup = async (Group) => {
  const res = await fetch(`${baseUrl}/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Group),
  });
  const newGroup = await res.json();
  return newGroup;
};

// Update an existing task
export const updateGroup = async (id, newText) => {
  const res = await fetch(`${baseUrl}/groups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText }),
  });
  const updatedGroup = await res.json();
  return updatedGroup;
};

// Delete a task
export const deleteGroup = async (id) => {
  const res = await fetch(`${baseUrl}/groups/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deletedGroup = await res.json(); // Might not return a specific deletedGroup object
  return deletedGroup; // Or you can simply return an empty object or a success message
};
