import { server, youtube, constants } from "../../lib/config";
import { getAllPlaylists2, getYoutubeVideoListByUrl } from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import PostCardVideo2 from "../../components/card/post-card-video2";
import Loader from "../../components/loader";
import VideoModal from "../../components/modal/VideoModal";
import Header2 from "../../components/header1";
import fetcher from "../../lib/lecturesFetcher";
import useOnScreen from "../../hooks/useOnScreen";
import useSWRInfinite from "swr/infinite";
import Link from "next/link";
import ListIcon from "@mui/icons-material/List";

const getKey = (pageIndex, previousPageData, playlistId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.videoLists.nextPageToken !== null) {
    pageToken = `&pageToken=${previousPageData.videoLists.nextPageToken}`;
  }

  return `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}${pageToken}`;
};

export const generateVParam = (videoID, title) => {
  const formattedTitle = encodeURIComponent((title || "").split(" ").join("=$"));
  return `${videoID}=$$=${formattedTitle}`;
};

const parseVParam = (slug) => {
  const [videoID, encodedTitle] = slug.split("=$$=");
  const videoTitle = decodeURIComponent(encodedTitle).split("=$").join(" ");
  return { videoID, videoTitle };
};

export default function LectureList({ initialVideos, initPlaylistId, headerLectures, playlists }) {
  const ref = useRef();
  const catRef = useRef();
  const isVisible = useOnScreen(ref);
  const pageTitle = playlists.playlistsTitle[initPlaylistId];

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, initPlaylistId),
    fetcher,
    { initialData: initialVideos, revalidateOnMount: true }
  );

  const datas = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const numberOfPages = data?.[0]?.videoLists ? data[0].videoLists.numberOfPages : 0;
  const isReachingEnd = size === numberOfPages;
  const isRefreshing = isValidating && data && data.length === size;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalTitle, setModalTitle] = useState(""); // New state for modal title
  const [catOpen, setCatOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // Modal visibility
  const [modalVideoDetails, setModalVideoDetails] = useState({
    videoId: "",
    title: "",
    description: "",
  });

  const handleCatOpen = () => setCatOpen(!catOpen);



  const fetchIframeTitle = async (id) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${youtube.key}&id=${id}&part=snippet`);
      const data = await response.json();
      return data.items[0]?.snippet?.title || "Video Title Not Found";
    } catch (error) {
      console.error("Failed to fetch video title:", error);
      return "Video Title Not Found";
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");

    if (v) {
      const { videoID, videoTitle } = parseVParam(v);
      setModalTitle(videoTitle);
      openModal({ id: videoID, title: videoTitle });
    }
  }, []);

  const openModal = (item) => {
    const id = item?.snippet?.resourceId?.videoId || item?.id;
    const title = item?.snippet?.title || item?.title || "Untitled";
    const description = item?.snippet?.description || item?.description || "No description available";
  
    const playlistId = initPlaylistId;
  
    if (!id) {
      console.error("Invalid item structure, missing video ID:", item);
      return;
    }
  
    setSelectedVideo({ id, title, description, playlistId });
    setModalTitle(title);
  
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", generateVParam(id, title));
  
    const basePath = window.location.pathname.split('?')[0]; 
    const updatedUrl = `${basePath}?${urlParams.toString()}`;
    window.history.replaceState(null, "", updatedUrl);
  };


  const closeModal = () => {
    setSelectedVideo(null);
    setModalTitle("");

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("v");
    const basePath = window.location.pathname.split('?')[0];
    const updatedUrl = `${basePath}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
    console.log(`URL after closing modal: ${updatedUrl}`);
    window.history.replaceState(null, "", updatedUrl);
  };


  const getCategorizedVideos = async (id, pageTitle) => {
    setCatOpen(false);
    setSize(1);
  };

  useEffect(() => {
    const handler = (e) => {
      // Close the category dropdown when clicking outside
      if (catRef.current != null && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    
    document.body.addEventListener("mousedown", handler);
  
    // Only load more data when the component is visible and there are more pages
    if (isVisible && !isReachingEnd && !isLoadingMore) {
      // Trigger next page load
      setSize(size + 1);
    }
  
    // Cleanup event listener when the component is unmounted
    return () => document.body.removeEventListener("mousedown", handler);
  }, [isVisible, isReachingEnd, isLoadingMore, size]);
  

  return (
    <>
      <Meta
        title={pageTitle}
        description="ড. মোহাম্মদ মানজুরে ইলাহী এর লেকচার সমগ্র"
        url={`${server}/lectures/${initPlaylistId}`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

	<Header2
		playlists={playlists.playlists}
		activePlaylistId={initPlaylistId}
		lectures={headerLectures}
	/>

	<div className="mt-10">
		<section className="bg-gray-100 section-spacing">
			<div className="page-container">
					<div className="flex flex-col">
						<div className="text-xl sm:text-2xl text-black font-bold mb-6">{pageTitle}</div>
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{datas &&
							datas.map((data) =>
							data.videoLists.videos.map((video) => (
								<div
								className="col col-r s12 m6 xl3"
								key={video.id}
								onClick={() => openModal(video, initPlaylistId)} // Trigger modal on click
								>
								<PostCardVideo2 item={video} statistics={data.videoLists.videoStats} playlistId={initPlaylistId} onClick={() => openModal(video, initPlaylistId)}/>
								</div>
								))
							)}
						</div>
						<div ref={ref}>
							{isLoadingMore ? (
							<div className="loader">
								<Loader />
							</div>
							) : null}
						</div>
						{!isReachingEnd && (
							<center style={{ margin: "20px 0" }}>
							<button onClick={() => setSize(size + 1)} disabled={isRefreshing || isLoadingMore}>
								{isLoadingMore ? "See more" : ""}
							</button>
							</center>
						)}
				</div>
			</div>
		</section>
	</div>



	{selectedVideo && (
			<VideoModal
			isOpen={!!selectedVideo}
			onClose={closeModal}
			videoId={selectedVideo.id}
			title={modalTitle}
			description={selectedVideo.description}
      playlistId={selectedVideo.playlistId}
			/>
		)}
		</>
	);
	}

export async function getStaticProps({ params }) {
  const playlistId = params.pid;
  const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
  const videoLists = await getYoutubeVideoListByUrl(url);
  const playlists = await getAllPlaylists2();

  return {
    props: {
      initialVideos: [videoLists],
      initPlaylistId: playlistId,
      playlists,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const playlists = await getAllPlaylists2();

  const paths = playlists.playlists.map((playlist) => ({
    params: { pid: playlist.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}