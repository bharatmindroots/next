import Header from "../layout/header";
import Link from 'next/link'

export default function blog({ response }) {
  return (
    <>
      <Header />
      <ul className="blogsdata">
        {response.data.map((post) => (
          <li>
            <h2>
                <Link href={`/blog/${post._id}`}>
                {post.title}    
              </Link>
            </h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

//getServerSideProps

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/blog`)
  const response = await res.json()
  return { props: { response } }
}

//getStaticProps

// export async function getStaticProps() {
//   const res = await fetch("https://dummyjson.com/posts?skip=&limit=10");
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//     revalidate: 10,
//   };
// }
