import Link from "next/link";

const BlogPage = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ratione, in ipsa velit, quam
      itaque excepturi accusantium ipsum aspernatur necessitatibus perspiciatis natus ab quisquam.
      Adipisci saepe sunt illo sint voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Mollitia ratione, in ipsa velit, quam itaque excepturi accusantium ipsum aspernatur
      necessitatibus perspiciatis natus ab quisquam. Adipisci saepe sunt illo sint voluptatibus.
      <Link href={"/dashboard/blogs/create-blog"}>Create Blog</Link>
    </div>
  );
};

export default BlogPage;
