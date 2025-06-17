import { A } from "@solidjs/router";

import { createResource, For } from "solid-js";
import { User } from "database";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  return res.json();
};

export default function Home() {
  const [users, { mutate, refetch }] = createResource<User[]>(fetchUsers);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>

      <For each={users() ?? []}>
        {(user) => (
          <div>
            <h3>{user.name}</h3>
          </div>
        )}
      </For>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
    </main>
  );
}
