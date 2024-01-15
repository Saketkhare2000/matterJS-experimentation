import { getClient } from "@/graphQLClient";
import { gql } from "graphql-request";

export const getAllPosts = async () => {
    const client = getClient();

    const data: any = await client.request(
        gql`
            query allPosts($tags: [ObjectId!]) {
                publication(host: "saketcreatexp.hashnode.dev") {
                    title
                    posts(first: 20, filter: { tags: $tags }) {
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
                        edges {
                            node {
                                author {
                                    name
                                    profilePicture
                                }
                                title
                                subtitle
                                brief
                                slug
                                coverImage {
                                    url
                                }

                                publishedAt
                                readTimeInMinutes
                            }
                        }
                    }
                }
            }
        `
    );

    return data.publication.posts.edges;
};

export const getPost = async (slug: any) => {
    const client = getClient();

    const data: any = await client.request(
        gql`
            query postDetails($slug: String!) {
                publication(host: "saketcreatexp.hashnode.dev") {
                    post(slug: $slug) {
                        author {
                            name
                            profilePicture
                        }
                        publishedAt
                        title
                        subtitle
                        readTimeInMinutes
                        content {
                            html
                        }
                        tags {
                            name
                            slug
                            id
                        }
                        coverImage {
                            url
                        }
                    }
                }
            }
        `,
        { slug: slug }
    );

    return data.publication.post;
};

export const getSlug = async () => {
    const client = getClient();

    const data: any = await client.request(
        gql`
            query allPosts {
                publication(host: "saketcreatexp.hashnode.dev") {
                    posts(first: 20) {
                        edges {
                            node {
                                slug
                            }
                        }
                    }
                }
            }
        `
    );

    return data.publication.posts.edges;
};
