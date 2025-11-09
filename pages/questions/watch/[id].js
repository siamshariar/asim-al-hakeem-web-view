"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Layout from "../../../components/layout"
import Meta from "../../../components/meta"
import Share from "../../../components/share"
import Header2 from "../../../components/header1"
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../../lib/fetch"
import { date } from "../../../lib/format"
import { faqs } from "../../../data/questions"
import { server } from "../../../lib/config"

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to get video thumbnail
const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl) return null
  // Check if it's a YouTube URL
  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    const videoId = extractYouTubeId(videoUrl)
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  }
  return null
}

// Helper function to convert any YouTube URL to embed format
const getEmbedUrl = (videoUrl) => {
  if (!videoUrl) return null
  const videoId = extractYouTubeId(videoUrl)
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  return videoUrl
}

export default function QuestionDetail({ id, data, playlists, headerLectures, qnaCategories }) {
  const preImage = useRef(null)
  const iframe = useRef(null)
  const audioRef = useRef(null)
  const videoContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const title = data.question
  const description = data.answer
  const category = data.category
  const image = data.image
  const videoUrl = data.videoUrl
  const audioUrl = data.audioUrl
  const publishedDate = data.publishedDate ? date(data.publishedDate) : "Recently"
  const viewCount = data.viewCount || "0"

  // Get video thumbnail if video exists
  const videoThumbnail = getVideoThumbnail(videoUrl)
  const embedUrl = getEmbedUrl(videoUrl)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault()
        togglePlayPause()
      }
      if (e.key === "f") {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  const handleLoadIframe = () => {
    if (embedUrl && preImage.current && iframe.current) {
      preImage.current.style.display = "none"
      iframe.current.src = `${embedUrl}?autoplay=1&mute=0&rel=0&modestbranding=1&enablejsapi=1`
      iframe.current.style.display = "block"
      setVideoLoaded(true)
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (!videoLoaded) {
      handleLoadIframe()
      return
    }

    if (iframe.current) {
      const iframeWindow = iframe.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage('{"event":"command","func":"' + (isPlaying ? 'pauseVideo' : 'playVideo') + '","args":""}', '*')
        setIsPlaying(!isPlaying)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleMute = () => {
    if (iframe.current) {
      const iframeWindow = iframe.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
      }
    }
  }

  const handleTimeUpdate = () => {
    // This would work better with a custom video player, but for YouTube iframe,
    // we can't directly access these properties due to security restrictions
  }

  const handleProgressClick = (e) => {
    if (iframe.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      const iframeWindow = iframe.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage(`{"event":"command","func":"seekTo","args":[${duration * pos}, true]}`, '*')
      }
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <Meta
        title={title}
        description={description}
        url={`${server}/questions/watch/${id}`}
        image={image || videoThumbnail || `${server}/img/question-default.jpg`}
        type="article"
      />
      {/* Header2 Component with passed data */}
      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />
      <>
        <section className="blog-detail-ctn video-blog-detail pt-6 pb-8 lg:pt-12 lg:pb-16 bg-gradient-to-b from-gray-50 to-white" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-width">
            <div className="container max-w-[1200px] mx-auto">
              <div className="blog-area mx-4 lg:mx-0">
                {/* Video Section - Only show when videoUrl exists */}
                {videoUrl && (
                  <div 
                    className="video-wrap-outer mb-8 rounded-2xl overflow-hidden shadow-2xl" 
                    ref={videoContainerRef}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <div className="video-wrap relative">
                      <div
                        className="video-wrap-image"
                        ref={preImage}
                        style={{ display: videoLoaded ? "none" : "block" }}
                      >
                        <button onClick={handleLoadIframe} className="play-button">
                          <PlayIcon />
                        </button>
                        {/* Use regular img tag for YouTube thumbnails to avoid Next.js domain issues */}
                        {videoThumbnail ? (
                          <img
                            src={videoThumbnail || "/placeholder.svg"}
                            alt={title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center center",
                            }}
                            loading="eager"
                            onError={(e) => {
                              e.target.src = `${server}/img/question-default.jpg`
                            }}
                          />
                        ) : (
                          <Image
                            src={`${server}/img/question-default.jpg`}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center center"
                            loading="eager"
                            unoptimized
                          />
                        )}
                      </div>
                      <iframe
                        ref={iframe}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          display: videoLoaded ? "block" : "none",
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        title={title}
                      />
                      {/* Custom Video Controls */}
                      {videoLoaded && (
                        <div 
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <div className="flex items-center gap-4 mb-2">
                            <button 
                              onClick={togglePlayPause} 
                              className="text-white hover:text-accent transition-colors duration-300 focus:outline-none p-2 hover:bg-white/10 rounded-full"
                              aria-label={isPlaying ? "Pause" : "Play"}
                            >
                              {isPlaying ? <PauseIconSmall /> : <PlayIconSmall />}
                            </button>
                            <div className="flex-1">
                              <div 
                                className="h-1.5 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all"
                                onClick={handleProgressClick}
                              >
                                <div 
                                  className="h-full bg-accent rounded-full transition-all" 
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-white text-sm font-medium min-w-[80px] text-right">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                            <button 
                              onClick={toggleFullscreen}
                              className="text-white hover:text-accent transition-colors duration-300 focus:outline-none p-2 hover:bg-white/10 rounded-full"
                              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                            >
                              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Image Section - Only show when image exists and NO video */}
                {image && !videoUrl && (
                  <div className="image-wrap-outer video-wrap-outer mb-8 rounded-2xl overflow-hidden shadow-xl" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="image-wrap">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        width={800}
                        height={400}
                        objectFit="cover"
                        objectPosition="center center"
                        loading="eager"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                {/* Audio Section */}
                {audioUrl && (
                  <div className="audio-wrap-outer px-4 py-6 sm:px-6 sm:py-8 md:px-16 md:py-8 lg:px-16 mb-8 bg-gradient-to-r from-accent/5 to-accent-secondary/5 rounded-2xl shadow-lg">
                    <div className="audio-wrap">
                      <div className="audio-controls">
                        <button onClick={toggleAudio} className="audio-play-btn w-[150px] h-[150px] lg:w-[250px] lg:h-[200px] transition-transform duration-300 hover:scale-105">
                          {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <span className="audio-title text-lg font-semibold text-primary">Listen to Answer</span>
                      </div>
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                        controls
                        className="mt-4 w-full rounded-lg"
                      />
                    </div>
                  </div>
                )}
                <div className="blog-detail bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10" style={{ position: 'relative', zIndex: 1 }}>
                  <div className="row row-r video-title-area mb-8">
                    <div className="col col-r s12 l9">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                          {category}
                        </span>
                        <h1 className="margin-bottom-2 !text-[26px] md:!text-[32px] lg:!text-[36px] !font-bold !leading-tight text-primary">
                          {title}
                        </h1>
                      </div>
                      <div className="data-line-left flex flex-wrap items-center gap-3 text-gray-600">
                        <span className="view-r text-[16px] flex items-center gap-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                          </svg>
                          {viewCount} views
                        </span>
                        <span className="dot bg-gray-400 w-1 h-1 rounded-full"></span>
                        <span className="date-r text-[16px] flex items-center gap-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                          {publishedDate}
                        </span>
                      </div>
                    </div>
                    <div className="col col-r s12 l3 mt-4 lg:mt-0">
                      <div className="blog-share flex justify-start lg:justify-end">
                        <Share urlWeb={`questions/watch/${id}`} urlMobile={id} title={title} />
                      </div>
                    </div>
                  </div>
                  <div className="video-description-area border-t border-gray-200 pt-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1 h-8 bg-accent rounded-full"></div>
                      <h3 className="text-[22px] md:text-[24px] font-bold text-primary">Answer</h3>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      {description &&
                        description.split("\n").map((item, idx) => (
                          <p className="text-gray-700 text-[17px] md:text-[18px] leading-relaxed mb-4" key={idx}>
                            {item}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id
  const data = faqs.find((faq) => faq.id === id)
  if (!data) {
    return {
      notFound: true,
    }
  }
  // Fetch header data
  const playlists = await getAllPlaylists2()
  const headerLectures = await getHeaderLectures()
  const qnaCategories = await getAllQnaCategory()
  return {
    props: {
      id,
      data,
      playlists: playlists.playlists,
      headerLectures,
      qnaCategories,
    },
  }
}

export async function getStaticPaths() {
  const paths = faqs.map((faq) => ({
    params: { id: faq.id },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}

const PlayIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path
        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55
               C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19
               C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
      ></path>
      <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
  )
}

const PauseIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path
        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55
               C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19
               C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
      ></path>
      <rect x="26" y="14" width="4" height="20" fill="#fff"></rect>
      <rect x="38" y="14" width="4" height="20" fill="#fff"></rect>
    </svg>
  )
}

const PlayIconSmall = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="white" />
    </svg>
  )
}

const PauseIconSmall = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="5" width="4" height="14" fill="white" />
      <rect x="14" y="5" width="4" height="14" fill="white" />
    </svg>
  )
}

const MaximizeIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="white" />
    </svg>
  )
}

const MinimizeIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" fill="white" />
    </svg>
  )
}

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00"
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}