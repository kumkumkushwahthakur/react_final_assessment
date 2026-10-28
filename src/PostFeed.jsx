import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function PostFeed() {
  const [post, setPost] = useState("");

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const res = await fetch(
        "https://crudcrud.com/api/99cc410f33b64b65a1753a6fe1867bfb/tweets"
      );
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        "https://crudcrud.com/api/99cc410f33b64b65a1753a6fe1867bfb/tweets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post, likes: 0 }),
        }
      );
      return res.json();
    },

    onSuccess: () => {
      setPost("");
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (tweetId) => {
      const tweet = queryClient
        .getQueryData(["tweets"])
        .find((tweet) => tweet._id === tweetId);

      const res = await fetch(
        `https://crudcrud.com/api/99cc410f33b64b65a1753a6fe1867bfb/tweets/${tweetId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            post: tweet.post,
            likes: (tweet.likes || 0) + 1,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to like tweet");
      }

      return res.json();
    },

    onMutate: (tweetId) => {
      const previousTweets = queryClient.getQueryData(["tweets"]);

      queryClient.setQueryData(["tweets"], (oldTweets) =>
        oldTweets.map((tweet) =>
          tweet._id === tweetId
            ? { ...tweet, likes: (tweet.likes || 0) + 1 }
            : tweet
        )
      );

      return { previousTweets };
    },

    onError: (error, tweetId, context) => {
      queryClient.setQueryData(["tweets"], context.previousTweets);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  if (isPending) {
    return <p>Loading.....</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <input
        value={post}
        type="text"
        placeholder="post a new tweet"
        onChange={(e) => setPost(e.target.value)}
      />

      <button onClick={() => mutation.mutate()} disabled={!post.trim()}>
        Post Tweet
      </button>

      <h1>Tweets</h1>

      {data.map((tweet) => (
        <div key={tweet._id}>
          <p>{tweet.post}</p>

          <button onClick={() => likeMutation.mutate(tweet._id)}>
            Like ({tweet.likes || 0})
          </button>
        </div>
      ))}
    </>
  );
}

export default PostFeed;
