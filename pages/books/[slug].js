import { server } from "../../lib/config";
import {
	getBooks,
	getBookDetails,
	getRelatedBooks,
	getAllPlaylists2,
	getHeaderLectures,
	getAllQnaCategory,
} from "../../lib/fetch";
import Image from "next/image";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import Share from "../../components/share";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Header2 from "../../components/header1";

export default function BookDetail({
	detail,
	playlists,
	headerLectures,
	qnaCategories,
}) {
	return (
		<>
			<Meta
				title={detail.bookName}
				url={`${server}/books/${detail.bookSlug}`}
				image={detail.imageSrc}
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				type="website"
			/>

			<Header2
				playlists={playlists}
				lectures={headerLectures}
				qna_categories={qnaCategories}
			/>

			<section className="blog-detail-ctn mt-0">
				<div className="section-spacing">
					<div className="page-container">
						<div className="blog-area">
							<div className="blog-detail book-detail">
								<div className="row margin-bottom-0">
									<div className="col s12 l5">
										<div className="book-detail-left-wrapper">
											<div className="book-detail-left">
												<div className="book-detail-left-inner">
													<Image
														src={detail.imageSrc}
														alt={detail.bookName}
														layout="fill"
														objectFit="cover"
														objectPosition="center center"
														priority
														unoptimized
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="col s12 l7">
										<div className="book-detail-right">
											<h2 className="book-title">{detail.bookName}</h2>

											<div className="book-writer-area">
												<p>
													Writter: <i>{detail.writer}</i>
												</p>
												{detail.translator && (
													<p>
														Translator: <i>{detail.translator}</i>
													</p>
												)}
												{/*	/!*<p>সম্পাদনা: <i>{detail.editor}</i></p>*!/*/}
											</div>

											<div className="book-action">
												<div className="book-btn">
													{detail.link != "" && (
														<a
															className="btn-r read-more"
															target="_blank"
															href={`${detail.link}`}>
															<MenuBookIcon />
															<span>Download</span>
														</a>
													)}

													{detail.purchaseLink != "" && (
														<a
															className="btn-r read-more"
															target="_blank"
															href={`${detail.purchaseLink}`}>
															<MenuBookIcon />
															<span>Buy</span>
														</a>
													)}

													{detail.pdf != "" && (
														<a
															className="btn-r read-more"
															target="_blank"
															href={`${server}/pdf-viewer/web/viewer.html?file=${detail.pdf}`}>
															<MenuBookIcon />
															<span>Read</span>
														</a>
													)}

													{detail.link == "" &&
														detail.purchaseLink == "" &&
														detail.pdf == "" && (
															<span className="no-link">
																{detail.linkNotAvailableText}...
															</span>
														)}
												</div>

												<div className="blog-share book-share">
													<Share
														urlWeb={`books/${detail.bookSlug}`}
														urlMobile={detail.bookSlug}
														title={detail.bookName}
													/>
												</div>
											</div>

											<p className="book-detail-desc">{detail.bookDesc}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/*<section className="blog-page-related">*/}
			{/*	<div className="page-width">*/}
			{/*		<div className="box">*/}
			{/*			<h1 className="title-r">*/}
			{/*				<span>সম্পর্কিত পোস্ট</span>*/}
			{/*			</h1>*/}

			{/*			<div className="row row-r">*/}
			{/*			{*/}
			{/*				books && books.length && books.map(books =>*/}
			{/*					<div className="col col-r s12 l6 xl4" key={books.id}>*/}
			{/*						<BookCard books={books} />*/}
			{/*					</div>*/}
			{/*				)*/}
			{/*			}*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}
		</>
	);
}

export async function getStaticProps({ params }) {
	//const resRelated = await fetch(`${server}/api/books/related`)
	//const books = await resRelated.json()

	const slug = params.slug;
	const detail = await getBookDetails(slug);
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();
	const qnaCategories = await getAllQnaCategory();

	return {
		props: {
			detail,
			playlists: playlists.playlists,
			headerLectures,
			qnaCategories,
		},
	};
}

export async function getStaticPaths() {
	//const res = await fetch(`${server}/api/books/listpage`)
	//const books = await res.json()

	const books = await getBooks();

	const paths = books.map((book) => ({
		params: { slug: book.bookSlug },
	}));

	return {
		paths,
		fallback: false,
	};
}
