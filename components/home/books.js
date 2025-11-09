// trending post
import PostCard from "../card/post-card-tertiary";

export default function HomeBooks({ books }) {
	return (
		<section className="h-sec h3-post-5 h-books section-spacing">
			<div className="page-container">
				<div>
					<h2 className="h3-sec-title-2">Popular Books</h2>

					{/* <div className="title-default">
            <h2>
              <span>Popular Books</span>
            </h2>
          </div> */}

					<div className=" row row-r">
						<div className="col col-r s12 l6">
							<PostCard book={books[0]} />
						</div>
						<div className="col col-r s12 l6">
							<PostCard book={books[1]} />
						</div>
					</div>
				</div>
			</div>
			<div className="h3-bg-pattern"></div>
		</section>
	);
}
