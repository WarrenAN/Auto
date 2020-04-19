<template>
  <div class="homepage-hero-module" style="height: 100%;width: 100%">
    <div class="video-container">
      <div class="filter">
        yaofeng
      </div>
      <video autoplay loop muted playsinline class="fillWidth">
        <source src="static/coverr--man-looking-at-the-view-in-new-zealand-1585913277416.mp4" type="video/mp4">
      </video>
      <div class="poster hidden">
        <img src="static/coverr--man-looking-at-the-view-in-new-zealand-1585913277416.jpg" alt="">
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'eyes',
    data() {
      return {
        vedioCanPlay: false,
        fixStyle: ''
      }
    },
    methods: {
      canplay() {
        this.vedioCanPlay = true
      }
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
  }
</script>

<style lang="less" scoped>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img{
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .fillWidth {
    width: 100%;
  }
</style>
