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
    const paths = ["/blogPost/hi"];
    console.log(paths);
    return {
        paths: paths,
        fallback: true,
    };
};
