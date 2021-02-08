import { GetServerSideProps, NextPage } from "next";
import _ from "lodash";
import Link from "next/link";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Post } from "../../src/entity/Post";
import { usePager } from "hooks/usePager";

type Props = {
  page: number;
  posts: Post[];
  pages: number;
  per_page: number;
  total: number;
};
const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total, per_page, pages, page } = props;
  const { pager } = usePager({ page, pages, urlMaker: n => `?page=${n}` });
  return (
    <div>
      <h1>
        文章列表({total}) 每页{per_page}
      </h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>
            <a>
              {p.id} {p.title}
            </a>
          </Link>
        </div>
      ))}
      <footer>{pager}</footer>
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const page = context.query.page ? parseInt(context.query.page.toString()) : 1;
  const per_page = 1;
  const [posts, total] = await connection.manager.findAndCount(Post, {
    take: per_page,
    skip: (page - 1) * per_page,
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      total,
      pages: Math.ceil(total / per_page),
      per_page,
      page,
    },
  };
};
