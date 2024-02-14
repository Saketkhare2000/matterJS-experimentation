import React, { useEffect, useState } from "react";

import { getAllPosts } from "@/src/queries/blog-data";
import BlogCard from "@/src/BlogCard";
interface BlogProps {
    node: {
        author: {
            name: string;
            profilePicture: string;
        };
        title: string;
        subtitle: string;
        brief: string;
        slug: string;
        tags: string;
        coverImage: {
            url: string;
        };
        content?: {
            html: string;
            text: string;
            markdown: string;
        };
        views: number;
        publishedAt: string;
        readTimeInMinutes: number;
    };
}

export const getServerSideProps = async (context: any) => {
    // add cache control
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );

    const blogs: BlogProps[] = await getAllPosts();

    return {
        props: {
            blogs,
        },
    };
};

const Blog = ({ blogs }: { blogs: BlogProps[] }) => {
    console.log(blogs);
    return (
        <div className=" h-screen mx-4 flex flex-col gap-5 ">
            <div className="flex gap-2 w-full flex-wrap">
                {blogs.map((post: any, id: number) => {
                    return <BlogCard key={id} post={post} />;
                })}
            </div>
        </div>
    );
};

export default Blog;
