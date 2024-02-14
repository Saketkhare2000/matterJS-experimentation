//
import { getPost, getSlug } from "@/src/queries/blog-data";
import React, { DOMAttributes, useEffect, useState } from "react";

import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import BlogCard from "@/src/BlogCard";

interface BlogPageProps {
    slug: string;
    data: any;
}

export const getServerSideProps = async (context: any) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );

    const { slug } = context.params;

    let data;

    await getPost(slug).then((res) => {
        data = res;
    });
    return {
        props: {
            slug,
            data,
        },
    };
};

const BlogPage = ({ slug, data }: BlogPageProps) => {
    const html: string = data?.content.html;

    const paragraphsArray: string[] = html.split("\n");

    console.log(data?.content.html);

    paragraphsArray.forEach((paragraph: string) => {
        paragraph.replace(",", "");
    });

    const cleanedArray = paragraphsArray.filter(
        (paragraph: string) => paragraph !== ""
    );

    cleanedArray.splice(3, 0, "Ho gaya");

    return (
        <div className="text-white">
            <div>hi {slug}</div>
            <div
                className="blog-content px-4 leading-loose flex flex-col gap-5 mt-5 justify-center"
                dangerouslySetInnerHTML={{ __html: data?.content.html }}
            ></div>
            {/* <ReactMarkdown
                className="flex flex-col gap-5 mt-5 items-start justify-start mx-auto w-3/4"
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="text-4xl font-bold" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-3xl font-bold" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-2xl font-bold" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4 className="text-xl font-bold" {...props} />
                    ),
                    h5: ({ node, ...props }) => (
                        <h5 className="text-lg font-bold" {...props} />
                    ),
                    h6: ({ node, ...props }) => (
                        <h6 className="text-base font-bold" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="text-base " {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a className="text-base" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="text-base" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="text-base" {...props} />
                    ),
                    img: ({ node, ...props }) => (
                        <img className="text-base" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="text-base" {...props} />
                    ),
                }}
            >
                {data!.content.markdown}
            </ReactMarkdown> */}
        </div>
    );
};
export default BlogPage;
