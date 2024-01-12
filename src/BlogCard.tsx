import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getAllPosts, getPost } from "./queries/blog-data";

import BlogDetails from "./BlogDetails";
import { Badge } from "@/components/ui/badge";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogCard = ({ post }: { post: any }) => {
    const {
        title,
        subtitle,
        coverImage,
        author: { name },
        publishedAt,
        readTimeInMinutes,
        slug,
    } = post.node;

    const [open, setOpen] = React.useState(false);
    const [postData, setPostData] = React.useState({} as any);

    return (
        <Card className="max-w-xs cursor-pointer overflow-hidden border-neutral-500 bg-neutral-900 text-neutral-200">
            <Image
                src={coverImage.url}
                alt="coverImage"
                className="w-full object-cover"
                width={150}
                height={100}
            />
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{name}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3">
                <p className="text-xs">
                    {publishedAt} - {readTimeInMinutes} min read
                </p>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="w-fit"
                            onClick={() => {
                                setOpen(!open);
                                getPost(slug).then((res) => {
                                    setPostData(res);
                                });
                            }}
                        >
                            Read More
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-neutral-900 text-neutral-200 border-neutral-700">
                        <DialogHeader>
                            <DialogTitle className="flex flex-row-reverse gap-5">
                                {postData.title}

                                <Avatar>
                                    <AvatarImage
                                        src={postData?.author?.profilePicture}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DialogTitle>
                        </DialogHeader>
                        <CardContent>
                            <p>{postData?.subtitle}</p>
                        </CardContent>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export default BlogCard;
