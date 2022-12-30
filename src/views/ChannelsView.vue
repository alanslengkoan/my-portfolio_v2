<script setup>
    import Loading from './../components/Loading.vue';
</script>

<template>
    <section id="channels">
        <div class="container mx-auto">
            <h1 class="text-2xl text-center font-bold">Channels</h1>

            <div :class="loading ? 'hidden' : 'flex items-center justify-center h-screen'">
                <Loading />
            </div>
            <div v-for="(row, i) in youtube" :key="i">
                <div class="py-4 flex flex-wrap items-center">
                    <div class="grow-0 shrink-0 basis-auto block w-full lg:w-6/12 xl:w-4/12">
                        <div class="my-auto">
                            <h1 class="py-2 font-bold text-xl text-center">{{ row.name }}</h1>
                            <img class="py-2 px-2 mx-auto rounded-full" :src="row.image" :alt="row.name">
                        </div>
                    </div>
                    <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                        <div class="py-4 flex place-items-center flex-col">
                            <div class="gap-6 grid lg:grid-cols-2">
                                <div v-for="(video, j) in row.videos" :key="j" class="mx-2 my-2">
                                    <iframe :src="'https://www.youtube.com/embed/'+video.videoId+'?rel=0'" allowfullscreen></iframe>
                                    <h3 class="font-semibold pt-3 text-lg">{{ video.title }}</h3>
                                    <p class="font-semibold text-xs italic">{{ video.publishedAt }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
    #channels {
        min-height: 100vh;
    }
</style>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                loading: false,
                channelId: [
                    'UCpSPS5yLCxYRuZSrCx-eBjA',
                    'UCnrZ-UFSzeMSxKx_OHtwKsQ',
                    'UCzyuZJ8zZ-Lhfnz41DG5qLw',
                    'UCkXmLjEr95LVtGuIm3l2dPg',
                    'UCfzlCWGWYyIQ0aLC5w48gBQ',
                    'UCW5YeuERMmlnqo4oq8vwUpg',
                    'UC14ZKB9XsDZbnHVmr4AmUpQ'
                ],
                youtube: [],
            }
        },
        methods: {
            getProfil: function (id) {
                let urlProfil = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${import.meta.env.VITE_YT_KEY}`;

                axios.get(urlProfil)
                    .then(response => (
                        this.loading = true,
                        this.youtube.push({
                            id: response.data.items[0].id,
                            name: response.data.items[0].snippet.title,
                            image: response.data.items[0].snippet.thumbnails.medium.url,
                        })
                    )).catch(error => console.log(error))
            },
            getVideos: function (id) {
                let urlVideos = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&order=date&channelId=${id}&key=${import.meta.env.VITE_YT_KEY}`;

                axios.get(urlVideos)
                    .then(response => (
                        this.youtube.forEach(object => {
                            let arrVideos = [];

                            response.data.items.filter((value, key) => {
                                if (object.id === value.snippet.channelId) {
                                    arrVideos.push({
                                        videoId: value.id.videoId,
                                        title: value.snippet.title,
                                        publishedAt: value.snippet.publishedAt,
                                    });
                                }
                            })

                            object['videos'] = arrVideos;
                        })
                    )).catch(error => console.log(error))
            }
        },
        mounted() {
            this.channelId.map((value, key) => {
                this.getProfil(value)
                this.getVideos(value)
            });
        }
    }
</script>