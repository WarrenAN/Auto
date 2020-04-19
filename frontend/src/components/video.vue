<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div class="filter"></div>
      <video autoplay loop muted playsinline src="src/assets/img/coverr--man-looking-at-the-view-in-new-zealand-1585913277416.mp4" class="fillWidth"></video>
      <div class="poster hidden">
        <img src="src/assets/img/coverr--man-looking-at-the-view-in-new-zealand-1585913277416.jpg" alt="">
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "video"
    }
</script>

<style lang="less" scoped>

  .homepage-hero-module {
    border-right: none;
    border-left: none;
    position: relative;
  }

  .no-video .video-container video,
  .touch .video-container video {
    display: none;
  }

  .no-video .video-container .poster,
  .touch .video-container .poster {
    display: block !important;
  }

  .video-container {
    position: relative;
    bottom: 0%;
    left: 0%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #000;
  }

  .video-container .poster img {
    width: 100%;
    bottom: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 100;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .video-container video {
    position: absolute;
    z-index: 0;
    bottom: 0;
  }

  .video-container video.fillWidth {
    width: 100%;
  }

</style>
