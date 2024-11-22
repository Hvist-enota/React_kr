import React, { useState } from "react";
import { getUsers, deleteUser } from "./apiMethods";
import UserList from "./components/UserList";
import FilterBox from "./components/FilterBox";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoadUsers = async () => {
    setLoading(true);
    const userData = await getUsers();
    setUsers(userData || []);
    setLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const filteredUsers = (users || []).filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Керування користувачами</h1>
      <button onClick={handleLoadUsers}>
        {loading ? "Завантаження..." : "Отримати юзерів"}
      </button>
      {users.length > 0 && (
        <>
          <FilterBox filter={filter} onFilterChange={setFilter} />
          <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
        </>
      )}
    </div>
  );
};

export default App;
