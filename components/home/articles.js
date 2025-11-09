// import { youtube } from "../../lib/config";
// import Link from "next/link";
import PostCard from "../card/post-card-article";
import HomeSection from "./home-section";

export default function HomeArticles({ articles }) {
	return (
		<section className="h-sec h3-post-1 section-spacing">
			<div className="page-container">
				<HomeSection title="Articles" link="/articles">
					<div className="row row-r">
						<div className="col col-r s12 l12">
							<div className="h3-post-left">
								<div className="row row-r">
									{articles &&
										articles.length &&
										articles.map((article) => (
											<div className="col col-r s12 m4" key={article.id}>
												<PostCard article={article} />
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</HomeSection>
			</div>
		</section>
	);
}
