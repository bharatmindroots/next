import Header from "../layout/header";
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/blog");
  const response = await res.json();
  const paths = response.data.map((post) => {
    return {
      params: { id: post._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const response = await res.json();
  return {
  props: {response}
  }
  }
const Post = (props) => {
  return (
    <div className="container">
      <Header />
      <h1>{props.response.data.title}</h1>
      <div>{props.response.data.content}</div>
    </div>
  );
};

export default Post;
