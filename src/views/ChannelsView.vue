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
                        <div class="p-4 py-4 flex place-items-center flex-col">
                            <div class="gap-6 grid lg:grid-cols-2">
                                <div v-for="(video, j) in row.videos" :key="j" class="mx-2 my-2">
                                    <iframe class="w-full" :src="'https://www.youtube.com/embed/'+video.videoId+'?rel=0'" allowfullscreen></iframe>
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
                profil: [],
                videos: [],
                channelId: [
                    'UCshZ3rdoCLjDYuTR_RBubzw',
                    'UC8butISFwT-Wl7EV0hUK0BQ',
                    'UC29ju8bIPH5as8OGnQzwJyA',
                    'UCnrZ-UFSzeMSxKx_OHtwKsQ',
                    'UCzyuZJ8zZ-Lhfnz41DG5qLw',
                    'UCkXmLjEr95LVtGuIm3l2dPg',
                    'UCfzlCWGWYyIQ0aLC5w48gBQ',
                    'UCW5YeuERMmlnqo4oq8vwUpg',
                    'UC14ZKB9XsDZbnHVmr4AmUpQ'
                ],
            }
        },
        methods: {
            getProfil: function (id) {
                let urlProfil = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${import.meta.env.VITE_YT_KEY}`;

                axios.get(urlProfil)
                    .then(response => (
                        this.loading = true,
                        this.profil.push({
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
                        response.data.items.filter((value, key) => {
                            if (value.snippet.channelId === id) {
                                this.videos.push({
                                    id: id,
                                    videoId: value.id.videoId,
                                    title: value.snippet.title,
                                    publishedAt: value.snippet.publishedAt,
                                })
                            }
                        })
                    )).catch(error => console.log(error))
            },
            parseDate: function (value) {
                let date = new Date(value);
                return date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear();
            }
        },
        mounted() {
            this.channelId.map((value, key) => {
                this.getProfil(value)
                this.getVideos(value)
            });
        },
        computed: {
            youtube: function () {
                return this.profil.map((value, key) => {
                    return {
                        id: value.id,
                        name: value.name,
                        image: value.image,
                        videos: this.videos.filter((rows, key) => {
                            return rows.id === value.id
                        })
                    }
                })
            }
        }
    }
</script>