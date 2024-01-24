import { getClient } from "@/graphQLClient";
import { gql } from "graphql-request";

const url = "saketcreatexp.hashnode.dev";
export const getAllPosts = async () => {
    const client = getClient();

    const data: any = await client.request(
        gql`
            query allPosts($tags: [ObjectId!]) {
                publication(host: "${url}") {
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
                publication(host: "${url}") {
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
                            text
                            markdown
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
                publication(host: "${url}") {
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
