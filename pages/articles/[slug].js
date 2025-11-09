import { useRouter } from 'next/router';
import { Facebook, Youtube, Mail, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import { server } from "../../lib/config";
import articles from '../../data/airticles-data';

export default function ArticleDetail({ article, playlists, headerLectures, qnaCategories }) {
  const router = useRouter();

  // If the article isn't found, display a message
  if (!article) {
    return <p>Article not found.</p>;
  }

  const { slug } = router.query;

  return (
    <>
      <Meta
        title={article.title}
        description={article.description}
        url={`${server}/articles/${slug}`}
        image={article.image}
        type="article"
      />

      <Header2
        playlists={playlists}
        lectures={headerLectures}
        qna_categories={qnaCategories}
      />

      <section className='article-detail section-spacing' >
        <div className='page-container p-6 bg-white rounded-xl shadow-xl'>
          <h1 className='text-3xl pt-4 font-bold mb-6'>{article.title}</h1>
          <p className='text-lg text-[#0D9488] mb-6'>Published on {article.date}</p>
          <div className="relative w-full mb-6 overflow-hidden rounded-lg" style={{ paddingTop: '50%' }}>
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1260px) 100vw, 1260px"
              className='object-cover'
              priority
            />
          </div>
          <div className='text-xl' >{article.description}</div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <a
                href={`https://facebook.com/share?url=${encodeURIComponent(`${server}/articles/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Share on Facebook</span>
              </a>
              <a
                href={`https://youtube.com/share?url=${encodeURIComponent(`${server}/articles/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Share on YouTube</span>
              </a>
              <a
                href={`mailto:?subject=Check out this article&body=${encodeURIComponent(`${server}/articles/${slug}`)}`}
                className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Share via Gmail</span>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(`${server}/articles/${slug}`)}
                className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Share2 className="h-6 w-6" />
                <span className="sr-only">Copy link</span>
              </button>
            </div>
          </div>

          {/* <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.filter(a => a.id !== article.id).map((relatedArticle) => (
                <div key={relatedArticle.id} className="border rounded-lg overflow-hidden">
                  <Image
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-xl mb-2">{relatedArticle.title}</h3>
                    <p className="text-lg text-gray-500 mb-4">{relatedArticle.description}</p>
                    <Link href={`/articles/${relatedArticle.slug}`}>
                      <span className="inline-block px-4 py-2 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-100">
                        Read More
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </section>
    </>
  );
}

// Get article data based on slug
export async function getStaticProps({ params }) {
  const { slug } = params;

  // Find the article that matches the slug
  const article = articles.find(article => article.slug === slug);

  // Fetch other data (playlists, lectures, etc.)
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();

  return {
    props: {
      article: article || null,  // If article is not found, pass null
      playlists: playlists.playlists,
      headerLectures,
      qnaCategories,
    },
  };
}

// Generate static paths for each article
export async function getStaticPaths() {
  const paths = articles.map(article => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: false };
}
