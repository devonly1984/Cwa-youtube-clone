"use client"

import { trpc } from "@/trpc/client";

const HomePage = () => {
  const {data} = trpc.hello.useQuery({text: "Hello"});
  return <div>Loading videos coming {data?.greeting}
  soon</div>;
};
export default HomePage;
