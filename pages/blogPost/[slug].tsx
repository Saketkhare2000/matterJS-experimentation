//
import { getSlug } from "@/src/queries/blog-data";
import React, { useEffect, useState } from "react";

interface BlogPageProps {
    slug: string;
}

const BlogPage = ({ slug }: BlogPageProps) => {
    useEffect(() => {}, [slug]);

    return <div>hi</div>;
};
export default BlogPage;

export const getStaticProps = async (context: any) => {
    const { slug } = context.params;
    console.log(slug);
    return {
        props: {
            slug,
        },
    };
};

export const getStaticPaths = async () => {
    // const paths = getSlug().then((res) => {
    //     return res;
    // });
    const paths = await getSlug().then((res) => {
        //res is of the form { node: { slug: 'how-to-navigate-between-routes-in-nextjs' } }, get the slug from it
        return res.map((post: any) => {
            return {
                params: {
                    slug: post.node.slug,
                },
            };
        });
    });
    console.log(paths.map((path: any) => path.params.slug));

    const arr = [
        "how-to-navigate-between-routes-in-nextjs",
        "10-git-stash-commands-every-developer-should-know",
        "the-definitive-guide-to-javascript-date-and-time",
        "dynamic-routes-nextjs-app-router",
        "the-best-way-to-pad-a-string-in-javascript",
        "why-use-javascript-function-default-parameters",
        "the-best-way-to-get-the-month-name-from-a-date-in-javascript",
        "create-an-e-learning-platform-using-caisy-graphql-nextjs-app-router",
        "understanding-nextjs-server-actions-with-examples",
        "how-to-build-a-progressive-web-app-using-javascript-and-vite",
        "explain-react-18-usetransition-hook-with-examples",
        "advanced-javascript-console-logging-for-developers",
        "how-to-create-a-self-clicking-button-with-reactjs",
        "what-do-you-need-to-know-to-become-proficient-in-javascript",
        "top-10-git-commands-every-developer-should-know",
        "future-proof-your-code-top-javascript-frameworks-to-watch-in-2023",
        "5-twitter-threads-to-teach-you-technical-blogging",
        "dev-retro-2022-what-made-me-a-better-developer-this-year",
        "do-you-take-notes-the-story-of-a-notetaker",
        "how-to-create-an-eyedropper-tool-using-javascript",
    ];
    return {
        // paths: paths.map((path: any) => path.params.slug),
        paths: arr,
        fallback: true,
    };
};
