import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { gql } from "graphql-request";
import { getClient } from "../graphQLClient";
import { getAllPosts } from "@/src/queries/blog-data";
import BlogCard from "@/src/BlogCard";

export async function loader() {
    const posts = await getAllPosts();
    return posts;
}
const Blog: NextPage = () => {
    const [posts, setPosts] = useState<[]>([]);

    console.log(posts);
    useEffect(() => {
        getAllPosts().then((res) => {
            setPosts(res);
        });
    }, []);
    return (
        <div className=" h-screen mx-4 flex flex-col gap-5">
            <div className="flex gap-2 w-full flex-wrap">
                {posts.map((post, id) => {
                    return <BlogCard key={id} post={post} />;
                })}
            </div>
        </div>
    );
};

export default Blog;
